import React, { Suspense } from 'react';
import SortButton, { SortButtonSkeleton } from '@/components/SortButton';
import CategoryFilters, { CategoryFiltersSkeleton } from '@/features/category/components/CategoryFilters';
import ProductList, { ProductListSkeleton } from '@/features/product/components/ProductList';

export default async function AllPage({ searchParams }: PageProps<'/'>) {
  return (
    <>
      <div className="hidden w-64 flex-shrink-0 md:block">
        <div className="sticky top-4">
          <h3 className="mb-5 text-lg font-bold tracking-tight uppercase">Categories</h3>
          <Suspense fallback={<CategoryFiltersSkeleton />}>
            <CategoryFilters />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4 md:hidden">
          <Suspense fallback={<CategoryFiltersSkeleton />}>
            <CategoryFilters />
          </Suspense>
          <div className="flex justify-end">
            <Suspense fallback={<SortButtonSkeleton />}>
              <SortButton />
            </Suspense>
          </div>
        </div>
        <div className="hidden justify-end md:flex">
          <Suspense fallback={<SortButtonSkeleton />}>
            <SortButton />
          </Suspense>
        </div>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
