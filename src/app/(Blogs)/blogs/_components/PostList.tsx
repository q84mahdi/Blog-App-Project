import PostCard from "@/components/PostCard";
import { Post } from "@/types/postTypes";

interface PostListProps {
  posts: Post[];
}

async function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} hasInteractions />
      ))}
    </div>
  );
}
export default PostList;
