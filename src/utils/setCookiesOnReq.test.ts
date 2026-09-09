import { describe, expect, test, vi } from "vitest";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import setCookiesOnReq from "./setCookiesOnReq";

describe("setCookiesOnReq", () => {
  const createCookies = (
    values: Record<string, { name: string; value: string } | undefined>,
  ): RequestCookies => {
    return {
      get: vi.fn((name: string) => values[name]),
    } as unknown as RequestCookies;
  };

  describe("when both authentication cookies exist", () => {
    test("returns both cookies in the Cookie header", () => {
      const cookies = createCookies({
        accessToken: {
          name: "accessToken",
          value: "access-token-value",
        },
        refreshToken: {
          name: "refreshToken",
          value: "refresh-token-value",
        },
      });

      expect(setCookiesOnReq(cookies)).toEqual({
        credentials: "include",
        headers: {
          Cookie:
            "accessToken=access-token-value; refreshToken=refresh-token-value",
        },
      });
    });

    test("reads both authentication cookies", () => {
      const cookies = createCookies({
        accessToken: {
          name: "accessToken",
          value: "access-token-value",
        },
        refreshToken: {
          name: "refreshToken",
          value: "refresh-token-value",
        },
      });

      setCookiesOnReq(cookies);

      expect(cookies.get).toHaveBeenCalledTimes(2);
      expect(cookies.get).toHaveBeenNthCalledWith(1, "accessToken");
      expect(cookies.get).toHaveBeenNthCalledWith(2, "refreshToken");
    });
  });

  describe("when only one authentication cookie exists", () => {
    test("includes only the access token", () => {
      const cookies = createCookies({
        accessToken: {
          name: "accessToken",
          value: "access-token-value",
        },
        refreshToken: undefined,
      });

      expect(setCookiesOnReq(cookies)).toEqual({
        credentials: "include",
        headers: {
          Cookie: "accessToken=access-token-value",
        },
      });
    });

    test("includes only the refresh token", () => {
      const cookies = createCookies({
        accessToken: undefined,
        refreshToken: {
          name: "refreshToken",
          value: "refresh-token-value",
        },
      });

      expect(setCookiesOnReq(cookies)).toEqual({
        credentials: "include",
        headers: {
          Cookie: "refreshToken=refresh-token-value",
        },
      });
    });
  });

  describe("when authentication cookies do not exist", () => {
    test("returns an empty Cookie header", () => {
      const cookies = createCookies({
        accessToken: undefined,
        refreshToken: undefined,
      });

      expect(setCookiesOnReq(cookies)).toEqual({
        credentials: "include",
        headers: {
          Cookie: "",
        },
      });
    });
  });

  describe("cookie values", () => {
    test("preserves special characters in cookie values", () => {
      const cookies = createCookies({
        accessToken: {
          name: "accessToken",
          value: "abc.def-123_xyz",
        },
        refreshToken: {
          name: "refreshToken",
          value: "refresh-token.456",
        },
      });

      expect(setCookiesOnReq(cookies).headers).toEqual({
        Cookie: "accessToken=abc.def-123_xyz; refreshToken=refresh-token.456",
      });
    });

    test("preserves empty cookie values", () => {
      const cookies = createCookies({
        accessToken: {
          name: "accessToken",
          value: "",
        },
        refreshToken: {
          name: "refreshToken",
          value: "",
        },
      });

      expect(setCookiesOnReq(cookies).headers).toEqual({
        Cookie: "accessToken=; refreshToken=",
      });
    });
  });

  test("always uses include credentials", () => {
    const cookies = createCookies({
      accessToken: undefined,
      refreshToken: undefined,
    });

    expect(setCookiesOnReq(cookies).credentials).toBe("include");
  });
});
