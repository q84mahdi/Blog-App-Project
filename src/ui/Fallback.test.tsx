import { render, screen } from "@/test/test-utils";
import { test, expect } from "vitest";
import Fallback from "./Fallback";

test("shows loading text and the SVG loader", () => {
  render(<Fallback />);

  expect(screen.getByText("در حال بارگذاری اطلاعات")).toBeInTheDocument();
  expect(screen.getByLabelText("loading")).toBeInTheDocument();
});
