import { render, renderHook, screen } from "@/test/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useOutsideClick from "./useOutsideClick";

describe("useOutsideClick", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns a ref that can be attached to a DOM element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return <div ref={ref} data-testid="target" />;
    }

    render(<TestComponent />);

    expect(screen.getByTestId("target")).toBeInTheDocument();
  });

  test("calls handler when clicking outside the referenced element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return <div ref={ref} data-testid="target" />;
    }

    render(<TestComponent />);

    document.body.click();

    expect(handler).toHaveBeenCalledOnce();
  });

  test("does not call handler when clicking inside the referenced element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return (
        <div ref={ref}>
          <button data-testid="inside">Inside</button>
        </div>
      );
    }

    render(<TestComponent />);

    screen.getByTestId("inside").click();

    expect(handler).not.toHaveBeenCalled();
  });

  test("does not call handler when clicking a nested element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return (
        <div ref={ref}>
          <div>
            <button data-testid="nested">Nested</button>
          </div>
        </div>
      );
    }

    render(<TestComponent />);

    screen.getByTestId("nested").click();

    expect(handler).not.toHaveBeenCalled();
  });

  test("does not call handler when the ref has not been attached", () => {
    const handler = vi.fn();

    renderHook(() => useOutsideClick<HTMLDivElement>(handler));

    expect(() => document.body.click()).not.toThrow();
    expect(handler).not.toHaveBeenCalled();
  });

  test("calls handler once for each outside click", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return <div ref={ref} />;
    }

    render(<TestComponent />);

    document.body.click();
    document.body.click();
    document.body.click();

    expect(handler).toHaveBeenCalledTimes(3);
  });

  test("does not call handler after unmounting", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return <div ref={ref} />;
    }

    const { unmount } = render(<TestComponent />);

    document.body.click();

    expect(handler).toHaveBeenCalledOnce();

    unmount();

    document.body.click();

    expect(handler).toHaveBeenCalledOnce();
  });

  test("uses the latest handler when handler changes", () => {
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();

    function TestComponent({ handler }: { handler: () => void }) {
      const ref = useOutsideClick<HTMLDivElement>(handler);

      return <div ref={ref} data-testid="target" />;
    }

    const { rerender } = render(<TestComponent handler={firstHandler} />);

    document.body.click();

    expect(firstHandler).toHaveBeenCalledOnce();
    expect(secondHandler).not.toHaveBeenCalled();

    rerender(<TestComponent handler={secondHandler} />);

    document.body.click();

    expect(firstHandler).toHaveBeenCalledOnce();
    expect(secondHandler).toHaveBeenCalledOnce();
  });

  test("registers and removes the click listener with listenCapturing=false", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const handler = vi.fn();

    const { unmount } = renderHook(() =>
      useOutsideClick<HTMLDivElement>(handler, false),
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      false,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      false,
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
