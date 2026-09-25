import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Footer from "./Footer";

test("renders main navigation, category, panel, and social links", () => {
  render(<Footer />);

  expect(screen.getByRole("link", { name: "صفحه اصلی" })).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByRole("link", { name: "بلاگ‌ها" })).toHaveAttribute(
    "href",
    "/blogs",
  );
  expect(screen.getByRole("link", { name: "تکنولوژی" })).toHaveAttribute(
    "href",
    "/blogs/category/technolagy",
  );
  expect(screen.getByRole("link", { name: "پنل ادمین" })).toHaveAttribute(
    "href",
    "/admin",
  );
  expect(screen.getByRole("link", { name: "گیت‌هاب" })).toHaveAttribute(
    "target",
    "_blank",
  );
});
