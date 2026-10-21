import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderSecurely } from '@/lib/orders/orderService';
import { getServerSession } from '@/lib/auth/session';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { OrderConfirmationView } from '@/components/orders/OrderConfirmationView';

interface OrderPageProps {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { orderNumber } = await params;
  return {
    title: `Order Status: ${orderNumber} | JK Enterprises Rajasthan`,
    description: 'Track your JK Enterprises hardware procurement order status and manual payment verification.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function OrderContent({ params, searchParams }: OrderPageProps) {
  const { orderNumber } = await params;
  const { token } = await searchParams;
  const session = await getServerSession();

  let order = null;
  try {
    order = await getOrderSecurely(orderNumber, token, session);
  } catch {
    // Unauthorized or not found
    notFound();
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Customer Account', href: '/account' },
          { label: `Order ${order.orderNumber}`, isCurrent: true },
        ]}
        className="mb-6"
      />

      <OrderConfirmationView initialOrder={order} userRole={session?.user?.role} />
    </div>
  );
}

function OrderLoadingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
      <div className="h-6 w-48 bg-slate-200 rounded"></div>
      <div className="h-32 bg-white rounded-2xl border border-slate-200 p-6"></div>
      <div className="h-64 bg-white rounded-2xl border border-slate-200 p-6"></div>
    </div>
  );
}

export default function OrderConfirmationPage(props: OrderPageProps) {
  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <Suspense fallback={<OrderLoadingSkeleton />}>
        <OrderContent {...props} />
      </Suspense>
    </main>
  );
}
