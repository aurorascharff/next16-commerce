import { Bookmark } from 'lucide-react';

import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import Skeleton from '@/components/ui/Skeleton';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import SaveProductButton from '../../user/components/SaveProductButton';
import { setFeaturedProduct } from '../product-actions';
import { getProductDetails, isSavedProduct } from '../product-queries';

type Props = {
  productId: number;
  children?: React.ReactNode;
};

export function preloadProductDetails(productId: number) {
  void getProductDetails(productId);
}

export default async function ProductDetails({ productId, children }: Props) {
  'use cache';

  cacheLife('max');
  cacheTag('product-' + productId);

  const productDetails = await getProductDetails(productId);
  const setFeaturedForProduct = setFeaturedProduct.bind(null, productId);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="border-divider dark:border-divider-dark w-full border bg-white p-5 dark:bg-black">
        <div className="flex justify-between">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Product Details</h2>
          <form className="hidden sm:flex" action={setFeaturedForProduct}>
            <Button title="Mark as Featured" variant="secondary">
              Feature This Product
            </Button>
          </form>
        </div>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Brand:</span> {productDetails?.brand || 'N/A'}
          </p>
          <p>
            <span className="font-medium">SKU:</span> {productDetails?.sku || 'N/A'}
          </p>
          <p>
            <span className="font-medium">In Stock:</span> {productDetails?.stockCount || 0} units
          </p>
          <p>
            <span className="font-medium">Weight:</span>{' '}
            {productDetails?.weight ? `${productDetails.weight} kg` : 'N/A'}
          </p>
          <p>
            <span className="font-medium">Warranty:</span> {productDetails?.warrantyInfo || 'No warranty information'}
          </p>
          <div className="mt-6">
            <Divider variant="dotted" className="mb-4" />
            <div className="flex flex-wrap gap-4">{children}</div>
          </div>
        </div>
      </div>
    </Boundary>
  );
}

export async function SavedProduct({ productId }: { productId: number }) {
  const loggedIn = await getIsAuthenticated();

  if (!loggedIn) {
    return <SaveProductButton productId={productId} initialSaved={false} />;
  }

  const productIsSaved = await isSavedProduct(productId);
  return <SaveProductButton productId={productId} initialSaved={productIsSaved} />;
}

export function ProductDetailsSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark w-full rounded-sm border bg-white p-5 dark:bg-black">
      <div className="skeleton-animation mt-2 mb-4 h-[46px] w-40 rounded-sm" />
      <Skeleton />
      <div className="skeleton-animation mb-4 h-6 w-38" />
      <div className="mt-6">
        <Divider variant="dotted" className="mb-4" />
        <Bookmark aria-hidden className="text-gray size-5" />
      </div>
    </div>
  );
}
