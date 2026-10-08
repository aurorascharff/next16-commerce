'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, unauthorized } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { verifyAuth } from './user-queries';
import type { Route } from 'next';

export async function logOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');
}

export async function logIn(email: string, redirectUrl?: Route) {
  await slow();

  const account = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });

  if (!account) {
    unauthorized();
  }

  (await cookies()).set('selectedAccountId', account?.id);
  redirect((redirectUrl || '/') as Route);
}

export async function toggleSaveProduct(productId: number, saved: boolean) {
  const accountId = await verifyAuth(`/product/${productId}` as Route);

  if (saved) {
    await prisma.savedProduct.delete({
      where: { accountId_productId: { accountId, productId } },
    });
  } else {
    await prisma.savedProduct.create({
      data: { accountId, productId },
    });
  }

  updateTag(`saved-product-view:${productId}`);
  updateTag(`saved-products:${accountId}`);
  updateTag(`recommendations:${accountId}`);
}
