'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import useSWR from 'swr';
import Boundary from '@/components/internal/Boundary';
import LoginButton from '@/features/auth/components/LoginButton';
import { fetcher } from '@/utils/fetcher';
import type { Account } from '@prisma/client';

export default function UserProfile() {
  const { data: account, isLoading } = useSWR<Account>('/api/user', fetcher);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <Boundary rendering="static" hydration="client">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-1">
          {account && <span className="text-sm font-medium tracking-wide">{account.name}</span>}
          <Suspense>
            <LoginButton />
          </Suspense>
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
    <div className="flex items-center gap-2">
      <div className="skeleton-animation h-6 w-6 rounded-full" />
      <div className="skeleton-animation h-4 w-16 rounded" />
    </div>
  );
}
