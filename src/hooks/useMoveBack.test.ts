import { renderHook } from "@/test/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useMoveBack from "./useMoveBack";

const backMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: backMock,
  }),
}));

describe("useMoveBack", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("calls router.back when the returned function is invoked", () => {
    const { result } = renderHook(() => useMoveBack());

    result.current();

    expect(backMock).toHaveBeenCalledOnce();
  });
});
