import React, { Suspense } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';

export default async function AuthLayout({ children, modal }: LayoutProps<'/'>) {
  const loggedIn = getIsAuthenticated();

  return (
    <AuthProvider loggedIn={loggedIn}>
      <AppLayout headerContent={<Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>}>
        {children}
        {modal}
      </AppLayout>
    </AuthProvider>
  );
}
