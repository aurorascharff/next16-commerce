'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';
import Boundary from '@/components/internal/Boundary';
import { cn } from '@/utils/cn';
import { toggleSaveProduct } from '../../product/product-actions';

type Props = {
  className?: string;
  productId: number;
  initialSaved: boolean;
};

export default function SaveProductButton({ className, productId, initialSaved }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(initialSaved);

  const handleToggleSave = () => {
    startTransition(async () => {
      setOptimisticSaved(!optimisticSaved);
      await toggleSaveProduct(productId, optimisticSaved);
    });
  };

  return (
    <Boundary hydration="client" rendering="dynamic">
      <form action={handleToggleSave}>
        <button
          type="submit"
          aria-label="Save product"
          aria-pressed={optimisticSaved}
          className={cn(
            'text-primary hover:text-primary-dark grid w-44 shrink-0 cursor-pointer grid-cols-[1.25rem_1fr] items-center gap-2 px-3 py-1.5 text-left text-sm whitespace-nowrap transition-colors',
            optimisticSaved && 'font-semibold',
            isPending && 'opacity-70',
            className,
          )}
        >
          {optimisticSaved ? (
            <BookmarkCheck aria-hidden className="size-5" />
          ) : (
            <Bookmark aria-hidden className="size-5" />
          )}
          <span className="uppercase">{optimisticSaved ? 'Unsave product' : 'Save product'}</span>
        </button>
      </form>
    </Boundary>
  );
}
