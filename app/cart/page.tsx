'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { useCart } from '@/features/cart/cart-store';

export default function CartPage() {
  const { items, updateQuantity, removeItem, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="border-divider dark:border-divider-dark flex flex-col items-center justify-center gap-4 border bg-white py-16 dark:bg-black">
          <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          <Link
            href="/all"
            className="text-primary hover:text-primary-dark"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          Cart ({count} item{count === 1 ? '' : 's'})
        </h1>
        <div className="border-divider dark:border-divider-dark flex flex-col gap-4 border bg-white dark:bg-black">
          {items.map(item => (
            <div
              key={item.productId}
              className="border-divider dark:border-divider-dark flex items-center gap-4 border-b p-4 last:border-b-0 dark:border-b-neutral-800"
            >
              <Link
                prefetch={true}
                href={`/product/${item.productId}`}
                className="shrink-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <ImagePlaceholder variant="simple" className="size-20 sm:size-24" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  prefetch={true}
                  href={`/product/${item.productId}`}
                  className="text-primary hover:text-primary-dark"
                >
                  {item.name}
                </Link>
                <p className="text-accent mt-0.5 font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-divider dark:border-divider-dark flex items-center rounded border bg-white dark:bg-black">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, Math.min(10, item.quantity + 1))}
                    className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
                    disabled={item.quantity >= 10}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-gray-500 hover:text-danger p-2"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
              <p className="text-accent w-20 text-right font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="border-divider dark:border-divider-dark flex justify-end border-t pt-4">
          <p className="text-xl font-bold uppercase">
            Total: <span className="text-accent">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
