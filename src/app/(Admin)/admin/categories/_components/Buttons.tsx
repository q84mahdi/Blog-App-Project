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
import useDeleteCategory from "../_hooks/useDeleteCategory";
import { Category } from "@/types/categoryTypes";

// ---------- Create Category Button ----------

export function CreateCategory() {
  return (
    <Link className="inline-block" href="/admin/categories/create">
      <Button
        variant="primary"
        className="flex items-center gap-x-2 justify-self-end py-2 lg:px-6 lg:py-3"
      >
        <PlusCircleIcon className="h-6 w-6" />

        <span>ایجاد دسته‌بندی</span>
      </Button>
    </Link>
  );
}

// ---------- Update Category Button ----------

interface UpdateCategoryProps {
  id: string;
}

export function UpdateCategory({ id }: UpdateCategoryProps) {
  return (
    <Link href={`/admin/categories/${id}/edit`}>
      <ButtonIcon
        className="border-none !text-success hover:!text-success lg:!text-inherit"
        variant="outline"
      >
        <PencilSquareIcon />
      </ButtonIcon>
    </Link>
  );
}

// ---------- Delete Category Button ----------

interface DeleteCategoryProps {
  category: Category;
}

export function DeleteCategory({
  category: { _id, title },
}: DeleteCategoryProps) {
  const [open, setOpen] = useState(false);

  const { isDeleting, deleteCategory } = useDeleteCategory();

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
        title={`حذف دسته‌بندی ${title}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={`دسته‌بندی ${title}`}
          onClose={() => setOpen(false)}
          disabled={isDeleting}
          onConfirm={(e) => {
            e.preventDefault();

            deleteCategory(_id, {
              onSuccess: () => {
                setOpen(false);
              },
            });
          }}
        />
      </Modal>
    </>
  );
}
