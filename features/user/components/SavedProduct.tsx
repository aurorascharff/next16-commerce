import { Bookmark } from 'lucide-react';
import { cacheLife, cacheTag } from 'next/cache';
import Boundary from '@/components/internal/Boundary';
import { isSavedProduct } from '../user-queries';
import SaveProductButton from './SaveProductButton';

export default async function SavedProduct({ productId }: { productId: number }) {
  'use cache: private';
  cacheLife('max');
  cacheTag(`saved-product-view:${productId}`);

  const productIsSaved = await isSavedProduct(productId);
  return (
    <Boundary rendering="hybrid" hydration="hybrid" cached="private">
      <SaveProductButton productId={productId} initialSaved={productIsSaved} />
    </Boundary>
  );
}

export function SavedProductSkeleton() {
  return (
    <div className="text-gray flex w-full items-center gap-2 px-1 py-1.5 text-sm whitespace-nowrap">
      <Bookmark aria-hidden className="size-5" />
      <span className="uppercase">Save product</span>
    </div>
  );
}
