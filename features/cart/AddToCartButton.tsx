'use client';

import { Check, ShoppingCart } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';
import Boundary from '@/components/internal/Boundary';
import { cn } from '@/utils/cn';
import { toggleCartProduct } from './cart-actions';

type Props = {
  productId: number;
  initialInCart: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({ productId, initialInCart, variant = 'primary', className, children }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isInCart, setIsInCart] = useOptimistic(initialInCart);

  const handleToggle = () => {
    startTransition(async () => {
      setIsInCart(!isInCart);
      await toggleCartProduct(productId);
    });
  };

  return (
    <Boundary hydration="client">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={cn(
          'flex w-full items-center gap-2 px-1 py-1.5 text-left text-sm whitespace-nowrap transition-colors',
          variant === 'secondary' &&
            'border-divider dark:border-divider-dark bg-card dark:bg-card-dark rounded border px-4 py-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800',
          variant === 'primary' && 'text-primary hover:text-primary-dark',
          isInCart && 'font-semibold',
          isPending && 'opacity-70',
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
