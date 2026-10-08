'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Boundary from '../internal/Boundary';

type Props = {
  fallbackHref?: Parameters<typeof Link>[0]['href'];
  children?: React.ReactNode;
};

export default function BackButton({ fallbackHref, children = 'Back' }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  if (fallbackHref) {
    return (
      <Link
        href={fallbackHref}
        prefetch={true}
        onClick={event => {
          const isModifiedClick =
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

          if (!isModifiedClick && window.history.length > 1) {
            event.preventDefault();
            router.back();
          }
        }}
        className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft aria-hidden className="mr-1 size-4" />
        {children}
      </Link>
    );
  }

  return (
    <Boundary hydration="client">
      <button
        onClick={handleClick}
        className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium uppercase"
      >
        <ArrowLeft aria-hidden className="mr-1 size-4" />
        {children}
      </button>
    </Boundary>
  );
}
