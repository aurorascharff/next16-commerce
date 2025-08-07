import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Skeleton from '@/components/ui/Skeleton';

import { cn } from '@/utils/cn';
import { getProduct } from '../product-queries';

type Props = {
  productId: number;
  imageClassName?: string;
  details?: React.ReactNode;
};

export default async function Product({ productId, details, imageClassName }: Props) {
  const product = await getProduct(productId);

  return (
    <div className="flex flex-col">
      <ImagePlaceholder className={imageClassName} />
      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
        {product.description && <p className="text-gray mb-4 flex-1 text-sm">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-primary text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </div>
      {details}
    </div>
  );
}

export function ProductSkeleton({ className, isDetails = false }: { className?: string; isDetails?: boolean }) {
  return (
    <div className={cn('dark:bg-card-dark flex flex-col bg-white', className)}>
      <div className={cn('bg-card dark:bg-section w-full', isDetails ? 'h-96' : 'h-60')} />
      <Skeleton className="p-4" />
    </div>
  );
}
