import { Bookmark } from 'lucide-react';
import React, { Suspense } from 'react';
import Skeleton from '@/components/ui/Skeleton';

import { getProductDetails, isSavedProduct } from '../product-queries';
import SaveProductButton from './SaveProductButton';

type Props = {
  productId: number;
  loggedIn?: boolean;
};

export function preloadProductDetails(productId: number) {
  void getProductDetails(productId);
}

export default async function ProductDetails({ productId, loggedIn = false }: Props) {
  const productDetails = await getProductDetails(productId);

  return (
    <div className="w-full rounded-lg p-4">
      <h2 className="mb-3 text-lg font-medium">Product Details</h2>
      <div className="text-gray dark:text-gray space-y-2 text-sm">
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
          <span className="font-medium">Weight:</span> {productDetails?.weight ? `${productDetails.weight} kg` : 'N/A'}
        </p>
        <p>
          <span className="font-medium">Warranty:</span> {productDetails?.warrantyInfo || 'No warranty information'}
        </p>
      </div>

      <div className="border-divider dark:border-divider-dark mt-6 border-t pt-4">
        {loggedIn ? (
          <Suspense fallback={<Bookmark aria-hidden className="text-gray size-5" />}>
            <SavedProduct productId={productId} />
          </Suspense>
        ) : (
          <SaveProductButton productId={productId} initialSaved={false} />
        )}
      </div>
    </div>
  );
}

async function SavedProduct({ productId }: { productId: number }) {
  const productIsSaved = await isSavedProduct(productId);
  return <SaveProductButton productId={productId} initialSaved={productIsSaved} />;
}

export function ProductDetailsSkeleton() {
  return (
    <div className="w-full rounded-lg p-4">
      <div className="skeleton-animation mb-3 h-6 w-32 rounded-xs" />
      <Skeleton />
      <div className="skeleton-animation mb-3 h-6 w-32 rounded-xs" />
      <div className="border-divider dark:border-divider-dark mt-10 border-t pt-4">
        <div className="skeleton-animation h-5 w-5 rounded-xs" />
      </div>
    </div>
  );
}
