import { ShoppingCart } from 'lucide-react';
import { cacheLife, cacheTag } from 'next/cache';
import { getProduct } from '@/features/product/product-queries';
import AddToCartButton from './AddToCartButton';
import { isProductInCart } from './cart-queries';

export default async function AddToCart({ productId }: { productId: number }) {
  'use cache: private';
  cacheLife('minutes');
  cacheTag('cart');

  const [product, initialInCart] = await Promise.all([getProduct(productId), isProductInCart(productId)]);

  return <AddToCartButton productId={product.id} initialInCart={initialInCart} />;
}

export function AddToCartSkeleton() {
  return (
    <div className="text-gray flex w-full items-center gap-2 px-1 py-1.5 text-sm whitespace-nowrap">
      <ShoppingCart aria-hidden className="size-5" />
      <span className="uppercase">Add to cart</span>
    </div>
  );
}
