import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import type { RequestContextData } from '@/utils/request-context';
import { encodeRequestContext, getRequestContext } from '@/utils/request-context';

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
    <AuthProvider loggedIn={loggedIn}>
      <Boundary rendering="static">
        <Header
          rightContent={
            <Suspense fallback={<UserProfileSkeleton />}>
              <UserProfile />
            </Suspense>
          }
        />
      </Boundary>
      <main className="mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
        {modal}
      </main>
    </AuthProvider>
  );
}
