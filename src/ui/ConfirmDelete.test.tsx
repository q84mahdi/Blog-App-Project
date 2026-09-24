import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import ConfirmDelete from "./ConfirmDelete";
afterEach(cleanup);

test("renders resource confirmation and invokes cancel and confirm handlers", () => {
  const onClose = vi.fn();
  const onConfirm = vi.fn();

  render(
    <ConfirmDelete
      resourceName="post"
      onClose={onClose}
      onConfirm={onConfirm}
    />,
  );

  fireEvent.click(screen.getByRole("button", { name: "لغو" }));
  fireEvent.click(screen.getByRole("button", { name: "حذف" }));

  expect(onClose).toHaveBeenCalledOnce();
  expect(onConfirm).toHaveBeenCalledOnce();
});

test("disables confirmation when requested", () => {
  render(
    <ConfirmDelete
      resourceName="post"
      onClose={vi.fn()}
      onConfirm={vi.fn()}
      disabled
    />,
  );

  expect(screen.getAllByRole("button", { name: "حذف" })[0]).toBeDisabled();
});
