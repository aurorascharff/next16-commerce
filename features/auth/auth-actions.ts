'use server';

import { cookies } from 'next/headers';
import { redirect, unauthorized } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentAccount } from './auth-queries';
import type { Route } from 'next';

export const verifyAuth = cache(async (redirectUrl?: Route) => {
  const user = await getCurrentAccount();
  if (!user) {
    if (redirectUrl) {
      redirect(`/sign-in?redirectUrl=${redirectUrl}`);
    } else {
      redirect('/sign-in');
    }
  }

  return user.id;
});

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
