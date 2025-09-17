import Link from 'next/link';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { getSavedProducts } from '../../product/product-queries';
import SaveProductButton from './SaveProductButton';

export default async function SavedProducts() {
  const savedProducts = await getSavedProducts();

  if (savedProducts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">You haven&apos;t saved any products yet.</p>
        <Link
          href="/"
          className="text-primary hover:text-primary-dark mt-2 inline-block text-sm font-semibold tracking-wide uppercase"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <Boundary rendering="dynamic" hydration="server">
      <div className="space-y-3">
        {savedProducts.map(product => {
          return (
            <div
              key={product.id}
              className="border-divider dark:border-divider-dark flex items-center gap-4 border bg-white p-4 transition-colors hover:bg-gray-50/50 dark:bg-black dark:hover:bg-neutral-800/30"
            >
              <ImagePlaceholder variant="simple" className="size-12 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="truncate text-sm font-semibold tracking-wide uppercase">{product.name}</h3>
                  <p className="text-primary text-sm font-medium">${product.price.toFixed(2)}</p>
                </Link>
              </div>
              <SaveProductButton productId={product.id} initialSaved={true} />
            </div>
          );
        })}
      </div>
    </Boundary>
  );
}

export function SavedProductsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div
            key={index}
            className="border-divider dark:border-divider-dark flex items-center gap-4 border bg-white p-4 dark:bg-black"
          >
            <div className="size-12 flex-shrink-0 rounded bg-gray-200 dark:bg-neutral-800" />
            <div className="flex-1">
              <div className="skeleton-animation mb-1 h-4 w-3/4 rounded" />
              <div className="skeleton-animation h-3 w-1/4 rounded" />
            </div>
            <div className="skeleton-animation h-8 w-8 rounded" />
          </div>
        );
      })}
    </div>
  );
}
