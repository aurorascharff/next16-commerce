import { Mail, MapPin, Phone, User } from 'lucide-react';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import { getCurrentAccountWithDetails } from '@/features/auth/auth-queries';

export default async function UserPage() {
  const account = await getCurrentAccountWithDetails();

  return (
    <Boundary rendering="dynamic" hydration="server">
      <div className="border-divider dark:border-divider-dark flex flex-col gap-6 border bg-white p-8 dark:bg-black">
        <div className="flex items-center gap-4">
          <User className="text-primary size-16 rounded-full bg-gray-100 p-3 dark:bg-gray-800" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold uppercase">{account?.name}</h1>
            {account?.firstName && account?.lastName && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {account?.firstName} {account?.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight uppercase">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary size-5" />
                <span className="text-gray-700 dark:text-gray-300">{account?.email}</span>
              </div>
              {account?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-primary size-5" />
                  <span className="text-gray-700 dark:text-gray-300">{account?.phone}</span>
                </div>
              )}
              {(account?.address || account?.city || account?.country || account?.zipCode) && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 size-5" />
                  <div className="flex flex-col text-gray-700 dark:text-gray-300">
                    {account?.address && <span>{account?.address}</span>}
                    <span>
                      {[account?.city, account?.zipCode].filter(Boolean).join(' ')}
                      {account?.city && account?.country && ', '}
                      {account?.country}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {account?.accountDetail && (
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight uppercase">Preferences</h2>
              <div className="space-y-4">
                <PreferenceItem label="Theme" value={account?.accountDetail.theme || 'Default'} />
                <PreferenceItem label="Language" value={(account?.accountDetail.language || 'en').toUpperCase()} />
                {account?.accountDetail.timezone && (
                  <PreferenceItem label="Timezone" value={account?.accountDetail.timezone} />
                )}
                <PreferenceItem label="Newsletter" value={account?.accountDetail.newsletter ? 'Enabled' : 'Disabled'} />
                <PreferenceItem
                  label="Notifications"
                  value={account?.accountDetail.notifications ? 'Enabled' : 'Disabled'}
                />
              </div>
            </div>
          )}
        </div>
        {account?.birthDate && (
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight uppercase">Personal Information</h2>
            <PreferenceItem label="Birth Date" value={new Date(account?.birthDate).toLocaleDateString()} />
          </div>
        )}
      </div>
    </Boundary>
  );
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400">{label}:</span>
      <span className="text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}
