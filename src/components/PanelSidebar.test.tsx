import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import PanelSidebar from "./PanelSidebar";

const { pathname, useAuthMock } = vi.hoisted(() => ({
  pathname: "/admin",
  useAuthMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: useAuthMock }));

test("renders navigation, marks the current page, and closes when a link is selected", () => {
  const onClose = vi.fn();

  useAuthMock.mockReturnValue({ isLoading: false, logout: vi.fn() });

  render(
    <PanelSidebar
      onClose={onClose}
      sidebarNavs={[
        { title: "Dashboard", href: "/admin", icon: <span /> },
        { title: "Posts", href: "/posts", icon: <span /> },
      ]}
    />,
  );

  expect(screen.getByRole("link", { name: "Dashboard" })).toHaveClass(
    "!bg-primary-100",
  );

  fireEvent.click(screen.getByRole("link", { name: "Posts" }));
  expect(onClose).toHaveBeenCalledOnce();
});

test("confirms logout before invoking the logout action", async () => {
  const logout = vi.fn();
  const onClose = vi.fn();

  useAuthMock.mockReturnValue({ isLoading: false, logout });

  render(
    <PanelSidebar
      onClose={onClose}
      sidebarNavs={[{ title: "Dashboard", href: "/admin", icon: <span /> }]}
    />,
  );

  fireEvent.click(screen.getByRole("button", { name: "خروج" }));
  expect(
    await screen.findByText("آیا از خروج از حساب کاربری خود اطمینان دارید؟"),
  ).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole("button", { name: "خروج" }).at(-1)!);
  expect(logout).toHaveBeenCalledOnce();
});
