import React from 'react';

export default function Loading() {
  return (
    <>
      <div className="skeleton-animation mb-4 h-12 w-full rounded-lg" />
      <div className="skeleton-animation mb-4 h-10 w-full rounded-md" />
      <div className="flex h-full grow flex-col gap-4">
        <div className="skeleton-animation h-6 w-24 rounded" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => {
            return <div key={i} className="skeleton-animation h-80 w-full rounded-lg" />;
          })}
        </div>
      </div>
    </>
  );
}
