import Fallback from "@/ui/Fallback";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import queryString from "query-string";
import { Suspense } from "react";
import UserTable from "./_components/UserTable";

interface UsersListPage {
  searchParams: Promise<Record<string, any>>;
}

async function UsersListPage({ searchParams }: UsersListPage) {
  const resolvedSearchParams = await searchParams;
  const queries = queryString.stringify(resolvedSearchParams);

  return (
    <div>
      <div className="mb-12 grid grid-cols-2 items-center gap-x-8 gap-y-4 lg:grid-cols-4">
        <h1 className="text-xl font-bold text-secondary-800">لیست کاربران</h1>

        <div className="col-span-2 col-start-1 flex items-center gap-4 lg:col-span-2 lg:col-start-3">
          <div className="flex-1">
            <SearchBox />
          </div>

          <SortButton />
        </div>
      </div>

      <Suspense fallback={<Fallback />}>
        <UserTable queries={queries} hasPagination />
      </Suspense>
    </div>
  );
}

export default UsersListPage;
