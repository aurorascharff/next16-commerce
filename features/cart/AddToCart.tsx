import { ShoppingCart } from 'lucide-react';
import { getProduct } from '@/features/product/product-queries';
import AddToCartButton from './AddToCartButton';

export default async function AddToCart({ productId }: { productId: number }) {
  const product = await getProduct(productId);

  return <AddToCartButton product={{ id: product.id, name: product.name, price: product.price }} />;
}

export function AddToCartSkeleton() {
  return (
    <div className="text-gray flex w-full items-center gap-2 px-1 py-1.5 text-sm whitespace-nowrap">
      <ShoppingCart aria-hidden className="size-5" />
      <span className="uppercase">Add to cart</span>
    </div>
  );
}
