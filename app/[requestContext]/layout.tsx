import React, { Suspense } from 'react';
import Header from '@/components/Header';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import { encodeRequestContext, getRequestContext, type RequestContextData } from '@/utils/request-context';

export async function generateStaticParams() {
  const contexts: RequestContextData[] = [{ loggedIn: false }, { loggedIn: true }];
  return contexts.map(context => {
    return {
      requestContext: encodeRequestContext(context),
    };
  });
}

export default async function RequestContextLayout({ children, modal, params }: LayoutProps<'/[requestContext]'>) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <>
      <Header
        rightContent={<Suspense fallback={<UserProfileSkeleton />}>{<UserProfile loggedIn={loggedIn} />}</Suspense>}
      />
      <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
        {modal}
      </main>
    </>
  );
}
