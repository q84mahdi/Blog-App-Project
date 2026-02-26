"use server";

import { createCommentApi } from "@/services/commentServices";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import {
  CreateCommentPayload,
  CreateCommentState,
} from "app/(Blogs)/blogs/_components/Comments/CommentForm";
import { AxiosRequestConfig } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createComment(
  prevState: CreateCommentState,
  { formData, postId, parentId }: CreateCommentPayload,
): Promise<CreateCommentState> {
  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;

  const text = formData.get("text")?.toString();

  if (!text) {
    return { message: "", error: "متن نظر الزامی است." };
  }

  try {
    const { message } = await createCommentApi(
      { postId, parentId, text },
      options,
    );

    revalidatePath("/blogs/[postSlug]", "page");

    return { message, error: "" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: "", error: err.message };
    }

    return {
      message: "",
      error: "خطایی رخ داده است.",
    };
  }
}
