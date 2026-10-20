import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { isDatabaseConfigured } from '@/lib/db/prisma';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AccountAuthForms } from '@/components/account/AccountAuthForms';

export const metadata: Metadata = {
  title: 'Sign In | JK Enterprises Rajasthan',
  description: 'Sign in to your JK Enterprises customer or dealer portal account.',
};

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/account');
  }

  const isDbConnected = isDatabaseConfigured();

  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Customer Account', href: '/account' },
            { label: 'Sign In', isCurrent: true },
          ]}
          className="mb-6"
        />

        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Access your hardware quotes, institutional orders, and trade partner status.
            </p>
          </div>

          <AccountAuthForms isDatabaseConnected={isDbConnected} defaultTab="login" />
        </div>
      </div>
    </main>
  );
}
