import { Suspense } from 'react';
import type { ReactNode } from 'react';

export default function AnimatedSuspense({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <div className="suspense-reveal">{children}</div>
    </Suspense>
  );
}
