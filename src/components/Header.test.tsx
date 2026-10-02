import { render, screen } from "@/test/test-utils";
import { test, expect, vi } from "vitest";
import Header from "./Header";

const { useAuthMock } = vi.hoisted(() => ({ useAuthMock: vi.fn() }));

vi.mock("@/contexts/AuthContext", () => ({ useAuth: useAuthMock }));

vi.mock("./ToggleThemeButton", () => ({
  default: () => <button>Theme</button>,
}));

vi.mock("./NavLink", () => ({
  default: ({
    path,
    children,
  }: {
    path: string;
    children: React.ReactNode;
  }) => <a href={path}>{children}</a>,
}));

test("shows unauthenticated destinations", () => {
  useAuthMock.mockReturnValue({ isAuthenticated: false, isLoading: false });

  render(<Header />);

  expect(screen.getByRole("link", { name: /خانه/ })).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByRole("link", { name: /بلاگ ها/ })).toHaveAttribute(
    "href",
    "/blogs",
  );
  expect(
    screen
      .getAllByRole("link", { name: "" })
      .some((link) => link.getAttribute("href") === "/signin"),
  ).toBe(true);
});

test("shows admin and profile destinations for authenticated users", () => {
  useAuthMock.mockReturnValue({ isAuthenticated: true, isLoading: false });

  render(<Header />);

  expect(
    screen
      .getAllByRole("link", { name: "" })
      .map((link) => link.getAttribute("href")),
  ).toContain("/admin");
  expect(
    screen
      .getAllByRole("link", { name: "" })
      .map((link) => link.getAttribute("href")),
  ).toContain("/profile");
});
