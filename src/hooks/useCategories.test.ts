import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getAllCategoriesApi } from "@/services/categoryServices";
import type { Category } from "@/types/categoryTypes";
import type { PaginatedResponse } from "@/types/globalTypes";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";

import { useGetCategories } from "./useCategories";

vi.mock("@/services/categoryServices", () => ({
  getAllCategoriesApi: vi.fn(),
}));

describe("useGetCategories", () => {
  const mockCategories: Category[] = [
    {
      _id: "abc123",
      title: "لپ تاپ",
      englishTitle: "Laptop",
      createdAt: "",
      description: "",
      slug: "",
      updatedAt: "",
    },
    {
      _id: "def456",
      title: "موبایل",
      englishTitle: "Mobile",
      createdAt: "",
      description: "",
      slug: "",
      updatedAt: "",
    },
  ];

  const mockResponse: PaginatedResponse<Category> = {
    data: mockCategories,
    dataCount: 2,
    total: 1,
    page: 1,
    limit: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns transformed categories when the query succeeds", async () => {
    vi.mocked(getAllCategoriesApi).mockResolvedValue(mockResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      ...mockResponse,
      categories: [
        {
          label: "لپ تاپ",
          value: "abc123",
        },
        {
          label: "موبایل",
          value: "def456",
        },
      ],
      transformedCategories: [
        {
          label: "لپ تاپ",
          value: "Laptop",
        },
        {
          label: "موبایل",
          value: "Mobile",
        },
      ],
    });
  });

  test("passes queries to getAllCategoriesApi", async () => {
    const queries = "?page=2&limit=10";

    vi.mocked(getAllCategoriesApi).mockResolvedValue(mockResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(queries), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getAllCategoriesApi).toHaveBeenCalledOnce();
    expect(getAllCategoriesApi).toHaveBeenCalledWith(queries);
  });

  test("uses an empty string when queries are omitted", async () => {
    vi.mocked(getAllCategoriesApi).mockResolvedValue(mockResponse);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getAllCategoriesApi).toHaveBeenCalledOnce();
    expect(getAllCategoriesApi).toHaveBeenCalledWith("");
  });

  test("preserves the original response fields", async () => {
    const response: PaginatedResponse<Category> = {
      ...mockResponse,
      page: 2,
      total: 5,
      dataCount: 50,
    };

    vi.mocked(getAllCategoriesApi).mockResolvedValue(response);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toMatchObject({
      data: mockCategories,
      page: 2,
      total: 5,
      dataCount: 50,
    });
  });

  test("returns empty transformed arrays when there are no categories", async () => {
    const response: PaginatedResponse<Category> = {
      ...mockResponse,
      data: [],
    };

    vi.mocked(getAllCategoriesApi).mockResolvedValue(response);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.data).toEqual([]);
    expect(result.current.data?.categories).toEqual([]);
    expect(result.current.data?.transformedCategories).toEqual([]);
  });

  test("maps title and _id to categories", async () => {
    const categories: Category[] = [
      {
        _id: "abc123",
        title: "لپ تاپ",
        englishTitle: "Laptop",
        createdAt: "",
        description: "",
        slug: "",
        updatedAt: "",
      },
    ];

    vi.mocked(getAllCategoriesApi).mockResolvedValue({
      ...mockResponse,
      data: categories,
    });
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.categories).toEqual([
      {
        label: "لپ تاپ",
        value: "abc123",
      },
    ]);
  });

  test("maps title and englishTitle to transformedCategories", async () => {
    const categories: Category[] = [
      {
        _id: "abc123",
        title: "لپ تاپ",
        englishTitle: "Laptop",
        createdAt: "",
        description: "",
        slug: "",
        updatedAt: "",
      },
    ];

    vi.mocked(getAllCategoriesApi).mockResolvedValue({
      ...mockResponse,
      data: categories,
    });

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.transformedCategories).toEqual([
      {
        label: "لپ تاپ",
        value: "Laptop",
      },
    ]);
  });

  test("enters an error state when the API request fails", async () => {
    const error = new Error("Failed to fetch categories");

    vi.mocked(getAllCategoriesApi).mockRejectedValue(error);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });

  test("uses different cache entries for different queries", async () => {
    const firstQueries = "?page=1";
    const secondQueries = "?page=2";

    vi.mocked(getAllCategoriesApi)
      .mockResolvedValueOnce(mockResponse)
      .mockResolvedValueOnce(mockResponse);

    const queryClient = createTestQueryClient();

    const { result: firstResult } = renderHook(
      () => useGetCategories(firstQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(firstResult.current.isSuccess).toBe(true);
    });

    const { result: secondResult } = renderHook(
      () => useGetCategories(secondQueries),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    await waitFor(() => {
      expect(secondResult.current.isSuccess).toBe(true);
    });

    expect(getAllCategoriesApi).toHaveBeenCalledTimes(2);

    expect(
      queryClient.getQueryData(["categories", firstQueries]),
    ).toBeDefined();

    expect(
      queryClient.getQueryData(["categories", secondQueries]),
    ).toBeDefined();
  });
});
