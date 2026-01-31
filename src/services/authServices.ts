import { AxiosRequestConfig } from "axios";
import http from "./httpServices";
import {
  ApiResponse,
  EmptyResponse,
  PaginatedResponse,
} from "@/types/globalTypes";
import {
  SignupRequest,
  SigninRequest,
  AuthResponse,
  User,
  UpdateProfileRequest,
  UserPost,
  UserComment,
  LogoutResponse,
} from "@/types/authTypes";

/* ---------- Auth API ---------- */

export const signupApi = async (data: SignupRequest): Promise<AuthResponse> => {
  const res = await http.post<ApiResponse<AuthResponse>, SignupRequest>(
    "/user/signup",
    data,
  );
  return res.data.data;
};

export const signinApi = async (data: SigninRequest): Promise<AuthResponse> => {
  const res = await http.post<ApiResponse<AuthResponse>, SigninRequest>(
    "/user/signin",
    data,
  );
  return res.data.data;
};

export const logoutApi = async (): Promise<void> => {
  await http.post<LogoutResponse, void>("/user/logout");
};

/* ---------- User API ---------- */

export const getUserApi = async (
  options?: AxiosRequestConfig,
): Promise<{ user: User }> => {
  const res = await http.get<ApiResponse<{ user: User }>>(
    "/user/profile",
    options,
  );
  return res.data.data;
};

export const getAllUsersApi = async (
  queries: string,
  options?: AxiosRequestConfig,
): Promise<PaginatedResponse<User>> => {
  const res = await http.get<ApiResponse<PaginatedResponse<User>>>(
    `/user/list?${queries}`,
    options,
  );
  return res.data.data;
};

export const getUserPostsApi = async (
  queries: string,
  options?: AxiosRequestConfig,
): Promise<PaginatedResponse<UserPost>> => {
  const res = await http.get<ApiResponse<PaginatedResponse<UserPost>>>(
    `/user/user-posts?${queries}`,
    options,
  );
  return res.data.data;
};

export const getUserCommentsApi = async (
  queries: string,
  options?: AxiosRequestConfig,
): Promise<PaginatedResponse<UserComment>> => {
  const res = await http.get<ApiResponse<PaginatedResponse<UserComment>>>(
    `/user/user-comments?${queries}`,
    options,
  );
  return res.data.data;
};

export const updateUserAvatar = async (
  data: FormData,
): Promise<EmptyResponse> => {
  const res = await http.post<ApiResponse<EmptyResponse>, FormData>(
    "/user/upload-avatar",
    data,
  );
  return res.data.data;
};

export const updateUserProfile = async (
  data: UpdateProfileRequest,
): Promise<EmptyResponse> => {
  const res = await http.patch<
    ApiResponse<EmptyResponse>,
    UpdateProfileRequest
  >("/user/update", data);
  return res.data.data;
};
