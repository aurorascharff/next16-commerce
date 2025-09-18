'use client';

import { LoaderCircle } from 'lucide-react';
import { useLinkStatus } from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';
import Boundary from '../internal/Boundary';

type Props = {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'spinner' | 'background';
  children?: React.ReactNode;
};

export default function LinkStatus({ className, width = 20, height = 20, variant = 'spinner', children }: Props) {
  const { pending } = useLinkStatus();

  if (variant === 'spinner') {
    return (
      <Boundary hydration="client">
        {pending ? (
          <div className="flex items-center gap-2">
            {children}
            <div className={cn('text-gray h-fit w-fit animate-spin', className)}>
              <LoaderCircle aria-hidden="true" width={width} height={height} />
            </div>
          </div>
        ) : (
          children
        )}
      </Boundary>
    );
  }
  if (variant === 'background') {
    return (
      <Boundary hydration="client">
        <div className={cn(pending && 'text-gray bg-gray-200 dark:bg-gray-700', className)}>{children}</div>
      </Boundary>
    );
  }
}
