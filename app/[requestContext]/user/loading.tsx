import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="border-card dark:border-card-dark flex flex-col gap-6 rounded-lg border p-8 xl:mx-40 2xl:mx-60">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-gray-200 dark:bg-neutral-800" />
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="max-w-md" />
    </div>
  );
}
