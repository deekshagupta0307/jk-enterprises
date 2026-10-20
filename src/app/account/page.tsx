import React from 'react';
import type { Metadata } from 'next';
import { getServerSession } from '@/lib/auth/session';
import { isDatabaseConfigured } from '@/lib/db/prisma';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AccountAuthForms } from '@/components/account/AccountAuthForms';
import { AccountDashboard } from '@/components/account/AccountDashboard';

export const metadata: Metadata = {
  title: 'Customer Account & Trade Portal | JK Enterprises Rajasthan',
  description:
    'Manage your JK Enterprises hardware procurement account, business GST verification, and wholesale trade partner status.',
};

export default async function AccountPage() {
  const session = await getServerSession();
  const isDbConnected = isDatabaseConfigured();

  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Customer Account', isCurrent: true },
          ]}
          className="mb-6"
        />

        {/* Dynamic Content */}
        {session ? (
          <AccountDashboard session={session} />
        ) : (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Customer & Trade Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Dedicated hardware procurement for retail buyers, Rajasthan educational institutions, and approved computer hardware dealers.
              </p>
            </div>

            <AccountAuthForms isDatabaseConnected={isDbConnected} />
          </div>
        )}
      </div>
    </main>
  );
}
