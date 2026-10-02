import { renderHook, waitFor } from "@/test/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";

import { server } from "@/mocks/server";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";
import { useGetComments, useGetUserComments } from "./useComments";

describe("comment query hooks", () => {
  test("returns only public comments with the handler's comment count", async () => {
    const { result } = renderHook(() => useGetComments("page=1&limit=1"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "comment-react", status: 1 }],
      commentsCount: 1,
      dataCount: 1,
      total: 1,
      page: 1,
      limit: 1,
    });
  });

  test("returns the signed-in user's comments from the user-comments endpoint", async () => {
    const { result } = renderHook(() => useGetUserComments("page=1&limit=5"), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "comment-react", user: { _id: "user-admin" } }],
      dataCount: 1,
      page: 1,
      limit: 5,
    });
  });

  test("reports the server error returned by the comments endpoint", async () => {
    const errorMessage = "Comments are temporarily unavailable";

    server.use(
      http.get("*/comment/list", () =>
        HttpResponse.json(
          { statusCode: 503, message: errorMessage },
          { status: 503 },
        ),
      ),
    );

    const { result } = renderHook(() => useGetComments(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeUndefined();
  });
});
