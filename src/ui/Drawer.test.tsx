import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import Drawer from "./Drawer";
afterEach(cleanup);

test("portals children, closes on backdrop, and stops content clicks", async () => {
  const onClose = vi.fn();

  render(
    <Drawer open onClose={onClose}>
      Navigation
    </Drawer>,
  );

  expect(await screen.findByText("Navigation")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Navigation"));
  expect(onClose).not.toHaveBeenCalled();

  fireEvent.click(screen.getByLabelText("backdrop"));
  expect(onClose).toHaveBeenCalledOnce();
});
