import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Empty from "./Empty";

test("shows the empty message using the resource name", () => {
  render(<Empty resourceName="posts" />);

  expect(screen.getByText(/هیچ posts یافت نشد/)).toBeInTheDocument();
});
