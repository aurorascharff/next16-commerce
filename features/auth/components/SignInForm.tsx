import Link from 'next/link';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { logIn } from '@/features/auth/auth-actions';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import type { Route } from 'next';

export default async function SignInForm({ redirectUrl }: { redirectUrl?: Route }) {
  const loggedIn = await getIsAuthenticated();

  if (loggedIn) {
    redirect('/');
  }

  return (
    <Card className="min-w-[350px]">
      <form action={logIn.bind(null, 'jane.smith@gmail.com', redirectUrl)} className="space-y-6">
        <div>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" disabled defaultValue="jane.smith@gmail.com" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" disabled defaultValue="jane.smith1234" required />
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

export function SignInFormSkeleton() {
  return (
    <Card className="min-h-72 min-w-[350px]">
      <div className="skeleton-animation h-64 w-full rounded" />
    </Card>
  );
}
