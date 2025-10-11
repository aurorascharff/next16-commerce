import React from 'react';
import Pagination from '@/components/Pagination';
import Boundary from '@/components/internal/Boundary';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import { getProducts } from '../product-queries';

export type SearchParams = {
  page?: string;
  q?: string;
  sort?: 'asc' | 'desc';
  category?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductList({ searchParams }: Props) {
  const resolvedSearchParams = (await searchParams) as SearchParams;
  const { q, sort, page, category } = resolvedSearchParams;
  const pageNumber = page ? parseInt(page, 10) : 1;
  const { products, totalPages, currentPage } = await getProducts(q, sort, pageNumber, 9, category);
  const hasProducts = products.length > 0;

  if (!hasProducts) {
    return <p className="text-gray w-full self-center py-8 text-center italic">No products found.</p>;
  }

  return (
    <Boundary rendering="hybrid" hydration="server">
      <div className="flex h-full grow flex-col justify-between gap-4 sm:gap-8">
        <div className="grid-cols-auto 3xl:grid-cols-3 grid gap-8 md:grid-cols-2">
          {products.map(product => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description || undefined}
                variant="compact"
                enableQuickPreview
              />
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination searchParams={resolvedSearchParams} currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </Boundary>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => {
        return <ProductCardSkeleton key={i} variant="compact" />;
      })}
    </div>
  );
}
