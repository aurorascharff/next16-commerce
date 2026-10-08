import { Bookmark } from 'lucide-react';
import { cacheTag } from 'next/cache';
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

export default async function ProductDetails({ productId, children }: Props) {
  'use cache';

  cacheTag('product-' + productId);

  const productDetails = await getProductDetails(productId);
  const setFeaturedForProduct = setFeaturedProduct.bind(null, productId);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="border-divider dark:border-divider-dark w-full border bg-white p-5 dark:bg-black">
        <div className="flex justify-between">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Product Details</h2>
          <form className="hidden sm:flex" action={setFeaturedForProduct}>
            <Button className="px-3 py-1.5 text-xs" title="Mark as Featured" variant="secondary">
              Feature Product
            </Button>
          </form>
        </div>
        <ProductDetailFields
          brand={productDetails?.brand}
          sku={productDetails?.sku}
          stockCount={productDetails?.stockCount}
          warrantyInfo={productDetails?.warrantyInfo}
          weight={productDetails?.weight}
        />
        <div className="mt-6">
          <Divider variant="dotted" className="mb-4" />
          <div className="flex flex-wrap gap-4">{children}</div>
        </div>
      </div>
    </Boundary>
  );
}

export async function SavedProduct({ productId }: { productId: number }) {
  const loggedIn = await getIsAuthenticated();

  if (!loggedIn) {
    return (
      <Boundary rendering="dynamic">
        <SaveProductButton productId={productId} initialSaved={false} />
      </Boundary>
    );
  }

  const productIsSaved = await isSavedProduct(productId);
  return <SaveProductButton productId={productId} initialSaved={productIsSaved} />;
}

export function SavedProductSkeleton() {
  return (
    <div className="text-gray flex min-w-40 items-center justify-center gap-2 rounded border border-transparent px-3 py-2 text-sm whitespace-nowrap">
      <Bookmark aria-hidden className="size-5" />
      <span className="uppercase">Save product</span>
    </div>
  );
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
