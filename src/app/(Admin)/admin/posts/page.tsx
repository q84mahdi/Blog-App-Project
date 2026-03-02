import Fallback from "@/ui/Fallback";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import queryString from "query-string";
import { Suspense } from "react";
import PostTable from "./_components/PostTable";

interface PostsListPageProps {
  searchParams: Promise<Record<string, any>>;
}

async function PostsListPage({ searchParams }: PostsListPageProps) {
  const resolvedSearchParams = await searchParams;
  const queries = queryString.stringify(resolvedSearchParams);

  return (
    <div>
      <div className="mb-12 grid grid-cols-2 items-center gap-x-8 gap-y-4 lg:grid-cols-4">
        <h1 className="text-xl font-bold text-secondary-800">لیست پست ها</h1>

        <div className="col-span-2 col-start-1 flex items-center gap-4 lg:col-span-2 lg:col-start-3">
          <div className="flex-1">
            <SearchBox />
          </div>

          <SortButton />
        </div>
      </div>

      <Suspense fallback={<Fallback />}>
        <PostTable queries={queries} hasPagination />
      </Suspense>
    </div>
  );
}
export default PostsListPage;
