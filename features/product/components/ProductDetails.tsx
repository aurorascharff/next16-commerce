import { cacheLife, cacheTag, navigation } from 'next/cache';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Button from '@/components/ui/Button';
import { setFeaturedProduct } from '../product-actions';
import { getProductDetails, getProductStock } from '../product-queries';

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
        <h2 className="mb-4 text-lg font-bold tracking-tight">Product Details</h2>
        <ProductDetailFields
          brand={productDetails?.brand}
          sku={productDetails?.sku}
          warrantyInfo={productDetails?.warrantyInfo}
          weight={productDetails?.weight}
        />
        <form className="mt-6 flex justify-end" action={setFeaturedForProduct}>
          <Button className="px-5 py-2 text-sm" title="Mark as Featured" variant="secondary">
            Feature Product
          </Button>
        </form>
      </div>
    </Boundary>
  );
}

export async function ProductStock({ productId }: Props) {
  await navigation();
  const stockCount = await getProductStock(productId);

  return (
    <Boundary rendering="dynamic" hydration="server">
      <p className="flex h-5 items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span className={`size-2 rounded-full ${stockCount > 0 ? 'bg-green-500' : 'bg-red-500'}`} aria-hidden />
        {stockCount > 0 ? `${stockCount} in stock` : 'Out of stock'}
      </p>
    </Boundary>
  );
}

export function ProductStockSkeleton() {
  return <div className="skeleton-animation h-5 w-24 rounded" aria-hidden />;
}

export function ProductDetailsSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark w-full rounded-sm border bg-white p-5 dark:bg-black">
      <div className="mb-4 flex h-7 items-center">
        <div className="skeleton-animation h-5 w-32 rounded" />
      </div>
      <div className="space-y-3">
        <div className="skeleton-animation h-5 w-36 rounded" />
        <div className="skeleton-animation h-5 w-44 rounded" />
        <div className="skeleton-animation h-5 w-32 rounded" />
        <div className="skeleton-animation h-5 w-64 rounded" />
      </div>
      <div className="mt-6 flex justify-end">
        <div className="skeleton-animation h-[38px] w-40 rounded" />
      </div>
    </div>
  );
}

type ProductDetailFieldsProps = {
  brand?: string | null;
  sku?: string | null;
  warrantyInfo?: string | null;
  weight?: number | null;
};

function ProductDetailFields({ brand, sku, warrantyInfo, weight }: ProductDetailFieldsProps) {
  return (
    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
      <p>
        <span className="font-medium">Brand:</span> {brand || 'N/A'}
      </p>
      <p>
        <span className="font-medium">SKU:</span> {sku || 'N/A'}
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
