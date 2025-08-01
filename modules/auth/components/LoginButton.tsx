'use client';

import React, { use, useTransition } from 'react';
import { useAuth } from '@/modules/auth/components/AuthProvider';
import { logOut, logIn } from '../auth-actions';

export default function LoginButton() {
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated } = useAuth();
  const isAuth = use(isAuthenticated);

  return (
    <button
      aria-disabled={isPending}
      className="text-primary hover:text-primary-dark aria-disabled:text-gray cursor-pointer text-sm transition-colors aria-disabled:cursor-not-allowed aria-disabled:italic"
      onClick={() => {
        startTransition(async () => {
          if (isAuth) {
            await logOut();
          } else {
            await logIn('jane.smith@gmail.com');
          }
        });
      }}
    >
      {isPending ? (isAuth ? 'Logging out...' : 'Logging in...') : isAuth ? 'Log out' : 'Log in'}
    </button>
  );
}
