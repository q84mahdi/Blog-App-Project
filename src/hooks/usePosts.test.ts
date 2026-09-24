import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getUserPostsApi } from "@/services/authServices";
import { getAllPostsApi, getPostByIdApi } from "@/services/postServices";
import type { PaginatedResponse } from "@/types/globalTypes";
import type { Post } from "@/types/postTypes";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";

import { useGetPostById, useGetPosts, useGetUserPosts } from "./usePosts";

vi.mock("@/services/authServices", () => ({
  getUserPostsApi: vi.fn(),
}));

vi.mock("@/services/postServices", () => ({
  getAllPostsApi: vi.fn(),
  getPostByIdApi: vi.fn(),
}));

describe("useGetPosts", () => {
  const mockPostsResponse: PaginatedResponse<Post> = {
    data: [],
    dataCount: 0,
    total: 0,
    page: 0,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns posts when the API request succeeds", async () => {
    vi.mocked(getAllPostsApi).mockResolvedValue(mockPostsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPosts(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPostsResponse);
    expect(getAllPostsApi).toHaveBeenCalledOnce();
    expect(getAllPostsApi).toHaveBeenCalledWith("");
  });

  test("passes queries to getAllPostsApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getAllPostsApi).mockResolvedValue(mockPostsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPosts(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getAllPostsApi).toHaveBeenCalledOnce();
    expect(getAllPostsApi).toHaveBeenCalledWith(queries);
  });

  test("enters an error state when getAllPostsApi fails", async () => {
    const error = new Error("Failed to fetch posts");

    vi.mocked(getAllPostsApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPosts(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetUserPosts", () => {
  const mockUserPostsResponse: PaginatedResponse<Post> = {
    data: [],
    dataCount: 0,
    total: 0,
    page: 0,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns user posts when the API request succeeds", async () => {
    vi.mocked(getUserPostsApi).mockResolvedValue(mockUserPostsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserPosts(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUserPostsResponse);
    expect(getUserPostsApi).toHaveBeenCalledOnce();
    expect(getUserPostsApi).toHaveBeenCalledWith("");
  });

  test("passes queries to getUserPostsApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getUserPostsApi).mockResolvedValue(mockUserPostsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserPosts(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getUserPostsApi).toHaveBeenCalledOnce();
    expect(getUserPostsApi).toHaveBeenCalledWith(queries);
  });

  test("enters an error state when getUserPostsApi fails", async () => {
    const error = new Error("Failed to fetch user posts");

    vi.mocked(getUserPostsApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserPosts(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetPostById", () => {
  const mockPost = {
    _id: "post-123",
  } as Post;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns the post when the API request succeeds", async () => {
    vi.mocked(getPostByIdApi).mockResolvedValue(mockPost);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPostById("post-123"), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPost);
    expect(getPostByIdApi).toHaveBeenCalledOnce();
    expect(getPostByIdApi).toHaveBeenCalledWith("post-123");
  });

  test("passes the postId to getPostByIdApi", async () => {
    const postId = "post-456";

    vi.mocked(getPostByIdApi).mockResolvedValue(mockPost);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPostById(postId), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getPostByIdApi).toHaveBeenCalledOnce();
    expect(getPostByIdApi).toHaveBeenCalledWith(postId);
  });

  test("enters an error state when getPostByIdApi fails", async () => {
    const error = new Error("Failed to fetch post");

    vi.mocked(getPostByIdApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetPostById("post-123"), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
