'use server';

import { cookies } from 'next/headers';
import { redirect, unauthorized } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentAccount } from './auth-queries';
import type { Route } from 'next';

export const verifyAuth = cache(async (redirectUrl?: Route | URL) => {
  const user = await getCurrentAccount();
  if (!user) {
    if (redirectUrl) {
      redirect(`/sign-in?redirectUrl=${redirectUrl}` as Route);
    } else {
      redirect('/sign-in' as Route);
    }
  }

  return user.id;
});

export async function logOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');

  redirect('/' as Route);
}

export async function logIn(email: string, redirectUrl?: Route | URL) {
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
