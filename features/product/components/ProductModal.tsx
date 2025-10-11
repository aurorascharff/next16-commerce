'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Boundary from '@/components/internal/Boundary';
import Modal from '@/components/ui/Modal';

type Props = {
  productId: number;
  children: React.ReactNode;
};

export default function ProductModal({ productId, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Boundary hydration="client">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-600/30 bg-neutral-800/80 text-neutral-100 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-105 hover:border-neutral-500/50 hover:bg-neutral-700/95 hover:text-white hover:shadow-2xl"
        aria-label="Quick Preview"
      >
        <Eye className="h-4 w-4" />
      </button>
      <Modal setOpen={setIsOpen} open={isOpen} title="Quick Preview">
        {children}
        <div className="mt-6 flex justify-center">
          <Link
            className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
            href={`/product/${productId}`}
          >
            {'View product details ->'}
          </Link>
        </div>
      </Modal>
    </Boundary>
  );
}
