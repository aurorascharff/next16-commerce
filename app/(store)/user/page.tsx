import { Suspense } from 'react';
import UserDetails, { UserDetailsSkeleton } from '@/features/user/components/UserDetails';

export default function UserPage() {
  return (
    <Suspense fallback={<UserDetailsSkeleton />}>
      <UserDetails />
    </Suspense>
  );
}
