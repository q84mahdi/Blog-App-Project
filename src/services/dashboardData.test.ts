import { cookies } from "next/headers";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { server } from "@/mocks/server";
import { fetchAdminCardsData, fetchUserCardsData } from "./dashboardData";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));

describe("dashboard card data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue(
      {
        get: (name: string) =>
          name === "accessToken"
            ? { name, value: "access-token" }
            : name === "refreshToken"
              ? { name, value: "refresh-token" }
              : undefined,
      } as never,
    );
  });

  test("aggregates the admin counts from the corresponding API responses", async () => {
    await expect(fetchAdminCardsData()).resolves.toEqual({
      numberOfUsers: 2,
      numberOfComments: 1,
      numberOfPosts: 3,
    });

    expect(cookies).toHaveBeenCalledOnce();
  });

  test("aggregates the current user's bookmarks, comments, and posts", async () => {
    await expect(fetchUserCardsData()).resolves.toEqual({
      numberOfBookmarks: 1,
      numberOfComments: 1,
      numberOfPosts: 1,
    });

    expect(cookies).toHaveBeenCalledOnce();
  });

  test("returns zeroed counts when an admin data request fails", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    server.use(
      http.get("*/post/list", () =>
        HttpResponse.json(
          { statusCode: 503, message: "Post service unavailable" },
          { status: 503 },
        ),
      ),
    );

    await expect(fetchAdminCardsData()).resolves.toEqual({
      numberOfUsers: 0,
      numberOfComments: 0,
      numberOfPosts: 0,
    });

    expect(log).toHaveBeenCalledWith("Post service unavailable");
    log.mockRestore();
  });

  test("returns zeroed counts when current-user data cannot be loaded", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    server.use(
      http.get("*/user/profile", () =>
        HttpResponse.json(
          { statusCode: 503, message: "Profile service unavailable" },
          { status: 503 },
        ),
      ),
    );

    await expect(fetchUserCardsData()).resolves.toEqual({
      numberOfBookmarks: 0,
      numberOfComments: 0,
      numberOfPosts: 0,
    });

    expect(log).toHaveBeenCalledWith("Profile service unavailable");
    log.mockRestore();
  });
});
