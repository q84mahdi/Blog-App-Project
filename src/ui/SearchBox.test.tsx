import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import SearchBox from "./SearchBox";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/posts",
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("page=3&tag=tech"),
}));

test("preserves existing params when setting or removing search", () => {
  render(<SearchBox />);

  const input = screen.getByPlaceholderText(/جستجو/i);

  Object.defineProperty(input.closest("form"), "search", {
    configurable: true,
    value: input,
  });

  fireEvent.change(input, { target: { value: "react" } });
  fireEvent.submit(input.closest("form")!);
  expect(pushMock).toHaveBeenLastCalledWith(
    "/posts?page=3&tag=tech&search=react",
    { scroll: false },
  );

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.submit(input.closest("form")!);
  expect(pushMock).toHaveBeenLastCalledWith("/posts?page=3&tag=tech", {
    scroll: false,
  });
});
