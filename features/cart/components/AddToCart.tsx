import Boundary from '@/components/internal/Boundary';
import { getProduct } from '@/features/product/product-queries';
import { isProductInCart } from '../cart-queries';
import AddToCartButton from './AddToCartButton';

export default async function AddToCart({ productId }: { productId: number }) {
  const [product, initialInCart] = await Promise.all([getProduct(productId), isProductInCart(productId)]);

  return (
    <Boundary rendering="hybrid" hydration="hybrid" cached="private">
      <AddToCartButton productId={product.id} initialInCart={initialInCart} />
    </Boundary>
  );
}

export function AddToCartSkeleton() {
  return <div className="skeleton-animation h-8 w-full rounded" aria-hidden />;
}
