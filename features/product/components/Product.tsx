import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
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
  'use cache';

  cacheLife('max');
  cacheTag('product-' + productId);

  const product = await getProduct(productId);

  return (
    <Boundary rendering="hybrid" hydration="server">
      <div className="flex flex-col bg-white dark:bg-black">
        <ImagePlaceholder className={imageClassName} />
        <div className="flex flex-1 flex-col p-5">
          <h2 className="mb-3 text-xl font-bold tracking-tight">{product.name}</h2>
          {product.description && (
            <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between">
            <p className="text-accent text-lg font-bold tracking-wide">${product.price.toFixed(2)}</p>
          </div>
        </div>
        {details}
      </div>
    </Boundary>
  );
}

export function ProductSkeleton({ className, isDetails = false }: { className?: string; isDetails?: boolean }) {
  return (
    <div className={cn('flex flex-col bg-white dark:bg-black', className)}>
      <div className={cn('bg-card dark:bg-card-dark w-full', isDetails ? 'h-96' : 'h-60')} />
      <Skeleton className="p-[22px]" />
    </div>
  );
}
