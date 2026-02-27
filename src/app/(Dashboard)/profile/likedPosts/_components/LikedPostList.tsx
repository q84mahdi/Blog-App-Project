"use client";

import PostCard from "@/components/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { useGetPostById } from "@/hooks/usePosts";
import Empty from "@/ui/Empty";
import Fallback from "@/ui/Fallback";

function LikedPostList() {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Fallback />;

  if (!user || !user.likedPosts || user.likedPosts.length <= 0)
    return <Empty resourceName="پستی" />;

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
      {user.likedPosts.map((postId) => (
        <LikedPostItem key={postId} postId={postId} />
      ))}
    </div>
  );
}

export default LikedPostList;

interface LikedPostItemProps {
  postId: string;
}

function LikedPostItem({ postId }: LikedPostItemProps) {
  const { isLoading, data: post } = useGetPostById(postId);

  if (isLoading || !post) return null;

  return <PostCard key={post._id} post={post} hasInteractions={false} />;
}
