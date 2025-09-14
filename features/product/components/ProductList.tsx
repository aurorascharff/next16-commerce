import Link from 'next/link';
import React from 'react';
import Pagination from '@/components/Pagination';
import Boundary from '@/components/internal/Boundary';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Skeleton from '@/components/ui/Skeleton';
import { getProducts } from '../product-queries';
import type { Route } from 'next';

type Props = {
  page?: number;
  searchQuery?: string;
  sort?: 'asc' | 'desc';
};

export default async function ProductList({ searchQuery, sort, page = 1 }: Props) {
  const { products, totalPages, currentPage } = await getProducts(searchQuery, sort, page);
  const hasProducts = products.length > 0;

  if (!hasProducts) {
    return <p className="text-gray w-full self-center py-8 text-center italic">No products found.</p>;
  }

  return (
    <Boundary rendering="hybrid" hydration="server">
      <div className="flex h-full grow flex-col justify-between gap-4 sm:gap-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map(product => {
            const shouldPrefetch = currentPage === 1;
            return (
              <Link
                href={`/product/${product.id}` as Route}
                key={product.id}
                prefetch={shouldPrefetch}
                className="border-divider dark:border-divider-dark dark:bg-card-dark flex flex-row rounded-lg border bg-white transition-shadow hover:shadow-md"
              >
                <ImagePlaceholder className="h-full w-24 sm:w-28" />
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
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} searchQuery={searchQuery} sort={sort} />
          </div>
        )}
      </div>
    </Boundary>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => {
        return <Skeleton key={i} className="h-35" />;
      })}
    </div>
  );
}
