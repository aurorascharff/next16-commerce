import Link from 'next/link';
import type { Route } from 'next';
import type { LinkProps } from 'next/link';

type Props = {
  href: Route;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
};

export default function LinkButton({ children, href, variant = 'default', className = '' }: Props & LinkProps<Route>) {
  const baseClasses = 'inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase';

  const variantClasses = {
    default:
      'border-divider dark:border-divider-dark hover:border-accent dark:bg-card-dark flex flex-col items-center border bg-white p-4 text-center',
    primary: 'bg-accent hover:bg-accent-hover px-6 py-3 text-white',
    secondary: 'border-accent hover:bg-accent-fade border px-6 py-3',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  );
}
