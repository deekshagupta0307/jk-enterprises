import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAdminCatalogueData } from '@/lib/catalogue/catalogueAdminService';
import { SystemRole } from '@prisma/client';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CatalogueReviewDesk } from '@/components/admin/CatalogueReviewDesk';

export const instant = false;

export const metadata: Metadata = {
  title: 'Admin Catalogue Expansion & Commercial Review | JK Enterprises',
  description: 'Administrative catalogue review desk for pricing verification and publication control.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminCataloguePage() {
  const session = await getServerSession();

  // 1. Strict Server Authentication Enforcement
  if (!session) {
    redirect('/account/login?callbackUrl=/admin/catalogue');
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
          The administrative catalogue review desk is restricted strictly to authorized JK Enterprises
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
  const initialData = await getAdminCatalogueData(session, { page: 1, limit: 20 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Customer Account', href: '/account' },
          { label: 'Admin Orders Queue', href: '/admin/orders' },
          { label: 'Catalogue Review Desk', isCurrent: true },
        ]}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden="true">📦</span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
              Staff &amp; Admin Desk
            </span>
            <span className="text-xs text-slate-400">
              Authenticated as: <strong className="text-white">{session.user.name}</strong> ({session.user.role})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Catalogue Expansion &amp; Commercial Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Review imported products from FINGERS Store and HP India. Inspect specifications, adjust business selling prices, verify warranties, and approve products for live listing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            Orders &amp; Payments Queue
          </Link>
          <Link
            href="/account"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            Account Portal
          </Link>
        </div>
      </div>

      {/* Interactive Desk */}
      <CatalogueReviewDesk
        initialData={initialData}
        userRole={session.user.role}
        userName={session.user.name || session.user.email}
      />
    </div>
  );
}
