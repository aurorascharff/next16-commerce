import Boundary from '@/components/internal/Boundary';
import CartIconLink from './CartIconLink';
import { getCartCount } from './cart-queries';

export default async function CartLink() {
  const count = await getCartCount();

  return (
    <Boundary hydration="server" rendering="dynamic">
      <CartIconLink count={count} />
    </Boundary>
  );
}
