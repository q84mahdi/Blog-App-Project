import { getUserCommentsApi } from "@/services/authServices";
import { getAllCommentsApi } from "@/services/commentServices";
import { Comment, GetAllCommentsResponse } from "@/types/commentTypes";
import { PaginatedResponse } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";

export function useGetComments(queries = "") {
  return useQuery<GetAllCommentsResponse>({
    queryKey: ["comments", queries],
    queryFn: () => getAllCommentsApi(queries),
  });
}

export function useGetUserComments(queries = "") {
  return useQuery<PaginatedResponse<Comment>>({
    queryKey: ["user-comments", queries],
    queryFn: () => getUserCommentsApi(queries),
  });
}
