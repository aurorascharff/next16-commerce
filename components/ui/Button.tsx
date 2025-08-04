'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/utils/cn';

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
    'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 focus:ring-primary text-white disabled:bg-gray-400',
    secondary:
      'bg-card dark:bg-section hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400 text-gray-900 dark:text-gray-100 disabled:bg-gray-200 dark:disabled:bg-gray-700',
  };

  return (
    <button
      disabled={isSubmitting || disabled}
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...otherProps}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
