'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { removeCartProduct, updateCartProductQuantity } from './cart-actions';

type Props = {
  name: string;
  productId: number;
  quantity: number;
};

export default function CartItemActions({ name, productId, quantity }: Props) {
  const [isPending, startTransition] = useTransition();

  const updateQuantity = (nextQuantity: number) => {
    startTransition(async () => {
      await updateCartProductQuantity(productId, nextQuantity);
    });
  };

  const remove = () => {
    startTransition(async () => {
      await removeCartProduct(productId);
    });
  };

  return (
    <div className="flex items-center gap-2" aria-busy={isPending}>
      <div className="border-divider dark:border-divider-dark flex items-center rounded border bg-white dark:bg-black">
        <button
          type="button"
          onClick={() => updateQuantity(quantity - 1)}
          className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
          disabled={isPending || quantity <= 1}
          aria-label={`Decrease quantity of ${name}`}
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <span className="min-w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
        <button
          type="button"
          onClick={() => updateQuantity(quantity + 1)}
          className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
          disabled={isPending || quantity >= 10}
          aria-label={`Increase quantity of ${name}`}
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
      <button
        type="button"
        onClick={remove}
        disabled={isPending}
        className="hover:text-danger p-2 text-gray-500 disabled:opacity-40"
        aria-label={`Remove ${name} from cart`}
      >
        <Trash2 className="size-5" aria-hidden />
      </button>
    </div>
  );
}
