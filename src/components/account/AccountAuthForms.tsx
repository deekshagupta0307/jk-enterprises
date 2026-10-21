'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerCustomerAction, loginCustomerAction } from '@/lib/auth/accountActions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { RAJASTHAN_DISTRICTS } from '@/lib/config/businessConfig';
import {
  validateIndianMobile,
  validateWhatsAppNumber,
  sanitizeNational10DigitInput,
} from '@/lib/validation/phoneValidation';

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
  const [regDistrict, setRegDistrict] = useState('Bikaner');
  const [regPhone, setRegPhone] = useState('');
  const [regPhoneError, setRegPhoneError] = useState<string | null>(null);
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regWhatsappError, setRegWhatsappError] = useState<string | null>(null);
  const [regSameAsPhone, setRegSameAsPhone] = useState(false);
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
    setRegPhoneError(null);
    setRegWhatsappError(null);

    // Client-side phone validation if entered
    if (regPhone.trim()) {
      const pVal = validateIndianMobile(regPhone, true);
      if (!pVal.isValid) {
        setRegPhoneError(pVal.error || 'Please enter a valid 10-digit Indian mobile number.');
        setRegError(pVal.error || 'Please correct your phone number.');
        return;
      }
    }

    // Client-side WhatsApp validation if entered
    const effectiveWhatsapp = regSameAsPhone ? regPhone : regWhatsapp;
    if (effectiveWhatsapp.trim()) {
      const wVal = validateWhatsAppNumber(effectiveWhatsapp, true);
      if (!wVal.isValid) {
        setRegWhatsappError(wVal.error || 'Please enter a valid WhatsApp number.');
        setRegError(wVal.error || 'Please correct your WhatsApp number.');
        return;
      }
    }

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
        whatsappPhone: effectiveWhatsapp,
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
      {/* Top Banner: Account Portal Availability Notice */}
      {!isDatabaseConnected && (
        <div className="p-4 border-b text-xs bg-slate-50 text-slate-800 border-slate-200">
          <div className="flex items-start gap-2.5">
            <span className="text-base text-blue-600" aria-hidden="true">
              ℹ️
            </span>
            <div className="flex-1 space-y-0.5">
              <p className="font-semibold text-slate-900">
                Portal Service Notice
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Online customer registration and sign-in are currently paused for scheduled system maintenance. For immediate commercial procurement, proforma quotations, or assistance, please reach our Bikaner sales desk at +91 9928769266 or via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

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
                      <label htmlFor="reg-district" className="block text-xs font-semibold text-slate-700 mb-1">
                        District (Rajasthan) *
                      </label>
                      <select
                        id="reg-district"
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        disabled={regLoading}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {RAJASTHAN_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone (Optional)
                      </label>
                      <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                        regPhoneError ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                      }`}>
                        <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="9876543210"
                          value={regPhone}
                          onChange={(e) => {
                            const cleaned = sanitizeNational10DigitInput(e.target.value);
                            setRegPhone(cleaned);
                            if (regSameAsPhone) {
                              setRegWhatsapp(cleaned);
                            }
                            if (regPhoneError) {
                              const check = validateIndianMobile(cleaned, true);
                              if (check.isValid) setRegPhoneError(null);
                            }
                          }}
                          onBlur={() => {
                            if (regPhone.trim()) {
                              const check = validateIndianMobile(regPhone, true);
                              if (!check.isValid) {
                                setRegPhoneError(check.error || 'Invalid 10-digit mobile number');
                              } else {
                                setRegPhoneError(null);
                              }
                            }
                          }}
                          disabled={regLoading}
                          className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50"
                          aria-label="Contact Phone (10 digits)"
                        />
                      </div>
                      {regPhoneError && (
                        <p className="text-[10px] text-rose-600 mt-1">{regPhoneError}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          WhatsApp Mobile Number (Optional)
                        </label>
                        {regPhone.length === 10 && (
                          <label className="flex items-center gap-1.5 text-[11px] text-blue-700 font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              checked={regSameAsPhone}
                              onChange={(e) => {
                                setRegSameAsPhone(e.target.checked);
                                if (e.target.checked) {
                                  setRegWhatsapp(regPhone);
                                  setRegWhatsappError(null);
                                }
                              }}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Same as primary phone</span>
                          </label>
                        )}
                      </div>
                      <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                        regSameAsPhone ? 'bg-slate-50 opacity-80' : ''
                      } ${
                        regWhatsappError ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                      }`}>
                        <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit WhatsApp number"
                          value={regSameAsPhone ? regPhone : regWhatsapp}
                          disabled={regLoading || regSameAsPhone}
                          onChange={(e) => {
                            const cleaned = sanitizeNational10DigitInput(e.target.value);
                            setRegWhatsapp(cleaned);
                            if (regSameAsPhone && cleaned !== regPhone) {
                              setRegSameAsPhone(false);
                            }
                            if (regWhatsappError) {
                              const check = validateWhatsAppNumber(cleaned, true);
                              if (check.isValid) setRegWhatsappError(null);
                            }
                          }}
                          onBlur={() => {
                            const effective = regSameAsPhone ? regPhone : regWhatsapp;
                            if (effective.trim()) {
                              const check = validateWhatsAppNumber(effective, true);
                              if (!check.isValid) {
                                setRegWhatsappError(check.error || 'Invalid WhatsApp number');
                              } else {
                                setRegWhatsappError(null);
                              }
                            }
                          }}
                          className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500"
                          aria-label="WhatsApp Number (10 digits)"
                        />
                      </div>
                      {regWhatsappError && (
                        <p className="text-[10px] text-rose-600 mt-1">{regWhatsappError}</p>
                      )}
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
