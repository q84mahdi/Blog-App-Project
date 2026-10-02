import { render, screen } from "@/test/test-utils";
import { test, expect, vi } from "vitest";
import NavLink from "./NavLink";

const { pathname } = vi.hoisted(() => ({ pathname: "/blogs" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

test("links to the path and highlights the current route", () => {
  render(<NavLink path="/blogs">Blogs</NavLink>);

  expect(screen.getByRole("link", { name: "Blogs" })).toHaveAttribute(
    "href",
    "/blogs",
  );
  expect(screen.getByRole("link")).toHaveClass("text-primary-900");
});

test("uses the inactive style for a different route", () => {
  render(<NavLink path="/">Home</NavLink>);

  expect(screen.getByRole("link")).toHaveClass("text-secondary-500");
});
