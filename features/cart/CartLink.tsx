'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useSyncExternalStore } from 'react';
import Boundary from '@/components/internal/Boundary';
import { useCart } from './cart-store';

const subscribeToHydration = () => () => {};

export default function CartLink() {
  const { count } = useCart();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const displayCount = hydrated ? count : 0;

  return (
    <Boundary hydration="client">
      <Link
        href="/cart"
        className="text-primary hover:text-primary-dark relative flex items-center gap-1 p-2"
        aria-label={hydrated ? `Cart with ${count} item${count === 1 ? '' : 's'}` : 'Cart'}
      >
        <ShoppingCart className="size-6" aria-hidden />
        {displayCount > 0 && (
          <span
            className="bg-accent absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold text-white"
            aria-hidden
          >
            {displayCount > 99 ? '99+' : displayCount}
          </span>
        )}
      </Link>
    </Boundary>
  );
}
