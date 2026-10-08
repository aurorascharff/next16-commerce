import { Suspense } from 'react';
import Boundary from '@/components/internal/Boundary';
import Cart, { CartSkeleton } from '@/features/cart/components/Cart';

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Boundary rendering="hybrid" hydration="hybrid" cached="private">
        <Suspense fallback={<CartSkeleton />}>
          <Cart />
        </Suspense>
      </Boundary>
    </div>
  );
}
