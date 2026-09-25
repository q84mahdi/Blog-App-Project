import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import PostInteraction from "./PostInteraction";
import type { Post } from "@/types/postTypes";

const {
  likeMock,
  bookmarkMock,
  refreshMock,
  invalidateMock,
  successMock,
  errorMock,
} = vi.hoisted(() => ({
  likeMock: vi.fn(),
  bookmarkMock: vi.fn(),
  refreshMock: vi.fn(),
  invalidateMock: vi.fn(),
  successMock: vi.fn(),
  errorMock: vi.fn(),
}));
vi.mock("@/services/postServices", () => ({
  likePostApi: likeMock,
  bookmarkPostApi: bookmarkMock,
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: invalidateMock }),
}));
vi.mock("react-hot-toast", () => ({
  default: { success: successMock, error: errorMock },
}));

const post = {
  _id: "post-1",
  title: "Post",
  slug: "post",
  category: { _id: "cat", slug: "tech", title: "Tech" },
  type: "free",
  briefText: "",
  text: "",
  coverImage: "",
  likesCount: 12,
  readingTime: 3,
  tags: [],
  author: { _id: "user", name: "Alex", avatar: "", avatarUrl: "" },
  related: [],
  comments: [],
  createdAt: "",
  updatedAt: "",
  coverImageUrl: "",
  commentsCount: 4,
  isLiked: false,
  isBookmarked: false,
} satisfies Post;

test("likes a post and refreshes and invalidates its queries", async () => {
  likeMock.mockResolvedValue({ message: "Liked" });

  render(<PostInteraction post={post} />);

  fireEvent.click(screen.getByRole("button", { name: "پسندیدن" }));

  await waitFor(() => expect(likeMock).toHaveBeenCalledWith("post-1"));

  expect(successMock).toHaveBeenCalledWith("Liked");
  expect(refreshMock).toHaveBeenCalledOnce();
  expect(invalidateMock).toHaveBeenCalledWith({ queryKey: ["posts"] });
  expect(invalidateMock).toHaveBeenCalledWith({ queryKey: ["post", "post-1"] });
});

test("shows bookmark success and reports API errors", async () => {
  bookmarkMock.mockResolvedValueOnce({ message: "Saved" });

  render(<PostInteraction post={post} />);

  fireEvent.click(screen.getByRole("button", { name: "افزودن نشانک" }));

  await waitFor(() => expect(bookmarkMock).toHaveBeenCalledWith("post-1"));

  expect(successMock).toHaveBeenCalledWith("Saved");

  likeMock.mockRejectedValueOnce(new Error("Offline"));

  fireEvent.click(screen.getByRole("button", { name: "پسندیدن" }));

  await waitFor(() => expect(errorMock).toHaveBeenCalledWith("Offline"));
});
