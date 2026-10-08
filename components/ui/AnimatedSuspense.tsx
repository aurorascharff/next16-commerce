import { Suspense, ViewTransition } from 'react';
import type { ReactNode } from 'react';

export default function AnimatedSuspense({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <Suspense
      fallback={
        <ViewTransition default="none" exit="auto">
          {fallback}
        </ViewTransition>
      }
    >
      <ViewTransition enter="auto" default="none">
        {children}
      </ViewTransition>
    </Suspense>
  );
}
