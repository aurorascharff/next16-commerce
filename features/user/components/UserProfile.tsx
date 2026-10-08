import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import LoginButton from '@/features/auth/components/LoginButton';

export default async function UserProfile() {
  const account = await getCurrentAccount();

  return (
    <Boundary rendering="dynamic" hydration="server">
      <div className="flex w-40 items-center justify-end gap-2">
        <div className="flex min-w-0 flex-col items-end gap-1">
          {account && <span className="max-w-28 truncate text-sm font-medium tracking-wide">{account.name}</span>}
          <LoginButton />
        </div>
        {account ? (
          <Link href="/user">
            <span className="sr-only">Go to Profile</span>
            <User
              aria-hidden
              className="size-8 cursor-pointer rounded-full p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
            />
          </Link>
        ) : (
          <User aria-hidden className="text-gray size-8 rounded-full p-1" />
        )}
      </div>
    </Boundary>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="flex h-8 w-40 items-center justify-end gap-2">
      <div className="skeleton-animation h-4 w-20 rounded" />
      <div className="skeleton-animation size-8 rounded-full" />
    </div>
  );
}
