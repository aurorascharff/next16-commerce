import Link from 'next/link';
import type { Route } from 'next';

type Props = {
  title: string;
  link: Route | URL;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
};

export default function LinkButton({ title, link, variant = 'default', className = '' }: Props) {
  const baseClasses = 'inline-flex items-center text-sm font-bold tracking-wide uppercase';

  const variantClasses = {
    default:
      'border-divider dark:border-divider-dark hover:border-accent dark:bg-card-dark flex flex-col items-center border bg-white p-4 text-center',
    primary: 'bg-accent hover:bg-accent-hover px-6 py-3 text-white',
    secondary: 'border-accent hover:bg-accent-fade border px-6 py-3',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <Link href={link} className={combinedClasses}>
      {variant === 'default' ? <span className="text-xs font-bold tracking-wide uppercase">{title}</span> : title}
    </Link>
  );
}
