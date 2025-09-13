import Link from 'next/link';
import React, { Suspense } from 'react';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import { getRequestContext } from '@/utils/request-context';
import type { Route } from 'next';

export default async function RequestContextLayout({ children, modal, params }: LayoutProps<'/[requestContext]'>) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <AuthProvider loggedIn={loggedIn}>
      <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
        <h1 className="text-3xl font-bold">
          <Link prefetch href={'/' as Route} className="text-primary hover:text-primary-dark font-bold">
            Commerce
          </Link>
        </h1>
        <Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>
      </header>
      <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
        {modal}
      </main>
    </AuthProvider>
  );
}
