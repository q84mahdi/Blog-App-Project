import { AxiosRequestConfig } from "axios";
import http from "./httpServices";
import {
  ApiResponse,
  EmptyResponse,
  PaginatedResponse,
} from "@/types/globalTypes";
import { Category, CreateCategoryRequest } from "@/types/categoryTypes";

/* ---------- Category API ---------- */

export const getAllCategoriesApi = async (
  queries: string,
  options?: AxiosRequestConfig,
): Promise<PaginatedResponse<Category>> => {
  const res = await http.get<ApiResponse<PaginatedResponse<Category>>>(
    `/category/list?${queries}`,
    options,
  );
  return res.data.data;
};

export const deleteCategoryApi = async (
  categoryId: number,
): Promise<EmptyResponse> => {
  const res = await http.delete<ApiResponse<EmptyResponse>>(
    `/category/remove/${categoryId}`,
  );
  return res.data.data;
};

export const createCategoryApi = async (
  data: CreateCategoryRequest,
): Promise<EmptyResponse> => {
  const res = await http.post<
    ApiResponse<EmptyResponse>,
    CreateCategoryRequest
  >("/category/add", data);
  return res.data.data;
};

export const editCategoryApi = async (
  categoryId: number,
  data: CreateCategoryRequest,
): Promise<EmptyResponse> => {
  const res = await http.patch<
    ApiResponse<EmptyResponse>,
    CreateCategoryRequest
  >(`/category/update/${categoryId}`, data);
  return res.data.data;
};
