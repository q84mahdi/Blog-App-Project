"use server";

import { createCommentApi } from "@/services/commentServices";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface CreateCommentProps {
  formData: FormData;
  postId: string;
  parentId?: string;
}

export async function createComment(
  prevState,
  { formData, postId, parentId }: CreateCommentProps,
) {
  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore);

  const text = formData.get("text")?.toString();

  if (!text) {
    return { error: "متن نظر الزامی است." };
  }

  try {
    const { message } = await createCommentApi(
      { postId, parentId, text },
      options,
    );

    revalidatePath("/blogs/[postSlug]", "page");

    return { message };
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
  }
}
