import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import PostReadingTime from "./PostReadingTime";

test("renders reading time with Persian digits", () => {
  render(<PostReadingTime time={12} />);

  expect(screen.getByText(/خواندن:/)).toHaveTextContent("خواندن: ۱۲ دقیقه");
});
