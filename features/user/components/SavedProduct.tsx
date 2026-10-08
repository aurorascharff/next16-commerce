import Boundary from '@/components/internal/Boundary';
import { getCurrentAccount, isSavedProduct } from '../user-queries';
import SaveProductButton from './SaveProductButton';

export default async function SavedProduct({ productId }: { productId: number }) {
  const account = await getCurrentAccount();
  const productIsSaved = account ? await isSavedProduct(account.id, productId) : false;
  return (
    <Boundary rendering="hybrid" hydration="hybrid" cached="private">
      <SaveProductButton productId={productId} initialSaved={productIsSaved} />
    </Boundary>
  );
}

export function SavedProductSkeleton() {
  return <div className="skeleton-animation h-8 w-full rounded" aria-hidden />;
}
