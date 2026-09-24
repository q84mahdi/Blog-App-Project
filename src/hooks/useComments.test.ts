import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getUserCommentsApi } from "@/services/authServices";
import { getAllCommentsApi } from "@/services/commentServices";
import type { Comment, GetAllCommentsResponse } from "@/types/commentTypes";
import type { PaginatedResponse } from "@/types/globalTypes";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";

import { useGetComments, useGetUserComments } from "./useComments";

vi.mock("@/services/commentServices", () => ({
  getAllCommentsApi: vi.fn(),
}));

vi.mock("@/services/authServices", () => ({
  getUserCommentsApi: vi.fn(),
}));

describe("useGetComments", () => {
  const mockCommentsResponse: GetAllCommentsResponse = {
    data: [],
    commentsCount: 0,
    dataCount: 0,
    total: 0,
    page: 0,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns comments when the API request succeeds", async () => {
    vi.mocked(getAllCommentsApi).mockResolvedValue(mockCommentsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetComments(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCommentsResponse);
    expect(getAllCommentsApi).toHaveBeenCalledOnce();
    expect(getAllCommentsApi).toHaveBeenCalledWith("");
  });

  test("passes queries to getAllCommentsApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getAllCommentsApi).mockResolvedValue(mockCommentsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetComments(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getAllCommentsApi).toHaveBeenCalledOnce();
    expect(getAllCommentsApi).toHaveBeenCalledWith(queries);
  });

  test("enters an error state when getAllCommentsApi fails", async () => {
    const error = new Error("Failed to fetch comments");

    vi.mocked(getAllCommentsApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetComments(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });

  test("uses different query results for different query parameters", async () => {
    const firstQueries = "?page=1";
    const secondQueries = "?page=2";

    const firstResponse: GetAllCommentsResponse = {
      data: [],
      commentsCount: 0,
      dataCount: 40,
      total: 5,
      page: 1,
      limit: 10,
    };

    const secondResponse: GetAllCommentsResponse = {
      data: [],
      commentsCount: 0,
      dataCount: 40,
      total: 5,
      page: 2,
      limit: 10,
    };

    vi.mocked(getAllCommentsApi)
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(secondResponse);

    const queryClient = createTestQueryClient();

    const { result: firstResult } = renderHook(
      () => useGetComments(firstQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(firstResult.current.isSuccess).toBe(true);
    });

    const { result: secondResult } = renderHook(
      () => useGetComments(secondQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(secondResult.current.isSuccess).toBe(true);
    });

    expect(getAllCommentsApi).toHaveBeenCalledTimes(2);

    expect(firstResult.current.data).toEqual(firstResponse);
    expect(secondResult.current.data).toEqual(secondResponse);
  });
});

describe("useGetUserComments", () => {
  const mockUserCommentsResponse: PaginatedResponse<Comment> = {
    data: [],
    dataCount: 0,
    total: 0,
    page: 0,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns user comments when the API request succeeds", async () => {
    vi.mocked(getUserCommentsApi).mockResolvedValue(mockUserCommentsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserComments(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUserCommentsResponse);
    expect(getUserCommentsApi).toHaveBeenCalledOnce();
    expect(getUserCommentsApi).toHaveBeenCalledWith("");
  });

  test("passes queries to getUserCommentsApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getUserCommentsApi).mockResolvedValue(mockUserCommentsResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserComments(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getUserCommentsApi).toHaveBeenCalledOnce();
    expect(getUserCommentsApi).toHaveBeenCalledWith(queries);
  });

  test("enters an error state when getUserCommentsApi fails", async () => {
    const error = new Error("Failed to fetch user comments");

    vi.mocked(getUserCommentsApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUserComments(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });

  test("uses different query results for different query parameters", async () => {
    const firstQueries = "?page=1";
    const secondQueries = "?page=2";

    const firstResponse: PaginatedResponse<Comment> = {
      data: [],
      dataCount: 40,
      total: 5,
      page: 1,
      limit: 10,
    };

    const secondResponse: PaginatedResponse<Comment> = {
      data: [],
      dataCount: 40,
      total: 5,
      page: 2,
      limit: 10,
    };

    vi.mocked(getUserCommentsApi)
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(secondResponse);

    const queryClient = createTestQueryClient();

    const { result: firstResult } = renderHook(
      () => useGetUserComments(firstQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(firstResult.current.isSuccess).toBe(true);
    });

    const { result: secondResult } = renderHook(
      () => useGetUserComments(secondQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(secondResult.current.isSuccess).toBe(true);
    });

    expect(getUserCommentsApi).toHaveBeenCalledTimes(2);

    expect(firstResult.current.data).toEqual(firstResponse);
    expect(secondResult.current.data).toEqual(secondResponse);
  });
});
