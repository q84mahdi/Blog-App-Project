import { AxiosRequestConfig } from "axios";
import http from "./httpServices";
import { ApiResponse, EmptyResponse } from "@/types/globalTypes";
import {
  ChangeStatusCommentRequest,
  CommentStatus,
  CreateCommentRequest,
  GetAllCommentsResponse,
} from "@/types/commentTypes";

/* ---------- Comment API ---------- */

export const createCommentApi = async (
  data: CreateCommentRequest,
  options: AxiosRequestConfig,
): Promise<EmptyResponse> => {
  const res = await http.post<ApiResponse<EmptyResponse>, CreateCommentRequest>(
    "/comment/add",
    data,
    options,
  );
  return res.data.data;
};

export const getAllCommentsApi = async (
  queries: string,
  options?: AxiosRequestConfig,
): Promise<GetAllCommentsResponse> => {
  const res = await http.get<ApiResponse<GetAllCommentsResponse>>(
    `/comment/list?${queries}`,
    options,
  );
  return res.data.data;
};

export const deleteCommentApi = async (
  commentId: string,
): Promise<EmptyResponse> => {
  const res = await http.delete<ApiResponse<EmptyResponse>>(
    `/comment/remove/${commentId}`,
  );
  return res.data.data;
};

export const changeStatusCommentApi = async ({
  commentId,
  data,
}: ChangeStatusCommentRequest): Promise<EmptyResponse> => {
  const res = await http.patch<
    ApiResponse<EmptyResponse>,
    { status: CommentStatus }
  >(`/comment/update/${commentId}`, data);
  return res.data.data;
};
