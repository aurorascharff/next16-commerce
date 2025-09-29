'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import Boundary from '../internal/Boundary';
import Button from './Button';

type Props = {
  open: boolean;
  setOpen?: (open: boolean) => void;
  goBackOnClose?: boolean;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ open, setOpen, children, goBackOnClose = false, title }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleClose = () => {
    ref.current?.close();
    setOpen?.(false);
    document.body.style.overflow = 'unset';
    if (goBackOnClose) {
      router.back();
    }
  };

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={handleClose}
      className="border-divider dark:border-divider-dark fixed inset-0 m-auto w-[90%] max-w-lg rounded-lg border bg-white p-0 shadow-xl backdrop:bg-black/70 backdrop:backdrop-blur-md dark:bg-black dark:backdrop:bg-white/20"
    >
      <Boundary hydration="client">
        <div className="flex w-full flex-col">
          {title && (
            <h2 className="border-divider dark:border-divider-dark m-0 border-b px-5 py-4 text-lg font-semibold">
              {title}
            </h2>
          )}
          <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
          <div className="border-divider dark:border-divider-dark flex justify-end border-t px-5 py-4">
            <Button onClick={handleClose} variant="secondary" type="button">
              Close
            </Button>
          </div>
        </div>
      </Boundary>
    </dialog>
  );
}
