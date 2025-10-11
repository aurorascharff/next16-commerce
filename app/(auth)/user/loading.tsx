import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="border-divider dark:border-divider-dark flex flex-col gap-6 border bg-white p-8 dark:bg-black">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-gray-200 dark:bg-neutral-800" />
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-47" />
        <Skeleton className="h-47" />
      </div>
      <Skeleton className="h-60 max-w-md" />
    </div>
  );
}
