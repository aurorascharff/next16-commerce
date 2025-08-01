'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function switchAccount(accountId: string) {
  (await cookies()).set('selectedAccountId', accountId);
}

export async function logOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');

  redirect('/');
}

export async function logIn(email: string) {
  await slow();

  const account = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });

  if (!account) {
    return {
      error: 'No account found with this email address.',
    };
  }

  (await cookies()).set('selectedAccountId', account?.id);
}
