import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Breadcrumbs from "./Breadcrumbs";

test("renders breadcrumb links and marks the active entry", () => {
  render(
    <Breadcrumbs
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/posts", label: "Posts", active: true },
      ]}
    />,
  );

  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByText("Posts").closest("li")).toHaveAttribute(
    "aria-current",
    "true",
  );
});
