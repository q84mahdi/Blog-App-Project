"use client";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { bookmarkPostApi, likePostApi } from "@/services/postServices";
import { Post } from "@/types/postTypes";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PostInteractionProps {
  post: Post;
}

function PostInteraction({ post }: PostInteractionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const likeHandler = async (postId: string) => {
    try {
      const { message } = await likePostApi(postId);
      toast.success(message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";
      toast.error(message);
    }
  };

  const bookmarkHandler = async (postId: string) => {
    try {
      const { message } = await bookmarkPostApi(postId);
      toast.success(message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianNumbers(post.commentsCount)}</span>
      </ButtonIcon>

      <ButtonIcon variant="red" onClick={() => likeHandler(post._id)}>
        {post.isLiked ? <HeartIconSolid /> : <HeartIcon />}
        <span>{toPersianNumbers(post.likesCount)}</span>
      </ButtonIcon>

      <ButtonIcon variant="primary" onClick={() => bookmarkHandler(post._id)}>
        {post.isBookmarked ? <BookmarkIconSolid /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
}
export default PostInteraction;
