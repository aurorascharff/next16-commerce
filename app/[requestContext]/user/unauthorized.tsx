import { Lock } from 'lucide-react';
import React, { Suspense } from 'react';
import LoginButton from '@/features/auth/components/LoginButton';

export default async function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center">
      <Lock className="text-primary mb-4 size-16" />
      <h1 className="text-primary text-4xl font-bold">401</h1>
      <p className="mt-4 text-xl font-semibold">Unauthorized Access</p>
      <p className="text-gray dark:text-gray mt-4 max-w-md">
        You need to sign in to access this page. Please sign in with your account to continue.
      </p>
      <div className="mt-6">
        <Suspense fallback={<div className="h-10 w-24 rounded bg-gray-200 dark:bg-gray-700" />}>
          <LoginButton />
        </Suspense>
      </div>
    </div>
  );
}
