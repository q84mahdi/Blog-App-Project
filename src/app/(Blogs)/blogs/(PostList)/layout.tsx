import { ReactNode, Suspense } from "react";
import Spinner from "@/ui/Spinner";
import CategoryList from "../_components/CategoryList";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import { getAllCategoriesApi } from "@/services/categoryServices";

interface BlogsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "بلاگ ها",
};

const sortItems = [
  { value: "desc", label: "جدیدترین" },
  { value: "asc", label: "قدیمی‌ترین" },
  { value: "popular", label: "پرطرفدارترین" },
  { value: "time_asc", label: "کوتاه‌ترین" },
  { value: "time_desc", label: "طولانی‌ترین" },
] as const;

async function BlogsLayout({ children }: BlogsLayoutProps) {
  const { data: categories } = await getAllCategoriesApi();

  return (
    <div className="mb-12 grid grid-cols-12 gap-8">
      {/* Category List */}
      <div className="col-span-12 md:col-span-3">
        <h1 className="mb-4 text-lg font-bold text-secondary-700 lg:mb-6 lg:leading-[45.6px]">
          لیست دسته‌بندی ها
        </h1>

        <Suspense fallback={<Spinner size="small" />}>
          <CategoryList categories={categories} />
        </Suspense>
      </div>

      {/* Blogs List */}
      <div className="col-span-12 md:col-span-9">
        <div className="mb-4 grid grid-cols-1 items-center gap-4 text-secondary-700 lg:mb-6 lg:grid-cols-2 lg:gap-8">
          <h1 className="text-lg font-bold">لیست بلاگ ها</h1>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBox />
            </div>

            <SortButton sortItems={sortItems} />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
export default BlogsLayout;
