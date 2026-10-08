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
  const { addItem, items } = useCart();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const isInCart = hydrated && items.some(item => item.productId === product.id);
  const statusId = `cart-status-${product.id}`;

  const handleAdd = () => {
    addItem({ name: product.name, price: product.price, productId: product.id, quantity });
  };

  return (
    <Boundary hydration="client">
      <button
        type="button"
        onClick={handleAdd}
        aria-describedby={isInCart ? statusId : undefined}
        aria-label="Add to cart"
        className={cn(
          'flex min-w-36 items-center justify-center gap-2 rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors',
          variant === 'secondary' &&
            'border-divider dark:border-divider-dark bg-card dark:bg-card-dark rounded border px-4 py-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800',
          variant === 'primary' &&
            !isInCart &&
            'text-primary hover:bg-accent-fade hover:text-primary-dark border-transparent',
          isInCart &&
            'border-divider bg-card dark:border-divider-dark dark:bg-card-dark text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800',
          className,
        )}
      >
        {children ?? (
          <>
            <span className="relative inline-flex size-5 items-center justify-center">
              {isInCart ? <Check className="size-5" aria-hidden /> : <ShoppingCart className="size-5" aria-hidden />}
            </span>
            <span className="uppercase">{isInCart ? 'In cart' : 'Add to cart'}</span>
            {isInCart && (
              <span id={statusId} className="sr-only">
                Already in cart. Activating adds another.
              </span>
            )}
          </>
        )}
      </button>
    </Boundary>
  );
}
