import { cn } from '@/utils/cn';

type DividerProps = {
  variant?: 'dotted' | 'dashed' | 'solid';
  className?: string;
};

export default function Divider({ variant = 'dotted', className }: DividerProps) {
  const baseStyles = 'w-full h-px';

  const variantStyles = {
    dashed: 'border-t border-dashed border-divider dark:border-divider-dark border-opacity-70 dark:border-opacity-70',
    dotted: 'border-t border-dotted border-divider dark:border-divider-dark border-opacity-70 dark:border-opacity-70',
    solid: 'bg-divider dark:bg-divider-dark bg-opacity-70 dark:bg-opacity-70',
  };

  return <hr aria-hidden="true" className={cn(baseStyles, variantStyles[variant], className)} />;
}
