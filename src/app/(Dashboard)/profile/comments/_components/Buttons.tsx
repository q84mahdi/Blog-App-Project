"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useDeleteComment from "../_hooks/useDeleteComment";
import useChangeStatusComment from "../_hooks/useChangeStatusComment";
import { Comment, CommentStatus } from "@/types/commentTypes";

// ---------- Used in user and admin panel ----------

interface DeleteCommentProps {
  comment: Comment;
  isAdmin?: boolean;
}

export function DeleteComment({
  comment: {
    _id,
    post: { title },
    user: { name },
  },
  isAdmin = false,
}: DeleteCommentProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { isDeleting, deleteComment } = useDeleteComment();

  return (
    <>
      <ButtonIcon
        className="border-none !text-error hover:!text-error lg:!text-inherit"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <TrashIcon />
      </ButtonIcon>

      <Modal
        title={`حذف نظر از پست ${title}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={isAdmin ? `نظر ${name}` : "نظر خود"}
          onClose={() => setOpen(false)}
          disabled={isDeleting}
          onConfirm={(e) => {
            e.preventDefault();

            deleteComment(_id, {
              onSuccess: () => {
                router.refresh();
                setOpen(false);
              },
            });
          }}
        />
      </Modal>
    </>
  );
}

// ---------- Just used in admin panel ----------

interface ChangeStatusCommentProps {
  comment: Comment;
}

export function ChangeStatusComment({
  comment: {
    _id,
    status,
    user: { name },
  },
}: ChangeStatusCommentProps) {
  const [open, setOpen] = useState(false);

  const { changeStatus } = useChangeStatusComment();

  const handleChangeStatus = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const status = Number(e.target.value) as CommentStatus;

    changeStatus(
      { commentId: _id, data: { status } },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <>
      <ButtonIcon
        className="border-none !text-success hover:!text-success lg:!text-inherit"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <PencilSquareIcon />
      </ButtonIcon>

      <Modal
        title={`تغییر وضعیت نظر ${name}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div>
          <h2 className="mb-4 text-base font-medium text-secondary-700">{`تغییر وضعیت نظر ${name} به :`}</h2>

          <div className="relative mb-4">
            <select
              onChange={handleChangeStatus}
              defaultValue={status}
              className="textField__input appearance-none"
            >
              <option value="0">رد شده</option>
              <option value="1">در انتظار تایید</option>
              <option value="2">تایید شده</option>
            </select>

            <ChevronDownIcon className="absolute left-4 top-4 h-5 w-5 text-secondary-900" />
          </div>
        </div>
      </Modal>
    </>
  );
}
