'use client';

import { Bookmark, BookmarkCheck, LoaderCircle } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';

import { toggleSaveProduct } from '../product-actions';

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
    <form action={handleToggleSave} className="mr-2 flex items-center gap-2">
      <button
        className="text-primary hover:text-primary-dark flex items-center gap-2 text-sm transition-colors disabled:opacity-50"
        title={optimisticSaved ? 'Remove from saved' : 'Save for later'}
      >
        {optimisticSaved ? <BookmarkCheck className="size-5" /> : <Bookmark className="size-5" />}
        <span>{optimisticSaved ? 'Unsave product' : 'Save product'}</span>
      </button>
      {isPending && (
        <div className="text-gray h-fit w-fit animate-spin">
          <LoaderCircle aria-hidden="true" width={20} height={20} />
        </div>
      )}
    </form>
  );
}
