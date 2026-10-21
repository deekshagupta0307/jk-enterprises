import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: 'Order Review & Manual Payment | JK Enterprises Rajasthan',
  description:
    'Review your order items, delivery details, and complete payment manually via verified UPI QR code or NEFT bank transfer.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Procurement Cart', href: '/catalogue' },
            { label: 'Checkout & Manual Payment', isCurrent: true },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl" aria-hidden="true">🛡️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Manual Transfer Checkout
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Review Order & Payment Instructions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Review delivery destination, order items, and transfer funds manually using our official UPI QR code or bank details. No online credit/debit cards accepted.
          </p>
        </div>

        <CheckoutForm />
      </div>
    </main>
  );
}
