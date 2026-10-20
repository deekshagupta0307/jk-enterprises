import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { isDatabaseConfigured } from '@/lib/db/prisma';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AccountAuthForms } from '@/components/account/AccountAuthForms';

export const metadata: Metadata = {
  title: 'Register Account | JK Enterprises Rajasthan',
  description: 'Create a customer or dealer account with JK Enterprises.',
};

export default async function RegisterPage() {
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
            { label: 'Register', isCurrent: true },
          ]}
          className="mb-6"
        />

        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Register for retail procurement, school/office packages, or apply for wholesale dealer distribution.
            </p>
          </div>

          <AccountAuthForms isDatabaseConnected={isDbConnected} defaultTab="register" />
        </div>
      </div>
    </main>
  );
}
