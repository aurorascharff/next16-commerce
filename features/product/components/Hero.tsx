import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Boundary from '@/components/internal/Boundary';

import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LinkButton from '@/components/ui/LinkButton';
import { getFeaturedProducts } from '../product-queries';
import type { Route } from 'next';

export default async function Hero() {
  'use cache';

  cacheTag('featured-product');

  const featuredProducts = await getFeaturedProducts(1);
  const heroProduct = featuredProducts[0];

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
          <div className="flex flex-wrap gap-4">
            <LinkButton
              href={heroProduct ? (`/product/${heroProduct.id}` as Route) : ('/product/1' as Route)}
              variant="primary"
            >
              {heroProduct ? 'View Product' : 'Shop Now'}
            </LinkButton>
            <LinkButton href="/all" variant="secondary">
              Browse All
            </LinkButton>
          </div>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden">
          <ImagePlaceholder className="h-64 w-full" />
        </div>
      </div>
    </Boundary>
  );
}
