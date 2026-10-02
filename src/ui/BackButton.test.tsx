import { fireEvent, render, screen } from "@/test/test-utils";
import { test, expect, vi } from "vitest";
import BackButton from "./BackButton";

const { backMock } = vi.hoisted(() => ({ backMock: vi.fn() }));
vi.mock("@/hooks/useMoveBack", () => ({ default: () => backMock }));

test("calls the back navigation action", () => {
  render(<BackButton />);

  fireEvent.click(screen.getByRole("button", { name: "بازگشت" }));
  
  expect(backMock).toHaveBeenCalledOnce();
});
