'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Boundary from '../internal/Boundary';
import type { ReactNode } from 'react';

export function BannerContainer({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <Boundary hydration="client">
      <div className="border-divider dark:border-divider-dark from-accent/5 via-accent/3 dark:from-accent/10 dark:via-accent/5 relative border bg-gradient-to-tr to-transparent p-0 dark:to-transparent">
        <div className="flex items-start justify-between gap-3 p-3 sm:gap-4 sm:p-5">
          <div className="flex-1">{children}</div>
          <button
            onClick={() => {
              setDismissed(true);
            }}
            className="group text-gray/70 hover:border-divider hover:text-accent dark:text-gray/60 dark:hover:text-accent -m-1 inline-flex h-6 w-6 items-center justify-center border border-transparent p-0 transition-colors"
            aria-label="Dismiss banner"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Boundary>
  );
}
