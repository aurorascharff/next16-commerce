'use client';

import { Bookmark } from 'lucide-react';
import useSWR from 'swr';
import Boundary from '@/components/internal/Boundary';
import SaveProductButton from '@/features/user/components/SaveProductButton';
import { fetcher } from '@/utils/fetcher';

type Props = {
  productId: number;
  loggedIn: boolean;
};

export default function SavedProduct({ productId, loggedIn }: Props) {
  const { data: productIsSaved = false, isLoading } = useSWR<boolean>(
    `/api/saved-products?productId=${productId}`,
    fetcher,
  );

  if (isLoading) {
    return <Bookmark aria-hidden className="text-gray size-5" />;
  }

  return (
    <Boundary rendering="static">
      <SaveProductButton productId={productId} initialSaved={loggedIn ? productIsSaved : false} />
    </Boundary>
  );
}
