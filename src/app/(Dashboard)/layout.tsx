import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  HeartIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import PanelSidebar from "@/components/PanelSidebar";
import PanelHeader from "@/components/PanelHeader";
import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "پروفایل",
  discription: "پنل مدیریت کاربر",
};

const sidebarNavs = [
  {
    title: "داشبورد",
    icon: <RectangleGroupIcon />,
    href: "/profile",
  },
  {
    title: "اطلاعات کاربر",
    icon: <UserIcon />,
    href: "/profile/me",
  },
  {
    title: "پست‌ها",
    icon: <DocumentTextIcon />,
    href: "/profile/posts",
  },
  {
    title: "نظرات",
    icon: <ChatBubbleBottomCenterIcon />,
    href: "/profile/comments",
  },
  {
    title: "پست‌های پسندیده‌ شده",
    icon: <HeartIcon />,
    href: "/profile/likedPosts",
  },
  {
    title: "پست‌های ذخیره شده",
    icon: <BookmarkIcon />,
    href: "/profile/savedPosts",
  },
];

function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="grid h-screen grid-cols-12 bg-secondary-0">
      {/* Sidebar */}
      <aside className="col-span-12 hidden px-4 lg:col-span-3 lg:block xl:col-span-2">
        <PanelSidebar sidebarNavs={sidebarNavs} />
      </aside>

      {/* Body */}
      <div className="col-span-12 flex h-screen flex-col lg:col-span-9 xl:col-span-10">
        {/* Header */}
        <PanelHeader sidebarNavs={sidebarNavs} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto rounded-t-2xl bg-secondary-100 p-4 md:p-6 lg:rounded-t-none lg:rounded-tr-3xl lg:p-8">
          <div className="xl:max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
export default ProfileLayout;
