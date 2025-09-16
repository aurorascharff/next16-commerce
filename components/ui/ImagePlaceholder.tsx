import React from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
};

export default function ImagePlaceholder({ className }: Props) {
  return (
    <div className={cn('bg-card dark:bg-card-dark flex h-96 w-full items-center justify-center', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray h-24 w-24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
}
