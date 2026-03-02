import Fallback from "@/ui/Fallback";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import queryString from "query-string";
import { Suspense } from "react";
import CategoryTable from "./_components/CategoryTable";
import { CreateCategory } from "./_components/Buttons";

interface CategoriesListPageProps {
  searchParams: Promise<Record<string, any>>;
}

async function CategoriesListPage({ searchParams }: CategoriesListPageProps) {
  const resolvedSearchParams = await searchParams;
  const queries = queryString.stringify(resolvedSearchParams);

  return (
    <div>
      <div className="mb-12 grid grid-cols-2 items-center gap-x-8 gap-y-4 xl:grid-cols-4">
        <h1 className="text-xl font-bold text-secondary-800">
          لیست دسته‌بندی ها
        </h1>

        <div className="col-span-2 col-start-1 flex items-center gap-4 xl:col-span-2 xl:col-start-2">
          <div className="flex-1">
            <SearchBox />
          </div>

          <SortButton />
        </div>

        <div className="col-start-2 row-start-1 justify-self-end xl:col-start-4">
          <CreateCategory />
        </div>
      </div>

      <Suspense fallback={<Fallback />}>
        <CategoryTable queries={queries} hasPagination />
      </Suspense>
    </div>
  );
}
export default CategoriesListPage;
