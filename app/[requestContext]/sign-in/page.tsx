import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { logIn } from '@/features/auth/auth-actions';
import { getRequestContext } from '@/utils/request-context';
import type { Route } from 'next';

export default async function SignInPage({ searchParams, params }: PageProps<'/[requestContext]/sign-in'>) {
  const { loggedIn } = getRequestContext(await params);
  const { redirectUrl } = await searchParams;

  if (loggedIn) {
    redirect('/' as Route);
  }

  return (
    <Boundary rendering="static" hydration="hybrid">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account to continue shopping</p>
        </div>
        <Card className="min-w-[350px]">
          <form action={logIn.bind(null, 'jane.smith@gmail.com', redirectUrl as Route)} className="space-y-6">
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
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account? <Link href="#">Sign up here</Link>
            </p>
          </div>
        </Card>
      </div>
    </Boundary>
  );
}
