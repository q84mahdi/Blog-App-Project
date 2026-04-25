"use client";

import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import useDeletePost from "../_hooks/useDeletePost";
import { useRouter } from "next/navigation";
import { Post } from "@/types/postTypes";

// ---------- Just used in user panel ----------
export function CreatePost() {
  return (
    <Link className="inline-block" href="/profile/posts/create">
      <Button
        variant="primary"
        className="flex items-center gap-x-2 justify-self-end py-2 lg:px-6 lg:py-3"
      >
        <PlusCircleIcon className="h-6 w-6" />

        <span>ایجاد پست</span>
      </Button>
    </Link>
  );
}

interface UpdatePostProps {
  id: string;
}

export function UpdatePost({ id }: UpdatePostProps) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon
        className="border-none !text-success hover:!text-success lg:!text-inherit"
        variant="outline"
      >
        <PencilSquareIcon />
      </ButtonIcon>
    </Link>
  );
}

// ---------- Used in user and admin panel ----------

interface DeletePostProps {
  post: Post;
}

export function DeletePost({ post: { _id, title } }: DeletePostProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { isDeleting, deletePost } = useDeletePost();

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
        title={`حذف پست ${title}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={`پست ${title}`}
          onClose={() => setOpen(false)}
          disabled={isDeleting}
          onConfirm={(e) => {
            e.preventDefault();

            deletePost(_id, {
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
