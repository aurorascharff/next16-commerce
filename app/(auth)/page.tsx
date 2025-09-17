import Link from 'next/link';
import { Suspense } from 'react';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import Boundary from '@/components/internal/Boundary';
import LinkButton from '@/components/ui/LinkButton';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import FeaturedCategories, { FeaturedCategoriesSkeleton } from '@/features/category/components/FeaturedCategories';
import FeaturedProductsSection, { FeaturedProductsSkeleton } from '@/features/product/components/FeaturedProduct';
import Hero, { HeroSkeleton } from '@/features/product/components/Hero';
import Recommendations, { RecommendationsSkeleton } from '@/features/user/components/Recommendations';
import type { Route } from 'next';

export default async function HomePage() {
  const loggedIn = await getIsAuthenticated();

  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <WelcomeBanner />
      {loggedIn && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Something for You?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Personalized recommendations based on your interests
              </p>
            </div>
            <Link href="/user" className="text-sm font-semibold tracking-wide uppercase">
              View Saved →
            </Link>
          </div>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <Recommendations />
          </Suspense>
        </>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight uppercase">Featured Categories</h2>
        <Link href="/all" className="text-sm font-semibold tracking-wide uppercase">
          View All →
        </Link>
      </div>
      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight uppercase">
          {loggedIn ? 'More Products' : 'Featured Products'}
        </h2>
        <Link href="/all" className="text-sm font-semibold tracking-wide uppercase">
          View All Products →
        </Link>
      </div>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
      <Boundary rendering="static" hydration="server">
        <section className="grid gap-6 md:grid-cols-2">
          <PromoBanner
            title="Membership Benefits"
            subtitle="Join our exclusive club for special discounts, early access, and premium support."
            link="/sign-in"
            bgColor="bg-accent/10 dark:bg-accent/20"
          />
          <PromoBanner
            title="Trade-In Program"
            subtitle="Upgrade your devices and get credit towards your next purchase."
            link="/about"
            bgColor="bg-black/5 dark:bg-white/10"
          />
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <LinkButton title="Price Match" link="/about" />
            <LinkButton title="Support" link="/about" />
            <LinkButton title="Free Delivery" link="/about" />
            <LinkButton title="My Account" link="/user" />
            <LinkButton title="Returns" link="/about" />
            <LinkButton title="Gift Cards" link="/about" />
          </div>
        </section>
      </Boundary>
    </div>
  );
}

function PromoBanner({
  title,
  subtitle,
  link,
  bgColor,
}: {
  title: string;
  subtitle: string;
  link: Route | URL;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} border-divider dark:border-divider-dark border p-6`}>
      <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">{title}</h3>
      <p className="mb-4 text-sm">{subtitle}</p>
      <LinkButton title="Learn More" link={link} variant="primary" />
    </div>
  );
}
