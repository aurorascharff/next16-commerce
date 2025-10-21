import Link from 'next/link';
import React, { Suspense } from 'react';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import BoundaryToggle from './internal/BoundaryToggle';

export default function Header() {
  return (
    <>
      <header className="border-divider dark:border-divider-dark 3xl:px-60 flex min-h-20 items-center justify-between gap-4 border-b bg-white px-4 py-4 sm:px-10 2xl:px-40 dark:bg-black">
        <h1 className="text-3xl font-bold">
          <Link href="/" className="text-primary hover:text-primary-dark font-bold normal-case">
            Commerce
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>
        </div>
      </header>
      <BoundaryToggle />
    </>
  );
}
