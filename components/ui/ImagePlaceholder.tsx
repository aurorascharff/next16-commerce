import React from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  variant?: 'default' | 'simple';
};

export default function ImagePlaceholder({ className, variant = 'default' }: Props) {
  if (variant === 'simple') {
    return (
      <div className={cn('bg-card dark:bg-card-dark flex items-center justify-center', className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'bg-card dark:bg-card-dark relative flex h-96 w-full items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Stretched background pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="from-gray/20 to-gray/20 h-full w-full bg-gradient-to-br via-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.08)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.08)_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Centered icon with subtle glow */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="bg-gray/10 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="text-gray text-sm font-medium tracking-wide uppercase">Product Image</span>
      </div>

      {/* Corner indicators showing stretch */}
      <div className="border-gray/30 absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2" />
      <div className="border-gray/30 absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2" />
      <div className="border-gray/30 absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2" />
      <div className="border-gray/30 absolute right-2 bottom-2 h-6 w-6 border-r-2 border-b-2" />
    </div>
  );
}
