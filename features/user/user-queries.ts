import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { Route } from 'next';

export async function getIsAuthenticated() {
  return Boolean(await getCurrentAccount());
}

export async function getAccount(accountId: string) {
  'use cache';
  cacheLife('max');
  cacheTag(`account:${accountId}`);

  await slow();

  return prisma.account.findUnique({
    where: { id: accountId },
  });
}

export async function getAccountWithDetails(accountId: string) {
  'use cache';
  cacheLife('max');
  cacheTag(`account:${accountId}`);

  await slow();

  return prisma.account.findUnique({
    include: { accountDetail: true },
    where: { id: accountId },
  });
}

export async function getCurrentAccount() {
  'use cache: private';
  cacheLife('max');

  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;

  if (!selectedAccountId) {
    return null;
  }

  return getAccount(selectedAccountId);
}

export async function getCurrentAccountWithDetails() {
  const account = await getCurrentAccount();
  if (!account) {
    redirect('/sign-in');
  }

  return getAccountWithDetails(account.id);
}

export async function verifyAuth(redirectUrl?: Route) {
  const account = await getCurrentAccount();

  if (!account) {
    if (redirectUrl) {
      redirect(`/sign-in?redirectUrl=${redirectUrl}`);
    }

    redirect('/sign-in');
  }

  return account.id;
}

export async function getUserDiscounts(accountId: string) {
  'use cache';
  cacheLife('max');
  cacheTag(`discounts:${accountId}`);

  await slow();

  const userDiscounts = await prisma.userDiscount.findMany({
    include: {
      discount: true,
    },
    orderBy: { discount: { expiry: 'asc' } },
    where: { accountId },
  });

  return userDiscounts.map(ud => {
    return ud.discount;
  });
}

export async function isSavedProduct(accountId: string, productId: number) {
  'use cache';
  cacheLife('max');
  cacheTag(`saved-product-view:${productId}`);

  const savedProduct = await prisma.savedProduct.findUnique({
    where: {
      accountId_productId: {
        accountId,
        productId,
      },
    },
  });

  return Boolean(savedProduct);
}

export async function getSavedProducts(accountId: string) {
  'use cache';
  cacheLife('max');
  cacheTag(`saved-products:${accountId}`);

  const savedProducts = await prisma.savedProduct.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
    where: { accountId },
  });

  return savedProducts.map(saved => saved.product);
}
