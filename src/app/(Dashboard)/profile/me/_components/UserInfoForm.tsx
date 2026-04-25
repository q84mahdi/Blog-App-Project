import RHFTextField from "@/ui/RHFTextField";
import SubmitButton from "@/ui/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import useUpdateProfile from "../_hooks/useUpdateProfile";

interface UserInfoFormValues {
  name: string;
  email: string;
}

interface UserInfoFormProps {
  initValue: UserInfoFormValues;
}

const schema = yup.object({
  name: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(5, "نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد"),

  email: yup.string().required("ایمیل الزامی است").email("ایمیل نامعتبر است"),
});

function UserInfoForm({ initValue }: UserInfoFormProps) {
  const { isUpdating, updateProfile } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserInfoFormValues>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values: UserInfoFormValues) => {
    if (!isDirty) return toast.error("لطفا یکی از فیلد ها را تغییر دهید");

    updateProfile(values);
  };

  return (
    <form className="form w-full max-w-none" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center gap-8 sm:flex-row">
        <RHFTextField
          name="name"
          label="نام و نام خانوادگی"
          register={register}
          errors={errors}
          isRequired
        />

        <RHFTextField
          name="email"
          label="ایمیل"
          register={register}
          errors={errors}
          isRequired
        />
      </div>

      <SubmitButton isLoading={isUpdating} className="w-32 self-end md:w-40">
        تایید
      </SubmitButton>
    </form>
  );
}

export default UserInfoForm;
