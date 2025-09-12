'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { signOut } from '../auth-actions';

export default function LoginButton({ isAuth }: { isAuth: boolean }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      aria-disabled={isPending}
      className="text-primary hover:text-primary-dark aria-disabled:text-gray cursor-pointer text-sm transition-colors aria-disabled:cursor-not-allowed aria-disabled:italic"
      onClick={() => {
        startTransition(async () => {
          if (isAuth) {
            await signOut();
          } else {
            router.push('/sign-in');
          }
        });
      }}
    >
      {isAuth ? 'Sign out' : 'Sign in'} {isPending && '...'}
    </button>
  );
}
