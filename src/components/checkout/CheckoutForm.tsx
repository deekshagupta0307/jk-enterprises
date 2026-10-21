'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { calculateOrderBreakdown } from '@/lib/delivery/deliveryService';
import {
  PAYMENT_CONFIG,
  RAJASTHAN_DISTRICTS,
} from '@/lib/config/businessConfig';
import { submitOrderAction } from '@/lib/orders/orderActions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  validateIndianMobile,
  validateWhatsAppNumber,
  sanitizeNational10DigitInput,
} from '@/lib/validation/phoneValidation';

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { items, subtotalINR, totalItems, clearCart, removeItem } = useCart();

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [isBusinessCustomer, setIsBusinessCustomer] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [gstin, setGstin] = useState('');

  // Shipping Address State
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [district, setDistrict] = useState('Bikaner');
  const [pinCode, setPinCode] = useState('');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<'MANUAL_UPI_QR' | 'MANUAL_BANK_TRANSFER'>('MANUAL_UPI_QR');
  const [paymentReferenceUTR, setPaymentReferenceUTR] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Dynamic Financials calculation based on subtotal, state and district
  const financials = useMemo(() => {
    return calculateOrderBreakdown(subtotalINR, state, district);
  }, [subtotalINR, state, district]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Please add products before placing an order.');
      return;
    }

    // Client-side strict phone validation
    const phoneVal = validateIndianMobile(phone, false);
    if (!phoneVal.isValid) {
      setFieldErrors((prev) => ({ ...prev, phone: phoneVal.error || 'Please enter a valid 10-digit Indian mobile number.' }));
      setErrorMessage(phoneVal.error || 'Please correct your mobile phone number.');
      return;
    }

    // Client-side optional WhatsApp validation
    if (whatsapp.trim()) {
      const whatsappVal = validateWhatsAppNumber(whatsapp, true);
      if (!whatsappVal.isValid) {
        setFieldErrors((prev) => ({ ...prev, whatsapp: whatsappVal.error || 'Please enter a valid WhatsApp number.' }));
        setErrorMessage(whatsappVal.error || 'Please correct your WhatsApp number.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await submitOrderAction({
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
        shipping: {
          customerName,
          email,
          phone: phoneVal.digitsOnly || phone,
          whatsapp: whatsapp.trim() || undefined,
          organizationName: isBusinessCustomer ? organizationName : undefined,
          gstin: isBusinessCustomer ? gstin : undefined,
          addressLine1,
          addressLine2,
          district,
          pinCode,
          state,
        },
        paymentMethod,
        paymentReferenceUTR: paymentReferenceUTR.trim() || undefined,
        notes: orderNotes.trim() || undefined,
      });

      if (!res.success || !res.data) {
        setIsSubmitting(false);
        setErrorMessage(res.error || 'Failed to place order. Please verify your details.');
        if (res.errors) {
          setFieldErrors(res.errors);
        }
        return;
      }

      // Order created successfully!
      const { orderNumber, accessToken } = res.data;
      clearCart();
      router.push(`/orders/${orderNumber}?token=${accessToken}`);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('An unexpected error occurred during checkout. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-3xl">
          🛒
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Procurement Cart is Empty</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          You need at least one hardware item in your cart to proceed with order review and manual payment instructions.
        </p>
        <div className="pt-2">
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Explore Hardware Catalogue →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Customer & Shipping & Payment Details (8 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl text-xs font-medium flex items-start gap-2.5"
          >
            <span className="text-base shrink-0">⚠️</span>
            <div className="flex-1">
              <strong className="block font-bold mb-0.5">Checkout Notice:</strong>
              <p className="leading-relaxed">{errorMessage}</p>
              {fieldErrors.invalidProductId && (
                <div className="mt-3 pt-2.5 border-t border-rose-200/80 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(fieldErrors.invalidProductId);
                      setErrorMessage(null);
                      setFieldErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.invalidProductId;
                        delete copy.cart;
                        return copy;
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>🗑️ Remove Unavailable Item</span>
                  </button>
                  <span className="text-[11px] text-rose-700">
                    Remove this item to continue checkout with your remaining products.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 1. Customer Identification Card */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900">Customer & Contact Information</h3>
            </div>
            <span className="text-[10px] text-slate-400">* Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name / Contact Person *
              </label>
              <Input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Chandra Sharma"
              />
              {fieldErrors.customerName && (
                <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (10 digits) *
              </label>
              <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                fieldErrors.phone ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
              }`}>
                <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const cleaned = sanitizeNational10DigitInput(e.target.value);
                    setPhone(cleaned);
                    if (sameAsPhone) {
                      setWhatsapp(cleaned);
                    }
                    if (fieldErrors.phone) {
                      const check = validateIndianMobile(cleaned, false);
                      if (check.isValid) {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.phone;
                          return copy;
                        });
                      }
                    }
                  }}
                  onBlur={() => {
                    if (phone.trim()) {
                      const res = validateIndianMobile(phone, false);
                      if (!res.isValid) {
                        setFieldErrors((prev) => ({ ...prev, phone: res.error || 'Please enter a valid 10-digit Indian mobile number.' }));
                      } else {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.phone;
                          return copy;
                        });
                      }
                    }
                  }}
                  placeholder="9928769266"
                  className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                  aria-label="10-digit Indian Mobile Number"
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  WhatsApp Mobile Number (Optional)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-blue-600 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => {
                      setSameAsPhone(e.target.checked);
                      if (e.target.checked) {
                        setWhatsapp(phone);
                        if (fieldErrors.whatsapp) {
                          setFieldErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.whatsapp;
                            return copy;
                          });
                        }
                      }
                    }}
                    className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300"
                  />
                  <span>Same as mobile</span>
                </label>
              </div>
              <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                sameAsPhone ? 'bg-slate-50 opacity-80' : ''
              } ${
                fieldErrors.whatsapp ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
              }`}>
                <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={whatsapp}
                  disabled={sameAsPhone}
                  onChange={(e) => {
                    const cleaned = sanitizeNational10DigitInput(e.target.value);
                    setWhatsapp(cleaned);
                    if (sameAsPhone && cleaned !== phone) {
                      setSameAsPhone(false);
                    }
                    if (fieldErrors.whatsapp) {
                      const check = validateWhatsAppNumber(cleaned, true);
                      if (check.isValid) {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.whatsapp;
                          return copy;
                        });
                      }
                    }
                  }}
                  onBlur={() => {
                    if (whatsapp.trim()) {
                      const res = validateWhatsAppNumber(whatsapp, true);
                      if (!res.isValid) {
                        setFieldErrors((prev) => ({ ...prev, whatsapp: res.error || 'Please enter a valid WhatsApp number.' }));
                      } else {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.whatsapp;
                          return copy;
                        });
                      }
                    }
                  }}
                  placeholder="9928769266"
                  className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500"
                  aria-label="WhatsApp Number (10 digits)"
                />
              </div>
              {fieldErrors.whatsapp && (
                <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.whatsapp}</p>
              )}
              <p className="text-[10px] text-slate-400 mt-1">
                Used to share payment verification updates and transport dispatch slips with your consent.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (for Proforma / Tax Invoice) *
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. procurement@shyam-infotech.com"
              />
              {fieldErrors.email && (
                <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* Business / Institutional toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isBusinessCustomer}
                onChange={(e) => setIsBusinessCustomer(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">
                Purchasing on behalf of a Registered Business, School or Institution (GST Invoicing)
              </span>
            </label>

            {isBusinessCustomer && (
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Trading Name
                  </label>
                  <Input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. Shyam Computers & Educational Academy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSTIN (Optional)
                  </label>
                  <Input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="08AAAAA0000A1Z5"
                  />
                  {fieldErrors.gstin && (
                    <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.gstin}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Delivery Destination Card */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900">Delivery Address & Destination</h3>
            </div>
            <span className="text-[10px] text-slate-400">Rajasthan Regional Logistics</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Street Address / Building Details *
            </label>
            <Input
              type="text"
              required
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="e.g. Shop No. 4, Opposite Nehru Garden, Tonk Road"
            />
            {fieldErrors.addressLine1 && (
              <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.addressLine1}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Area / Landmark / Floor (Optional)
            </label>
            <Input
              type="text"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              placeholder="e.g. Near Bus Stand / Commercial Complex"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {RAJASTHAN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
                <option value="Other">Other (Interstate)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PIN Code *
              </label>
              <Input
                type="text"
                required
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="e.g. 302015"
              />
              {fieldErrors.pinCode && (
                <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.pinCode}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State
              </label>
              <Input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Rajasthan"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🚚</span>
              <span><strong>Logistics Zone:</strong> {financials.deliveryZoneName}</span>
            </span>
            <span className="text-[11px] text-blue-700 font-semibold">{financials.deliveryTimeline}</span>
          </div>
        </div>

        {/* 3. Manual Payment Instructions Screen */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900">Manual Payment Instructions (Required)</h3>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              No Gateway Fees
            </span>
          </div>

          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <span>⚠️</span>
              <span>Official Payment Policy</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              JK Enterprises will <strong>NOT</strong> accept online credit/debit card payments or netbanking gateways. Payment must be transferred manually via the official UPI QR code or bank account below. Your order will be placed into <strong>PENDING PAYMENT</strong> until verified by our commercial desk.
            </p>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('MANUAL_UPI_QR')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                paymentMethod === 'MANUAL_UPI_QR'
                  ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl" aria-hidden="true">📱</span>
              <div>
                <span className="block text-xs font-bold text-slate-900">UPI QR Code</span>
                <span className="block text-[10px] text-slate-500">GPay, PhonePe, Paytm, BHIM</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('MANUAL_BANK_TRANSFER')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                paymentMethod === 'MANUAL_BANK_TRANSFER'
                  ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl" aria-hidden="true">🏛️</span>
              <div>
                <span className="block text-xs font-bold text-slate-900">Bank Transfer</span>
                <span className="block text-[10px] text-slate-500">NEFT, RTGS, IMPS Current A/c</span>
              </div>
            </button>
          </div>

          {/* PAYMENT DETAILS DISPLAY: UPI QR */}
          {paymentMethod === 'MANUAL_UPI_QR' ? (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Visual QR Code Representation */}
                <div className="w-36 h-36 bg-white rounded-2xl p-2.5 shrink-0 flex flex-col items-center justify-center border-4 border-slate-800 shadow-md">
                  <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 text-center text-slate-800">
                    <span className="text-2xl mb-1">📱</span>
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">UPI QR CODE</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">Scan to Pay</span>
                    <span className="text-[10px] font-extrabold text-slate-900 mt-1">
                      ₹{financials.totalINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Official Business UPI ID
                  </span>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <code className="text-xs sm:text-sm font-mono font-bold bg-slate-800 px-3 py-1.5 rounded-xl text-emerald-400 border border-slate-700">
                      {PAYMENT_CONFIG.upi.upiId}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PAYMENT_CONFIG.upi.upiId, 'upi')}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedField === 'upi' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Payee Name: <strong className="text-white">{PAYMENT_CONFIG.upi.payeeName}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Open your UPI app, scan the QR code or paste the UPI ID, enter <strong>₹{financials.totalINR.toLocaleString('en-IN')}</strong>, and complete the transfer.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* PAYMENT DETAILS DISPLAY: BANK NEFT / RTGS */
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-bold text-blue-400">Current Account Details for NEFT / RTGS / IMPS</span>
                <span className="text-[10px] text-slate-400">State Bank of India</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Beneficiary</span>
                  <span className="font-bold text-white mt-0.5 block">{PAYMENT_CONFIG.bank.accountName}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Number</span>
                    <span className="font-mono font-bold text-emerald-400 mt-0.5 block">{PAYMENT_CONFIG.bank.accountNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PAYMENT_CONFIG.bank.accountNumber, 'acct')}
                    className="px-2 py-1 text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
                  >
                    {copiedField === 'acct' ? '✓' : 'Copy'}
                  </button>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">IFSC Code</span>
                    <span className="font-mono font-bold text-emerald-400 mt-0.5 block">{PAYMENT_CONFIG.bank.ifscCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PAYMENT_CONFIG.bank.ifscCode, 'ifsc')}
                    className="px-2 py-1 text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
                  >
                    {copiedField === 'ifsc' ? '✓' : 'Copy'}
                  </button>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Branch & Type</span>
                  <span className="font-medium text-slate-300 mt-0.5 block">
                    {PAYMENT_CONFIG.bank.branch} ({PAYMENT_CONFIG.bank.accountType})
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Optional UTR / Reference Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Have you already transferred? Enter Bank UTR / UPI Reference Number (Optional)
            </label>
            <Input
              type="text"
              value={paymentReferenceUTR}
              onChange={(e) => setPaymentReferenceUTR(e.target.value)}
              placeholder="e.g. 429182910291 (12-digit transaction ID)"
            />
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              If transferring right now, enter the reference number above to expedite verification. If transferring later, you can submit the UTR on your order confirmation screen.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Special Handling / Dispatch Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Call before delivery, verify packaging for lab installation..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Order Summary & Place Order Button (5 cols) */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Order Summary ({totalItems} items)</h3>
            <span className="text-xs font-bold text-blue-600">Review</span>
          </div>

          {/* Items review list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-xs pb-2 border-b border-slate-100">
                <div className="pr-2">
                  <span className="font-bold text-slate-900 line-clamp-1">{item.name}</span>
                  <span className="text-[11px] text-slate-500">
                    Qty: {item.quantity} × ₹{item.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="font-extrabold text-slate-950 shrink-0">
                  ₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Financials Breakdown */}
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Subtotal (Base)</span>
              <span className="font-mono">₹{financials.taxableSubtotalINR.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>
                {financials.isInterstate ? 'IGST (18%)' : 'CGST (9%) + SGST (9%)'}
              </span>
              <span className="font-mono">₹{financials.totalTaxINR.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee ({district})</span>
              <span className={financials.deliveryFeeINR === 0 ? 'text-emerald-700 font-bold' : 'font-mono'}>
                {financials.deliveryFeeINR === 0 ? 'FREE' : `₹${financials.deliveryFeeINR}`}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-sm font-extrabold text-slate-950 block">Grand Total</span>
                <span className="text-[10px] text-slate-500">Inclusive of all applicable taxes</span>
              </div>
              <span className="text-xl font-black text-blue-900">
                ₹{financials.totalINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Verification Guard Notice */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Manual Payment & Verification Workflow</span>
            </div>
            <p className="leading-tight">
              Submitting this form records your <strong>Payment Attempt</strong> and generates official manual transfer instructions (Ref: <code>JK-PAY-...</code>). An official confirmed order and final tax invoice will only be issued after an authorized administrator verifies receipt of payment in our bank account.
            </p>
          </div>

          {/* Place Order CTA */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full font-extrabold text-sm py-3.5 shadow-lg shadow-blue-600/20"
          >
            {isSubmitting ? 'Recording Payment Attempt...' : `Generate Payment Instructions (₹${financials.totalINR.toLocaleString('en-IN')})`}
          </Button>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By proceeding, you agree to manual bank / UPI settlement per JK Enterprises terms of business.
          </p>
        </div>
      </div>
    </form>
  );
};
