import { render, screen } from "@/test/test-utils";
import { test, expect } from "vitest";
import Button from "./Button";

test("renders its content, variant, and loading state", () => {
  render(
    <Button variant="danger" loading>
      Save
    </Button>,
  );

  expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  expect(screen.getByRole("button")).toHaveClass("btn--danger");
});
