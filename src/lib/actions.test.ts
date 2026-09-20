import { beforeEach, describe, expect, test, vi } from "vitest";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createCommentApi } from "@/services/commentServices";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import { createComment } from "./actions";

vi.mock("@/services/commentServices", () => ({
  createCommentApi: vi.fn(),
}));

vi.mock("@/utils/setCookiesOnReq", () => ({
  default: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("createComment", () => {
  const mockCookieStore = {
    get: vi.fn(),
  };

  const mockOptions: RequestInit = {
    headers: {
      Cookie: "accessToken=access-token; refreshToken=refresh-token",
    },
    credentials: "include",
  };

  const prevState = {
    message: "",
    error: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as never);
    vi.mocked(setCookiesOnReq).mockReturnValue(mockOptions);
  });

  describe("text validation", () => {
    test("returns validation error when text is missing", async () => {
      const formData = new FormData();

      const result = await createComment(prevState, {
        formData,
        postId: "123",
      });

      expect(result).toEqual({
        message: "",
        error: "متن نظر الزامی است.",
      });

      expect(createCommentApi).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    });

    test("returns validation error when text is empty", async () => {
      const formData = new FormData();
      formData.append("text", "");

      const result = await createComment(prevState, {
        formData,
        postId: "123",
      });

      expect(result).toEqual({
        message: "",
        error: "متن نظر الزامی است.",
      });

      expect(createCommentApi).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    });

    test("returns validation error when text is just some spaces", async () => {
      const formData = new FormData();
      formData.append("text", "    ");

      const result = await createComment(prevState, {
        formData,
        postId: "123",
      });

      expect(result).toEqual({
        message: "",
        error: "متن نظر الزامی است.",
      });

      expect(createCommentApi).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });

  describe("successful comment creation", () => {
    test("creates a comment and revalidates the blog page", async () => {
      const formData = new FormData();
      formData.append("text", "This is a test comment");

      const postId = "123";

      vi.mocked(createCommentApi).mockResolvedValue({
        message: "نظر شما با موفقیت ثبت شد.",
      });

      const result = await createComment(prevState, {
        formData,
        postId,
      });

      expect(result).toEqual({
        message: "نظر شما با موفقیت ثبت شد.",
        error: "",
      });

      expect(cookies).toHaveBeenCalledOnce();

      expect(setCookiesOnReq).toHaveBeenCalledExactlyOnceWith(mockCookieStore);

      expect(createCommentApi).toHaveBeenCalledExactlyOnceWith(
        {
          postId,
          text: "This is a test comment",
        },
        mockOptions,
      );

      expect(revalidatePath).toHaveBeenCalledExactlyOnceWith(
        "/blogs/[postSlug]",
        "page",
      );
    });

    test("forwards parentId when creating a reply", async () => {
      const formData = new FormData();
      formData.append("text", "This is a reply");

      const postId = "123";
      const parentId = "42";

      vi.mocked(createCommentApi).mockResolvedValue({
        message: "نظر شما با موفقیت ثبت شد.",
      });

      const result = await createComment(prevState, {
        formData,
        postId,
        parentId,
      });

      expect(result).toEqual({
        message: "نظر شما با موفقیت ثبت شد.",
        error: "",
      });

      expect(createCommentApi).toHaveBeenCalledExactlyOnceWith(
        {
          postId,
          parentId,
          text: "This is a reply",
        },
        mockOptions,
      );

      expect(revalidatePath).toHaveBeenCalledExactlyOnceWith(
        "/blogs/[postSlug]",
        "page",
      );
    });
  });

  describe("API errors", () => {
    test("returns the Error message when createCommentApi throws an Error", async () => {
      const formData = new FormData();
      formData.append("text", "This comment will fail");

      vi.mocked(createCommentApi).mockRejectedValue(
        new Error("خطا در ثبت نظر"),
      );

      const result = await createComment(prevState, {
        formData,
        postId: "123",
      });

      expect(result).toEqual({
        message: "",
        error: "خطا در ثبت نظر",
      });

      expect(revalidatePath).not.toHaveBeenCalled();
    });

    test("returns a generic error when createCommentApi throws a non-Error value", async () => {
      const formData = new FormData();
      formData.append("text", "This comment will fail");

      vi.mocked(createCommentApi).mockRejectedValue("unexpected error");

      const result = await createComment(prevState, {
        formData,
        postId: "123",
      });

      expect(result).toEqual({
        message: "",
        error: "خطایی رخ داده است.",
      });

      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });
});
