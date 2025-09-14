'use client';

import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/Button';
import { logIn } from '../auth-actions';
import type { Route } from 'next';

export default function LoginForm({ redirectUrl }: { redirectUrl?: Route | URL }) {
  const queryClient = useQueryClient();

  return (
    <form
      action={() => {
        logIn('jane.smith@gmail.com', redirectUrl);
        queryClient.invalidateQueries({ queryKey: ['currentAccount'] });
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" type="email" disabled defaultValue="jane.smith@gmail.com" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          disabled
          defaultValue={Math.random().toString(36).slice(-12)}
          required
        />
      </div>
      <Button className="w-full">Sign In</Button>
    </form>
  );
}
