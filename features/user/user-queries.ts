import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { Route } from 'next';

export const getIsAuthenticated = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  return Boolean(selectedAccountId);
});

export const getAccount = cache(async (accountId: string) => {
  await slow();

  return prisma.account.findUnique({
    where: { id: accountId },
  });
});

export const getAccountWithDetails = cache(async (accountId: string) => {
  await slow();

  return prisma.account.findUnique({
    include: { accountDetail: true },
    where: { id: accountId },
  });
});

export const getCurrentAccount = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;

  if (!selectedAccountId) {
    return null;
  }

  return getAccount(selectedAccountId);
});

export const getCurrentAccountWithDetails = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;

  if (!selectedAccountId) {
    redirect('/sign-in');
  }

  return getAccountWithDetails(selectedAccountId);
});

export const verifyAuth = cache(async (redirectUrl?: Route) => {
  const account = await getCurrentAccount();

  if (!account) {
    if (redirectUrl) {
      redirect(`/sign-in?redirectUrl=${redirectUrl}`);
    }

    redirect('/sign-in');
  }

  return account.id;
});

export const getUserDiscounts = cache(async () => {
  await slow();

  const account = await getCurrentAccount();

  if (!account) {
    return [];
  }

  const userDiscounts = await prisma.userDiscount.findMany({
    include: {
      discount: true,
    },
    orderBy: { discount: { expiry: 'asc' } },
    where: { accountId: account.id },
  });

  return userDiscounts.map(ud => {
    return ud.discount;
  });
});

export async function isSavedProduct(productId: number) {
  const account = await getCurrentAccount();

  if (!account) {
    return false;
  }

  const savedProduct = await prisma.savedProduct.findUnique({
    where: {
      accountId_productId: {
        accountId: account.id,
        productId,
      },
    },
  });

  return Boolean(savedProduct);
}

export async function getSavedProducts() {
  'use cache: private';
  cacheLife('max');

  const accountId = await verifyAuth();
  cacheTag(`saved-products:${accountId}`);

  const savedProducts = await prisma.savedProduct.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
    where: { accountId },
  });

  return savedProducts.map(saved => saved.product);
}
