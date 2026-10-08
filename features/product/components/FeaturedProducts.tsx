import { cacheLife, cacheTag } from 'next/cache';
import Boundary from '@/components/internal/Boundary';
import { getFeaturedProducts } from '../product-queries';
import ProductCard from './ProductCard';

export default async function FeaturedProducts() {
  'use cache';

  cacheLife('max');
  cacheTag('featured-product');

  const products = await getFeaturedProducts(4);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => {
          return (
            <ProductCard
              enableQuickPreview
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </div>
    </Boundary>
  );
}
