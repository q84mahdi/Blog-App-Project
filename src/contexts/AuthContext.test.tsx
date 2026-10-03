import { act, renderHook, waitFor } from "@/test/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { server } from "@/mocks/server";
import AuthProvider, { useAuth } from "./AuthContext";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

describe("AuthProvider", () => {
  beforeEach(() => push.mockReset());

  test("loads the current user when the provider mounts", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current).toMatchObject({
      user: { _id: "user-admin", email: "admin@example.com" },
      isAuthenticated: true,
      error: null,
    });
  });

  test("signs in, updates auth state, and redirects to the profile", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      await result.current.signin({
        email: "admin@example.com",
        password: "password",
      });
    });

    expect(result.current).toMatchObject({
      user: { _id: "user-admin" },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
    expect(push).toHaveBeenCalledWith("/profile");
  });

  test("exposes authentication failures and clears the authenticated user", async () => {
    const message = "Sign in is temporarily unavailable";
    server.use(
      http.post("*/user/signin", () =>
        HttpResponse.json({ statusCode: 503, message }, { status: 503 }),
      ),
    );

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      await result.current.signin({
        email: "admin@example.com",
        password: "password",
      });
    });

    expect(result.current).toMatchObject({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: message,
    });
    expect(push).not.toHaveBeenCalled();
  });

  test("throws when useAuth is rendered outside its provider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });
});
