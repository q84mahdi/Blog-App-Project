import { render, screen } from "@/test/test-utils";
import { test, expect } from "vitest";
import SubmitButton from "./SubmitButton";

test("disables and shows loader while loading", () => {
  render(<SubmitButton isLoading>Save</SubmitButton>);

  expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  expect(screen.getByLabelText("loading")).toBeInTheDocument();
});
