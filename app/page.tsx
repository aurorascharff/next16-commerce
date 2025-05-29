import React, { Suspense } from 'react';
import ProductList from '@/components/ProductList';
import Search from '@/components/Search';
import Skeleton from '@/components/ui/Skeleton';

type Props = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function RootPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <>
      <Search />
      <Suspense fallback={<Skeleton />}>
        <ProductList searchQuery={q} />
      </Suspense>
    </>
  );
}
