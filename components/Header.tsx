import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="border-divider dark:border-divider-dark border-b bg-white py-4 dark:bg-black">
      <h1 className="text-3xl font-bold">
        <Link href="/" className="text-primary hover:text-primary-dark">
          Commerce
        </Link>
      </h1>
    </header>
  );
}
