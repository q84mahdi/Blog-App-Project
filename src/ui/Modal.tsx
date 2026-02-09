"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "./ButtonIcon";
import { createPortal } from "react-dom";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useEffect, useState } from "react";

interface ModalProps {
  title: string;
  description?: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({
  title,
  open,
  children,
  description = "",
  onClose,
}: ModalProps) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    open &&
    createPortal(
      <div className="fixed left-0 top-0 z-50 h-screen w-full bg-secondary-800 bg-opacity-30 backdrop-blur">
        <div
          ref={ref}
          className="fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-secondary-0 p-4 shadow-lg transition-all duration-500 ease-out md:max-w-lg"
        >
          {/* Modal Header */}
          <div className="mb-6 flex items-center justify-between border-b border-b-secondary-300 pb-2">
            <div>
              <h3 className="font-bold leading-6 text-secondary-800">
                {title}
              </h3>
              <p className="text-sm text-secondary-500">{description}</p>
            </div>

            <ButtonIcon onClick={onClose} variant="danger">
              <XMarkIcon />
            </ButtonIcon>
          </div>

          {/* Modal Content */}
          {children}
        </div>
      </div>,
      document.body,
    )
  );
}
export default Modal;
