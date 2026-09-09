import { beforeEach, describe, expect, test, vi } from "vitest";
import { NextRequest } from "next/server";
import type { User } from "@/types/authTypes";
import setCookiesOnReq from "./setCookiesOnReq";
import middlewareAuth from "./middlewareAuth";

vi.mock("./setCookiesOnReq", () => ({
  default: vi.fn(),
}));

describe("middlewareAuth", () => {
  const baseUrl = "https://example.com";
  const profileUrl = `${baseUrl}/user/profile`;

  const mockUser: User = {
    name: "John Doe",
    email: "john@example.com",
    bookmarkedPosts: [],
    likedPosts: [],
    avatar: null,
    _id: "user-123",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    avatarUrl: null,
  };

  const mockOptions: RequestInit = {
    credentials: "include",
    headers: {
      Cookie: "accessToken=access-token; refreshToken=refresh-token",
    },
  };

  let req: NextRequest;

  beforeEach(() => {
    vi.clearAllMocks();

    process.env.NEXT_PUBLIC_BASE_URL = baseUrl;

    req = new NextRequest("http://localhost");

    vi.mocked(setCookiesOnReq).mockReturnValue(mockOptions);
  });

  describe("when the profile request succeeds", () => {
    test("returns the authenticated user", async () => {
      const response = new Response(
        JSON.stringify({
          data: {
            user: mockUser,
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(response);

      const result = await middlewareAuth(req);

      expect(result).toEqual(mockUser);
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock).toHaveBeenCalledWith(profileUrl, mockOptions);
    });

    test("passes request cookies to setCookiesOnReq", async () => {
      const response = new Response(
        JSON.stringify({
          data: {
            user: mockUser,
          },
        }),
      );

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await middlewareAuth(req);

      expect(setCookiesOnReq).toHaveBeenCalledOnce();
      expect(setCookiesOnReq).toHaveBeenCalledWith(req.cookies);
    });
  });

  describe("when the profile request fails", () => {
    test("returns null for a non-successful response", async () => {
      const response = new Response(null, {
        status: 401,
      });

      const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(response);

      const result = await middlewareAuth(req);

      expect(result).toBeNull();
      expect(fetchMock).toHaveBeenCalledOnce();
    });

    test.for([400, 401, 403, 404, 500, 502, 503])(
      "returns null for HTTP status %i",
      async (status) => {
        vi.spyOn(global, "fetch").mockResolvedValue(
          new Response(null, { status }),
        );

        await expect(middlewareAuth(req)).resolves.toBeNull();
      },
    );
  });

  describe("when the response does not contain a user", () => {
    test("returns null when data is missing", async () => {
      const response = new Response(JSON.stringify({}), {
        status: 200,
      });

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(middlewareAuth(req)).resolves.toBeNull();
    });

    test("returns null when user is missing", async () => {
      const response = new Response(
        JSON.stringify({
          data: {},
        }),
        {
          status: 200,
        },
      );

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(middlewareAuth(req)).resolves.toBeNull();
    });

    test("returns null when data is null", async () => {
      const response = new Response(
        JSON.stringify({
          data: null,
        }),
        {
          status: 200,
        },
      );

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(middlewareAuth(req)).resolves.toBeNull();
    });

    test("returns null when the response body is null", async () => {
      const response = new Response("null", {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(middlewareAuth(req)).resolves.toBeNull();
    });
  });

  describe("when fetching the profile", () => {
    test("uses the configured base URL", async () => {
      const response = new Response(
        JSON.stringify({
          data: {
            user: mockUser,
          },
        }),
      );

      const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(response);

      await middlewareAuth(req);

      expect(fetchMock).toHaveBeenCalledWith(
        "https://example.com/user/profile",
        mockOptions,
      );
    });

    test("uses the options returned by setCookiesOnReq", async () => {
      const customOptions: RequestInit = {
        credentials: "include",
        headers: {
          Cookie: "custom-cookie=value",
        },
      };

      vi.mocked(setCookiesOnReq).mockReturnValue(customOptions);

      const response = new Response(
        JSON.stringify({
          data: {
            user: mockUser,
          },
        }),
      );

      const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(response);

      await middlewareAuth(req);

      expect(fetchMock).toHaveBeenCalledWith(profileUrl, customOptions);
    });
  });

  describe("when fetch rejects", () => {
    test("propagates the fetch error", async () => {
      const error = new Error("Network request failed");

      vi.spyOn(global, "fetch").mockRejectedValue(error);

      await expect(middlewareAuth(req)).rejects.toBe(error);
    });
  });

  describe("when parsing the response fails", () => {
    test("propagates the JSON parsing error", async () => {
      const response = new Response("invalid-json", {
        status: 200,
      });

      vi.spyOn(global, "fetch").mockResolvedValue(response);

      await expect(middlewareAuth(req)).rejects.toThrow();
    });
  });
});
