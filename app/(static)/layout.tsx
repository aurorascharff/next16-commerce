import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

export default async function StaticLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
