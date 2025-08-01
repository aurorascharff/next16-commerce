import { User } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { getCurrentAccount } from '../auth-queries';
import LoginButton from './LoginButton';

export default async function UserProfile() {
  const account = await getCurrentAccount();

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm">{account?.name}</span>
        <Suspense>
          <LoginButton />
        </Suspense>
      </div>
      <Link href="/user">
        <span className="sr-only">Go to Profile</span>
        <User className="text-primary hover:text-primary-dark size-8 cursor-pointer rounded-full p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-800" />
      </Link>
    </div>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
