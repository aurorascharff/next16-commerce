import Link from 'next/link';
import { Suspense } from 'react';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import { getUserDiscounts } from '@/features/user/user-queries';
import { slow } from '@/utils/slow';
import { BannerContainer } from './BannerContainer';
import type { Route } from 'next';

export async function PersonalBanner({ loggedIn }: { loggedIn: boolean }) {
  await slow();
  if (!loggedIn) return <GeneralBanner />;

  const account = await getCurrentAccount();
  const discounts = await getUserDiscounts();
  const featuredDiscount = discounts[0];

  return (
    <>
      <h3 className="text-primary mb-2 text-lg font-semibold">Your Exclusive Discount</h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        Welcome back, {account?.firstName}!
        {featuredDiscount ? (
          <>
            {' '}
            Use code <span className="text-primary font-semibold">{featuredDiscount.code}</span> for{' '}
            <span className="font-medium">{featuredDiscount.percentage}% off</span> -{' '}
            {featuredDiscount.description.toLowerCase()}. Expires {featuredDiscount.expiry.toLocaleDateString()}.
          </>
        ) : (
          ' No discounts available at the moment, but check back soon for exclusive offers.'
        )}
      </p>
      {discounts.length > 0 && (
        <div className="mt-3">
          <Link
            href={'/user' as Route}
            className="text-primary hover:text-primary-dark inline-block text-sm font-medium transition-colors"
          >
            {discounts.length > 1 ? `View All ${discounts.length} Discounts` : 'View Discount Details'} →
          </Link>
        </div>
      )}
    </>
  );
}

export default function GeneralBanner() {
  return (
    <>
      <h3 className="text-primary mb-2 text-lg font-semibold">Join Us for Amazing Discounts</h3>
      <p className="mb-3 pb-6 text-sm text-gray-700 dark:text-gray-300">
        <Link href={'/sign-in' as Route} className="text-primary hover:text-primary-dark inline-block">
          Sign up today
        </Link>{' '}
        and unlock exclusive discounts on your favorite products!
      </p>
    </>
  );
}

export function DiscountBanner({ loggedIn }: { loggedIn: boolean }) {
  return (
    <BannerContainer>
      <Suspense fallback={<GeneralBanner />}>
        <PersonalBanner loggedIn={loggedIn} />
      </Suspense>
    </BannerContainer>
  );
}
