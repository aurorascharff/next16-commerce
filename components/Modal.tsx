'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

type Props = {
  openModal: boolean;
  goBackOnClose?: boolean;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ openModal, children, goBackOnClose = false, title }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleClose = () => {
    ref.current?.close();
    if (goBackOnClose) {
      router.back();
    }
  };

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={handleClose}
      className="dark:bg-card-dark fixed inset-0 m-auto w-[90%] max-w-lg rounded-lg border-none bg-white p-0 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex w-full flex-col">
        {title && (
          <h2 className="border-divider dark:border-divider-dark m-0 border-b px-5 py-4 text-lg font-semibold text-black dark:text-white">
            {title}
          </h2>
        )}
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
        <div className="border-divider dark:border-divider-dark flex justify-end border-t px-5 py-4">
          <button
            onClick={handleClose}
            className="bg-card hover:bg-divider dark:bg-section dark:hover:bg-divider-dark cursor-pointer rounded-md px-4 py-2 font-medium text-black dark:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
