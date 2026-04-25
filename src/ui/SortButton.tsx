"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SortItemType {
  readonly value: string;
  readonly label: string;
}

interface SortButtonProps {
  sortItems?: readonly SortItemType[];
}

const initalSortItems: SortItemType[] = [
  { value: "desc", label: "جدیدترین" },
  { value: "asc", label: "قدیمی‌ترین" },
] as const;

function SortButton({ sortItems = initalSortItems }: SortButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [sortValue, setSortValue] =
    useState<(typeof sortItems)[number]["value"]>("desc");

  const ref = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const handleSetSortValue = (value: (typeof sortItems)[number]["value"]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("order", value);

    setSortValue(value);
    setOpen(false);

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((is) => !is)}
        className="btn flex items-center gap-x-2 border border-secondary-300 px-4 py-3 text-sm font-normal text-secondary-600 hover:border-primary-900 hover:text-primary-900"
      >
        <FunnelIcon className="h-5 w-5" />

        <span className="hidden leading-5 md:block">
          {sortItems.find((sortItem) => sortItem.value === sortValue)?.label ||
            "مرتب سازی"}
        </span>
      </button>

      <div
        className={`${open ? "flex" : "hidden"} absolute left-0 z-50 mt-1 w-full min-w-[150px] flex-col items-center justify-center gap-y-1 rounded-md border border-secondary-300 bg-secondary-0 p-1 xl:-left-4`}
      >
        {sortItems.map((sortItem) => (
          <button
            key={sortItem.value}
            onClick={() => handleSetSortValue(sortItem.value)}
            className="w-full rounded-md bg-secondary-200/50 py-2 text-secondary-900 transition-all duration-200 hover:text-primary-900"
          >
            {sortItem.label}
          </button>
        ))}
      </div>
    </div>
  );
}
export default SortButton;
