import Link from 'next/link';
import { Suspense } from 'react';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import { getUserDiscounts } from '@/features/user/user-queries';
import { slow } from '@/utils/slow';
import Boundary from '../internal/Boundary';
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
      <Boundary hydration="server" rendering="dynamic">
        <div className="flex flex-col justify-between">
          <span className="mb-3 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
            Exclusive Discount
          </span>
          <h3 className="mb-3 font-sans text-2xl leading-tight font-bold tracking-tight">
            Welcome back {account?.firstName}
          </h3>
          <p className="mb-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {featuredDiscount ? (
              <>
                Use code{' '}
                <span className="bg-black px-2 py-1 font-mono font-semibold text-white dark:bg-white dark:text-black">
                  {featuredDiscount.code}
                </span>{' '}
                for <span className="font-bold">{featuredDiscount.percentage}% off</span> –{' '}
                {featuredDiscount.description.toLowerCase()}. Expires {featuredDiscount.expiry.toLocaleDateString()}.
              </>
            ) : (
              <>No active discounts. Check back soon.</>
            )}
          </p>
          {discounts.length > 0 && (
            <div className="mt-2">
              <Link
                href={'/user' as Route}
                className="inline-flex items-center text-xs font-semibold tracking-wide uppercase"
              >
                {discounts.length > 1 ? `View all ${discounts.length} discounts` : 'View discount details'} →
              </Link>
            </div>
          )}
        </div>
      </Boundary>
    </>
  );
}

export default function GeneralBanner() {
  return (
    <>
      <Boundary hydration="hybrid">
        <div className="flex flex-col justify-between pb-8">
          <span className="mb-3 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
            Member Perks
          </span>
          <h3 className="mb-5 font-sans text-2xl leading-tight font-bold tracking-tight">Unlock Exclusive Discounts</h3>
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            <Link href="/sign-in" className="font-bold">
              Sign up
            </Link>{' '}
            to access special offers on your favorite products.
          </p>
        </div>
      </Boundary>
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
