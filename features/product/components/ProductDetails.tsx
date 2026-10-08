import { cacheLife, cacheTag } from 'next/cache';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { setFeaturedProduct } from '../product-actions';
import { getProductDetails } from '../product-queries';

type Props = {
  productId: number;
};

export default async function ProductDetails({ productId }: Props) {
  'use cache';

  cacheLife('max');
  cacheTag('product-' + productId);

  const productDetails = await getProductDetails(productId);
  const setFeaturedForProduct = setFeaturedProduct.bind(null, productId);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="border-divider dark:border-divider-dark w-full border bg-white p-5 dark:bg-black">
        <form className="mb-6 flex justify-end" action={setFeaturedForProduct}>
          <Button className="px-5 py-2 text-sm" title="Mark as Featured" variant="secondary">
            Feature Product
          </Button>
        </form>
        <h2 className="mb-4 text-lg font-bold tracking-tight">Product Details</h2>
        <ProductDetailFields
          brand={productDetails?.brand}
          sku={productDetails?.sku}
          stockCount={productDetails?.stockCount}
          warrantyInfo={productDetails?.warrantyInfo}
          weight={productDetails?.weight}
        />
      </div>
    </Boundary>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark w-full rounded-sm border bg-white p-5 dark:bg-black">
      <div className="mb-6 flex justify-end">
        <div className="skeleton-animation h-10 w-40 rounded" />
      </div>
      <div className="skeleton-animation mb-4 h-7 w-40 rounded-sm" />
      <Skeleton />
      <div className="skeleton-animation h-6 w-38" />
    </div>
  );
}

type ProductDetailFieldsProps = {
  brand?: string | null;
  sku?: string | null;
  stockCount?: number | null;
  warrantyInfo?: string | null;
  weight?: number | null;
};

function ProductDetailFields({ brand, sku, stockCount, warrantyInfo, weight }: ProductDetailFieldsProps) {
  return (
    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
      <p>
        <span className="font-medium">Brand:</span> {brand || 'N/A'}
      </p>
      <p>
        <span className="font-medium">SKU:</span> {sku || 'N/A'}
      </p>
      <p>
        <span className="font-medium">In Stock:</span> {stockCount || 0} units
      </p>
      <p>
        <span className="font-medium">Weight:</span> {weight ? `${weight} kg` : 'N/A'}
      </p>
      <p>
        <span className="font-medium">Warranty:</span> {warrantyInfo || 'No warranty information'}
      </p>
    </div>
  );
}
