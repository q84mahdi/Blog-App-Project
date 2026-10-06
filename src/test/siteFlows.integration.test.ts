import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

const { authForRequest } = vi.hoisted(() => ({ authForRequest: vi.fn() }));
vi.mock("@/utils/middlewareAuth", () => ({ default: authForRequest }));

/**
 * These tests exercise the same service calls used by the site against the
 * resettable MSW API. They cover cross-feature workflows; browser navigation
 * and Next middleware are tracked separately below because Vitest runs in
 * jsdom rather than a Next server.
 */
describe("integrated site flows", () => {
  let auth: typeof import("@/services/authServices");
  let posts: typeof import("@/services/postServices");
  let comments: typeof import("@/services/commentServices");
  let categories: typeof import("@/services/categoryServices");

  beforeAll(async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "http://localhost:3100/api");
    [auth, posts, comments, categories] = await Promise.all([
      import("@/services/authServices"),
      import("@/services/postServices"),
      import("@/services/commentServices"),
      import("@/services/categoryServices"),
    ]);
  });

  afterAll(() => vi.unstubAllEnvs());

  test("sign in, create a post, read it publicly, edit it, and delete it", async () => {
    const signedIn = await auth.signinApi({
      email: "admin@example.com",
      password: "password",
    });
    expect(signedIn.user._id).toBe("user-admin");

    const categoryList = await categories.getAllCategoriesApi("");
    const form = new FormData();
    form.set("title", "Integrated workflow post");
    form.set("briefText", "A sufficiently long summary for integration.");
    form.set("text", "A sufficiently long body for integration testing.");
    form.set("slug", "integrated-workflow-post");
    form.set("readingTime", "3");
    form.set("category", categoryList.data[0]._id);
    form.set(
      "coverImage",
      new File(["image"], "cover.jpg", { type: "image/jpeg" }),
    );

    const created = await posts.createPostApi(form);
    expect(created.post.slug).toBe("integrated-workflow-post");
    expect((await posts.getPostBySlugApi(created.post.slug)).title).toBe(
      "Integrated workflow post",
    );

    form.set("title", "Updated integrated workflow post");
    form.set("slug", "updated-integrated-workflow-post");
    await posts.editPostApi({ id: created.post._id, postData: form });
    expect(
      (await posts.getPostBySlugApi("updated-integrated-workflow-post")).title,
    ).toBe("Updated integrated workflow post");

    await posts.deletePostApi(created.post._id);
    await expect(posts.getPostByIdApi(created.post._id)).rejects.toThrow(
      "پست مورد نظر پیدا نشد",
    );
  });

  test("like and bookmark a post, verify both profile collections, then undo", async () => {
    const targetPostId = "post-next";

    await posts.likePostApi(targetPostId);
    await posts.bookmarkPostApi(targetPostId);
    let { user } = await auth.getUserApi();
    expect(user.likedPosts).toContain(targetPostId);
    expect(user.bookmarkedPosts).toContain(targetPostId);
    expect((await posts.getPostByIdApi(targetPostId)).isLiked).toBe(true);
    expect((await posts.getPostByIdApi(targetPostId)).isBookmarked).toBe(true);

    await posts.likePostApi(targetPostId);
    await posts.bookmarkPostApi(targetPostId);
    ({ user } = await auth.getUserApi());
    expect(user.likedPosts).not.toContain(targetPostId);
    expect(user.bookmarkedPosts).not.toContain(targetPostId);
  });

  test("create a comment, approve it, verify it on the post and in the user list, reply it, then delete it", async () => {
    const postId = "post-next";

    await comments.createCommentApi(
      { postId, text: "An integrated comment" },
      {},
    );

    const pending = await auth.getUserCommentsApi("");
    const createdComment = pending.data.find(
      (item) => item.content.text === "An integrated comment",
    );
    expect(createdComment).toBeDefined();
    if (!createdComment) throw new Error("New comment was not returned");

    await comments.changeStatusCommentApi({
      commentId: createdComment._id,
      data: { status: 1 },
    });
    expect((await posts.getPostByIdApi(postId)).comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: createdComment._id }),
      ]),
    );

    await comments.createCommentApi(
      {
        postId,
        parentId: createdComment._id,
        text: "Reply to an integrated comment",
      },
      {},
    );

    let postWithReply = await posts.getPostByIdApi(postId);
    const createdReply = postWithReply.comments
      .find((item) => item._id === createdComment._id)
      ?.answers.find(
        (item) => item.content.text === "Reply to an integrated comment",
      );
    expect(createdReply).toBeDefined();
    if (!createdReply)
      throw new Error("New reply was not attached to its parent");

    await comments.changeStatusCommentApi({
      commentId: createdReply._id,
      data: { status: 1 },
    });
    postWithReply = await posts.getPostByIdApi(postId);
    expect(
      postWithReply.comments.find(
        (comment) => comment._id === createdComment._id,
      )?.answers,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: createdReply._id, status: 1 }),
      ]),
    );

    await comments.deleteCommentApi(createdReply._id);
    expect(
      (await posts.getPostByIdApi(postId)).comments.find(
        (comment) => comment._id === createdComment._id,
      )?.answers,
    ).toHaveLength(0);

    await comments.deleteCommentApi(createdComment._id);
    expect(
      (await auth.getUserCommentsApi("")).data.some(
        (item) => item._id === createdComment._id,
      ),
    ).toBe(false);
  });

  test("create a category, use it for a post, browse by category, and delete the category", async () => {
    await categories.createCategoryApi({
      title: "دسته یکپارچه",
      englishTitle: "Integrated Category",
      description: "A category created by the integrated workflow test.",
    });
    const categoryList =
      await categories.getAllCategoriesApi("search=Integrated");
    const createdCategory = categoryList.data[0];
    expect(createdCategory.slug).toBe("integrated-category");

    const form = new FormData();
    form.set("title", "Post in integrated category");
    form.set("briefText", "A sufficiently long summary for this post.");
    form.set("text", "A sufficiently long body for this category post.");
    form.set("slug", "post-in-integrated-category");
    form.set("readingTime", "2");
    form.set("category", createdCategory._id);
    form.set(
      "coverImage",
      new File(["image"], "cover.jpg", { type: "image/jpeg" }),
    );
    const post = await posts.createPostApi(form);

    const categoryPosts = await posts.getAllPostsApi(
      `category=${encodeURIComponent(createdCategory.slug)}`,
    );
    expect(categoryPosts.data.map((item) => item._id)).toContain(post.post._id);

    await categories.deleteCategoryApi(createdCategory._id);
    expect(
      (await categories.getAllCategoriesApi("search=Integrated")).data,
    ).toHaveLength(0);
  });

  test("redirect a signed-out profile request and allow it after authentication", async () => {
    const profileRequest = () =>
      new NextRequest("http://localhost/profile/posts");
    authForRequest.mockResolvedValueOnce(null);
    const signedOutResponse = await middleware(profileRequest());
    expect(signedOutResponse?.status).toBe(307);
    expect(signedOutResponse?.headers.get("location")).toBe(
      "http://localhost/signin",
    );

    authForRequest.mockResolvedValueOnce({ _id: "user-admin" });
    expect(await middleware(profileRequest())).toBeUndefined();
  });
});
