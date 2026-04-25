import { changeStatusCommentApi } from "@/services/commentServices";
import { ChangeStatusCommentRequest } from "@/types/commentTypes";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useChangeStatusComment() {
  const queryClient = useQueryClient();

  const { isPending: isChanging, mutate: changeStatus } = useMutation<
    EmptyResponse,
    Error,
    ChangeStatusCommentRequest
  >({
    mutationFn: changeStatusCommentApi,

    onSuccess: (data) => {
      toast.success(data?.message || "وضعیت نظر با موفقیت آپدیت شد");

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "تغییر وضعیت نظر با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isChanging, changeStatus };
}
