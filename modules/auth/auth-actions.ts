'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, unauthorized } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentAccount, getIsAuthenticated } from './auth-queries';

export const verifyAuth = cache(async (redirectUrl?: string) => {
  const user = await getCurrentAccount();
  if (!user) {
    if (redirectUrl) {
      redirect('/sign-in?redirectUrl=' + redirectUrl);
    } else {
      redirect('/sign-in');
    }
  }

  return user.id;
});

export async function switchAccount(accountId: string) {
  (await cookies()).set('selectedAccountId', accountId);
}

export async function signOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');

  revalidatePath('/');
}

export async function signIn(email: string, redirectUrl?: string) {
  console.log({ redirectUrl });
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
  redirect(redirectUrl || '/');
}

export async function SignInORedirect() {
  const isAuthenticated = await getIsAuthenticated();

  if (isAuthenticated) {
    redirect('/');
  } else {
    redirect('/sign-in');
  }
}
