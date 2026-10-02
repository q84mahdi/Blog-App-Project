import { render, screen } from "@/test/test-utils";
import { useForm } from "react-hook-form";
import { test, expect } from "vitest";
import RHFSelect from "./RHFSelect";

type Values = { category: string };

function Harness() {
  const { register } = useForm<Values>();

  return (
    <RHFSelect<Values>
      label="Category"
      name="category"
      register={register}
      errors={{}}
      options={[
        { value: "news", label: "News" },
        { value: "guide", label: "Guide" },
      ]}
    />
  );
}

test("renders labeled options and registers the selected field", () => {
  render(<Harness />);

  expect(screen.getByRole("combobox", { name: "Category" })).toHaveValue(
    "news",
  );
  expect(screen.getByRole("option", { name: "Guide" })).toBeInTheDocument();
});
