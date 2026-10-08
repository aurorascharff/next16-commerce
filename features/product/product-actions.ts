'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { prisma } from '@/db';
import { verifyAuth } from '../auth/auth-actions';
import { productTags } from './product-cache';
import type { Route } from 'next';

async function saveProduct(productId: number) {
  const accountId = await verifyAuth(('/product/' + productId) as Route);

  await prisma.savedProduct.create({
    data: {
      accountId,
      productId,
    },
  });

  updateTag(productTags.saved(accountId, productId));
  updateTag(productTags.savedList(accountId));
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

  updateTag(productTags.saved(accountId, productId));
  updateTag(productTags.savedList(accountId));
}

export async function toggleSaveProduct(productId: number, saved: boolean) {
  if (saved) {
    return await unsaveProduct(productId);
  } else {
    return await saveProduct(productId);
  }
}

export async function setFeaturedProduct(productId: number) {
  await prisma.product.updateMany({
    data: { featured: false },
    where: { featured: true },
  });

  await prisma.product.update({
    data: { featured: true },
    where: { id: productId },
  });

  revalidateTag('featured-product', 'max');
}
