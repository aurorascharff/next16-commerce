'use cache';

import React, { Suspense } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';

export default async function AuthLayout({ children, modal }: LayoutProps<'/'>) {
  // const loggedIn = getIsAuthenticated();

  return (
    <AuthProvider loggedIn={Promise.resolve(false)}>
      <AppLayout headerContent={<Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>}>
        {children}
        {modal}
      </AppLayout>
    </AuthProvider>
  );
}
