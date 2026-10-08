'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { startTransition, useActionState, useOptimistic, useTransition } from 'react';
import { removeCartProduct, updateCartProductQuantity } from '../cart-actions';

type Props = {
  name: string;
  price: number;
  productId: number;
  quantity: number;
};

type QuantityChange = -1 | 1;

type QuantityState = {
  error: string | null;
  quantity: number;
};

export default function CartItemActions({ name, price, productId, quantity }: Props) {
  const [quantityState, dispatchQuantity, isQuantityPending] = useActionState(
    async (currentState: QuantityState, change: QuantityChange) => {
      const nextQuantity = Math.min(10, Math.max(1, currentState.quantity + change));
      const result = await updateCartProductQuantity(productId, nextQuantity);

      return result.ok
        ? { error: null, quantity: result.quantity }
        : { error: result.error, quantity: currentState.quantity };
    },
    { error: null, quantity },
  );
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantityState.quantity);
  const [isRemoving, startRemoving] = useTransition();

  const updateQuantity = (change: QuantityChange) => {
    startTransition(() => {
      setOptimisticQuantity(currentQuantity => Math.min(10, Math.max(1, currentQuantity + change)));
      dispatchQuantity(change);
    });
  };

  const remove = () => {
    startRemoving(async () => {
      await removeCartProduct(productId);
    });
  };

  return (
    <div className="flex items-center gap-4" aria-busy={isQuantityPending || isRemoving}>
      <div>
        <div className="flex items-center gap-2">
          <div className="border-divider dark:border-divider-dark flex items-center rounded border bg-white dark:bg-black">
            <button
              type="button"
              onClick={() => updateQuantity(-1)}
              className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
              disabled={optimisticQuantity <= 1}
              aria-label={`Decrease quantity of ${name}`}
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <span className="min-w-8 text-center text-sm font-medium tabular-nums">{optimisticQuantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(1)}
              className="text-primary hover:text-primary-dark flex size-9 items-center justify-center disabled:opacity-40"
              disabled={optimisticQuantity >= 10}
              aria-label={`Increase quantity of ${name}`}
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
          <button
            type="button"
            onClick={remove}
            disabled={isRemoving}
            className="hover:text-danger p-2 text-gray-500 disabled:opacity-40"
            aria-label={`Remove ${name} from cart`}
          >
            <Trash2 className="size-5" aria-hidden />
          </button>
        </div>
        <p className="text-danger mt-1 min-h-4 text-xs" role={quantityState.error ? 'alert' : undefined}>
          {quantityState.error}
        </p>
      </div>
      <p className="text-accent w-20 text-right font-bold tabular-nums">${(price * optimisticQuantity).toFixed(2)}</p>
    </div>
  );
}
