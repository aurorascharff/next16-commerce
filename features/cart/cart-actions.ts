'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { CART_COOKIE_NAME, parseCartCookie, type CartCookieItem } from './cart-queries';

const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function toggleCartProduct(productId: number) {
  assertProductId(productId);

  const productExists = await prisma.product.findUnique({
    select: { id: true },
    where: { id: productId },
  });
  if (!productExists) {
    return { error: 'Product not found.', ok: false as const };
  }

  const cookieStore = await cookies();
  const items = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const inCart = items.some(item => item.productId === productId);
  const nextItems = inCart
    ? items.filter(item => item.productId !== productId)
    : [...items, { productId, quantity: 1 }];

  setCartCookie(cookieStore, nextItems);
  updateTag('cart');
  return { inCart: !inCart, ok: true as const };
}

export async function updateCartProductQuantity(productId: number, quantity: number) {
  assertProductId(productId);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return { error: 'Quantity must be between 1 and 10.', ok: false as const };
  }

  const cookieStore = await cookies();
  const items = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const nextItems = items.map(item => (item.productId === productId ? { ...item, quantity } : item));

  setCartCookie(cookieStore, nextItems);
  updateTag('cart');
  return { ok: true as const };
}

export async function removeCartProduct(productId: number) {
  assertProductId(productId);

  const cookieStore = await cookies();
  const items = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const nextItems = items.filter(item => item.productId !== productId);

  setCartCookie(cookieStore, nextItems);
  updateTag('cart');
  return { ok: true as const };
}

function assertProductId(productId: number) {
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error('Invalid product ID.');
  }
}

function setCartCookie(cookieStore: Awaited<ReturnType<typeof cookies>>, items: CartCookieItem[]) {
  if (items.length === 0) {
    cookieStore.delete(CART_COOKIE_NAME);
    return;
  }

  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(items), {
    httpOnly: true,
    maxAge: CART_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
