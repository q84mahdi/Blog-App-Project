import { http } from "msw";
import type { Post } from "@/types/postTypes";
import {
  db,
  author,
  category,
  ok,
  error,
  empty,
  clone,
  paginate,
  filterPosts,
  findPost,
  postResponse,
  formData,
} from "../mockData";

export const postHandlers = [
  http.get("*/post/list", ({ request }) =>
    ok(
      paginate(
        filterPosts(db.posts, new URL(request.url)),
        new URL(request.url),
      ),
    ),
  ),

  http.get("*/post/slug/:slug", ({ params }) => {
    const post = findPost(String(params.slug));

    return post ? ok(postResponse(post)) : error("پست مورد نظر پیدا نشد", 404);
  }),

  http.get("*/post/:postId", ({ params }) => {
    const post = findPost(String(params.postId));

    return post ? ok(postResponse(post)) : error("پست مورد نظر پیدا نشد", 404);
  }),

  http.post("*/post/like/:postId", ({ params }) => {
    const post = findPost(String(params.postId));

    if (!post) return error("پست مورد نظر پیدا نشد", 404);

    const liked = db.currentUser.likedPosts.includes(post._id);

    db.currentUser.likedPosts = liked
      ? db.currentUser.likedPosts.filter((id) => id !== post._id)
      : [...db.currentUser.likedPosts, post._id];

    post.isLiked = !liked;
    post.likesCount = Math.max(0, post.likesCount + (liked ? -1 : 1));

    return ok(empty());
  }),

  http.post("*/post/bookmark/:postId", ({ params }) => {
    const post = findPost(String(params.postId));

    if (!post) return error("پست مورد نظر پیدا نشد", 404);

    const saved = db.currentUser.bookmarkedPosts.includes(post._id);

    db.currentUser.bookmarkedPosts = saved
      ? db.currentUser.bookmarkedPosts.filter((id) => id !== post._id)
      : [...db.currentUser.bookmarkedPosts, post._id];

    post.isBookmarked = !saved;

    return ok(empty());
  }),

  http.post("*/post/create", async ({ request }) => {
    const data = await formData(request);
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim();

    if (!title || !slug) return error("عنوان و اسلاگ الزامی است", 400);

    if (db.posts.some((post) => post.slug === slug))
      return error("این اسلاگ قبلا استفاده شده است", 409);

    const selectedCategory = db.categories.find(
      (item) => item._id === data.get("category"),
    );

    if (!selectedCategory) return error("دسته‌بندی معتبر نیست", 400);

    const id = `post-${crypto.randomUUID()}`;
    const image = data.get("coverImage");
    const now = new Date().toISOString();
    const post: Post = {
      _id: id,
      title,
      slug,
      category: category(selectedCategory),
      type: "free",
      briefText: String(data.get("briefText") ?? ""),
      text: String(data.get("text") ?? ""),
      coverImage: image instanceof File ? image.name : "cover.jpg",
      coverImageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
      likesCount: 0,
      readingTime: Number(data.get("readingTime")) || 1,
      tags: [],
      author: author(db.currentUser),
      related: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
    };

    db.posts = [post, ...db.posts];

    return ok({ message: "پست با موفقیت ایجاد شد", post: clone(post) }, 201);
  }),

  http.patch("*/post/update/:postId", async ({ request, params }) => {
    const post = findPost(String(params.postId));

    if (!post) return error("پست مورد نظر پیدا نشد", 404);

    const data = await formData(request);
    const slug = String(data.get("slug") ?? post.slug);

    if (db.posts.some((item) => item._id !== post._id && item.slug === slug))
      return error("این اسلاگ قبلا استفاده شده است", 409);

    const selectedCategory = db.categories.find(
      (item) => item._id === data.get("category"),
    );

    Object.assign(post, {
      title: String(data.get("title") ?? post.title),
      slug,
      briefText: String(data.get("briefText") ?? post.briefText),
      text: String(data.get("text") ?? post.text),
      readingTime: Number(data.get("readingTime")) || post.readingTime,
      ...(selectedCategory ? { category: category(selectedCategory) } : {}),
      updatedAt: new Date().toISOString(),
    });

    const image = data.get("coverImage");
    if (image instanceof File) post.coverImage = image.name;

    return ok({ message: "پست با موفقیت ویرایش شد", post: clone(post) });
  }),

  http.delete("*/post/remove/:postId", ({ params }) => {
    const before = db.posts.length;

    db.posts = db.posts.filter((post) => post._id !== params.postId);

    if (before === db.posts.length) return error("پست مورد نظر پیدا نشد", 404);

    return ok(empty("پست حذف شد"));
  }),
];
