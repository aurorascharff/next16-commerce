import React, { Suspense } from 'react';
import Search, { SearchSkeleton } from '@/components/Search';
import SortButton, { SortButtonSkeleton } from '@/components/SortButton';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import CategoryFilters from '@/features/category/components/CategoryFilters';
import ProductList, { ProductListSkeleton } from '@/features/product/components/ProductList';
import type { SearchParams } from '@/features/product/components/ProductList';

export default function AllPage({ searchParams }: PageProps<'/all'>) {
  return (
    <>
      <WelcomeBanner />
      <Suspense fallback={<SearchSkeleton />}>
        <Search />
      </Suspense>
      <div className="flex h-full grow gap-12">
        <div className="hidden w-64 shrink-0 lg:block">
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
            {searchParams.then(params => (
              <ProductList searchParams={parseSearchParams(params)} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}

function parseSearchParams(params: Awaited<PageProps<'/all'>['searchParams']>): SearchParams {
  const { category, page, q, sort } = params;

  return {
    category: typeof category === 'string' ? category : undefined,
    page: typeof page === 'string' ? page : undefined,
    q: typeof q === 'string' ? q : undefined,
    sort: sort === 'asc' || sort === 'desc' ? sort : undefined,
  };
}
