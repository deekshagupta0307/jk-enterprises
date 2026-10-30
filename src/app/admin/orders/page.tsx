import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAdminOrdersQueue } from '@/lib/orders/orderService';
import { SystemRole } from '@prisma/client';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Badge } from '@/components/ui/Badge';

export const instant = false;

export const metadata: Metadata = {
  title: 'Admin Orders & Payments Queue | JK Enterprises Rajasthan',
  description: 'Administrative payment verification queue and wholesale partner approvals.',
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminOrdersContent() {
  const session = await getServerSession();

  // 1. Strict Server Authentication Enforcement
  if (!session) {
    redirect('/account/login?callbackUrl=/admin/orders');
  }

  // 2. Strict Server Role Authorization Enforcement
  if (session.user.role !== SystemRole.ADMIN && session.user.role !== SystemRole.STAFF) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto text-3xl font-black">
          🛡️
        </div>
        <h1 className="text-2xl font-black text-slate-950">403 Forbidden — Access Denied</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The administrative orders queue is restricted strictly to authorized JK Enterprises
          staff members and system administrators. Your account ({session.user.email}) does not have
          administrative clearance.
        </p>
        <div className="pt-2">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            ← Return to Customer Portal
          </Link>
        </div>
      </div>
    );
  }

  // 3. Authorized Data Fetching
  const { orders, wholesaleApplications, stats } = await getAdminOrdersQueue(session);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Customer Account', href: '/account' },
          { label: 'Admin Orders & Payments Queue', isCurrent: true },
        ]}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden="true">🛡️</span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
              Staff &amp; Admin Desk
            </span>
            <span className="text-xs text-slate-400">
              Authenticated as: <strong className="text-white">{session.user.name}</strong> ({session.user.role})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Orders &amp; Payment Verification Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Centralized queue for customer payment attempts, manual bank credit verification, UTR approvals, and wholesale partner requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/catalogue"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            Catalogue Review Desk
          </Link>
          <Link
            href="/account"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            Account Portal
          </Link>
        </div>
      </div>

      {/* Metrics Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Orders
          </span>
          <span className="text-2xl font-black text-slate-950">{stats.totalOrders}</span>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-800 block tracking-wider">
            Verification Pending
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-900">{stats.pendingVerification}</span>
            {stats.pendingVerification > 0 && (
              <span className="text-[10px] font-bold text-amber-700 uppercase animate-pulse">
                Needs Action
              </span>
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-blue-800 block tracking-wider">
            Awaiting Payment
          </span>
          <span className="text-2xl font-black text-blue-900">{stats.awaitingPayment}</span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
            Confirmed / Paid
          </span>
          <span className="text-2xl font-black text-emerald-900">{stats.confirmedOrPaid}</span>
        </div>

        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-purple-800 block tracking-wider">
            Wholesale Pending
          </span>
          <span className="text-2xl font-black text-purple-900">{stats.pendingWholesale}</span>
        </div>
      </div>

      {/* Orders Queue Table */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">
              Customer Orders Queue
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prioritized list with pending UTR submissions at the top. Click any order to open its administrative verification desk.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
            Showing {orders.length} Records
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              📋
            </div>
            <h3 className="font-bold text-slate-900 text-sm">No orders currently in queue</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Customer order submissions and payment references will appear in this administrative queue automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="pb-3">Order / Ref</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Customer &amp; Destination</th>
                  <th className="pb-3">Payment Info &amp; UTR</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => {
                  const displayRef = ord.confirmedOrderNumber || ord.orderNumber;
                  const formattedDate = new Date(ord.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });
                  const isPendingAction =
                    ord.paymentStatus === 'PAYMENT_UNDER_VERIFICATION';

                  const statusVariant =
                    ord.paymentStatus === 'CONFIRMED' || ord.paymentStatus === 'PAID'
                      ? 'primary'
                      : ord.paymentStatus === 'PAYMENT_UNDER_VERIFICATION'
                        ? 'primary'
                        : ord.paymentStatus === 'PAYMENT_REJECTED'
                          ? 'danger'
                          : 'warning';

                  const statusLabel =
                    ord.paymentStatus === 'CONFIRMED' || ord.paymentStatus === 'PAID'
                      ? 'Confirmed / Paid'
                      : ord.paymentStatus === 'PAYMENT_UNDER_VERIFICATION'
                        ? 'Verification Pending'
                        : ord.paymentStatus === 'PAYMENT_REJECTED'
                          ? 'Payment Rejected'
                          : 'Awaiting Payment';

                  return (
                    <tr
                      key={ord.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isPendingAction ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 pr-2">
                        <span className="font-mono font-bold text-slate-900 block text-xs">
                          {displayRef}
                        </span>
                        {ord.confirmedOrderNumber ? (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            Confirmed ID
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-700 font-medium block">
                            Payment Attempt
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-slate-600 font-medium">
                        {formattedDate}
                      </td>
                      <td className="py-3.5 pr-2">
                        <span className="font-bold text-slate-900 block">
                          {ord.customerName}
                        </span>
                        {ord.organizationName && (
                          <span className="text-[10px] text-slate-600 font-medium block">
                            {ord.organizationName}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 block font-mono">
                          +91 {ord.customerPhone} • {ord.district}
                        </span>
                      </td>
                      <td className="py-3.5 pr-2">
                        <span className="text-[11px] text-slate-700 font-medium block">
                          {ord.paymentMethod === 'MANUAL_BANK_TRANSFER'
                            ? 'Bank NEFT/RTGS'
                            : 'UPI QR Code'}
                        </span>
                        {ord.paymentReferenceUTR ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold mt-0.5">
                            <span>UTR:</span>
                            <span>{ord.paymentReferenceUTR}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic block mt-0.5">
                            No UTR Submitted
                          </span>
                        )}
                      </td>
                      <td className="py-3.5">
                        <Badge variant={statusVariant} size="sm">
                          {statusLabel}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-right font-mono font-black text-slate-950">
                        ₹{ord.totalAmountINR.toLocaleString('en-IN')}
                        <span className="text-[10px] text-slate-400 block font-normal font-sans">
                          {ord.itemsCount} {ord.itemsCount === 1 ? 'item' : 'items'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pl-2">
                        <Link
                          href={`/orders/${ord.orderNumber}`}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            isPendingAction
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-2xs'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <span>{isPendingAction ? 'Verify Payment' : 'Review Order'}</span>
                          <span>→</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pending Wholesale Reseller Applications Section */}
      {wholesaleApplications.length > 0 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">🏢</span>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">
                  Pending Wholesale Dealer Applications
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Hardware retailers and corporate integrators who have applied for wholesale trade tier pricing.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              {wholesaleApplications.length} Pending
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wholesaleApplications.map((ws) => (
              <div
                key={ws.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{ws.organizationName}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Applicant: {ws.userName} ({ws.userEmail})
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                    PENDING APPROVAL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">District</span>
                    <span className="font-semibold text-slate-800">{ws.district}, {ws.state}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">GSTIN</span>
                    <span className="font-mono text-slate-800">{ws.gstin || 'Not Provided'}</span>
                  </div>
                </div>

                {ws.wholesaleApprovalNotes && (
                  <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Application Notes</span>
                    <p className="text-slate-700 italic">{ws.wholesaleApprovalNotes}</p>
                  </div>
                )}

                <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                  <span>Applied: {new Date(ws.createdAt).toLocaleDateString('en-IN')}</span>
                  <span className="text-slate-400">Database Role Elevation Required for Approval</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security and Audit Transparency Notice */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <span className="text-base" aria-hidden="true">ℹ️</span>
        <div>
          <p className="font-bold text-slate-900">Administrative Audit Trail Safeguard</p>
          <p className="mt-0.5 text-slate-500 leading-relaxed text-[11px]">
            Every payment verification, rejection, and tax invoice assignment is strictly committed to the authoritative PostgreSQL database with the operator&apos;s user ID and timestamp. Offline or unpersisted orders cannot be verified in production.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminOrdersSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
      <div className="h-6 w-48 bg-slate-200 rounded"></div>
      <div className="h-28 bg-white rounded-3xl border border-slate-200 p-6"></div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-white rounded-2xl border border-slate-200"></div>
        ))}
      </div>
      <div className="h-96 bg-white rounded-3xl border border-slate-200"></div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <Suspense fallback={<AdminOrdersSkeleton />}>
        <AdminOrdersContent />
      </Suspense>
    </main>
  );
}
