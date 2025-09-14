import { Bookmark } from 'lucide-react';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Skeleton from '@/components/ui/Skeleton';
import { getProductDetails } from '../product-queries';
import SavedProduct from './SavedProduct';

type Props = {
  productId: number;
  loggedIn: boolean;
};

export function preloadProductDetails(productId: number) {
  void getProductDetails(productId);
}

export default async function ProductDetails({ productId, loggedIn }: Props) {
  const productDetails = await getProductDetails(productId);

  return (
    <Boundary rendering="hybrid" hydration="server">
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
            <span className="font-medium">Weight:</span>{' '}
            {productDetails?.weight ? `${productDetails.weight} kg` : 'N/A'}
          </p>
          <p>
            <span className="font-medium">Warranty:</span> {productDetails?.warrantyInfo || 'No warranty information'}
          </p>
        </div>
        <div className="border-divider dark:border-divider-dark mt-6 border-t pt-4">
          <Boundary rendering="static">
            <SavedProduct productId={productId} loggedIn={loggedIn} />
          </Boundary>
        </div>
      </div>
    </Boundary>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="w-full rounded-lg p-4">
      <div className="skeleton-animation mb-3 h-6 w-32 rounded-xs" />
      <Skeleton />
      <div className="skeleton-animation mb-3 h-6 w-32 rounded-xs" />
      <div className="border-divider dark:border-divider-dark mt-9 border-t pt-4">
        <Bookmark aria-hidden className="text-gray size-5" />
      </div>
    </div>
  );
}
