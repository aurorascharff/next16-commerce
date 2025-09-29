'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Boundary from '../internal/Boundary';

type Props = {
  href?: Parameters<typeof Link>[0]['href'];
  children?: React.ReactNode;
};

export default function BackButton({ href, children = 'Back' }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  if (href) {
    return (
      <Link href={href} className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
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
