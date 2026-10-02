import { renderHook, waitFor } from "@/test/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";

import { server } from "@/mocks/server";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";
import { useGetCategories } from "./useCategories";

describe("useGetCategories", () => {
  test("loads handler categories and selects UI option formats", async () => {
    const { result } = renderHook(() => useGetCategories("page=1&limit=2"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [
        { _id: "category-react", title: "ری‌اکت", englishTitle: "React" },
        { _id: "category-next", title: "نکست جی‌اس", englishTitle: "Next.js" },
      ],
      categories: [
        { label: "ری‌اکت", value: "category-react" },
        { label: "نکست جی‌اس", value: "category-next" },
      ],
      transformedCategories: [
        { label: "ری‌اکت", value: "React" },
        { label: "نکست جی‌اس", value: "Next.js" },
      ],
      dataCount: 3,
      total: 2,
      page: 1,
      limit: 2,
    });
  });

  test("passes search and pagination to the handler and preserves metadata", async () => {
    const { result } = renderHook(
      () => useGetCategories("search=design&page=1&limit=5"),
      {
        wrapper: createQueryWrapper(createTestQueryClient()),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "category-design", englishTitle: "Design" }],
      categories: [{ label: "طراحی", value: "category-design" }],
      dataCount: 1,
      total: 1,
      page: 1,
      limit: 5,
    });
  });

  test("returns empty option lists when the search matches no category", async () => {
    const { result } = renderHook(
      () => useGetCategories("search=no-such-category"),
      {
        wrapper: createQueryWrapper(createTestQueryClient()),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [],
      categories: [],
      transformedCategories: [],
      dataCount: 0,
    });
  });

  test("surfaces a server error from the category handler", async () => {
    const errorMessage = "Category service unavailable";

    server.use(
      http.get("*/category/list", () =>
        HttpResponse.json(
          { statusCode: 503, message: errorMessage },
          { status: 503 },
        ),
      ),
    );

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeUndefined();
  });
});
