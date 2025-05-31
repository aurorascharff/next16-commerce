import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import React from 'react';
import { getProduct } from '@/data/services/product';
import { cn } from '@/utils/cn';
import ProductImage from './ui/ProductImage';
import Skeleton from './ui/Skeleton';

type Props = {
  productId: number;
  imageClassName?: string;
  details?: React.ReactNode;
};

export default async function Product({ productId, details, imageClassName }: Props) {
  'use cache';
  cacheLife('hours');

  const product = await getProduct(productId);

  return (
    <div className="dark:bg-card-dark flex flex-col bg-white text-black">
      <ProductImage className={imageClassName} />
      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-2 text-xl font-bold text-black dark:text-white">{product.name}</h2>
        {product.description && <p className="text-gray mb-4 flex-1 text-sm">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-primary text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </div>
      {details}
    </div>
  );
}

export function ProductSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('dark:bg-card-dark flex flex-col bg-white', className)}>
      <div className="bg-card dark:bg-section h-24 w-full" />
      <Skeleton className="p-4" />
    </div>
  );
}
