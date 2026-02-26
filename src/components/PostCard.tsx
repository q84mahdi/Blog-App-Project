import Link from "next/link";
import CoverImage from "./CoverImage";
import PostAuthor from "./PostAuthor";
import PostReadingTime from "./PostReadingTime";
import PostInteraction from "./PostInteraction";
import { Post } from "@/types/postTypes";

interface PostCardProps {
  post: Post;
  hasInteractions?: boolean;
}

function PostCard({ post, hasInteractions = true }: PostCardProps) {
  return (
    <div
      className={`col-span-12 space-y-2 rounded-md border border-secondary-300 p-2 sm:col-span-6 ${hasInteractions ? "xl:col-span-4" : "md:col-span-4"}`}
    >
      {/* Post Image */}
      <CoverImage {...post} />

      {/* Post Content */}
      <div className="space-y-4 p-2">
        <Link href={`/blogs/${post.slug}`}>
          <h2 className="truncate font-bold text-secondary-700 transition-colors duration-200 hover:text-primary-900">
            {post.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between">
          {/* Post Author */}
          <PostAuthor
            name={post.author.name}
            avatarUrl={post.author.avatarUrl || undefined}
            isTruncate
          />

          {/* Post Reading Time */}
          <PostReadingTime time={post.readingTime} />
        </div>

        {/* Post Interactions */}
        {hasInteractions && <PostInteraction post={post} />}
      </div>
    </div>
  );
}

export default PostCard;
