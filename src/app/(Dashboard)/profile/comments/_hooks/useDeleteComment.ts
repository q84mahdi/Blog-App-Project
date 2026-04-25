import { deleteCommentApi } from "@/services/commentServices";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteComment } = useMutation<
    EmptyResponse,
    Error,
    string
  >({
    mutationFn: deleteCommentApi,

    onSuccess: (data) => {
      toast.success(data?.message || "نظر با موفقیت حذف شد");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-comments"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "حذف نظر با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isDeleting, deleteComment };
}
