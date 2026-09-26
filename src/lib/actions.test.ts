import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createComment } from "./actions";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

describe("createComment", () => {
  const cookieStore = {
    get: vi.fn((name: string) =>
      name === "accessToken" ? { name, value: "access-token" } : undefined,
    ),
  };
  const prevState = { message: "", error: "" };

  beforeEach(() => {
    vi.clearAllMocks();

    cookieStore.get.mockImplementation((name: string) =>
      name === "accessToken" ? { name, value: "access-token" } : undefined,
    );

    vi.mocked(cookies).mockResolvedValue(cookieStore as never);
  });

  test.for([undefined, "", "   "])(
    "rejects missing or blank comment text (%s)",
    async (text) => {
      const formData = new FormData();
      if (text !== undefined) formData.set("text", text);

      const result = createComment(prevState, {
        formData,
        postId: "post-react",
      });

      await expect(result).resolves.toEqual({
        message: "",
        error: "متن نظر الزامی است.",
      });
      expect(revalidatePath).not.toHaveBeenCalled();
    },
  );

  test("creates a comment through the handler and revalidates the blog page", async () => {
    const formData = new FormData();
    formData.set("text", "  Production-like comment  ");

    const result = createComment(prevState, {
      formData,
      postId: "post-react",
    });

    await expect(result).resolves.toEqual({
      message: "نظر شما پس از بررسی نمایش داده می‌شود",
      error: "",
    });

    expect(cookies).toHaveBeenCalledOnce();
    expect(cookieStore.get).toHaveBeenCalledWith("accessToken");
    expect(revalidatePath).toHaveBeenCalledExactlyOnceWith(
      "/blogs/[postSlug]",
      "page",
    );
  });

  test("returns the handler's validation error for an unknown post", async () => {
    const formData = new FormData();
    formData.set("text", "This post does not exist");

    const result = createComment(prevState, {
      formData,
      postId: "missing-post",
    });

    await expect(result).resolves.toEqual({
      message: "",
      error: "پست و متن نظر الزامی است",
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
