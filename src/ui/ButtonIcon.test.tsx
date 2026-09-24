import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import ButtonIcon from "./ButtonIcon";

test("renders variant and invokes its click handler", () => {
  const onClick = vi.fn();

  render(
    <ButtonIcon variant="red" onClick={onClick}>
      Delete
    </ButtonIcon>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Delete" }));

  expect(onClick).toHaveBeenCalledOnce();
  expect(screen.getByRole("button")).toHaveClass("bg-red-100");
});
