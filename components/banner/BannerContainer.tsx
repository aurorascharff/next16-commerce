'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

export function BannerContainer({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="rounded-lg border border-divider bg-primary/5 p-4 dark:border-divider-dark dark:bg-primary/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">{children}</div>
        <button
          onClick={() => {
            return setDismissed(true);
          }}
          className="ml-4 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Dismiss banner"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
