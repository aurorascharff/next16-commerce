'use client';

import { Dialog, DialogDismiss, DialogHeading } from '@ariakit/react';
import { useRouter } from 'next/navigation';
import React from 'react';
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
  const router = useRouter();

  const handleClose = () => {
    setOpen?.(false);
    if (goBackOnClose) {
      router.back();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      backdrop={
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md dark:bg-white/20" style={{ zIndex: 9998 }} />
      }
      className="border-divider dark:border-divider-dark fixed top-1/2 left-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-0 shadow-xl dark:bg-black"
      style={{ zIndex: 9999 }}
    >
      <Boundary hydration="client">
        <div className="flex w-full flex-col">
          {title && (
            <DialogHeading className="border-divider dark:border-divider-dark m-0 border-b px-5 py-4 text-lg font-semibold">
              {title}
            </DialogHeading>
          )}
          <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
          <div className="border-divider dark:border-divider-dark flex justify-end border-t px-5 py-4">
            <DialogDismiss
              render={
                <Button variant="secondary" type="button">
                  Close
                </Button>
              }
            />
          </div>
        </div>
      </Boundary>
    </Dialog>
  );
}
