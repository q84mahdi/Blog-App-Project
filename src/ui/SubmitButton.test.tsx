import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import SubmitButton from "./SubmitButton";

test("disables and shows loader while loading", () => {
  render(<SubmitButton isLoading>Save</SubmitButton>);

  expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  expect(screen.getByLabelText("loading")).toBeInTheDocument();
});
