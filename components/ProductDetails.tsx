import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { getProductDetails } from '@/data/services/product';

type Props = {
  productId: number;
};

export default async function ProductDetails({ productId }: Props) {
  'use cache';
  cacheLife('hours');

  const productDetails = await getProductDetails(productId);

  return (
    <div className="dark:bg-card-dark w-full rounded-lg bg-white p-4">
      <h2 className="mb-3 text-lg font-medium">Product Details</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="mb-3">
            <h3 className="text-base font-medium">Basic Information</h3>
            <div className="text-gray dark:text-gray mt-1.5 space-y-1.5 text-sm">
              <p>
                <span className="font-medium">SKU:</span> {productDetails?.sku || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Brand:</span> {productDetails?.brand || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Origin:</span> {productDetails?.origin || 'N/A'}
              </p>
              <p>
                <span className="font-medium">In Stock:</span> {productDetails?.stockCount || 0} units
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium">Physical Specifications</h3>
            <div className="text-gray dark:text-gray mt-1.5 space-y-1.5 text-sm">
              <p>
                <span className="font-medium">Weight:</span>{' '}
                {productDetails?.weight ? `${productDetails.weight} kg` : 'N/A'}
              </p>
              <p>
                <span className="font-medium">Dimensions:</span> {productDetails?.dimensions || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Materials:</span> {productDetails?.materials || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-3">
            <h3 className="text-base font-medium">Additional Information</h3>
            <div className="text-gray dark:text-gray mt-1.5 text-sm">
              <p>
                <span className="font-medium">Warranty:</span>{' '}
                {productDetails?.warrantyInfo || 'No warranty information'}
              </p>
            </div>
          </div>
          <div className="border-divider bg-card dark:border-divider-dark dark:bg-section mt-auto self-start rounded-md border p-3">
            <h3 className="mb-1.5 text-sm font-medium">Note</h3>
            <p className="text-gray dark:text-gray text-xs">
              Specifications may vary slightly based on manufacturing batch. Please refer to the product packaging for
              the most accurate information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Skeleton />
      <Skeleton />
    </div>
  );
}
