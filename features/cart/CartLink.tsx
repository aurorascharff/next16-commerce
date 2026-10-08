import { cacheLife, cacheTag } from 'next/cache';
import Boundary from '@/components/internal/Boundary';
import CartIconLink from './CartIconLink';
import { getCartCount } from './cart-queries';

export default async function CartLink() {
  'use cache: private';
  cacheLife('minutes');
  cacheTag('cart');

  const count = await getCartCount();

  return (
    <Boundary hydration="server" rendering="dynamic">
      <CartIconLink count={count} />
    </Boundary>
  );
}
