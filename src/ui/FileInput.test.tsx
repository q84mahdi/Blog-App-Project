import { fireEvent, render, screen } from "@/test/test-utils";
import { test, expect, vi } from "vitest";
import FileInput from "./FileInput";

type Values = { upload: FileList };

test("labels file input, accepts selection, and displays field error", () => {
  const onChange = vi.fn();

  render(
    <FileInput<Values>
      label="Upload"
      name="upload"
      errors={{ upload: { type: "required", message: "Choose a file" } }}
      onChange={onChange}
    />,
  );

  const input = screen.getByLabelText("Upload");

  expect(input).toHaveAttribute("type", "file");
  expect(screen.getByText("Choose a file")).toBeInTheDocument();

  fireEvent.change(input, { target: { files: [new File(["x"], "file.txt")] } });
  expect(onChange).toHaveBeenCalledOnce();
});
