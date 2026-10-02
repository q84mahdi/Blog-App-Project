import { cleanup, fireEvent, render, screen } from "@/test/test-utils";
import { afterEach, test, expect, vi } from "vitest";
import SortButton from "./SortButton";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/posts",
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("page=3&tag=tech"),
}));

test("updates order, preserves existing params, and closes the menu", () => {
  render(<SortButton />);

  fireEvent.click(screen.getByRole("button", { name: "sort-button" }));
  fireEvent.click(screen.getByRole("button", { name: /قدیمی‌ترین/ }));

  expect(pushMock).toHaveBeenCalledWith("/posts?page=3&tag=tech&order=asc", {
    scroll: false,
  });
  expect(screen.getByLabelText("options")).toHaveClass("hidden");
});
