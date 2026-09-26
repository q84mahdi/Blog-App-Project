import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getPostByIdApi } from "@/services/postServices";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/createTestQueryClient";
import PostInteraction from "./PostInteraction";

const { refreshMock, successMock, errorMock } = vi.hoisted(() => ({
  refreshMock: vi.fn(),
  successMock: vi.fn(),
  errorMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));
vi.mock("react-hot-toast", () => ({
  default: { success: successMock, error: errorMock },
}));

describe("PostInteraction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("sends like and bookmark requests and reflects handler state", async () => {
    const post = await getPostByIdApi("post-react");

    render(<PostInteraction post={post} />, {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    fireEvent.click(screen.getByRole("button", { name: "حذف پسندیدن" }));

    await waitFor(async () => {
      expect(await getPostByIdApi("post-react")).toMatchObject({
        isLiked: false,
        likesCount: 11,
      });
    });

    expect(successMock).toHaveBeenCalledWith("عملیات با موفقیت انجام شد");
    expect(refreshMock).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole("button", { name: "حذف نشانک" }));

    await waitFor(async () => {
      expect(await getPostByIdApi("post-react")).toMatchObject({
        isBookmarked: false,
      });
    });

    expect(successMock).toHaveBeenCalledTimes(2);
    expect(refreshMock).toHaveBeenCalledTimes(2);
  });

  test("shows the API error when a like request targets a missing post", async () => {
    const post = {
      ...(await getPostByIdApi("post-react")),
      _id: "missing-post",
    };

    render(<PostInteraction post={post} />, {
      wrapper: createQueryWrapper(createTestQueryClient()),
    });

    fireEvent.click(screen.getByRole("button", { name: "حذف پسندیدن" }));

    await waitFor(() =>
      expect(errorMock).toHaveBeenCalledWith("پست مورد نظر پیدا نشد"),
    );

    expect(refreshMock).not.toHaveBeenCalled();
  });
});
