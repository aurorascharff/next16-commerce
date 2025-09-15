import { ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Search from '@/components/Search';
import { DiscountBanner } from '@/components/banner/Banner';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';
import ProductList, { ProductListSkeleton } from '@/features/product/components/ProductList';
import { getRequestContext } from '@/utils/request-context';
import type { Route } from 'next';

type SearchParams = {
  page?: string;
  q?: string;
  sort?: 'asc' | 'desc';
};

export default async function RootPage({ searchParams, params }: PageProps<'/[requestContext]'>) {
  const { q, sort, page } = (await searchParams) as SearchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { loggedIn } = getRequestContext(await params);

  return (
    <>
      <DiscountBanner loggedIn={loggedIn} />
      <Search />
      <div className="flex h-full grow flex-col gap-6">
        <SortButton sort={sort} searchQuery={q} />
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList searchQuery={q} sort={sort} page={currentPage} />
        </Suspense>
      </div>
    </>
  );
}

function SortButton({ sort, searchQuery }: { sort?: 'asc' | 'desc'; searchQuery?: string; page?: string }) {
  const nextSort = sort === 'asc' ? 'desc' : 'asc';

  const queryParams = {
    ...(searchQuery && { q: searchQuery }),
    sort: nextSort,
  };

  return (
    <Boundary hydration="hybrid">
      <Link
        prefetch
        scroll={false}
        href={{ pathname: '/' as Route, query: queryParams }}
        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
      >
        <LinkStatus>
          <div className="flex items-center gap-2">
            {nextSort === 'desc' ? (
              <ArrowUp className="bg-accent size-3.5 rounded-none p-0.5 text-white dark:text-black" />
            ) : (
              <ArrowDown className="bg-accent size-3.5 rounded-none p-0.5 text-white dark:text-black" />
            )}
            Sort {nextSort === 'desc' ? 'A-Z' : 'Z-A'}
          </div>
        </LinkStatus>
      </Link>
    </Boundary>
  );
}
