'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import Boundary from '../internal/Boundary';

export default function WelcomeBanner({ loggedIn }: { loggedIn: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <Boundary>
      <div className="border-divider dark:border-divider-dark from-accent/5 via-accent/3 dark:from-accent/10 dark:via-accent/5 relative flex items-start justify-between gap-3 border bg-gradient-to-tr to-transparent p-4 sm:gap-4 sm:p-5 dark:to-transparent">
        <div className="flex-1">
          <PersonalBanner loggedIn={loggedIn} />
        </div>
        <button
          onClick={() => {
            setDismissed(true);
          }}
          className="group text-gray/70 hover:border-divider hover:text-accent dark:text-gray/60 dark:hover:text-accent -m-1 inline-flex h-6 w-6 items-center justify-center border border-transparent p-0 transition-colors"
          aria-label="Dismiss banner"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </Boundary>
  );
}

export function PersonalBanner({ loggedIn }: { loggedIn: boolean }) {
  const { data, isLoading } = useSWR('/api/discount-data', fetcher);

  if (isLoading || !loggedIn) {
    return <GeneralBanner />;
  }

  const { account, discounts, savedProducts } = data;
  const featuredDiscount = discounts[0];
  const firstName = account?.firstName || account?.name.split(' ')[0];

  return (
    <Boundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 1, 0.8, 1] }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          times: [0, 0.2, 0.4, 0.7, 1],
        }}
        className="flex flex-col justify-between"
      >
        <span className="mb-3 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
          {featuredDiscount ? 'Exclusive Discount' : 'Welcome Back'}
        </span>
        <h3 className="mb-3 font-sans text-2xl leading-tight font-bold tracking-tight">Welcome back {firstName}</h3>
        <p className="mb-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
          {featuredDiscount ? (
            <>
              Use code{' '}
              <span className="bg-black px-1 py-0.5 font-mono font-semibold text-white sm:px-2 sm:py-1 dark:bg-white dark:text-black">
                {featuredDiscount.code}
              </span>{' '}
              for <span className="font-bold">{featuredDiscount.percentage}% off</span> –{' '}
              {featuredDiscount.description.toLowerCase()}. Expires{' '}
              {new Date(featuredDiscount.expiry).toLocaleDateString()}.
            </>
          ) : savedProducts.length > 0 ? (
            <>
              You have <span className="font-bold">{savedProducts.length} saved products</span> waiting for you. Ready
              to continue shopping?
            </>
          ) : (
            <>Ready to discover something new? Start browsing our latest collection.</>
          )}
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          {featuredDiscount && (
            <Link href="/user" className="inline-flex items-center text-xs font-semibold tracking-wide uppercase">
              {discounts.length > 1 ? `View all ${discounts.length} discounts` : 'View discount details'} →
            </Link>
          )}
          {savedProducts.length > 0 && (
            <Link href="/user" className="inline-flex items-center text-xs font-semibold tracking-wide uppercase">
              View Saved Items ({savedProducts.length}) →
            </Link>
          )}
          {!featuredDiscount && savedProducts.length === 0 && (
            <Link href="/all" className="inline-flex items-center text-xs font-semibold tracking-wide uppercase">
              Start Shopping →
            </Link>
          )}
        </div>
      </motion.div>
    </Boundary>
  );
}

export function GeneralBanner() {
  return (
    <Boundary>
      <div className="flex flex-col justify-between pb-6">
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
  );
}
