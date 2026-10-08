import Link from 'next/link';
import { Suspense } from 'react';
import LinkButton from '@/components/ui/LinkButton';
import FeaturedCategories from '@/features/category/components/FeaturedCategories';
import FeaturedProducts from '@/features/product/components/FeaturedProducts';
import Hero from '@/features/product/components/Hero';
import {
  GeneralMembershipLink,
  MembershipLink,
  PersonalizedProducts,
  PersonalizedProductsSkeleton,
} from '@/features/user/components/HomePersonalization';
import WelcomeBanner from '@/features/user/components/WelcomeBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <WelcomeBanner />
      <Suspense fallback={<PersonalizedProductsSkeleton />}>
        <PersonalizedProducts />
      </Suspense>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">Featured Categories</h2>
        <Link prefetch={true} href="/all" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
          View All →
        </Link>
      </div>
      <FeaturedCategories />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">Featured Products</h2>
        <Link prefetch={true} href="/all" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
          View All Products →
        </Link>
      </div>
      <FeaturedProducts />
      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-accent/10 dark:bg-accent/20 border-divider dark:border-divider-dark border p-6">
          <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">Member Rewards</h3>
          <p className="mb-4 text-sm">
            Unlock exclusive perks like extra discounts, early product launches, and priority support. Sign in to access
            your dashboard and discover new offers!
          </p>
          <Suspense fallback={<GeneralMembershipLink />}>
            <MembershipLink />
          </Suspense>
        </div>
        <div className="border-divider dark:border-divider-dark border bg-black/5 p-6 dark:bg-white/10">
          <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">Trade-In Program</h3>
          <p className="mb-4 text-sm">Upgrade your devices and get credit towards your next purchase.</p>
          <LinkButton href="/about" variant="primary">
            Learn More
          </LinkButton>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Quick Links</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          <LinkButton href="/about">Price Match</LinkButton>
          <LinkButton href="/about">Support</LinkButton>
          <LinkButton href="/about">Free Delivery</LinkButton>
          <LinkButton href="/user">My Account</LinkButton>
          <LinkButton href="/about">Returns</LinkButton>
          <LinkButton href="/about">Gift Cards</LinkButton>
        </div>
      </section>
    </div>
  );
}
