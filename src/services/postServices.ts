import { AxiosRequestConfig } from "axios";
import http from "./httpServices";
import {
  ApiResponse,
  EmptyResponse,
  PaginatedResponse,
} from "@/types/globalTypes";
import { CreatePostResponse, Post } from "@/types/postTypes";

/* ---------- Post API ---------- */

export const getAllPostsApi = async (
  queries: string,
  options: AxiosRequestConfig,
): Promise<PaginatedResponse<Post>> => {
  const res = await http.get<ApiResponse<PaginatedResponse<Post>>>(
    `/post/list?${queries}`,
    options,
  );
  return res.data.data;
};

export const getPostBySlugApi = async (
  slug: string,
  options: AxiosRequestConfig,
): Promise<Post> => {
  const res = await http.get<ApiResponse<Post>>(`/post/slug/${slug}`, options);
  return res.data.data;
};

export const getPostByIdApi = async (
  postId: number,
  options: AxiosRequestConfig,
): Promise<Post> => {
  const res = await http.get<ApiResponse<Post>>(`/post/${postId}`, options);
  return res.data.data;
};

export const likePostApi = async (postId: string): Promise<EmptyResponse> => {
  const res = await http.post<ApiResponse<EmptyResponse>, void>(
    `/post/like/${postId}`,
  );
  return res.data.data;
};

export const bookmarkPostApi = async (
  postId: string,
): Promise<EmptyResponse> => {
  const res = await http.post<ApiResponse<EmptyResponse>, void>(
    `/post/bookmark/${postId}`,
  );
  return res.data.data;
};

export const createPostApi = async (
  postData: FormData,
): Promise<CreatePostResponse> => {
  const res = await http.post<ApiResponse<CreatePostResponse>, FormData>(
    "/post/create",
    postData,
  );
  return res.data.data;
};

export const editPostApi = async (
  id: number,
  postData: FormData,
): Promise<CreatePostResponse> => {
  const res = await http.patch<ApiResponse<CreatePostResponse>, FormData>(
    `/post/update/${id}`,
    postData,
  );
  return res.data.data;
};

export const deletePostApi = async (postId: string): Promise<EmptyResponse> => {
  const res = await http.delete<ApiResponse<EmptyResponse>>(
    `/post/remove/${postId}`,
  );
  return res.data.data;
};
