'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { logoutCustomerAction, requestWholesaleApprovalAction } from '@/lib/auth/accountActions';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface AccountDashboardProps {
  session: AuthenticatedUserSession;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({ session }) => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Wholesale application form state
  const [showWholesaleModal, setShowWholesaleModal] = useState(false);
  const [wsOrgName, setWsOrgName] = useState(session.profile?.organizationName || '');
  const [wsGstin, setWsGstin] = useState(session.profile?.gstin || '');
  const [wsDistrict, setWsDistrict] = useState(session.profile?.district || '');
  const [wsNotes, setWsNotes] = useState('');
  const [wsLoading, setWsLoading] = useState(false);
  const [wsError, setWsError] = useState<string | null>(null);
  const [wsSuccess, setWsSuccess] = useState<string | null>(null);

  const { user, profile } = session;

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logoutCustomerAction();
    router.refresh();
  };

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWsLoading(true);
    setWsError(null);
    setWsSuccess(null);

    const res = await requestWholesaleApprovalAction({
      organizationName: wsOrgName,
      gstin: wsGstin,
      district: wsDistrict,
      applicationNotes: wsNotes,
    });

    setWsLoading(false);
    if (!res.success) {
      setWsError(res.error || 'Failed to submit application.');
    } else {
      setWsSuccess(res.message || 'Application submitted successfully.');
      setTimeout(() => {
        setShowWholesaleModal(false);
        router.refresh();
      }, 2500);
    }
  };

  const isWholesaleApproved =
    profile?.customerType === 'WHOLESALE' && profile?.wholesaleApprovalStatus === 'APPROVED';

  const isBusinessVerified = profile?.businessVerificationStatus === 'VERIFIED';

  return (
    <div className="space-y-8">
      {/* 1. Header Profile Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-black shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">{user.name}</h1>
              <Badge variant={user.role === 'ADMIN' ? 'warning' : user.role === 'STAFF' ? 'primary' : 'default'} size="sm">
                Role: {user.role}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                Segment: {profile?.customerType || 'RETAIL'}
              </span>
              {profile?.district && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                  📍 {profile.district}, {profile.state}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="font-semibold text-slate-700"
        >
          {logoutLoading ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </div>

      {/* 2. Commercial Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A: Business / GST Invoicing Status */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Institutional Verification
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  profile?.businessVerificationStatus === 'VERIFIED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : profile?.businessVerificationStatus === 'PENDING'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Status: {profile?.businessVerificationStatus || 'UNVERIFIED'}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-950 mt-3">
              Tax-Compliant Invoicing & ITC
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              {profile?.businessVerificationStatus === 'VERIFIED'
                ? 'Your organization credentials have been verified. Tax invoices with verified GSTIN and input tax credit are enabled for your commercial orders.'
                : profile?.businessVerificationStatus === 'PENDING'
                  ? 'Your business verification request is under review by our commercial desk. You will receive proforma quotations with provisional tax rates.'
                  : 'Retail account. If purchasing on behalf of a registered enterprise, school, or institution, update your GSTIN to unlock verified B2B invoicing.'}
            </p>

            {profile?.organizationName && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="text-slate-500 font-medium">Organization:</div>
                <div className="font-bold text-slate-800">{profile.organizationName}</div>
                {profile.gstin && (
                  <div className="text-[11px] font-mono text-slate-600">
                    GSTIN: {profile.gstin}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {isBusinessVerified ? '✓ Verified Commercial Account' : 'Standard Retail Billing Active'}
          </div>
        </div>

        {/* Card B: Wholesale Dealer Status */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Wholesale Dealer Tier
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  profile?.wholesaleApprovalStatus === 'APPROVED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : profile?.wholesaleApprovalStatus === 'PENDING'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Approval: {profile?.wholesaleApprovalStatus || 'NONE'}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-950 mt-3">
              Confidential Trade Tier Pricing
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              {profile?.wholesaleApprovalStatus === 'APPROVED'
                ? 'Your wholesale dealer agreement is active. You have access to confidential wholesale price tiers and priority hardware allocation across Rajasthan.'
                : profile?.wholesaleApprovalStatus === 'PENDING'
                  ? 'Your wholesale reseller application is currently pending administrative review. Confidential dealer pricing remains locked until your account is approved.'
                  : 'Wholesale trade terms are restricted to approved computer hardware retailers, system integrators, and IT dealers.'}
            </p>
          </div>

          <div>
            {profile?.wholesaleApprovalStatus === 'NONE' || !profile?.wholesaleApprovalStatus ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowWholesaleModal(true)}
                className="w-full font-bold text-xs"
              >
                Apply for Wholesale Dealer Status →
              </Button>
            ) : profile?.wholesaleApprovalStatus === 'PENDING' ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-semibold">Review in progress by JK Enterprises Admin</span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <span>✓ Active Wholesale Reseller Partner</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Server Authorization Matrix / Active Privileges */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg" aria-hidden="true">🛡️</span>
          <h3 className="font-bold text-sm sm:text-base">Active Authorization Policies (Least Privilege)</h3>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          The following security matrix reflects your verified server-side privileges. Permissions are strictly evaluated on the server; client manipulation cannot grant elevated access.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Public Catalogue</span>
            <span className="text-emerald-400 font-bold mt-1 block">✓ Authorized</span>
            <span className="text-[10px] text-slate-400">Full search & filter access</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Personal Account</span>
            <span className="text-emerald-400 font-bold mt-1 block">✓ Authorized</span>
            <span className="text-[10px] text-slate-400">Scoped to user ID: {user.id.slice(0, 8)}...</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Wholesale Pricing</span>
            <span className={isWholesaleApproved ? 'text-emerald-400 font-bold mt-1 block' : 'text-amber-400 font-bold mt-1 block'}>
              {isWholesaleApproved ? '✓ Unlocked' : '🔒 Locked (Unapproved)'}
            </span>
            <span className="text-[10px] text-slate-400">
              {isWholesaleApproved ? 'Approved wholesale tier active' : 'Requires approved wholesale status'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Staff / Admin Access</span>
            <span className={user.role === 'ADMIN' || user.role === 'STAFF' ? 'text-emerald-400 font-bold mt-1 block' : 'text-slate-500 font-bold mt-1 block'}>
              {user.role === 'ADMIN' ? '✓ Full Admin' : user.role === 'STAFF' ? '✓ Staff Access' : '✕ Restricted'}
            </span>
            <span className="text-[10px] text-slate-400">Administrative oversight</span>
          </div>
        </div>
      </div>

      {/* Wholesale Application Modal */}
      {showWholesaleModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Apply for Wholesale Dealer Status
              </h3>
              <button
                type="button"
                onClick={() => setShowWholesaleModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWholesaleSubmit} className="space-y-4 pt-4">
              {wsError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
                  {wsError}
                </div>
              )}

              {wsSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium">
                  {wsSuccess}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Trading Name *
                </label>
                <Input
                  type="text"
                  required
                  value={wsOrgName}
                  onChange={(e) => setWsOrgName(e.target.value)}
                  placeholder="e.g. Shyam Infotech Solutions"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSTIN
                  </label>
                  <Input
                    type="text"
                    value={wsGstin}
                    onChange={(e) => setWsGstin(e.target.value)}
                    placeholder="08AAAAA0000A1Z5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District *
                  </label>
                  <Input
                    type="text"
                    required
                    value={wsDistrict}
                    onChange={(e) => setWsDistrict(e.target.value)}
                    placeholder="e.g. Jaipur"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Application Notes / Primary Hardware Focus
                </label>
                <textarea
                  rows={3}
                  value={wsNotes}
                  onChange={(e) => setWsNotes(e.target.value)}
                  placeholder="Tell us about your distribution focus (CPUs, SSDs, networking, CCTV, etc.)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900">
                ℹ️ Submission puts your account into <strong>PENDING</strong> review. Wholesale pricing is unlocked only after administrator approval.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWholesaleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={wsLoading}
                  className="font-bold"
                >
                  {wsLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
