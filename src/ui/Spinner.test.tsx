import { render } from "@/test/test-utils";
import { test, expect } from "vitest";
import Spinner from "./Spinner";

test("renders the requested spinner size", () => {
  const { rerender, container } = render(<Spinner />);

  expect(container.firstChild).toHaveClass("spinner");

  rerender(<Spinner size="small" />);

  expect(container.firstChild).toHaveClass("spinner-mini");
});
