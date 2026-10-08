import Boundary from '@/components/internal/Boundary';
import { getCartCount } from '../cart-queries';
import CartIconLink from './CartIconLink';

export default async function CartLink() {
  const count = await getCartCount();

  return (
    <Boundary hydration="server" rendering="hybrid" cached="private">
      <CartIconLink count={count} />
    </Boundary>
  );
}
