'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { verifyAuth } from '../auth/auth-actions';

async function saveProduct(productId: number) {
  const accountId = await verifyAuth('/product/' + productId);

  await prisma.savedProduct.create({
    data: {
      accountId,
      productId,
    },
  });

  revalidatePath('/user');
  revalidatePath('/product/' + productId);
}

async function unsaveProduct(productId: number) {
  const accountId = await verifyAuth();

  await prisma.savedProduct.delete({
    where: {
      accountId_productId: {
        accountId,
        productId,
      },
    },
  });

  revalidatePath('/user');
  revalidatePath('/product/' + productId);
}

export async function toggleSaveProduct(productId: number, saved: boolean) {
  if (saved) {
    return await unsaveProduct(productId);
  } else {
    return await saveProduct(productId);
  }
}
