"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ButtonIcon from "@/ui/ButtonIcon";
import { useState } from "react";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { SidebarNavType } from "./PanelHeader";

interface PanelSidebarProps {
  onClose?: () => void;
  sidebarNavs: SidebarNavType[];
}

function PanelSidebar({ onClose = () => {}, sidebarNavs }: PanelSidebarProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { isLoading, logout } = useAuth();

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div className="flex h-screen flex-col overflow-y-auto pt-6">
      {/* Sidebar Header */}
      <div className="mb-4 flex w-full items-center justify-between border-b border-b-secondary-200 pb-2 transition-all duration-300 ease-in-out hover:border-b-primary-200 lg:justify-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-x-4 text-secondary-700 hover:text-primary-900"
        >
          <HomeIcon className="h-6 w-6" />
          <span>نکست بلاگ</span>
        </Link>

        <ButtonIcon
          className="block border-none lg:hidden"
          variant="outline"
          onClick={onClose}
        >
          <XMarkIcon className="!h-5 !w-5" />
        </ButtonIcon>
      </div>

      {/* Sidebar Content */}
      <div className="flex-auto">
        <ul className="mb-2 space-y-2">
          {sidebarNavs.map((nav, index) => (
            <li key={index}>
              <Link
                href={nav.href}
                onClick={onClose}
                className={classNames(
                  "flex w-full items-center gap-x-4 rounded-lg py-3 pr-3 text-secondary-700 transition-all duration-300 ease-in-out hover:bg-secondary-100/80 [&>svg]:h-5 [&>svg]:w-5",
                  {
                    "!bg-primary-100 !font-bold !text-primary-900":
                      pathname === nav.href,
                  },
                )}
              >
                {nav.icon}
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div
          onClick={() => {
            setOpen(true);
            onClose();
          }}
          className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg py-3 pr-3 text-secondary-700 transition-all duration-300 ease-in-out hover:bg-secondary-100/80 hover:text-red-400"
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          <button>خروج</button>
        </div>

        {/* Logout Modal */}
        <Modal
          title={"خروج از حساب کاربری"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div>
            <p className="mt-6 font-medium text-secondary-900">
              آیا از خروج از حساب کاربری خود اطمینان دارید؟
            </p>

            <div className="mt-6 flex w-full items-center gap-4">
              <Button
                variant="danger"
                onClick={handleLogout}
                className="w-full"
                loading={isLoading}
              >
                خروج
              </Button>

              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                انصراف
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default PanelSidebar;
