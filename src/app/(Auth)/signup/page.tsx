"use client";

import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Spinner from "@/ui/Spinner";

interface SignupFormValues {
  fullname: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    fullname: yup
      .string()
      .required("نام و نام خانوادگی الزامی است")
      .min(5, "نام باید بیشتر از ۵ کارکتر باشد")
      .max(30, "نام باید کمتر از ۳۰ کارکتر باشد"),
    email: yup.string().required("ایمیل الزامی است").email("ایمیل نامعتبر است"),
    password: yup
      .string()
      .required("رمز عبور الزامی است")
      .min(8, "رمز عبور باید بیشتر از ۸ کارکتر باشد"),
  })
  .required();

function Signup() {
  const { isAuthenticated, signup } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: SignupFormValues) => {
    const userData = {
      name: values.fullname,
      email: values.email,
      password: values.password,
    };

    signup(userData);

    if (isAuthenticated) reset();
  };

  return (
    <div className="form">
      <h1 className="text-lg font-bold text-secondary-800">
        ایجاد حساب کاربری
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          label="نام و نام خانوادگی"
          name="fullname"
          register={register}
          errors={errors}
          isRequired
        />
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          errors={errors}
          isRequired
          dir="ltr"
        />
        <RHFTextField
          label="رمز عبور"
          name="password"
          register={register}
          errors={errors}
          isRequired
          type="password"
          dir="ltr"
        />
        <div>
          {isLoading ? (
            <Spinner size="small" />
          ) : (
            <Button className="mt-2 w-full font-bold">ثبت نام</Button>
          )}
        </div>
      </form>

      <Link href="/signin" className="text-secondary-600">
        ورود به حساب کاربری
      </Link>
    </div>
  );
}
export default Signup;
