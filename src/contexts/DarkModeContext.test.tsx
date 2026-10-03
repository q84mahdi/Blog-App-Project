import { act, renderHook } from "@/test/test-utils";
import { beforeEach, describe, expect, test } from "vitest";

import { DarkModeProvider, useDarkMode } from "./DarkModeContext";

describe("DarkModeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark-mode", "light-mode");
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false }),
    });
  });

  test("uses the saved preference and applies it to the document", () => {
    localStorage.setItem("isDarkMode", "true");

    const { result } = renderHook(() => useDarkMode(), {
      wrapper: DarkModeProvider,
    });

    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement).toHaveClass("dark-mode");
    expect(document.documentElement).not.toHaveClass("light-mode");
  });

  test("uses the system preference when no saved preference exists", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true }),
    });

    const { result } = renderHook(() => useDarkMode(), {
      wrapper: DarkModeProvider,
    });

    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement).toHaveClass("dark-mode");
  });

  test("persists a toggle and updates the document theme", () => {
    const { result } = renderHook(() => useDarkMode(), {
      wrapper: DarkModeProvider,
    });

    act(() => result.current.toggleDarkMode());

    expect(result.current.isDarkMode).toBe(true);
    expect(localStorage.getItem("isDarkMode")).toBe("true");
    expect(document.documentElement).toHaveClass("dark-mode");

    act(() => result.current.toggleDarkMode());

    expect(result.current.isDarkMode).toBe(false);
    expect(localStorage.getItem("isDarkMode")).toBe("false");
    expect(document.documentElement).toHaveClass("light-mode");
    expect(document.documentElement).not.toHaveClass("dark-mode");
  });

  test("throws when useDarkMode is rendered outside its provider", () => {
    expect(() => renderHook(() => useDarkMode())).toThrow(
      "DarkModeContext was used outside of DarkModeProvider",
    );
  });
});
