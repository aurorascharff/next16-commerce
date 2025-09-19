import Link from 'next/link';
import { Suspense } from 'react';
import WelcomeBanner from '@/components/banner/WelcomeBanner';
import Boundary from '@/components/internal/Boundary';
import LinkButton from '@/components/ui/LinkButton';
import FeaturedCategories, { FeaturedCategoriesSkeleton } from '@/features/category/components/FeaturedCategories';
import FeaturedProductsSection, { FeaturedProductsSkeleton } from '@/features/product/components/FeaturedProduct';
import Hero, { HeroSkeleton } from '@/features/product/components/Hero';
import Recommendations, { RecommendationsSkeleton } from '@/features/user/components/Recommendations';
import { getRequestContext } from '@/utils/request-context';
import type { Route } from 'next';

export default async function HomePage({ params }: PageProps<'/[requestContext]'>) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <WelcomeBanner loggedIn={loggedIn} />
      {loggedIn && (
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
      )}
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
        <h2 className="text-xl font-bold tracking-tight uppercase sm:text-2xl">
          {loggedIn ? 'More Products' : 'Featured Products'}
        </h2>
        <Link href="/all" className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
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
            href={'/sign-in' as Route}
            bgColor="bg-accent/10 dark:bg-accent/20"
          />
          <PromoBanner
            title="Trade-In Program"
            subtitle="Upgrade your devices and get credit towards your next purchase."
            href={'/about' as Route}
            bgColor="bg-black/5 dark:bg-white/10"
          />
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <LinkButton title="Price Match" href={'/about' as Route} />
            <LinkButton title="Support" href={'/about' as Route} />
            <LinkButton title="Free Delivery" href={'/about' as Route} />
            <LinkButton title="My Account" href={'/user' as Route} />
            <LinkButton title="Returns" href={'/about' as Route} />
            <LinkButton title="Gift Cards" href={'/about' as Route} />
          </div>
        </section>
      </Boundary>
    </div>
  );
}

function PromoBanner({
  title,
  subtitle,
  href,
  bgColor,
}: {
  title: string;
  subtitle: string;
  href?: Route;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} border-divider dark:border-divider-dark border p-6`}>
      <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">{title}</h3>
      <p className="mb-4 text-sm">{subtitle}</p>
      <LinkButton scroll title="Learn More" href={href!} variant="primary" />
    </div>
  );
}
