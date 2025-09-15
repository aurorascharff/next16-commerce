import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  );
}
