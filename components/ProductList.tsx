import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import Link from 'next/link';
import React from 'react';
import { getProducts } from '@/data/services/product';
import ProductImage from './ui/ProductImage';
import Skeleton from './ui/Skeleton';

type Props = {
  searchQuery?: string;
  sort?: 'asc' | 'desc';
};

export default async function ProductList({ searchQuery, sort }: Props) {
  'use cache';
  cacheLife('hours');

  const products = await getProducts(searchQuery, sort);
  const hasProducts = products.length > 0;

  if (!hasProducts) {
    return <p className="text-gray italic">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(product => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="border-divider dark:border-divider-dark dark:bg-card-dark flex flex-row rounded-lg border bg-white transition-shadow hover:shadow-md"
          >
            <ProductImage className="h-full w-24 sm:w-28" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h2 className="group-hover:text-primary line-clamp-1 text-base font-semibold">{product.name}</h2>
              {product.description && (
                <p className="text-gray line-clamp-2 text-xs leading-relaxed">{product.description}</p>
              )}
              <p className="text-primary mt-auto text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => {
        return <Skeleton key={i} className="h-32" />;
      })}
    </div>
  );
}
