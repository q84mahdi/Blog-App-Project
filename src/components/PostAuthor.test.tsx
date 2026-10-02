import { render, screen } from "@/test/test-utils";
import { test, expect } from "vitest";
import PostAuthor from "./PostAuthor";

test("renders author name and avatar", () => {
  render(<PostAuthor name="Jane Doe" avatarUrl="/jane.png" />);

  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByAltText("user avatar")).toHaveAttribute(
    "src",
    expect.stringContaining("jane.png"),
  );
});

test("truncates long author names when requested", () => {
  render(<PostAuthor name="Alexander" avatarUrl={undefined} isTruncate />);

  expect(screen.getByText("Alexa...")).toBeInTheDocument();
});
