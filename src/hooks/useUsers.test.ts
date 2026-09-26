import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";

import { server } from "@/mocks/server";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";
import { useGetUser, useGetUsers } from "./useUsers";

describe("user query hooks", () => {
  test("loads the seeded user list and applies pagination query parameters", async () => {
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGetUsers("page=1&limit=1"), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      data: [{ _id: "user-admin", email: "admin@example.com" }],
      dataCount: 2,
      total: 2,
      page: 1,
      limit: 1,
    });
  });

  test("loads the current profile through the profile endpoint", async () => {
    const { result } = renderHook(() => useGetUser(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.user).toMatchObject({
      _id: "user-admin",
      email: "admin@example.com",
      name: "مدیر وبلاگ",
    });
  });

  test("exposes the API error message for a failed list request", async () => {
    const errorMessage = "Users are temporarily unavailable";

    server.use(
      http.get("*/user/list", () =>
        HttpResponse.json(
          { statusCode: 503, message: errorMessage },
          { status: 503 },
        ),
      ),
    );

    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.data).toBeUndefined();
  });
});
