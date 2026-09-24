import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { test, expect } from "vitest";
import RHFTextField from "./RHFTextField";

type Values = { title: string };

function Harness() {
  const { register } = useForm<Values>();

  return (
    <RHFTextField<Values>
      label="Title"
      name="title"
      register={register}
      errors={{ title: { type: "required", message: "Required" } }}
      isRequired
    />
  );
}

test("renders required marker and validation error", () => {
  render(<Harness />);

  expect(screen.getByRole("textbox", { name: /Title/ })).toHaveClass(
    "textField--invalid",
  );
  expect(screen.getByText("Required")).toBeInTheDocument();
  expect(screen.getByText("*")).toBeInTheDocument();
});
