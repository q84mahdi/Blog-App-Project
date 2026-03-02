"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { TrashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import SubmitButton from "@/ui/SubmitButton";
import { imageUrlToFile } from "@/utils/fileFormatter";
import { useGetCategories } from "@/hooks/useCategories";
import useCreatePost from "../_hooks/useCreatePost";
import useEditPost from "../_hooks/useEditPost";
import RHFTextarea from "@/ui/RHFTextarea";
import toast from "react-hot-toast";
import { Post } from "@/types/postTypes";

interface CreatePostFormProps {
  postToEdit?: Post;
}

interface CreatePostValues {
  title: string;
  briefText: string;
  text: string;
  slug: string;
  readingTime: number;
  category: string;
  coverImage: File;
}

const schema = yup.object({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(5, "عنوان باید حداقل ۵ کاراکتر باشد"),

  briefText: yup
    .string()
    .required("خلاصه متن الزامی است")
    .min(10, "خلاصه متن باید حداقل ۱۰ کاراکتر باشد"),

  text: yup
    .string()
    .required("متن الزامی است")
    .min(10, "متن باید حداقل ۱۰ کاراکتر باشد"),

  slug: yup.string().required("اسلاگ الزامی است"),

  readingTime: yup
    .number()
    .positive("زمان مطالعه باید عدد مثبت باشد")
    .integer("زمان مطالعه باید عدد صحیح باشد")
    .typeError("زمان مطالعه باید فقط عدد باشد")
    .required("زمان مطالعه الزامی است"),

  category: yup.string().required("دسته بندی الزامی است"),

  coverImage: yup
    .mixed<File>()
    .required("کاور پست الزامی است")
    .test("fileSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "فرمت فایل نامعتبر است", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});

function CreatePostForm({ postToEdit = {} as Post }: CreatePostFormProps) {
  const editId = postToEdit._id;
  const isEditMode = Boolean(editId);
  const {
    title,
    briefText,
    text,
    slug,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);

  const router = useRouter();

  const { data } = useGetCategories();

  const { isCreating, createPost } = useCreatePost();
  const { isEditing, editPost } = useEditPost();

  let editValues = {};
  if (isEditMode) {
    editValues = {
      title,
      briefText,
      text,
      slug,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    resetField,
    formState: { errors, isDirty },
  } = useForm<CreatePostValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      async function changeImage() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }

      changeImage();
    }
  }, [editId]);

  const onSubmit = (data: CreatePostValues) => {
    if (!isDirty) return toast.error("لطفا یکی از فیلد ها را تغییر دهید");

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("briefText", data.briefText);
    formData.append("text", data.text);
    formData.append("slug", data.slug);
    formData.append("readingTime", data.readingTime.toString());
    formData.append("category", data.category);
    formData.append("coverImage", data.coverImage);

    if (isEditMode) {
      editPost(
        { id: editId, postData: formData },
        {
          onSuccess: () => {
            reset();
            setCoverImageUrl(null);
            router.push("/profile/posts");
          },
        },
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          reset();
          setCoverImageUrl(null);
          router.push("/profile/posts");
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

      {/* Category Select Input */}
      {data?.categories && (
        <RHFSelect
          name="category"
          label="دسته بندی"
          register={register}
          errors={errors}
          isRequired
          options={data.categories}
        />
      )}

      {/* Slug Input */}
      <RHFTextField
        name="slug"
        label="اسلاگ"
        register={register}
        errors={errors}
        isRequired
      />

      {/* Reading Time Input */}
      <RHFTextField
        name="readingTime"
        label="زمان مطالعه"
        type="number"
        register={register}
        errors={errors}
        isRequired
      />

      {/* Brief Text Input */}
      <RHFTextarea
        name="briefText"
        label="خلاصه متن"
        register={register}
        errors={errors}
        isRequired
      />

      {/* Text Input */}
      <RHFTextarea
        name="text"
        label="متن"
        register={register}
        errors={errors}
        isRequired
      />

      <div className="space-y-2">
        {/* Cover Post Input */}
        <Controller
          name="coverImage"
          control={control}
          rules={{ required: "کاور پست الزامی است" }}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب کاور پست"
              errors={errors}
              onChange={(event) => {
                const file = event.target.files ? event.target.files[0] : null;
                onChange(file);
                setCoverImageUrl(file ? URL.createObjectURL(file) : null);
                event.target.value = "";
              }}
              {...rest}
            />
          )}
        />

        {/* Showing Cover Post */}
        {coverImageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              fill
              alt="cover-image"
              src={coverImageUrl}
              className="object-cover object-center"
            />

            <ButtonIcon
              variant="red"
              className="absolute bottom-2 left-2"
              onClick={() => {
                setCoverImageUrl(null);
                resetField("coverImage");
              }}
            >
              <TrashIcon />
            </ButtonIcon>
          </div>
        )}
      </div>

      <SubmitButton
        isLoading={isCreating || isEditing}
        className="md:col-start-2 md:row-start-6 md:w-1/2 md:justify-self-end xl:col-start-3"
      >
        تایید
      </SubmitButton>
    </form>
  );
}
export default CreatePostForm;
