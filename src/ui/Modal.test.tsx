import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import Modal from "./Modal";

afterEach(cleanup);

test("portals content when open and closes from close button or outside click", async () => {
  const onClose = vi.fn();

  render(
    <Modal title="Edit" description="Details" open onClose={onClose}>
      Form
    </Modal>,
  );

  expect(await screen.findByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Details")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));
  expect(onClose).toHaveBeenCalledOnce();

  fireEvent.click(document.body);
  expect(onClose).toHaveBeenCalledTimes(2);
});

test("does not render contents when closed", async () => {
  render(
    <Modal title="Hidden" open={false} onClose={vi.fn()}>
      Secret
    </Modal>,
  );

  expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
});
