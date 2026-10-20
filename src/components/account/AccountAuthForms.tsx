'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerCustomerAction, loginCustomerAction } from '@/lib/auth/accountActions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export interface AccountAuthFormsProps {
  isDatabaseConnected: boolean;
  defaultTab?: 'login' | 'register';
}

export const AccountAuthForms: React.FC<AccountAuthFormsProps> = ({
  isDatabaseConnected,
  defaultTab = 'login',
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCustomerType, setRegCustomerType] = useState<'RETAIL' | 'BUSINESS' | 'WHOLESALE'>('RETAIL');
  const [regOrgName, setRegOrgName] = useState('');
  const [regGstin, setRegGstin] = useState('');
  const [regDistrict, setRegDistrict] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await loginCustomerAction({
        email: loginEmail,
        password: loginPassword,
      });

      if (!res.success) {
        setLoginError(res.error || 'Failed to sign in.');
      } else {
        router.refresh();
      }
    } catch {
      setLoginError('An unexpected error occurred during sign-in.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);
    setRegLoading(true);

    try {
      const res = await registerCustomerAction({
        name: regName,
        email: regEmail,
        password: regPassword,
        customerType: regCustomerType,
        organizationName: regOrgName,
        gstin: regGstin,
        district: regDistrict,
        phone: regPhone,
      });

      if (!res.success) {
        setRegError(res.error || 'Registration failed.');
      } else {
        setRegSuccess(res.message || 'Registration completed successfully.');
        // Clear sensitive password
        setRegPassword('');
      }
    } catch {
      setRegError('An unexpected error occurred during registration.');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Top Banner: Database Connection State Notice */}
      <div
        className={`p-4 border-b text-xs ${
          isDatabaseConnected
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : 'bg-amber-50 text-amber-900 border-amber-200'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <span className="text-base" aria-hidden="true">
            {isDatabaseConnected ? '🔒' : 'ℹ️'}
          </span>
          <div className="flex-1 space-y-0.5">
            <p className="font-bold">
              {isDatabaseConnected
                ? 'Production Auth Engine Ready (PostgreSQL Connected)'
                : 'Demo Sandbox Notice (PostgreSQL Offline)'}
            </p>
            <p className="text-[11px] leading-relaxed opacity-90">
              {isDatabaseConnected
                ? 'Accounts and encrypted sessions are stored securely with Prisma ORM.'
                : 'Customer registration, password hashing, and session validation require a live PostgreSQL database connection. In this preview sandbox, account submissions are safely validated against server policies without pretending unpersisted data is saved.'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'login'}
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
            activeTab === 'login'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'register'}
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
            activeTab === 'register'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Create Customer Account
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Welcome to JK Enterprises</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sign in to manage your hardware quotations, institutional orders, and trade profile.
              </p>
            </div>

            {loginError && (
              <div
                role="alert"
                className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium"
              >
                {loginError}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={loginLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={loginLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-4 font-bold"
              disabled={loginLoading}
            >
              {loginLoading ? 'Signing In...' : 'Sign In to Account →'}
            </Button>

            <p className="text-center text-[11px] text-slate-400 pt-2">
              Protected by server-side authorization and rate limiting.
            </p>
          </form>
        )}

        {/* REGISTRATION FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Register for IT Procurement</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your customer segment to establish appropriate invoicing and quotation workflows.
              </p>
            </div>

            {regError && (
              <div
                role="alert"
                className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium"
              >
                {regError}
              </div>
            )}

            {regSuccess && (
              <div
                role="status"
                className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium space-y-1"
              >
                <p className="font-bold">✓ Success</p>
                <p>{regSuccess}</p>
              </div>
            )}

            {/* Customer Type Selector */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-semibold text-slate-800">
                Customer Account Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegCustomerType('RETAIL')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    regCustomerType === 'RETAIL'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="block font-bold text-xs">Retail Buyer</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    Individual components & workstations
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegCustomerType('BUSINESS')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    regCustomerType === 'BUSINESS'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="block font-bold text-xs">Business / School</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    GST invoicing & office lab packages
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegCustomerType('WHOLESALE')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    regCustomerType === 'WHOLESALE'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="block font-bold text-xs">Wholesale Dealer</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    Requires admin trade approval
                  </span>
                </button>
              </div>

              {/* Informational Policy Notice on Role Separation */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-900">Authorization Rule: </span>
                {regCustomerType === 'WHOLESALE'
                  ? 'Selecting Wholesale Partner initiates a verification application. Confidential trade tier discounts are locked until approved by JK Enterprises administration.'
                  : regCustomerType === 'BUSINESS'
                    ? 'Business accounts receive formal proforma estimation workflows. Verified GST invoicing is enabled upon tax review.'
                    : 'Standard retail account with personal quotation tracking.'}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Contact Person *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  disabled={regLoading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    disabled={regLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password (8+ chars) *
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    disabled={regLoading}
                  />
                </div>
              </div>

              {/* Conditional Business/Wholesale Fields */}
              {(regCustomerType === 'BUSINESS' || regCustomerType === 'WHOLESALE') && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      Commercial Information
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      Private data for verification only
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / School / Business Name *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Jaipur Engineering Institute / Tech Solutions"
                      value={regOrgName}
                      onChange={(e) => setRegOrgName(e.target.value)}
                      disabled={regLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        GSTIN (Optional for review)
                      </label>
                      <Input
                        type="text"
                        placeholder="08AAAAA0000A1Z5"
                        value={regGstin}
                        onChange={(e) => setRegGstin(e.target.value)}
                        disabled={regLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        District (Rajasthan)
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Jaipur, Kota, Jodhpur"
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        disabled={regLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone (Optional)
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        disabled={regLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-4 font-bold"
              disabled={regLoading}
            >
              {regLoading ? 'Registering Account...' : 'Complete Registration →'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
