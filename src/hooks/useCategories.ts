import { getAllCategoriesApi } from "@/services/categoryServices";
import { Category } from "@/types/categoryTypes";
import { PaginatedResponse } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";

interface SelectedCategory extends PaginatedResponse<Category> {
  categories: {
    label: string;
    value: string;
  }[];
  transformedCategories: {
    label: string;
    value: string;
  }[];
}

export function useGetCategories(queries = "") {
  return useQuery<PaginatedResponse<Category>, Error, SelectedCategory>({
    queryKey: ["categories", queries],
    queryFn: () => getAllCategoriesApi(queries),
    select: (data) => ({
      ...data,
      data: data.data,
      categories: data.data.map((category) => ({
        label: category.title,
        value: category._id,
      })),
      transformedCategories: data.data.map((category) => ({
        label: category.title,
        value: category.englishTitle,
      })),
    }),
  });
}
