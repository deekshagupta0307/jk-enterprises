import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderSecurely } from '@/lib/orders/orderService';
import { getServerSession } from '@/lib/auth/session';
import { InvoicePrintView } from '@/components/orders/InvoicePrintView';

interface InvoicePageProps {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: InvoicePageProps): Promise<Metadata> {
  const { orderNumber } = await params;
  return {
    title: `Invoice Document - ${orderNumber} | JK Enterprises`,
    description: 'Download and print formal proforma invoice or tax invoice document.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function InvoiceContent({ params, searchParams }: InvoicePageProps) {
  const { orderNumber } = await params;
  const { token } = await searchParams;
  const session = await getServerSession();

  let order = null;
  try {
    order = await getOrderSecurely(orderNumber, token, session);
  } catch {
    notFound();
  }

  if (!order) {
    notFound();
  }

  return <InvoicePrintView order={order} />;
}

function InvoiceLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="bg-white max-w-4xl w-full p-8 rounded-2xl shadow animate-pulse space-y-4">
        <div className="h-8 w-64 bg-slate-200 rounded"></div>
        <div className="h-4 w-48 bg-slate-200 rounded"></div>
        <div className="h-48 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}

export default function InvoicePage(props: InvoicePageProps) {
  return (
    <Suspense fallback={<InvoiceLoadingSkeleton />}>
      <InvoiceContent {...props} />
    </Suspense>
  );
}
