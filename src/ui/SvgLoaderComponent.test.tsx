import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import SvgLoaderComponent from "./SvgLoaderComponent";

test("forwards SVG attributes", () => {
  render(<SvgLoaderComponent aria-label="loading" />);

  expect(screen.getByLabelText("loading")).toHaveAttribute("width", "24");
});
