"use client";

import PostCard from "@/components/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { useGetPostById } from "@/hooks/usePosts";
import Empty from "@/ui/Empty";
import Fallback from "@/ui/Fallback";

// ---------- Saved Post List ----------

function SavedPostList() {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Fallback />;

  if (!user || !user.bookmarkedPosts || user.bookmarkedPosts.length <= 0)
    return <Empty resourceName="پستی" />;

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
      {user.bookmarkedPosts.map((postId) => (
        <SavedPostItem key={postId} postId={postId} />
      ))}
    </div>
  );
}

export default SavedPostList;

// ---------- Saved Post Item ----------

interface SavedPostItemProps {
  postId: string;
}

function SavedPostItem({ postId }: SavedPostItemProps) {
  const { isLoading, data: post } = useGetPostById(postId);

  if (!post || isLoading) return null;

  return <PostCard key={post._id} post={post} hasInteractions={false} />;
}
