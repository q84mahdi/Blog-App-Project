"use client";

import { useAuth } from "@/contexts/AuthContext";
import NavLink from "./NavLink";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  CubeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ButtonIcon from "@/ui/ButtonIcon";
import ToggleThemeButton from "./ToggleThemeButton";

const navLinks = [
  {
    id: 1,
    children: "خانه",
    path: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    children: "بلاگ ها",
    path: "/blogs",
    icon: <CubeIcon className="h-5 w-5" />,
  },
];

function Header() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header
      className={`sticky top-0 z-30 mb-10 border-b border-b-secondary-300 bg-inherit bg-secondary-0 shadow-md transition-all duration-200 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-none"}`}
    >
      <nav className="container xl:max-w-screen-xl">
        <ul className="flex items-center justify-between px-2 py-2 md:px-4">
          <div className="flex items-center gap-x-4 md:gap-x-10">
            {navLinks.map((navLink) => (
              <li key={navLink.id}>
                <NavLink path={navLink.path}>
                  <div className="flex items-center gap-2">
                    {navLink.icon}
                    {navLink.children}
                  </div>
                </NavLink>
              </li>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <li>
              <ToggleThemeButton />
            </li>

            <li>
              <Link href={isAuthenticated ? "/admin" : "/signin"}>
                <ButtonIcon variant="primary">
                  <Cog6ToothIcon className="h-5 w-5" />
                </ButtonIcon>
              </Link>
            </li>

            <li>
              {isAuthenticated ? (
                <Link href="/profile">
                  <ButtonIcon variant="primary">
                    <UserIcon className="h-5 w-5" />
                  </ButtonIcon>
                </Link>
              ) : (
                <Link href="/signin">
                  <ButtonIcon variant="primary">
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
                  </ButtonIcon>
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
