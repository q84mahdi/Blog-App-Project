import { describe, expect, test } from "vitest";
import truncateText from "./truncateText";

describe("truncateText", () => {
  describe("when length is greater than or equal to the string length", () => {
    test.for([
      ["Hello", 5, "Hello"],
      ["Hello", 6, "Hello"],
      ["Hello", 10, "Hello"],
      ["Short text", 50, "Short text"],
      ["", 0, ""],
      ["", 5, ""],
    ] as const)("returns the original string", ([input, length, expected]) => {
      expect(truncateText(input, length)).toBe(expected);
    });
  });

  describe("when length is less than the string length", () => {
    test.for([
      ["Hello World", 0, "..."],
      ["Hello World", 1, "H..."],
      ["Hello World", 2, "He..."],
      ["Hello World", 3, "Hel..."],
      ["Hello World", 5, "Hello..."],
      ["Hello World", 10, "Hello Worl..."],
    ] as const)(
      "truncates the string to the requested length",
      ([input, length, expected]) => {
        expect(truncateText(input, length)).toBe(expected);
      },
    );
  });

  describe("invalid length", () => {
    test.for([-1, -2, -10, -Infinity, 1.5, 2.75, NaN, Infinity])(
      "throws a RangeError for %s",
      (length) => {
        expect(() => truncateText("Hello", length)).toThrow(RangeError);
      },
    );

    test("throws a descriptive error", () => {
      expect(() => truncateText("Hello", -1)).toThrow(
        "Length must be a non-negative integer",
      );
    });
  });

  describe("special characters and whitespace", () => {
    test("preserves punctuation and symbols", () => {
      expect(truncateText("Hello, World!", 7)).toBe("Hello, ...");
    });

    test("preserves leading whitespace", () => {
      expect(truncateText("  Hello World", 7)).toBe("  Hello...");
    });

    test("preserves trailing whitespace within the requested length", () => {
      expect(truncateText("Hello   World", 6)).toBe("Hello ...");
    });

    test("preserves internal whitespace", () => {
      expect(truncateText("Hello   World", 9)).toBe("Hello   W...");
    });
  });

  describe("Unicode text", () => {
    test("truncates Persian text correctly", () => {
      expect(truncateText("سلام دنیا", 4)).toBe("سلام...");
    });

    test("returns the original Persian text when length is equal", () => {
      expect(truncateText("سلام", 4)).toBe("سلام");
    });

    test("returns the original Persian text when length is greater", () => {
      expect(truncateText("سلام", 10)).toBe("سلام");
    });
  });

  describe("boundary behavior", () => {
    test("does not truncate when length is one greater than string length", () => {
      expect(truncateText("Hello", 6)).toBe("Hello");
    });

    test("does not truncate when length exactly equals string length", () => {
      expect(truncateText("Hello", 5)).toBe("Hello");
    });

    test("truncates when length is one less than string length", () => {
      expect(truncateText("Hello", 4)).toBe("Hell...");
    });
  });
});
