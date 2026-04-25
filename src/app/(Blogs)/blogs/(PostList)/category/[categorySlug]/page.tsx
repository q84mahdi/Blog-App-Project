import { getAllPostsApi } from "@/services/postServices";
import Pagination from "@/ui/Pagination";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import PostList from "app/(Blogs)/blogs/_components/PostList";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import queryString from "query-string";

interface CategoryPageProps {
  searchParams: Promise<Record<string, any>>;
  params: Promise<{ categorySlug: string }>;
}

export const revalidate = 60;

async function CategoryPage({ searchParams, params }: CategoryPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const categoryQuery = `categorySlug=${resolvedParams.categorySlug}`;
  const queries = `${queryString.stringify(resolvedSearchParams)}&${categoryQuery}`;

  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;
  const { data: posts, total } = await getAllPostsApi(queries, options);

  const { search } = resolvedSearchParams;

  const searchMessage = search
    ? `${toPersianNumbers(posts.length)} نتیجه برای "${search}" یافت شد.`
    : "";

  return (
    <div className="min-h-[60vh]">
      {posts.length === 0 ? (
        <p className="mt-8 text-center text-lg font-bold text-secondary-600">
          {search
            ? `هیچ نتیجه ای برای "${search}" یافت نشد.`
            : "پستی در این دسته بندی یافت نشد."}
        </p>
      ) : (
        <div>
          {searchMessage && (
            <p className="mb-4 text-lg font-bold text-secondary-600">
              {searchMessage}
            </p>
          )}

          <PostList posts={posts} />

          {posts && posts.length > 0 && (
            <div className="mt-8 flex items-center justify-center">
              <Pagination totalPages={total} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default CategoryPage;
