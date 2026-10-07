import { Suspense } from 'react';
import SignInForm, { SignInFormSkeleton } from '@/features/auth/components/SignInForm';
import type { Route } from 'next';

export default function SignInPage({ searchParams }: PageProps<'/sign-in'>) {
  return (
    <Suspense fallback={<SignInFormSkeleton />}>
      {searchParams.then(({ redirectUrl }) => (
        <SignInForm redirectUrl={typeof redirectUrl === 'string' ? (redirectUrl as Route) : undefined} />
      ))}
    </Suspense>
  );
}
