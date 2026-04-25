import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface BreadcrumbsProps {
  breadcrumbs: {
    href: string;
    label: string;
    active?: boolean;
  }[];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="mb-8 block">
      <ol className="flex items-center gap-x-2 text-lg">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`flex items-center gap-x-2 text-sm lg:text-base ${breadcrumb.active ? "text-secondary-700" : "text-secondary-500"}`}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>

            {index < breadcrumbs.length - 1 && (
              <span className="inline-block">
                <ChevronLeftIcon className="h-4 w-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default Breadcrumbs;
