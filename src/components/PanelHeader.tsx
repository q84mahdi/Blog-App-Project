"use client";

import Avatar from "@/ui/Avatar";
import ButtonIcon from "@/ui/ButtonIcon";
import Drawer from "@/ui/Drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { JSX, useState } from "react";
import PanelSidebar from "./PanelSidebar";
import { useGetUser } from "@/hooks/useUsers";
import ToggleThemeButton from "./ToggleThemeButton";

export interface SidebarNavType {
  title: string;
  icon: JSX.Element;
  href: string;
}

interface PanelHeaderProps {
  sidebarNavs: SidebarNavType[];
}

function PanelHeader({ sidebarNavs }: PanelHeaderProps) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { data, isLoading } = useGetUser();

  const user = data?.user;

  return (
    <header
      className={`bg-secondary-0 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-none"}`}
    >
      <div className="flex items-center justify-between px-4 py-5 md:px-6 lg:px-8">
        <ButtonIcon
          className="block border-none lg:hidden"
          variant="outline"
          onClick={() => setIsOpenDrawer(true)}
        >
          <Bars3Icon className="!h-5 !w-5" />
        </ButtonIcon>

        <span className="text-sm font-bold text-secondary-700 lg:text-base">
          سلام؛ {user?.name || ""}
        </span>

        <div className="flex items-center gap-4">
          <ToggleThemeButton />

          <Link href={sidebarNavs[0].href}>
            <Avatar src={user?.avatarUrl || undefined} size={28} />
          </Link>
        </div>

        <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
          <PanelSidebar
            onClose={() => setIsOpenDrawer(false)}
            sidebarNavs={sidebarNavs}
          />
        </Drawer>
      </div>
    </header>
  );
}
export default PanelHeader;
