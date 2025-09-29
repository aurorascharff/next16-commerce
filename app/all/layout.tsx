import React, { Suspense } from 'react';
import Search, { SearchSkeleton } from '@/components/Search';

export default async function AllLayout({ children }: LayoutProps<'/all'>) {
  return (
    <>
      <Suspense fallback={<SearchSkeleton />}>
        <Search />
      </Suspense>
      <div className="flex h-full grow gap-12">{children}</div>
    </>
  );
}
