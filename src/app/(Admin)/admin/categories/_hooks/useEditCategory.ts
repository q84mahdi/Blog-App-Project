import { editCategoryApi } from "@/services/categoryServices";
import { EditCategoryRequest } from "@/types/categoryTypes";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCategory } = useMutation<
    EmptyResponse,
    Error,
    EditCategoryRequest
  >({
    mutationFn: editCategoryApi,

    onSuccess: (data) => {
      toast.success(data?.message || "دسته‌بندی با موفقیت ویرایش شد");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "ویرایش دسته‌بندی با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isEditing, editCategory };
}
