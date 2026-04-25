import { Category } from "@/types/categoryTypes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  const pathname = usePathname();

  return (
    <Link href={`/blogs/category/${category.slug}`}>
      <li
        className={classNames(
          "block w-full rounded-lg py-3 pr-3 text-secondary-700 transition-all duration-300 ease-in-out hover:bg-secondary-100/80",
          {
            "!bg-primary-100/50 !font-bold !text-primary-900 dark:!bg-primary-100":
              pathname === `/blogs/category/${category.slug}`,
          },
        )}
      >
        {category.title}
      </li>
    </Link>
  );
}
export default CategoryItem;
