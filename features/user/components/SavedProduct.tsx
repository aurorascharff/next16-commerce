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
  return <div className="skeleton-animation h-8 w-40 rounded" aria-hidden />;
}
