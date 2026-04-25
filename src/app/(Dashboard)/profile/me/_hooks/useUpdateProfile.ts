import { updateUserProfile } from "@/services/authServices";
import { UpdateProfileRequest } from "@/types/authTypes";
import { EmptyResponse } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProfile } = useMutation<
    EmptyResponse,
    Error,
    UpdateProfileRequest
  >({
    mutationFn: updateUserProfile,

    onSuccess: (data) => {
      toast.success(data?.message || "اطلاعات با موفقیت ویرایش شد");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "ویرایش اطلاعات با خطا مواجه شد";
      toast.error(message);
    },
  });

  return { isUpdating, updateProfile };
}
