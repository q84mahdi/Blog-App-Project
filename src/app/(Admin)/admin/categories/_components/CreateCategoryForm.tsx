"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import SubmitButton from "@/ui/SubmitButton";
import RHFTextarea from "@/ui/RHFTextarea";
import toast from "react-hot-toast";
import useCreateCategory from "../_hooks/useCreateCategory";
import useEditCategory from "../_hooks/useEditCategory";
import { Category } from "@/types/categoryTypes";

interface CreateCategoryFormProps {
  categoryToEdit?: Category;
}

interface CreateCategoryValues {
  title: string;
  englishTitle: string;
  description: string;
}

const schema = yup.object({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .trim()
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),

  englishTitle: yup
    .string()
    .required("عنوان انگلیسی الزامی است")
    .trim()
    .min(3, "عنوان انگلیسی باید حداقل ۳ کاراکتر باشد")
    .matches(
      /^[^\u0600-\u06FF\u06F0-\u06F9]+$/,
      "کاراکتر فارسی یا عدد فارسی مجاز نیست",
    ),

  description: yup
    .string()
    .required("توضیحات الزامی است")
    .trim()
    .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
});

function CreateCategoryForm({
  categoryToEdit = {} as Category,
}: CreateCategoryFormProps) {
  const editId = categoryToEdit._id;
  const isEditMode = Boolean(editId);
  const { title, englishTitle, description } = categoryToEdit;

  const router = useRouter();

  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();

  let editValues = {};
  if (isEditMode) {
    editValues = {
      title,
      englishTitle,
      description,
    };
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateCategoryValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: editValues,
  });

  const onSubmit = (data: CreateCategoryValues) => {
    if (!isDirty) return toast.error("لطفا یکی از فیلد ها را تغییر دهید");

    if (isEditMode) {
      editCategory(
        { categoryId: editId, data },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/categories");
          },
        },
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          reset();
          router.push("/admin/categories");
        },
      });
    }
  };

  return (
    <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
      {/* Title Input */}
      <RHFTextField
        name="title"
        label="عنوان"
        register={register}
        errors={errors}
        isRequired
      />

      {/* English Title Input */}
      <RHFTextField
        name="englishTitle"
        label="عنوان انگلیسی"
        register={register}
        errors={errors}
        isRequired
      />

      {/* Description Input */}
      <RHFTextarea
        name="description"
        label="توضیحات"
        register={register}
        errors={errors}
        isRequired
      />

      <SubmitButton
        isLoading={isCreating || isEditing}
        className="md:col-start-2 md:row-start-6 md:w-1/2 md:justify-self-end xl:col-start-3"
      >
        تایید
      </SubmitButton>
    </form>
  );
}
export default CreateCategoryForm;
