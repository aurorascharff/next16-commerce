import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import { getSavedProducts } from '@/features/product/product-queries';
import { getUserDiscounts } from '@/features/user/user-queries';

export async function GET() {
  try {
    const [account, discounts, savedProducts] = await Promise.all([
      getCurrentAccount(),
      getUserDiscounts(),
      getSavedProducts(),
    ]);

    return NextResponse.json({
      account,
      discounts,
      savedProducts,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
