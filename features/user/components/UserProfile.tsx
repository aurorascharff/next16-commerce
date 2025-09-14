'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import LoginButton from '@/features/auth/components/LoginButton';
import type { Account } from '@prisma/client';

async function fetchUser() {
  const res = await fetch('/api/user');
  return res.json();
}

export default function UserProfile() {
  const { data: account, isLoading } = useQuery<Account>({
    queryFn: fetchUser,
    queryKey: ['currentAccount'],
  });
  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <Boundary rendering="static" hydration="client">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm">{account?.name}</span>
          <LoginButton />
        </div>
        <Link href="/user" prefetch>
          {account?.name ? (
            <>
              <span className="sr-only">Go to Profile</span>
              <User
                aria-hidden
                className="text-primary hover:text-primary-dark size-8 cursor-pointer rounded-full p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
              />
            </>
          ) : (
            <User aria-hidden className="text-gray size-8 rounded-full p-1" />
          )}
        </Link>
      </div>
    </Boundary>
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
