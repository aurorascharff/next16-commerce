import { ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Search from '@/components/Search';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';
import CategoryFilters, { CategoryFiltersSkeleton } from '@/features/category/components/CategoryFilters';
import ProductList, { ProductListSkeleton } from '@/features/product/components/ProductList';
import { getRequestContext } from '@/utils/request-context';

type SearchParams = {
  page?: string;
  q?: string;
  sort?: 'asc' | 'desc';
  category?: string;
};

export default async function RootPage({ searchParams, params }: PageProps<'/[requestContext]/all'>) {
  const { q, sort, page, category } = (await searchParams) as SearchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { loggedIn } = getRequestContext(await params);

  return (
    <>
      <WelcomeBanner loggedIn={loggedIn} />
      <Search />
      <div className="flex h-full grow gap-12">
        <div className="hidden w-64 flex-shrink-0 md:block">
          <div className="sticky top-4">
            <h3 className="mb-4 text-lg font-bold tracking-tight uppercase">Categories</h3>
            <Suspense fallback={<CategoryFiltersSkeleton />}>
              <CategoryFilters selectedCategory={category} searchQuery={q} sort={sort} />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 md:hidden">
            <Suspense fallback={<CategoryFiltersSkeleton />}>
              <CategoryFilters selectedCategory={category} searchQuery={q} sort={sort} />
            </Suspense>
            <div className="flex justify-end">
              <SortButton sort={sort} searchQuery={q} category={category} />
            </div>
          </div>
          <div className="hidden justify-end md:flex">
            <SortButton sort={sort} searchQuery={q} category={category} />
          </div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList searchQuery={q} sort={sort} page={currentPage} category={category} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function SortButton({
  sort,
  searchQuery,
  category,
}: {
  sort?: 'asc' | 'desc';
  searchQuery?: string;
  category?: string;
}) {
  const nextSort = sort === 'asc' ? 'desc' : 'asc';

  const queryParams = {
    ...(searchQuery && { q: searchQuery }),
    ...(category && { category }),
    sort: nextSort,
  };

  return (
    <Boundary hydration="hybrid">
      <Link
        scroll={false}
        href={{ pathname: '/all', query: queryParams }}
        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
      >
        <LinkStatus>
          <div className="flex items-center gap-2">
            {nextSort === 'desc' ? (
              <ArrowUp className="bg-accent size-3.5 p-0.5 text-white dark:text-black" />
            ) : (
              <ArrowDown className="bg-accent size-3.5 p-0.5 text-white dark:text-black" />
            )}
            Sort {nextSort === 'desc' ? 'A-Z' : 'Z-A'}
          </div>
        </LinkStatus>
      </Link>
    </Boundary>
  );
}
