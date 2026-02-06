import { getAllUsersApi, getUserApi } from "@/services/authServices";
import { User } from "@/types/authTypes";
import { PaginatedResponse } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(queries = "") {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", queries],
    queryFn: () => getAllUsersApi(queries),
  });
}

export function useGetUser() {
  return useQuery<{ user: User }>({
    queryKey: ["user"],
    queryFn: getUserApi,
  });
}
