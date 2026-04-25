import PostCard from "@/components/PostCard";
import { Post, RelatedPost } from "@/types/postTypes";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="border-t border-dashed border-secondary-400 py-4">
      <h2 className="mb-4 text-xl font-bold text-secondary-700">
        پست های مرتبط
      </h2>

      <div className="grid grid-cols-12 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} hasInteractions={false} />
        ))}
      </div>
    </div>
  );
}
export default RelatedPosts;
