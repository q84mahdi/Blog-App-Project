import { render, screen } from "@/test/test-utils";
import { test, expect } from "vitest";
import CardsWrapper from "./CardsWrapper";

test("renders card titles, icons, and Persian-formatted values", async () => {
  const ui = await CardsWrapper({
    cards: [
      { title: "Posts", value: 123, icon: <span aria-hidden="true">★</span> },
      { title: "Members", value: "4", icon: <span aria-hidden="true">●</span> },
    ],
  });

  render(ui);

  expect(screen.getByRole("heading", { name: "Posts" })).toBeInTheDocument();
  expect(screen.getByText("۱۲۳")).toBeInTheDocument();
  expect(screen.getByText("۴")).toBeInTheDocument();
});
