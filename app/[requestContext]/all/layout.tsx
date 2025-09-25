import React, { Suspense } from 'react';
import Search, { SearchSkeleton } from '@/components/Search';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import { getRequestContext } from '@/utils/request-context';

export default async function AllLayout({ children, params }: LayoutProps<'/[requestContext]/all'>) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <>
      <WelcomeBanner loggedIn={loggedIn} />
      <Suspense fallback={<SearchSkeleton />}>
        <Search />
      </Suspense>
      <div className="flex h-full grow gap-12">{children}</div>
    </>
  );
}
