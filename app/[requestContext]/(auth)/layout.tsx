import React, { Suspense } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import { getRequestContext } from '@/utils/request-context';

export default async function AuthLayout({ children, modal, params }: LayoutProps<'/[requestContext]'>) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <AuthProvider loggedIn={loggedIn}>
      <AppLayout headerContent={<Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>}>
        {children}
        {modal}
      </AppLayout>
    </AuthProvider>
  );
}
