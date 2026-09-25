import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import ToggleThemeButton from "./ToggleThemeButton";

const { useDarkModeMock } = vi.hoisted(() => ({ useDarkModeMock: vi.fn() }));
vi.mock("@/contexts/DarkModeContext", () => ({ useDarkMode: useDarkModeMock }));

test("renders after mount and invokes theme toggle", async () => {
  const toggleDarkMode = vi.fn();

  useDarkModeMock.mockReturnValue({ isDarkMode: false, toggleDarkMode });

  render(<ToggleThemeButton />);

  const button = await screen.findByRole("button");

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(toggleDarkMode).toHaveBeenCalledOnce();
});
