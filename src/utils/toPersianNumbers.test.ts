import { describe, expect, test } from "vitest";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "./toPersianNumbers";

describe("toPersianNumbers", () => {
  describe("numbers", () => {
    test.for([
      [0, "۰"],
      [1, "۱"],
      [123, "۱۲۳"],
      [123456, "۱۲۳۴۵۶"],
      [9876543210, "۹۸۷۶۵۴۳۲۱۰"],
    ])("converts %s to Persian digits", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });

  describe("numeric strings", () => {
    test.for([
      ["0", "۰"],
      ["123", "۱۲۳"],
      ["123456", "۱۲۳۴۵۶"],
      ["9876543210", "۹۸۷۶۵۴۳۲۱۰"],
    ])("converts numeric string %s to Persian digits", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });

  describe("negative and decimal numbers", () => {
    test.for([
      [-123, "-۱۲۳"],
      [-123456, "-۱۲۳۴۵۶"],
      [123.45, "۱۲۳.۴۵"],
      [-123.45, "-۱۲۳.۴۵"],
      [0.123, "۰.۱۲۳"],
    ])("preserves non-digit characters", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });

  describe("strings containing non-digit characters", () => {
    test.for([
      ["Price: 123", "Price: ۱۲۳"],
      ["ID: 12345", "ID: ۱۲۳۴۵"],
      ["2026-08-25", "۲۰۲۶-۰۸-۲۵"],
      ["123,456.78", "۱۲۳,۴۵۶.۷۸"],
      ["Hello 123 World", "Hello ۱۲۳ World"],
    ])(
      "converts digits while preserving other characters",
      ([input, expected]) => {
        expect(toPersianNumbers(input)).toBe(expected);
      },
    );
  });

  describe("already Persian digits", () => {
    test.for([
      ["۱۲۳", "۱۲۳"],
      ["۱۲۳۴۵۶", "۱۲۳۴۵۶"],
      ["سال ۱۴۰۵", "سال ۱۴۰۵"],
      ["۱۲۳,۴۵۶.۷۸", "۱۲۳,۴۵۶.۷۸"],
    ])("leaves Persian digits unchanged", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });

  describe("strings without digits", () => {
    test.for([
      ["", ""],
      ["Hello World", "Hello World"],
      ["سلام دنیا", "سلام دنیا"],
      ["!@#$%^&*()", "!@#$%^&*()"],
    ])("returns the input unchanged", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });

  describe("special numeric values", () => {
    test.for([
      [NaN, "NaN"],
      [Infinity, "Infinity"],
      [-Infinity, "-Infinity"],
    ])("preserves %s because it contains no digits", ([input, expected]) => {
      expect(toPersianNumbers(input)).toBe(expected);
    });
  });
});

describe("toPersianNumbersWithComma", () => {
  describe("integer numbers", () => {
    test.for([
      [0, "۰"],
      [1, "۱"],
      [12, "۱۲"],
      [123, "۱۲۳"],
      [1000, "۱,۰۰۰"],
      [1234, "۱,۲۳۴"],
      [123456, "۱۲۳,۴۵۶"],
      [1234567, "۱,۲۳۴,۵۶۷"],
      [1234567890, "۱,۲۳۴,۵۶۷,۸۹۰"],
    ])("formats %s correctly", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("numeric strings", () => {
    test.for([
      ["0", "۰"],
      ["123", "۱۲۳"],
      ["1000", "۱,۰۰۰"],
      ["123456", "۱۲۳,۴۵۶"],
      ["1234567", "۱,۲۳۴,۵۶۷"],
      ["1234567890", "۱,۲۳۴,۵۶۷,۸۹۰"],
    ])("formats numeric string %s correctly", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("comma boundaries", () => {
    test.for([
      [999, "۹۹۹"],
      [1000, "۱,۰۰۰"],
      [9999, "۹,۹۹۹"],
      [10000, "۱۰,۰۰۰"],
      [99999, "۹۹,۹۹۹"],
      [100000, "۱۰۰,۰۰۰"],
      [999999, "۹۹۹,۹۹۹"],
      [1000000, "۱,۰۰۰,۰۰۰"],
      [10000000, "۱۰,۰۰۰,۰۰۰"],
    ])("handles comma boundary for %s", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("negative numbers", () => {
    test.for([
      [-1000, "-۱,۰۰۰"],
      [-123456, "-۱۲۳,۴۵۶"],
      [-1234567, "-۱,۲۳۴,۵۶۷"],
    ])("preserves the negative sign", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("decimal numbers", () => {
    test.for([
      [1234.56, "۱,۲۳۴.۵۶"],
      [1234567.89, "۱,۲۳۴,۵۶۷.۸۹"],
      [-1234567.89, "-۱,۲۳۴,۵۶۷.۸۹"],
      [0.123, "۰.۱۲۳"],
    ])("formats decimal number %s correctly", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("strings with existing commas", () => {
    test.for([
      ["1,000", "۱,۰۰۰"],
      ["12,345", "۱۲,۳۴۵"],
      ["1,234,567", "۱,۲۳۴,۵۶۷"],
    ])("preserves existing comma separators", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("already Persian digits", () => {
    test.for([
      ["۱۲۳", "۱۲۳"],
      ["۱,۲۳۴", "۱,۲۳۴"],
      ["۱,۲۳۴,۵۶۷", "۱,۲۳۴,۵۶۷"],
    ])("leaves Persian digits unchanged", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });

  describe("strings without digits", () => {
    test.for([
      ["", ""],
      ["Hello", "Hello"],
      ["سلام", "سلام"],
    ])("returns the input unchanged", ([input, expected]) => {
      expect(toPersianNumbersWithComma(input)).toBe(expected);
    });
  });
});
