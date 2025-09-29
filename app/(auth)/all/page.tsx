import React, { Suspense } from 'react';
import SortButton, { SortButtonSkeleton } from '@/components/SortButton';
import CategoryFilters from '@/features/category/components/CategoryFilters';
import ProductList, { ProductListSkeleton } from '@/features/product/components/ProductList';

export default async function AllPage({ searchParams }: PageProps<'/'>) {
  return (
    <>
      <div className="hidden w-64 flex-shrink-0 lg:block">
        <div className="sticky top-4">
          <h3 className="mb-5 text-lg font-bold tracking-tight uppercase">Categories</h3>
          <CategoryFilters />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4 lg:hidden">
          <CategoryFilters />
          <div className="flex justify-end">
            <Suspense fallback={<SortButtonSkeleton />}>
              <SortButton />
            </Suspense>
          </div>
        </div>
        <div className="hidden justify-end lg:flex">
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
