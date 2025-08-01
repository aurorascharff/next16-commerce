'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { verifyAuth } from '@/modules/auth/auth-queries';

async function saveProduct(productId: number) {
  const accountId = await verifyAuth();

  await prisma.savedProduct.create({
    data: {
      accountId,
      productId,
    },
  });

  revalidatePath('/profile');
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

  revalidatePath('/profile');
  revalidatePath('/product/' + productId);
}

export async function toggleSaveProduct(productId: number, saved: boolean) {
  if (saved) {
    await unsaveProduct(productId);
  } else {
    await saveProduct(productId);
  }
}
