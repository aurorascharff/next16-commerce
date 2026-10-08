import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import CartItemActions from './CartItemActions';
import { getCart } from './cart-queries';

export default async function Cart() {
  'use cache: private';
  cacheLife('minutes');
  cacheTag('cart');

  const items = await getCart();

  if (items.length === 0) {
    return (
      <div className="border-divider dark:border-divider-dark flex flex-col items-center justify-center gap-4 border bg-white py-16 dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
        <Link prefetch={true} href="/all" className="text-primary hover:text-primary-dark">
          Browse products
        </Link>
      </div>
    );
  }

  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight uppercase">
        Cart ({count} item{count === 1 ? '' : 's'})
      </h1>
      <div className="border-divider dark:border-divider-dark flex flex-col gap-4 border bg-white dark:bg-black">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="border-divider dark:border-divider-dark flex items-center gap-4 border-b p-4 last:border-b-0 dark:border-b-neutral-800"
          >
            <Link
              prefetch={true}
              href={`/product/${product.id}`}
              className="focus:ring-accent shrink-0 rounded focus:ring-2 focus:outline-none"
            >
              <ImagePlaceholder variant="simple" className="size-20 sm:size-24" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link prefetch={true} href={`/product/${product.id}`} className="text-primary hover:text-primary-dark">
                {product.name}
              </Link>
              <p className="text-accent mt-0.5 font-bold">${product.price.toFixed(2)}</p>
            </div>
            <CartItemActions name={product.name} productId={product.id} quantity={quantity} />
            <p className="text-accent w-20 text-right font-bold">${(product.price * quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-divider dark:border-divider-dark flex justify-end border-t pt-4">
        <p className="text-xl font-bold uppercase">
          Total: <span className="text-accent">${total.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton-animation h-8 w-36 rounded" />
      <div className="border-divider dark:border-divider-dark border bg-white p-4 dark:bg-black">
        <div className="skeleton-animation h-24 w-full rounded" />
      </div>
    </div>
  );
}
