import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import TextArea from "./TextArea";

test("labels and updates textarea value", () => {
  const onChange = vi.fn();

  render(
    <TextArea
      label="Description"
      name="description"
      value=""
      onChange={onChange}
      isRequired
    />,
  );

  const field = screen.getByRole("textbox", { name: /Description/ });
  
  expect(field).toHaveAttribute("dir", "rtl");

  fireEvent.change(field, { target: { value: "Updated" } });
  expect(onChange).toHaveBeenCalledOnce();
});
