import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartIconLink({ count }: { count?: number }) {
  return (
    <Link
      href="/cart"
      className="text-primary hover:text-primary-dark relative flex items-center gap-1 p-2"
      aria-label={count === undefined ? 'Cart' : `Cart with ${count} item${count === 1 ? '' : 's'}`}
    >
      <ShoppingCart className="size-6" aria-hidden />
      {count !== undefined && count > 0 && (
        <span
          className="bg-accent absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold text-white"
          aria-hidden
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}

export function CartIconLinkSkeleton() {
  return (
    <div className="text-gray flex size-10 items-center justify-center" aria-hidden>
      <ShoppingCart className="size-6" />
    </div>
  );
}
