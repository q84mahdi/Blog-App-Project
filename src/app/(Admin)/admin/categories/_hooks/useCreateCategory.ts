import { createCategoryApi } from "@/services/categoryServices";
import { CreateCategoryRequest } from "@/types/categoryTypes";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCategory } = useMutation<
    EmptyResponse,
    Error,
    CreateCategoryRequest
  >({
    mutationFn: createCategoryApi,

    onSuccess: (data) => {
      toast.success(data?.message || "دسته‌بندی با موفقیت ایجاد شد");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "ایجاد دسته‌بندی با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isCreating, createCategory };
}
