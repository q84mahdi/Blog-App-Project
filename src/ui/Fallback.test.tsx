import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Fallback from "./Fallback";

test("shows loading text and the SVG loader", () => {
  render(<Fallback />);

  expect(screen.getByText("در حال بارگذاری اطلاعات")).toBeInTheDocument();
  expect(screen.getByLabelText("loading")).toBeInTheDocument();
});
