import React from 'react';
import { getProduct } from '@/data/services/product';
import { cn } from '@/utils/cn';

type Props = {
  productId: number;
  className?: string;
};

export default async function Product({ productId, className }: Props) {
  const product = await getProduct(productId);

  return (
    <div className={cn('dark:bg-card-dark dark:w flex flex-col overflow-hidden bg-white text-black', className)}>
      <div className="bg-card dark:bg-section flex h-48 w-full items-center justify-center">
        <span className="text-gray">Product Image</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-2 text-xl font-bold text-black dark:text-white">{product.name}</h2>
        {product.description && <p className="text-gray mb-4 flex-1 text-sm">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-primary text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
