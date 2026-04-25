"use client";

import { createComment } from "@/lib/actions";
import SubmitButton from "@/ui/SubmitButton";
import TextArea from "@/ui/TextArea";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onClose: () => void;
}

export interface CreateCommentState {
  message: string;
  error: string;
}

export interface CreateCommentPayload {
  formData: FormData;
  postId: string;
  parentId?: string;
}

const initialState: CreateCommentState = {
  message: "",
  error: "",
};

function CommentForm({ postId, parentId, onClose }: CommentFormProps) {
  const [text, setText] = useState<string>("");

  const [state, formAction, isPending] = useActionState<
    CreateCommentState,
    CreateCommentPayload
  >(createComment, initialState);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  return (
    <div className="mx-4">
      <form
        action={async (formData: FormData) => {
          await formAction({ formData, postId, parentId });
        }}
        className="w-full space-y-2"
      >
        <TextArea
          name="text"
          label="متن نظر"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          isRequired
        />

        <SubmitButton
          isLoading={isPending}
          className="w-full py-3 text-center text-secondary-0"
        >
          {parentId ? "ثبت پاسخ" : "ثبت نظر"}
        </SubmitButton>
      </form>
    </div>
  );
}

export default CommentForm;
