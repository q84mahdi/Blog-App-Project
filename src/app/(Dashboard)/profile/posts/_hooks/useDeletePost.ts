import { deletePostApi } from "@/services/postServices";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeletePost() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePost } = useMutation<
    EmptyResponse,
    Error,
    string
  >({
    mutationFn: deletePostApi,

    onSuccess: (data) => {
      toast.success(data?.message || "پست با موفقیت حذف شد");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "حذف پست با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isDeleting, deletePost };
}
