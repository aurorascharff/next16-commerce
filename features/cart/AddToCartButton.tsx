'use client';

import { Check, ShoppingCart } from 'lucide-react';
import React, { useSyncExternalStore } from 'react';
import Boundary from '@/components/internal/Boundary';
import { cn } from '@/utils/cn';
import { useCart } from './cart-store';

type Props = {
  product: { id: number; name: string; price: number };
  quantity?: number;
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
};

const subscribeToHydration = () => () => {};

export default function AddToCartButton({ product, quantity = 1, variant = 'primary', className, children }: Props) {
  const { addItem, items, removeItem } = useCart();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const isInCart = hydrated && items.some(item => item.productId === product.id);
  const handleToggle = () => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem({ name: product.name, price: product.price, productId: product.id, quantity });
    }
  };

  return (
    <Boundary hydration="client">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Add to cart"
        aria-pressed={isInCart}
        className={cn(
          'flex w-full items-center gap-2 px-1 py-1.5 text-left text-sm whitespace-nowrap transition-colors',
          variant === 'secondary' &&
            'border-divider dark:border-divider-dark bg-card dark:bg-card-dark rounded border px-4 py-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800',
          variant === 'primary' && 'text-primary hover:text-primary-dark',
          isInCart && 'font-semibold',
          className,
        )}
      >
        {children ?? (
          <>
            <span className="inline-flex size-5 items-center justify-center">
              {isInCart ? <Check className="size-5" aria-hidden /> : <ShoppingCart className="size-5" aria-hidden />}
            </span>
            <span className="uppercase">{isInCart ? 'Remove from cart' : 'Add to cart'}</span>
          </>
        )}
      </button>
    </Boundary>
  );
}
