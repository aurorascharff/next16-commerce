import BackButton from '@/components/ui/BackButton';

export default async function ProductLayout({ children }: LayoutProps<'/[requestContext]/product/[id]'>) {
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      {children}
    </div>
  );
}
