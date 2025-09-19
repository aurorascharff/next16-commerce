import { revalidateTag } from 'next/cache';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Boundary from '@/components/internal/Boundary';
import Button from '@/components/ui/Button';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LinkButton from '@/components/ui/LinkButton';
import { getFeaturedProducts } from '../product-queries';
import type { Route } from 'next';

export let featuredIndex = 0;

export async function refreshFeatured() {
  'use server';

  // Cycle featuredIndex between 1 and 4
  featuredIndex = featuredIndex < 4 ? featuredIndex + 1 : 1;

  revalidateTag('featured-product');
}

export default async function Hero() {
  'use cache: remote';

  cacheTag('featured-product');
  cacheLife('max');

  const featuredProducts = await getFeaturedProducts(5);
  const heroProduct = featuredProducts[featuredIndex];

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="border-divider dark:border-divider-dark dark:bg-card-dark relative grid gap-6 border bg-white p-6 md:grid-cols-[2fr,1fr]">
        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
            Fall Conference Special
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight uppercase">
            {heroProduct ? `Featured: ${heroProduct.name}` : 'Transform Your Experience with Next-Gen Tech'}
          </h1>
          <p className="mb-6 max-w-xl text-gray-700 dark:text-gray-300">
            {heroProduct
              ? `Discover the ${heroProduct.name} and our premium selection of electronics. Starting at $${heroProduct.price}.`
              : 'Discover exclusive offers on our premium selection of electronics and accessories. Upgrade your setup with cutting-edge technology designed for professionals.'}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-4">
              <LinkButton
                title={heroProduct ? 'View Product' : 'Shop Now'}
                link={heroProduct ? (`/product/${heroProduct.id}` as Route) : ('/product/1' as Route)}
                variant="primary"
              />
              <LinkButton title="Browse All" link="/all" variant="secondary" />
            </div>
            <form className="hidden sm:flex" action={refreshFeatured}>
              <Button title="Reset" variant="secondary">
                Refresh
              </Button>
            </form>
          </div>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden">
          <ImagePlaceholder className="h-64 w-full" />
        </div>
      </div>
    </Boundary>
  );
}

export function HeroSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark dark:bg-card-dark relative grid gap-6 border bg-white p-6 md:grid-cols-[2fr,1fr]">
      <div className="flex flex-col justify-center">
        <span className="mb-3 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
          ...
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight uppercase">Loading offer...</h1>
        <div className="mb-6 space-y-2">
          <div className="skeleton-animation h-4 w-1/4 rounded" />
          <div className="skeleton-animation h-4 w-2/3 rounded" />
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="skeleton-animation h-12 w-42 rounded" />
          <div className="skeleton-animation h-12 w-42 rounded" />
        </div>
      </div>
      <div className="relative flex items-center justify-center overflow-hidden">
        <div className="h-63.5 w-full" />
      </div>
    </div>
  );
}
