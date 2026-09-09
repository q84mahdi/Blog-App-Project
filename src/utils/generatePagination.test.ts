import { describe, expect, test } from "vitest";
import { generatePagination } from "./generatePagination";

describe("generatePagination", () => {
  describe("when total pages are 7 or less", () => {
    test.for([
      [1, [1]],
      [2, [1, 2]],
      [3, [1, 2, 3]],
      [4, [1, 2, 3, 4]],
      [5, [1, 2, 3, 4, 5]],
      [6, [1, 2, 3, 4, 5, 6]],
      [7, [1, 2, 3, 4, 5, 6, 7]],
    ] as const)(
      "returns all pages when totalPages is %i",
      ([totalPages, expected]) => {
        expect(generatePagination(1, totalPages)).toEqual(expected);
      },
    );
  });

  describe("when current page is among the first 3 pages", () => {
    test.for([1, 2, 3])(
      "returns first 3 pages and last 2 pages for currentPage %i",
      (currentPage) => {
        expect(generatePagination(currentPage, 10)).toEqual([
          1,
          2,
          3,
          "...",
          9,
          10,
        ]);
      },
    );
  });

  describe("when current page is in the middle", () => {
    test.for([
      [4, [1, "...", 3, 4, 5, "...", 10]],
      [5, [1, "...", 4, 5, 6, "...", 10]],
      [6, [1, "...", 5, 6, 7, "...", 10]],
    ] as const)(
      "shows current page and its neighbors for currentPage %i",
      ([currentPage, expected]) => {
        expect(generatePagination(currentPage, 10)).toEqual(expected);
      },
    );
  });

  describe("when current page is among the last 3 pages", () => {
    test.for([8, 9, 10])(
      "returns first 2 pages and last 3 pages for currentPage %i",
      (currentPage) => {
        expect(generatePagination(currentPage, 10)).toEqual([
          1,
          2,
          "...",
          8,
          9,
          10,
        ]);
      },
    );
  });

  describe("boundary cases", () => {
    test("uses all pages when totalPages is exactly 7", () => {
      expect(generatePagination(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test("uses ellipsis when totalPages is exactly 8", () => {
      expect(generatePagination(4, 8)).toEqual([1, "...", 3, 4, 5, "...", 8]);
    });

    test("handles the first valid page", () => {
      expect(generatePagination(1, 8)).toEqual([1, 2, 3, "...", 7, 8]);
    });

    test("handles the last valid page", () => {
      expect(generatePagination(8, 8)).toEqual([1, 2, "...", 6, 7, 8]);
    });
  });

  describe("input validation", () => {
    test.for([0, -1, -10, 1.5, NaN, Infinity, -Infinity])(
      "throws RangeError when totalPages is invalid: %s",
      (totalPages) => {
        expect(() => generatePagination(1, totalPages)).toThrow(RangeError);
      },
    );

    test.for([0, -1, -10, 1.5, NaN, Infinity, -Infinity])(
      "throws RangeError when currentPage is invalid: %s",
      (currentPage) => {
        expect(() => generatePagination(currentPage, 10)).toThrow(RangeError);
      },
    );

    test.for([
      [0, 10],
      [-1, 10],
      [11, 10],
      [20, 10],
    ])(
      "throws RangeError when currentPage is outside the valid range: %i of %i",
      ([currentPage, totalPages]) => {
        expect(() => generatePagination(currentPage, totalPages)).toThrow(
          RangeError,
        );
      },
    );
  });

  describe("error messages", () => {
    test("throws the correct error for invalid totalPages", () => {
      expect(() => generatePagination(1, 0)).toThrow(
        "totalPages must be a positive integer",
      );
    });

    test("throws the correct error for invalid currentPage", () => {
      expect(() => generatePagination(0, 10)).toThrow(
        "currentPage must be an integer between 1 and totalPages",
      );
    });

    test("throws the correct error when currentPage exceeds totalPages", () => {
      expect(() => generatePagination(11, 10)).toThrow(
        "currentPage must be an integer between 1 and totalPages",
      );
    });
  });

  describe("return value", () => {
    test("returns a new array", () => {
      const result = generatePagination(5, 10);

      expect(Array.isArray(result)).toBe(true);
    });

    test("contains only page numbers and ellipsis", () => {
      const result = generatePagination(5, 10);

      expect(
        result.every((item) => typeof item === "number" || item === "..."),
      ).toBe(true);
    });
  });
});
