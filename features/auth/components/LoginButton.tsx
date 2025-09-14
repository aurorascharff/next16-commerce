'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import Boundary from '@/components/internal/Boundary';
import { logOut } from '../auth-actions';
import { useAuth } from './AuthProvider';

export default function LoginButton() {
  const [isPending, startTransition] = useTransition();
  const { loggedIn } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Boundary hydration="client">
      <button
        aria-disabled={isPending}
        className="text-primary hover:text-primary-dark aria-disabled:text-gray cursor-pointer text-sm transition-colors aria-disabled:cursor-not-allowed aria-disabled:italic"
        onClick={() => {
          if (loggedIn) {
            startTransition(async () => {
              await logOut();
              queryClient.invalidateQueries({ queryKey: ['currentAccount'] });
            });
          } else {
            router.push('/sign-in');
          }
        }}
      >
        {loggedIn ? 'Sign out' : 'Sign in'} {isPending && '...'}
      </button>
    </Boundary>
  );
}
