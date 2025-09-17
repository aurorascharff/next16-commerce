import React from 'react';
import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={cn('border-divider dark:border-divider-dark rounded-none border p-6 shadow-sm', className)}>
      {children}
    </div>
  );
}
