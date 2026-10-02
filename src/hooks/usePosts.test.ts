import { renderHook, waitFor } from "@/test/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";

import { server } from "@/mocks/server";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";
import { useGetPostById, useGetPosts, useGetUserPosts } from "./usePosts";

describe("post query hooks", () => {
  test("loads seeded posts with server-side search and pagination", async () => {
    const { result } = renderHook(
      () => useGetPosts("search=React&page=1&limit=1"),
      {
        wrapper: createQueryWrapper(createTestQueryClient()),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "post-react", slug: "getting-started-react" }],
      dataCount: 1,
      total: 1,
      page: 1,
      limit: 1,
    });
  });

  test("loads a post by id with its visible comments and related posts", async () => {
    const { result } = renderHook(() => useGetPostById("post-react"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      _id: "post-react",
      commentsCount: 1,
      comments: [{ _id: "comment-react", status: 1 }],
    });
  });

  test("loads only current-user posts", async () => {
    const { result } = renderHook(() => useGetUserPosts("page=1&limit=1"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "post-next" }],
      dataCount: 1,
      page: 1,
      limit: 1,
    });
  });

  test("surfaces a not-found response from the post endpoint", async () => {
    const { result } = renderHook(() => useGetPostById("missing-post"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error("پست مورد نظر پیدا نشد"));
    expect(result.current.data).toBeUndefined();
  });

  test("surfaces server failures for the post list", async () => {
    const errorMessage = "Post service unavailable";

    server.use(
      http.get("*/post/list", () =>
        HttpResponse.json(
          { statusCode: 503, message: errorMessage },
          { status: 503 },
        ),
      ),
    );

    const { result } = renderHook(() => useGetPosts(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeUndefined();
  });
});
