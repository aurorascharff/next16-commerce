import { cacheLife, cacheTag } from 'next/cache';
import Boundary from '@/components/internal/Boundary';
import { getCartCount } from '../cart-queries';
import CartIconLink from './CartIconLink';

export default async function CartLink() {
  'use cache: private';
  cacheLife('max');
  cacheTag('cart');

  const count = await getCartCount();

  return (
    <Boundary hydration="server" rendering="dynamic">
      <CartIconLink count={count} />
    </Boundary>
  );
}
