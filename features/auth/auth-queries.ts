import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getIsAuthenticated = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    return false;
  }
  return true;
});

export const getAccount = cache(async (accountId: string) => {
  await slow();

  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });

  return account;
});

export const getAccountWithDetails = cache(async (accountId: string) => {
  await slow();

  const account = await prisma.account.findUnique({
    include: {
      accountDetail: true,
    },
    where: {
      id: accountId,
    },
  });

  return account;
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
