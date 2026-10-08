export const CART_COOKIE_NAME = 'next16-commerce-cart';

export type CartCookieItem = {
  productId: number;
  quantity: number;
};

export function parseCartCookie(value: string | undefined): CartCookieItem[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    const items = new Map<number, CartCookieItem>();

    for (const item of parsed) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('productId' in item) ||
        !('quantity' in item) ||
        !Number.isInteger(item.productId) ||
        !Number.isInteger(item.quantity) ||
        Number(item.productId) <= 0 ||
        Number(item.quantity) <= 0
      ) {
        continue;
      }

      const productId = Number(item.productId);
      items.set(productId, {
        productId,
        quantity: Math.min(Number(item.quantity), 10),
      });
    }

    return Array.from(items.values());
  } catch {
    return [];
  }
}

export function serializeCartCookie(items: CartCookieItem[]) {
  return JSON.stringify(items);
}
