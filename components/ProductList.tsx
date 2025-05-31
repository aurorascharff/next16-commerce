import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import Link from 'next/link';
import React from 'react';
import { getProducts } from '@/data/services/product';
import ProductImage from './ui/ProductImage';
import Skeleton from './ui/Skeleton';

type Props = {
  searchQuery?: string;
};

export default async function ProductList({ searchQuery }: Props) {
  'use cache';
  cacheLife('hours');

  const products = await getProducts(searchQuery);
  const hasProducts = products.length > 0;

  if (!hasProducts) {
    return <p className="text-gray italic">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="border-divider dark:border-divider-dark dark:bg-card-dark flex flex-row rounded-lg border bg-white hover:shadow-sm"
          >
            <ProductImage className="h-full w-24" />
            <div className="flex flex-1 flex-col gap-1 p-3">
              <h2 className="group-hover:text-primary line-clamp-1 text-base font-semibold">{product.name}</h2>
              {product.description && <p className="text-gray line-clamp-2 text-xs">{product.description}</p>}
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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
