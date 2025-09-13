import { ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Search from '@/components/Search';
import { DiscountBanner } from '@/components/banner/Banner';
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
      <div className="flex h-full grow flex-col gap-4">
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
    <Link
      prefetch
      scroll={false}
      href={{ pathname: '/' as Route, query: queryParams }}
      className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
    >
      <LinkStatus>
        <div className="flex items-center gap-2">
          {nextSort === 'desc' ? <ArrowUp className="mr-1" /> : <ArrowDown className="mr-1" />}
          Sort {nextSort === 'desc' ? 'A-Z' : 'Z-A'}
        </div>
      </LinkStatus>
    </Link>
  );
}
