'use client';

import { useQuery } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import SaveProductButton from './SaveProductButton';

async function fetchSavedProduct(productId: number) {
  const res = await fetch(`/api/saved-products?productId=${productId}`);
  const data = await res.json();
  return data.saved;
}

type Props = {
  productId: number;
  loggedIn: boolean;
};

export default function SavedProduct({ productId, loggedIn }: Props) {
  const { data: productIsSaved = false, isLoading } = useQuery<boolean>({
    enabled: loggedIn,
    queryFn: () => {
      return fetchSavedProduct(productId);
    },
    queryKey: ['savedProduct', productId],
  });

  if (isLoading) {
    return <Bookmark aria-hidden className="text-gray size-5" />;
  }

  return <SaveProductButton productId={productId} initialSaved={loggedIn ? productIsSaved : false} />;
}
