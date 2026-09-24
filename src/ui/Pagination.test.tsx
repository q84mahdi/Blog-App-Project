import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import Pagination from "./Pagination";

const { pathname, params } = vi.hoisted(() => ({
  pathname: "/posts",
  params: "page=3&limit=12&search=react",
}));
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useSearchParams: () => new URLSearchParams(params),
}));

afterEach(cleanup);

test("preserves filters and page size in page links and highlights current page", () => {
  render(<Pagination totalPages={7} />);

  expect(screen.getByText("3")).toHaveClass("bg-primary-900");
  expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
    "href",
    "/posts?page=2&limit=12&search=react",
  );
  expect(screen.getByRole("link", { name: "4" })).toHaveAttribute(
    "href",
    "/posts?page=4&limit=12&search=react",
  );
});

test("disables the next arrow on the last page", () => {
  render(<Pagination totalPages={3} />);

  expect(screen.getAllByTestId("disabled-arrow")).toHaveLength(1);
});
