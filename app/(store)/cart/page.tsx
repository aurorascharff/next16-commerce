import { Suspense } from 'react';
import Cart, { CartSkeleton } from '@/features/cart/components/Cart';

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Suspense fallback={<CartSkeleton />}>
        <Cart />
      </Suspense>
    </div>
  );
}
