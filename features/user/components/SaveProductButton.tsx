'use client';

import { Bookmark } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';
import Boundary from '@/components/internal/Boundary';
import { cn } from '@/utils/cn';
import { toggleSaveProduct } from '../user-actions';

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
    <Boundary hydration="client">
      <form action={handleToggleSave}>
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={cn(
            'text-primary hover:text-primary-dark flex cursor-pointer items-center gap-2 px-1 py-1.5 text-left text-sm whitespace-nowrap transition-colors',
            isPending && 'opacity-70',
            className,
          )}
        >
          <Bookmark aria-hidden className={cn('size-5', optimisticSaved && 'fill-current')} />
          <span className="uppercase">{optimisticSaved ? 'Unsave product' : 'Save product'}</span>
        </button>
      </form>
    </Boundary>
  );
}
