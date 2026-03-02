import { deleteCategoryApi } from "@/services/categoryServices";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation<
    EmptyResponse,
    Error,
    string
  >({
    mutationFn: deleteCategoryApi,

    onSuccess: (data) => {
      toast.success(data?.message || "دسته‌بندی با موفقیت حذف شد");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "حذف دسته‌بندی با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isDeleting, deleteCategory };
}
