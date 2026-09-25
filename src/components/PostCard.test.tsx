import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import PostCard from "./PostCard";
import type { Post } from "@/types/postTypes";

vi.mock("./PostInteraction", () => ({
  default: () => <div>Post interactions</div>,
}));

const post = {
  _id: "post-1",
  title: "Testing React",
  slug: "testing-react",
  category: { _id: "cat", slug: "tech", title: "Tech" },
  type: "free",
  briefText: "Brief",
  text: "Text",
  coverImage: "cover.jpg",
  likesCount: 2,
  readingTime: 5,
  tags: [],
  author: {
    _id: "user",
    name: "Alex Morgan",
    avatar: "avatar.jpg",
    avatarUrl: "/alex.jpg",
  },
  related: [],
  comments: [],
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  coverImageUrl: "/cover.jpg",
  commentsCount: 3,
  isLiked: false,
  isBookmarked: false,
} satisfies Post;

test("renders post details and omits interactions for a basic card", () => {
  render(<PostCard post={post} hasInteractions={false} />);

  expect(
    screen.getByRole("heading", { name: "Testing React" }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: "Testing React" })[1],
  ).toHaveAttribute("href", "/blogs/testing-react");
  expect(screen.getByText(/خواندن:/)).toBeInTheDocument();
  expect(screen.queryByText("Post interactions")).not.toBeInTheDocument();
});

test("includes interactions when requested", () => {
  render(<PostCard post={post} hasInteractions />);

  expect(screen.getByText("Post interactions")).toBeInTheDocument();
});
