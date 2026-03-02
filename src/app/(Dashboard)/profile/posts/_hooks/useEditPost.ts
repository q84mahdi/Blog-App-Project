import { editPostApi } from "@/services/postServices";
import { CreatePostResponse, EditPostRequest } from "@/types/postTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditPost() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editPost } = useMutation<
    CreatePostResponse,
    Error,
    EditPostRequest
  >({
    mutationFn: editPostApi,

    onSuccess: (data) => {
      toast.success(data?.message || "پست با موفقیت ویرایش شد");
      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "ویرایش پست با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isEditing, editPost };
}
