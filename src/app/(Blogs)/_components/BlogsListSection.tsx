"use client";

import PostCard from "@/components/PostCard";
import { useGetPosts } from "@/hooks/usePosts";
import Fallback from "@/ui/Fallback";
import { ArrowLeftCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface BlogsListSectionProps {
  queryParams: string;
  link: Url;
  text: string;
}

function BlogsListSection({ queryParams, link, text }: BlogsListSectionProps) {
  const { data, isLoading } = useGetPosts(queryParams);
  const posts = data?.data;

  if (isLoading) return <Fallback />;
  if (!posts) return null;

  return (
    <div className="mb-12 flex flex-col gap-10 rounded-xl bg-gradient-to-b from-secondary-100 via-secondary-50 to-secondary-100 px-6 py-10 shadow-sm">
      <div className="flex w-full items-center justify-between text-secondary-800">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 animate-pulse text-primary-800" />

          <h3 className="text-2xl font-bold tracking-tight">{text}</h3>
        </div>

        <Link
          className="flex items-center gap-2 font-medium transition-all duration-300 hover:gap-3 hover:text-primary-900"
          href={link}
        >
          <span>تمام بلاگ‌ها</span>

          <ArrowLeftCircleIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group col-span-12 md:col-span-6 lg:col-span-3"
          >
            <div className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]">
              <PostCard post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BlogsListSection;
