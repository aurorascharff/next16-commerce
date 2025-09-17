'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/utils/cn';
import Boundary from '../internal/Boundary';

type Props = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
};

export default function Button({
  children,
  loading,
  type = 'submit',
  variant = 'primary',
  className,
  disabled,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  const isSubmitting = loading || pending;

  const baseClasses =
    'inline-flex items-center justify-center px-5 py-2.5 font-semibold uppercase tracking-wide transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-offset-2 dark:focus:ring-offset-gray-900';

  const variantClasses = {
    primary:
      'bg-accent text-white hover:bg-accent-hover focus:ring-accent disabled:bg-gray-400 dark:disabled:bg-gray-600',
    secondary:
      'bg-card dark:bg-card-dark border border-divider dark:border-divider-dark text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#1a1a1a] focus:ring-accent',
  } as const;

  return (
    <Boundary hydration="client">
      <button
        disabled={isSubmitting || disabled}
        type={type}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...otherProps}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            {children}
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          children
        )}
      </button>
    </Boundary>
  );
}
