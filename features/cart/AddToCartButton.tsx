'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import React from 'react';
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

export default function AddToCartButton({ product, quantity = 1, variant = 'primary', className, children }: Props) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = () => {
    addItem({ productId: product.id, name: product.name, price: product.price, quantity });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Boundary hydration="client">
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          'text-primary hover:text-primary-dark flex items-center gap-2 text-sm',
          variant === 'secondary' &&
            'border-divider dark:border-divider-dark bg-card dark:bg-card-dark rounded border px-4 py-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-neutral-800',
          className,
        )}
        aria-label={justAdded ? 'Added to cart' : 'Add to cart'}
      >
        {children ?? (
          <>
            <span className="relative inline-flex size-5 items-center justify-center">
              {justAdded ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Check className="size-5 text-green-600 dark:text-green-400" aria-hidden />
                </motion.span>
              ) : (
                <ShoppingCart className="size-5" aria-hidden />
              )}
            </span>
            <span className="uppercase">{justAdded ? 'Added' : 'Add to cart'}</span>
          </>
        )}
      </button>
    </Boundary>
  );
}
