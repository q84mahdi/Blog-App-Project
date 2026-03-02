import { updateUserAvatar } from "@/services/authServices";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateAvatar } = useMutation<
    EmptyResponse,
    Error,
    FormData
  >({
    mutationFn: updateUserAvatar,

    onSuccess: (data) => {
      toast.success(data?.message || "عکس پروفایل با موفقیت ویرایش شد");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error
          ? err.message
          : "ویرایش عکس پروفایل با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isUpdating, updateAvatar };
}
