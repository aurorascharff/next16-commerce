import Link from 'next/link';
import { Suspense } from 'react';
import { getIsAuthenticated } from '@/modules/auth/auth-queries';
import { BannerContainer } from './BannerContainer';

export async function PersonalBanner() {
  const isAuthenticated = await getIsAuthenticated();
  if (!isAuthenticated) return <GeneralBanner />;

  return (
    <>
      <h3 className="text-primary mb-2 text-lg font-semibold">Your Exclusive Discounts</h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        Check out your personalized offers and exclusive member discounts.
      </p>
      <div className="mt-3">
        <Link
          href="/user"
          className="text-primary hover:text-primary-dark inline-block text-sm font-medium transition-colors"
        >
          View Discounts
        </Link>
      </div>
    </>
  );
}

export default function GeneralBanner() {
  return (
    <>
      <h3 className="text-primary mb-2 text-lg font-semibold">Join Us for Amazing Discounts</h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        <Link href="/sign-in" className="text-primary hover:text-primary-dark inline-block">
          Sign up today
        </Link>{' '}
        and unlock exclusive discounts on your favorite products!
      </p>
    </>
  );
}

export function DiscountBanner() {
  return (
    <Suspense
      fallback={
        <BannerContainer>
          <GeneralBanner />
        </BannerContainer>
      }
    >
      <BannerContainer>
        <PersonalBanner />
      </BannerContainer>
    </Suspense>
  );
}
