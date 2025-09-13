'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { logOut } from '../auth-actions';

export default function LoginButton({ loggedIn }: { loggedIn: boolean }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      aria-disabled={isPending}
      className="text-primary hover:text-primary-dark aria-disabled:text-gray cursor-pointer text-sm transition-colors aria-disabled:cursor-not-allowed aria-disabled:italic"
      onClick={() => {
        startTransition(async () => {
          if (loggedIn) {
            await logOut();
          } else {
            router.push('/sign-in');
          }
        });
      }}
    >
      {loggedIn ? 'Sign out' : 'Sign in'} {isPending && '...'}
    </button>
  );
}
