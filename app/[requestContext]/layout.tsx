import Link from 'next/link';
import React, { Suspense } from 'react';
import Footer from '@/components/Footer';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import { encodeRequestContext, getRequestContext, type RequestContextData } from '@/utils/request-context';
import type { Route } from 'next';

export async function generateStaticParams() {
  const contexts: RequestContextData[] = [{ loggedIn: false }, { loggedIn: true }];
  return contexts.map(context => {
    return {
      requestContext: encodeRequestContext(context),
    };
  });
}

export default async function RequestContextLayout({ children, modal, params }: LayoutProps<'/[requestContext]'>) {
  const { loggedIn } = await getRequestContext(params);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
          <h1 className="text-3xl font-bold">
            <Link prefetch href={'/' as Route} className="text-primary hover:text-primary-dark font-bold">
              Commerce
            </Link>
          </h1>
          <Suspense fallback={<UserProfileSkeleton />}>{<UserProfile loggedIn={loggedIn} />}</Suspense>
        </header>
        <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
          {children}
          {modal}
        </main>
      </div>
      <Footer />
    </>
  );
}
