import { fireEvent, render, screen } from "@/test/test-utils";
import { test, expect, vi } from "vitest";
import PanelHeader from "./PanelHeader";

const { useGetUserMock } = vi.hoisted(() => ({ useGetUserMock: vi.fn() }));

vi.mock("@/hooks/useUsers", () => ({ useGetUser: useGetUserMock }));

vi.mock("./ToggleThemeButton", () => ({
  default: () => <button>Theme</button>,
}));

vi.mock("./PanelSidebar", () => ({
  default: () => <div>Sidebar content</div>,
}));

test("greets the loaded user and opens the sidebar drawer", async () => {
  useGetUserMock.mockReturnValue({
    data: { user: { name: "Mahdi", avatarUrl: "/avatar.png" } },
    isLoading: false,
  });

  render(
    <PanelHeader
      sidebarNavs={[{ title: "Dashboard", href: "/admin", icon: <span /> }]}
    />,
  );

  expect(screen.getByText("سلام؛ Mahdi")).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole("button")[0]);

  expect(await screen.findByText("Sidebar content")).toBeInTheDocument();
});
