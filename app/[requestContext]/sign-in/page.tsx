import Link from 'next/link';
import { redirect } from 'next/navigation';
import Card from '@/components/ui/Card';
import LoginForm from '@/features/auth/components/LoginForm';
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
      <LoginForm redirectUrl={redirectUrl as Route} />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account? <Link href="#">Sign up here</Link>
        </p>
      </div>
    </Card>
  );
}
