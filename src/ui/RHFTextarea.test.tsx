import { render, screen } from "@/test/test-utils";
import { useForm } from "react-hook-form";
import { test, expect } from "vitest";
import RHFTextarea from "./RHFTextarea";

type Values = { body: string };

function Harness() {
  const { register } = useForm<Values>();

  return (
    <RHFTextarea<Values>
      label="Body"
      name="body"
      dir="ltr"
      register={register}
      errors={{ body: { type: "required", message: "Required" } }}
    />
  );
}

test("renders direction and field validation error", () => {
  render(<Harness />);

  expect(screen.getByRole("textbox", { name: "Body" })).toHaveAttribute(
    "dir",
    "ltr",
  );
  expect(screen.getByText("Required")).toBeInTheDocument();
});
