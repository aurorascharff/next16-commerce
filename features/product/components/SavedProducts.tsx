import Link from 'next/link';
import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { getSavedProducts } from '../product-queries';
import SaveProductButton from './SaveProductButton';

export default async function SavedProducts() {
  const savedProducts = await getSavedProducts();

  if (savedProducts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">You haven&apos;t saved any products yet.</p>
        <Link href="/" className="text-primary hover:text-primary-dark mt-2 inline-block text-sm font-medium">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedProducts.map(product => {
        return (
          <div
            key={product.id}
            className="border-divider dark:border-divider-dark flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800/50"
          >
            <ImagePlaceholder className="size-16 flex-shrink-0 rounded" />
            <div className="min-w-0 flex-1">
              <Link href={`/product/${product.id}`} className="block">
                <h3 className="truncate font-medium">{product.name}</h3>
                <p className="text-primary mt-1 font-medium">${product.price.toFixed(2)}</p>
              </Link>
            </div>
            <SaveProductButton productId={product.id} initialSaved={true} />
          </div>
        );
      })}
    </div>
  );
}

export function SavedProductsSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark flex items-center gap-4 rounded-lg border p-4">
      <div className="size-16 flex-shrink-0 rounded bg-gray-200 dark:bg-neutral-800" />
      <div className="flex-1">
        <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-2 h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="h-8 w-8 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}
