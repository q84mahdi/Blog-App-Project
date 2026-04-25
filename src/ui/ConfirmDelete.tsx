import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { MouseEventHandler } from "react";

interface ConfirmDeleteProps {
  resourceName: string;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: MouseEventHandler<HTMLButtonElement> | undefined;
}

function ConfirmDelete({
  resourceName,
  disabled = false,
  onClose,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <div>
      <h2 className="mb-8 text-base font-bold text-secondary-700">
        {`آیا از حذف ${resourceName} مطمئن هستید؟`}
      </h2>

      <form>
        <div className="flex items-center justify-between gap-x-8">
          <Button className="flex-1" variant="outline" onClick={onClose}>
            لغو
          </Button>

          <Button
            className="flex flex-1 items-center justify-center gap-x-2"
            variant="danger"
            disabled={disabled}
            onClick={onConfirm}
          >
            <TrashIcon className="w-5" />

            <span>حذف</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
export default ConfirmDelete;
