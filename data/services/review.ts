import 'server-only';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { Review } from '@prisma/client';

export async function getReviews(productId: number): Promise<Review[]> {
  await slow();

  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    where: { productId },
  });
}
