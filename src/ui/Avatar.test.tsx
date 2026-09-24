import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Avatar from "./Avatar";

test("renders fallback or supplied image source at the requested size", () => {
  const { rerender } = render(<Avatar size={40} />);

  expect(screen.getByAltText("user avatar")).toHaveAttribute("width", "40");
  expect(screen.getByAltText("user avatar")).toHaveAttribute(
    "src",
    expect.stringContaining("avatar.png"),
  );

  rerender(<Avatar src="/custom.png" />);

  expect(screen.getByAltText("user avatar")).toHaveAttribute(
    "src",
    expect.stringContaining("custom.png"),
  );
});
