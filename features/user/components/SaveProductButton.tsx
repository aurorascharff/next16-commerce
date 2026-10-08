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
          aria-pressed={optimisticSaved}
          className={cn(
            'flex min-w-40 cursor-pointer items-center justify-center gap-2 rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors',
            optimisticSaved
              ? 'border-divider bg-card dark:border-divider-dark dark:bg-card-dark text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800'
              : 'text-primary hover:bg-accent-fade hover:text-primary-dark border-transparent',
            isPending && 'opacity-70',
            className,
          )}
        >
          {optimisticSaved ? (
            <BookmarkCheck aria-hidden className="size-5" />
          ) : (
            <Bookmark aria-hidden className="size-5" />
          )}
          <span className="uppercase">{optimisticSaved ? 'Saved' : 'Save product'}</span>
        </button>
      </form>
    </Boundary>
  );
}
