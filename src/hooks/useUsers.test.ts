import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getAllUsersApi, getUserApi } from "@/services/authServices";
import { User } from "@/types/authTypes";
import type { PaginatedResponse } from "@/types/globalTypes";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";

import { useGetUser, useGetUsers } from "./useUsers";

vi.mock("@/services/authServices", () => ({
  getUserApi: vi.fn(),
  getAllUsersApi: vi.fn(),
}));

describe("useGetUsers", () => {
  const mockUsersResponse: PaginatedResponse<User> = {
    data: [],
    dataCount: 0,
    total: 0,
    page: 0,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns users when the API request succeeds", async () => {
    vi.mocked(getAllUsersApi).mockResolvedValue(mockUsersResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUsersResponse);
    expect(getAllUsersApi).toHaveBeenCalledOnce();
    expect(getAllUsersApi).toHaveBeenCalledWith("");
  });

  test("passes queries to getAllUsersApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getAllUsersApi).mockResolvedValue(mockUsersResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUsers(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getAllUsersApi).toHaveBeenCalledOnce();
    expect(getAllUsersApi).toHaveBeenCalledWith(queries);
  });

  test("enters an error state when getAllUsersApi fails", async () => {
    const error = new Error("Failed to fetch posts");

    vi.mocked(getAllUsersApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetUser", () => {
  const mockUserResponse: { user: User } = {
    user: {
      _id: "123",
      avatar: null,
      avatarUrl: null,
      bookmarkedPosts: [],
      createdAt: "",
      email: "test@gmail.com",
      likedPosts: [],
      name: "test",
      updatedAt: "",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns user when the API request succeeds", async () => {
    vi.mocked(getUserApi).mockResolvedValue(mockUserResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUser(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUserResponse);
    expect(getUserApi).toHaveBeenCalledOnce();
  });

  test("enters an error state when getUserApi fails", async () => {
    const error = new Error("Failed to fetch posts");

    vi.mocked(getUserApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUser(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
