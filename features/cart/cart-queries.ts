import 'server-only';

import { cookies } from 'next/headers';
import { getProductsByIds } from '@/features/product/product-queries';

export const CART_COOKIE_NAME = 'next16-commerce-cart';

export type CartCookieItem = {
  productId: number;
  quantity: number;
};

export async function getCartCount() {
  const items = await readCartItems();
  return items.reduce((count, item) => count + item.quantity, 0);
}

export async function isProductInCart(productId: number) {
  const items = await readCartItems();
  return items.some(item => item.productId === productId);
}

export async function getCart() {
  const items = await readCartItems();
  const products = await getProductsByIds(items.map(item => item.productId));
  const productsById = new Map(products.map(product => [product.id, product]));

  return items.flatMap(item => {
    const product = productsById.get(item.productId);
    return product ? [{ ...item, product }] : [];
  });
}

async function readCartItems() {
  const value = (await cookies()).get(CART_COOKIE_NAME)?.value;
  return parseCartCookie(value);
}

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
