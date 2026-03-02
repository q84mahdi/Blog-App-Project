import { createPostApi } from "@/services/postServices";
import { CreatePostResponse } from "@/types/postTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreatePost() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPost } = useMutation<
    CreatePostResponse,
    Error,
    FormData
  >({
    mutationFn: createPostApi,

    onSuccess: (data) => {
      toast.success(data?.message || "پست با موفقیت ایجاد شد");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "ایجاد پست با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isCreating, createPost };
}
