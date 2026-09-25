import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import CoverImage from "./CoverImage";

test("links the cover image to its blog and uses the title as alt text", () => {
  render(
    <CoverImage title="My post" coverImageUrl="/cover.jpg" slug="my-post" />,
  );

  expect(screen.getByRole("link")).toHaveAttribute("href", "/blogs/my-post");
  expect(screen.getByAltText("My post")).toBeInTheDocument();
});
