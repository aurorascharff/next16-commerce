'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';
import Boundary from '@/components/internal/Boundary';
import { cn } from '@/utils/cn';
import { toggleSaveProduct } from '../../product/product-actions';

type Props = {
  productId: number;
  initialSaved: boolean;
};

export default function SaveProductButton({ productId, initialSaved }: Props) {
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
      <form action={handleToggleSave} className="mr-2 flex items-center gap-2">
        <button
          className={cn(
            'text-primary hover:text-primary-dark flex cursor-pointer items-center gap-2 text-sm transition-colors',
            isPending && 'opacity-70',
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
