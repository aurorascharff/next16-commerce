import Link from 'next/link';
import { Suspense } from 'react';
import Boundary from '@/components/internal/Boundary';
import LinkButton from '@/components/ui/LinkButton';
import { getIsAuthenticated } from '../user-queries';
import Recommendations, { RecommendationsSkeleton } from './Recommendations';

export async function PersonalizedProducts() {
  const loggedIn = await getIsAuthenticated();

  if (!loggedIn) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">Something for You?</h2>
          <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            Personalized recommendations based on your interests
          </p>
        </div>
        <Link href="/user" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
          View Saved →
        </Link>
      </div>
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>
    </>
  );
}

export async function MembershipLink() {
  const loggedIn = await getIsAuthenticated();

  if (!loggedIn) {
    return <GeneralMembershipLink />;
  }

  return (
    <Boundary rendering="dynamic" hydration="server">
      <LinkButton href="/user" variant="primary">
        Go to Dashboard
      </LinkButton>
    </Boundary>
  );
}

export function GeneralMembershipLink() {
  return (
    <LinkButton href="/sign-in" variant="primary">
      Sign In to Join
    </LinkButton>
  );
}
