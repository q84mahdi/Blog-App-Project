import { describe, expect, test } from "vitest";
import dateFormatter from "./dateFormatter";

describe("dateFormatter", () => {
  test.for([
    ["2026-08-25", "۱۴۰۵/۶/۳"],
    [new Date("2026-08-25T00:00:00"), "۱۴۰۵/۶/۳"],
    [new Date("2026-08-25T00:00:00").getTime(), "۱۴۰۵/۶/۳"],
  ])("formats different date input types correctly", ([value, expected]) => {
    expect(dateFormatter(value)).toBe(expected);
  });

  test.for([
    ["2026-01-05", "۱۴۰۴/۱۰/۱۵"],
    ["2026-12-25", "۱۴۰۵/۱۰/۴"],
  ])("formats different dates correctly", ([value, expected]) => {
    expect(dateFormatter(value)).toBe(expected);
  });
});
