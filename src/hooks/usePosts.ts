import { getUserPostsApi } from "@/services/authServices";
import { getAllPostsApi, getPostByIdApi } from "@/services/postServices";
import { PaginatedResponse } from "@/types/globalTypes";
import { Post } from "@/types/postTypes";
import { useQuery } from "@tanstack/react-query";

export function useGetPosts(queries = "") {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: ["posts", queries],
    queryFn: () => getAllPostsApi(queries),
  });
}

export function useGetUserPosts(queries = "") {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: ["user-posts", queries],
    queryFn: () => getUserPostsApi(queries),
  });
}

export function useGetPostById(postId: number) {
  return useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPostByIdApi(postId),
  });
}
