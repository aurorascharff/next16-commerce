import { Bookmark } from 'lucide-react';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import Divider from '@/components/ui/Divider';
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
      <div className="border-divider dark:border-divider-dark dark:bg-card-dark w-full rounded-none border bg-white p-5">
        <h2 className="mb-4 text-lg font-bold tracking-tight">Product Details</h2>
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
        </div>
        <div className="mt-6">
          <Divider variant="dotted" className="mb-4" />
          <div className="flex flex-wrap gap-4">
            <Boundary rendering="static">
              <SavedProduct productId={productId} loggedIn={loggedIn} />
            </Boundary>
          </div>
        </div>
      </div>
    </Boundary>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark dark:bg-card-dark w-full rounded-none border bg-white p-5">
      <div className="skeleton-animation mt-2 mb-4 h-10 w-40 rounded-none" />
      <Skeleton />
      <div className="skeleton-animation mb-4 h-6 w-38 rounded-none" />
      <div className="mt-6">
        <div className="border-divider dark:border-divider-dark mb-4 border-b border-dotted" />
        <Bookmark aria-hidden className="text-gray size-5" />
      </div>
    </div>
  );
}
