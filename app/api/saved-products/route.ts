import { isSavedProduct } from '@/features/product/product-queries';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productIdParam = searchParams.get('productId');

    if (!productIdParam) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const productId = parseInt(productIdParam, 10);
    if (isNaN(productId)) {
      return Response.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const saved = await isSavedProduct(productId);
    return Response.json({ saved });
  } catch {
    return Response.json({ error: 'Failed to fetch saved product status' }, { status: 500 });
  }
}
