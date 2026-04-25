"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  path: Url;
  children: ReactNode;
}

function NavLink({ path, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`block py-2 transition-all ease-out hover:text-secondary-900 ${pathname === path ? "text-primary-900" : "text-secondary-500"}`}
    >
      {children}
    </Link>
  );
}
export default NavLink;
