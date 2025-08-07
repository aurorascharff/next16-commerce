import 'server-only';

import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentAccount } from '../auth/auth-queries';

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
