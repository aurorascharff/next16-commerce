import Link from 'next/link';
import { Suspense } from 'react';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import Boundary from '@/components/internal/Boundary';
import LinkButton from '@/components/ui/LinkButton';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import FeaturedCategories, { FeaturedCategoriesSkeleton } from '@/features/category/components/FeaturedCategories';
import FeaturedProducts, { FeaturedProductsSkeleton } from '@/features/product/components/FeaturedProducts';
import Hero, { HeroSkeleton } from '@/features/product/components/Hero';
import Recommendations, { RecommendationsSkeleton } from '@/features/user/components/Recommendations';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <WelcomeBanner />
      <Suspense>
        <PersonalizedSection />
      </Suspense>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">Featured Categories</h2>
        <Link href="/all" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
          View All →
        </Link>
      </div>
      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">Featured Products</h2>
        <Link href="/all" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
          View All Products →
        </Link>
      </div>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Boundary rendering="static" hydration="server">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-accent/10 dark:bg-accent/20 border-divider dark:border-divider-dark border p-6">
            <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">Member Rewards</h3>
            <p className="mb-4 text-sm">
              Unlock exclusive perks like extra discounts, early product launches, and priority support. Sign in to
              access your dashboard and discover new offers!
            </p>
            <MembershipTile />
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
      </Boundary>
    </div>
  );
}

async function PersonalizedSection() {
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

async function PersonalMembershipTile() {
  const loggedIn = await getIsAuthenticated();
  if (!loggedIn) return <GeneralMembershipTile />;

  return (
    <LinkButton href="/user" variant="primary">
      Go to Dashboard
    </LinkButton>
  );
}

function MembershipTile() {
  return (
    <Suspense fallback={<GeneralMembershipTile />}>
      <Boundary rendering="dynamic" hydration="server">
        <PersonalMembershipTile />
      </Boundary>
    </Suspense>
  );
}

function GeneralMembershipTile() {
  return (
    <Boundary rendering="dynamic" hydration="server">
      <LinkButton href="/sign-in" variant="primary">
        Sign In to Join
      </LinkButton>
    </Boundary>
  );
}
