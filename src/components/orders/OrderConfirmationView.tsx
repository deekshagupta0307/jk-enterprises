'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OrderView } from '@/lib/orders/orderService';
import { PAYMENT_CONFIG, BUSINESS_CONFIG } from '@/lib/config/businessConfig';
import { submitPaymentUtrAction } from '@/lib/orders/orderActions';
import { generateWhatsAppOrderLink, WHATSAPP_DISCLAIMER } from '@/lib/whatsapp/whatsappService';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface OrderConfirmationViewProps {
  initialOrder: OrderView;
  userRole?: string;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  initialOrder,
  userRole,
}) => {
  const [order, setOrder] = useState<OrderView>(initialOrder);
  const [utrInput, setUtrInput] = useState(order.paymentReferenceUTR || '');
  const [utrNotes, setUtrNotes] = useState('');
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);
  const [utrMessage, setUtrMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Admin verification state
  const [adminNotes, setAdminNotes] = useState('');
  const [isAdminVerifying, setIsAdminVerifying] = useState(false);
  const [adminMessage, setAdminMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isAdminOrStaff = userRole === 'ADMIN' || userRole === 'STAFF';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleUtrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUtrMessage(null);
    setIsSubmittingUtr(true);

    const res = await submitPaymentUtrAction(order.orderNumber, utrInput, utrNotes);
    setIsSubmittingUtr(false);

    if (res.success) {
      setUtrMessage({
        type: 'success',
        text: 'Payment reference submitted! Your payment attempt is now under administrative verification.',
      });
      setOrder((prev) => ({
        ...prev,
        paymentReferenceUTR: utrInput.trim(),
        paymentStatus: 'PAYMENT_UNDER_VERIFICATION',
      }));
    } else {
      setUtrMessage({
        type: 'error',
        text: res.error || 'Failed to submit payment reference. Please check the UTR number.',
      });
    }
  };

  const handleAdminVerify = async (action: 'CONFIRM' | 'REJECT') => {
    setAdminMessage(null);
    setIsAdminVerifying(true);

    const { verifyPaymentAction } = await import('@/lib/orders/orderActions');
    const res = await verifyPaymentAction(order.orderNumber, action, adminNotes);
    setIsAdminVerifying(false);

    if (res.success && res.data) {
      setAdminMessage({
        type: 'success',
        text: res.message || `Action ${action} executed successfully.`,
      });
      setOrder(res.data);
    } else {
      setAdminMessage({
        type: 'error',
        text: res.error || 'Failed to perform verification.',
      });
    }
  };

  // WhatsApp helper
  const whatsAppInfo = generateWhatsAppOrderLink({
    orderNumber: order.confirmedOrderNumber || order.orderNumber,
    customerName: order.customerName,
    items: order.items.map((i) => ({ name: i.productName, quantity: i.quantity, priceINR: i.unitPriceINR })),
    totalAmountINR: order.totalAmountINR,
    paymentStatus: order.paymentStatus.replace(/_/g, ' '),
    paymentMethod: order.paymentMethod === 'MANUAL_BANK_TRANSFER' ? 'Bank Transfer (NEFT/RTGS)' : 'UPI QR Code',
    paymentReferenceUTR: order.paymentReferenceUTR,
    deliveryCityOrDistrict: order.district,
    customerWhatsapp: order.customerWhatsapp,
    isConfirmed: order.isOrderConfirmed,
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Order Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
              {order.isOrderConfirmed ? 'Confirmed Order ID:' : 'Payment Attempt Ref:'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">
              {order.isOrderConfirmed ? (order.confirmedOrderNumber || order.orderNumber) : order.orderNumber}
            </h1>
            <Badge
              variant={
                order.paymentStatus === 'PAID' || order.paymentStatus === 'CONFIRMED'
                  ? 'primary'
                  : order.paymentStatus === 'PAYMENT_UNDER_VERIFICATION'
                    ? 'primary'
                    : order.paymentStatus === 'PAYMENT_REJECTED'
                      ? 'danger'
                      : 'warning'
              }
              size="sm"
            >
              Status: {order.paymentStatus === 'AWAITING_PAYMENT' || order.paymentStatus === 'PENDING_PAYMENT'
                ? 'Awaiting Payment'
                : order.paymentStatus === 'PAYMENT_UNDER_VERIFICATION'
                  ? 'Payment Under Verification'
                  : order.paymentStatus === 'PAYMENT_REJECTED'
                    ? 'Payment Rejected / Not Verified'
                    : order.paymentStatus === 'CONFIRMED' || order.paymentStatus === 'PAID'
                      ? 'Confirmed / Paid'
                      : order.paymentStatus}
            </Badge>
            {!order.isOrderConfirmed && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Order Unconfirmed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Created on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Customer: <strong className="text-slate-800">{order.customerName}</strong>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            href={`/orders/${order.orderNumber}/invoice?token=${order.accessToken}`}
            target="_blank"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <span>📄</span>
            <span>{order.isOrderConfirmed ? 'View & Print Tax Invoice' : 'View Proforma Invoice'}</span>
          </Link>

          <a
            href={whatsAppInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>💬</span>
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>

      {/* Admin Verification Desk (Visible only to authorized Staff/Admin) */}
      {isAdminOrStaff && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h3 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">
                Administrator Payment Verification Desk
              </h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-blue-900 text-blue-200 font-mono">
              Staff Access Authorized
            </span>
          </div>

          {adminMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold ${
                adminMessage.type === 'success'
                  ? 'bg-emerald-950 text-emerald-200 border border-emerald-700'
                  : 'bg-rose-950 text-rose-200 border border-rose-700'
              }`}
            >
              {adminMessage.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Payable Amount</span>
              <span className="text-lg font-black text-white">₹{order.totalAmountINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Customer UTR Reference</span>
              <span className="text-sm font-mono font-bold text-amber-400">
                {order.paymentReferenceUTR || 'None Submitted Yet'}
              </span>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Current State</span>
              <span className="text-sm font-bold text-white">{order.paymentStatus}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Administrative Verification Notes (Bank reference, credit confirmation ID, or rejection reason)
              </label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Verified credit of ₹... on SBI Current Account statement at 11:45 AM"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={isAdminVerifying || order.isOrderConfirmed}
                onClick={() => handleAdminVerify('CONFIRM')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs cursor-pointer shadow-md transition-all"
              >
                {isAdminVerifying ? 'Processing...' : '✓ Confirm & Approve Order (Assign JK-ORD- & Issue Tax Invoice)'}
              </button>

              <button
                type="button"
                disabled={isAdminVerifying}
                onClick={() => handleAdminVerify('REJECT')}
                className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs cursor-pointer transition-all"
              >
                ✕ Reject Payment Reference (Flag as Unverified)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Status Alert Message */}
      {order.paymentStatus === 'AWAITING_PAYMENT' || order.paymentStatus === 'PENDING_PAYMENT' ? (
        <div className="p-5 bg-amber-50 rounded-3xl border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <span className="text-lg">⏳</span>
            <span>Awaiting Payment Transfer — Order Not Confirmed</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900/90">
            Your payment attempt has been registered with reference <strong>{order.orderNumber}</strong>. Please transfer the total amount of <strong>₹{order.totalAmountINR.toLocaleString('en-IN')}</strong> using the UPI QR code or bank details below, then submit your 12-digit UTR reference below. Your order will be confirmed only after an authorized administrator verifies receipt of funds in our bank account.
          </p>
        </div>
      ) : order.paymentStatus === 'PAYMENT_UNDER_VERIFICATION' ? (
        <div className="p-5 bg-blue-50 rounded-3xl border border-blue-200 text-blue-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
            <span className="text-lg">🔍</span>
            <span>Payment Under Verification — Pending Bank Confirmation</span>
          </div>
          <p className="text-xs leading-relaxed text-blue-900/90">
            Thank you! Your transaction reference (<strong>{order.paymentReferenceUTR}</strong>) has been recorded. Our commercial accounts team in Bikaner is verifying the bank credit against our statement. Once verified, your official Order ID and confirmed Tax Invoice will be issued.
          </p>
        </div>
      ) : order.paymentStatus === 'PAYMENT_REJECTED' ? (
        <div className="p-5 bg-rose-50 rounded-3xl border border-rose-200 text-rose-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
            <span className="text-lg">⚠️</span>
            <span>Payment Rejected / Payment Not Verified</span>
          </div>
          <p className="text-xs leading-relaxed text-rose-900/90">
            Your submitted payment reference could not be verified against actual bank credit.
            {order.verificationNotes && (
              <span className="block mt-1 font-semibold">Note from Accounts Desk: {order.verificationNotes}</span>
            )}
            Please verify your transfer details, re-submit a valid UTR number below, or reach out to our Bikaner sales desk on WhatsApp.
          </p>
        </div>
      ) : order.paymentStatus === 'CONFIRMED' || order.paymentStatus === 'PAID' ? (
        <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-200 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <span className="text-lg">✓</span>
            <span>Payment Verified & Order Confirmed!</span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-900/90">
            Your payment has been successfully verified by JK Enterprises administration. Your official Order ID is <strong>{order.confirmedOrderNumber || order.orderNumber}</strong> and your final Tax Invoice has been generated. Your hardware package is scheduled for warehouse allocation and testing before transport dispatch.
          </p>
        </div>
      ) : null}

      {/* 3. Payment Instructions & UTR Submission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Card A: Manual Payment Instructions */}
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-400">
              Manual Transfer Details
            </h3>
            <span className="text-[10px] text-slate-400">Total: ₹{order.totalAmountINR.toLocaleString('en-IN')}</span>
          </div>

          {order.paymentMethod === 'MANUAL_UPI_QR' ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex flex-col items-center justify-center shrink-0 text-slate-900 text-center">
                  <span className="text-lg">📱</span>
                  <span className="text-[8px] font-bold">UPI QR</span>
                  <span className="text-[8px] font-extrabold text-blue-900">₹{order.totalAmountINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Pay via UPI ID</span>
                  <code className="text-emerald-400 font-mono font-bold block">{PAYMENT_CONFIG.upi.upiId}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PAYMENT_CONFIG.upi.upiId, 'upi')}
                    className="px-2.5 py-1 text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 rounded-md transition-colors cursor-pointer"
                  >
                    {copiedField === 'upi' ? '✓ Copied' : 'Copy UPI ID'}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Payee: <strong className="text-white">{PAYMENT_CONFIG.upi.payeeName}</strong>. Scan using GPay, PhonePe, Paytm, or BHIM.
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Account Beneficiary</span>
                  <span className="font-bold text-white">{PAYMENT_CONFIG.bank.accountName}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Account Number</span>
                  <span className="font-mono font-bold text-emerald-400">{PAYMENT_CONFIG.bank.accountNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.bank.accountNumber, 'acct')}
                  className="px-2 py-1 text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
                >
                  {copiedField === 'acct' ? '✓' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">IFSC Code</span>
                  <span className="font-mono font-bold text-emerald-400">{PAYMENT_CONFIG.bank.ifscCode}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.bank.ifscCode, 'ifsc')}
                  className="px-2 py-1 text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
                >
                  {copiedField === 'ifsc' ? '✓' : 'Copy'}
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                {PAYMENT_CONFIG.bank.bankName}, {PAYMENT_CONFIG.bank.branch} ({PAYMENT_CONFIG.bank.accountType})
              </p>
            </div>
          )}
        </div>

        {/* Card B: Submit / Update Payment Reference (UTR) Form */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Submit Payment Reference (UTR)</h3>
            <span className="text-[10px] text-slate-400">Bank Verification</span>
          </div>

          {utrMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold ${
                utrMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {utrMessage.text}
            </div>
          )}

          <form onSubmit={handleUtrSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                12-digit UPI Transaction Ref or Bank UTR No. *
              </label>
              <Input
                type="text"
                required
                value={utrInput}
                onChange={(e) => setUtrInput(e.target.value)}
                placeholder="e.g. 429182910291"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Found in your payment app receipt under &quot;UPI Ref No.&quot; or bank transfer statement under &quot;UTR No.&quot;
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Remitter / Account Holder Name (Optional)
              </label>
              <Input
                type="text"
                value={utrNotes}
                onChange={(e) => setUtrNotes(e.target.value)}
                placeholder="Name on bank account or UPI"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmittingUtr}
              className="w-full font-bold text-xs"
            >
              {isSubmittingUtr ? 'Submitting...' : 'Submit UTR for Verification'}
            </Button>
          </form>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100 space-y-1">
            <p className="font-semibold text-slate-700">Need immediate assistance?</p>
            <p>
              Share your payment screenshot directly with our Bikaner sales desk on WhatsApp:
            </p>
            <p className="font-bold text-emerald-800">
              WhatsApp: {BUSINESS_CONFIG.whatsappNumber}
            </p>
            <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
              {WHATSAPP_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Ordered Items Breakdown & Delivery Details */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <h3 className="font-extrabold text-base text-slate-900 pb-3 border-b border-slate-100">
          Order Items & Financial Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-2">Hardware Product</th>
                <th className="pb-2">SKU</th>
                <th className="pb-2 text-right">Unit Price</th>
                <th className="pb-2 text-center">Qty</th>
                <th className="pb-2 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-semibold text-slate-900 pr-2">
                    {item.productName}
                    {item.brandName && (
                      <span className="block text-[10px] font-bold text-blue-600 uppercase">
                        {item.brandName}
                      </span>
                    )}
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-500">{item.productSku}</td>
                  <td className="py-3 text-right font-mono text-slate-700">
                    ₹{item.unitPriceINR.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-900">{item.quantity}</td>
                  <td className="py-3 text-right font-bold font-mono text-slate-950">
                    ₹{item.totalINR.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivery Destination</span>
            <p className="font-bold text-slate-900">{order.customerName}</p>
            {order.organizationName && <p className="text-slate-700 font-semibold">{order.organizationName}</p>}
            {order.gstin && <p className="font-mono text-[11px] text-slate-600">GSTIN: {order.gstin}</p>}
            <p className="text-slate-600">{order.shippingAddressLine1}</p>
            {order.shippingAddressLine2 && <p className="text-slate-600">{order.shippingAddressLine2}</p>}
            <p className="text-slate-800 font-medium">{order.district}, {order.state} — {order.pinCode}</p>
            <p className="text-slate-500 pt-1">Phone: +91 {order.customerPhone}</p>
            {order.customerWhatsapp && (
              <p className="text-emerald-700 font-medium">WhatsApp: {order.customerWhatsapp.startsWith('+') ? order.customerWhatsapp : `+91 ${order.customerWhatsapp}`}</p>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Subtotal (Base)</span>
              <span className="font-mono">₹{order.financials.taxableSubtotalINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (18% IT Hardware)</span>
              <span className="font-mono">₹{order.financials.totalTaxINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee ({order.district})</span>
              <span className={order.deliveryFeeINR === 0 ? 'text-emerald-700 font-bold' : 'font-mono'}>
                {order.deliveryFeeINR === 0 ? 'FREE' : `₹${order.deliveryFeeINR}`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-950">Grand Total Payable</span>
              <span className="text-xl font-black text-blue-900">
                ₹{order.totalAmountINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
