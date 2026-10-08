import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';
import { getProductsByIds } from '@/features/product/product-queries';
import { CART_COOKIE_NAME, parseCartCookie } from './cart-cookie';

export async function getCartItems() {
  'use cache: private';
  cacheLife('minutes');
  cacheTag('cart');

  const value = (await cookies()).get(CART_COOKIE_NAME)?.value;
  return parseCartCookie(value);
}

export async function getCartCount() {
  const items = await getCartItems();
  return items.reduce((count, item) => count + item.quantity, 0);
}

export async function isProductInCart(productId: number) {
  const items = await getCartItems();
  return items.some(item => item.productId === productId);
}

export async function getCart() {
  const items = await getCartItems();
  const products = await getProductsByIds(items.map(item => item.productId));
  const productsById = new Map(products.map(product => [product.id, product]));

  return items.flatMap(item => {
    const product = productsById.get(item.productId);
    return product ? [{ ...item, product }] : [];
  });
}
