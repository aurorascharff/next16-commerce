import { ShoppingCart } from 'lucide-react';
import { getProduct } from '@/features/product/product-queries';
import AddToCartButton from './AddToCartButton';

export default async function AddToCart({ productId }: { productId: number }) {
  const product = await getProduct(productId);

  return <AddToCartButton className="w-32" product={{ id: product.id, name: product.name, price: product.price }} />;
}

export function AddToCartSkeleton() {
  return (
    <div className="text-gray flex w-32 items-center gap-2 rounded px-2 py-1.5 text-sm">
      <ShoppingCart aria-hidden className="size-5" />
      <span className="uppercase">Add to cart</span>
    </div>
  );
}
