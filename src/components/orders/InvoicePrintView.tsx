'use client';

import React from 'react';
import Link from 'next/link';
import { OrderView } from '@/lib/orders/orderService';
import { BUSINESS_CONFIG, PAYMENT_CONFIG } from '@/lib/config/businessConfig';

export interface InvoicePrintViewProps {
  order: OrderView;
}

/**
 * Converts a positive integer to Indian English words representation
 */
function numberToIndianWords(num: number): string {
  const a = [
    '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
    'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ',
    'Seventeen ', 'Eighteen ', 'Nineteen ',
  ];
  const b = ['', '', 'Twenty ', 'Thirty ', 'Forty ', 'Fifty ', 'Sixty ', 'Seventy ', 'Eighty ', 'Ninety '];

  const n = Math.floor(num);
  if (n === 0) return 'Zero Only';

  function inWords(val: number): string {
    let str = '';
    if (val > 99) {
      str += a[Math.floor(val / 100)] + 'Hundred ';
      val %= 100;
    }
    if (val > 19) {
      str += b[Math.floor(val / 10)] + a[val % 10];
    } else if (val > 0) {
      str += a[val];
    }
    return str;
  }

  let result = '';
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const remainder = n % 1000;

  if (crore > 0) result += inWords(crore) + 'Crore ';
  if (lakh > 0) result += inWords(lakh) + 'Lakh ';
  if (thousand > 0) result += inWords(thousand) + 'Thousand ';
  if (remainder > 0) result += inWords(remainder);

  return `INR ${result.trim()} Only`;
}

export const InvoicePrintView: React.FC<InvoicePrintViewProps> = ({ order }) => {
  const isConfirmed = order.isOrderConfirmed || order.paymentStatus === 'CONFIRMED' || order.paymentStatus === 'PAID';
  const invoiceTitle = isConfirmed ? 'TAX INVOICE' : 'PROFORMA INVOICE / PAYMENT INSTRUCTION';
  const issueDateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 text-slate-900 print:bg-white print:py-0">
      {/* Top Floating Control Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden flex items-center justify-between gap-4">
        <Link
          href={`/orders/${order.orderNumber}?token=${order.accessToken}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-2xs transition-colors"
        >
          <span>←</span>
          <span>Back to Order Status</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>🖨️</span>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 Dimension Container) */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:max-w-none text-xs leading-relaxed space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-slate-900">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700 block">
              COMMERCIAL PROCUREMENT &amp; SUPPLIES
            </span>
            <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              {BUSINESS_CONFIG.name}
            </h1>
            <p className="text-slate-600 text-[11px] font-medium">{BUSINESS_CONFIG.tagline}</p>
            <p className="text-slate-500 text-[11px] mt-1 max-w-sm">{BUSINESS_CONFIG.addressLine}</p>
            <p className="text-slate-500 text-[11px]">
              Email: {BUSINESS_CONFIG.email} • Ph: {BUSINESS_CONFIG.phone} • WhatsApp: {BUSINESS_CONFIG.whatsappNumber}
            </p>
            <p className="text-slate-800 font-mono text-[11px] mt-1">
              <strong>GSTIN:</strong> {BUSINESS_CONFIG.gstin} • <strong>State Code:</strong> 08 (Rajasthan)
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 space-y-1">
            <span
              className={`inline-block px-3 py-1 text-[11px] font-black rounded uppercase tracking-wider mb-1 ${
                isConfirmed
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {invoiceTitle}
            </span>
            <p className="font-mono text-sm font-black text-slate-950 block">
              {isConfirmed ? `Invoice No: ${order.invoiceNumber}` : `Proforma Ref: ${order.invoiceNumber}`}
            </p>
            <p className="text-slate-600">Date: {issueDateFormatted}</p>
            <p className="text-slate-600">
              {order.confirmedOrderNumber ? (
                <>
                  Confirmed Order: <span className="font-mono font-bold text-emerald-800">{order.confirmedOrderNumber}</span>
                </>
              ) : (
                <>
                  Payment Attempt: <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                </>
              )}
            </p>
            <p className="text-slate-600">
              Payment Terms: <span className="font-semibold">Manual UPI / Bank NEFT</span>
            </p>
            <p className="text-[11px] font-bold">
              Status:{' '}
              <span className={isConfirmed ? 'text-emerald-700' : 'text-amber-700'}>
                {order.paymentStatus === 'AWAITING_PAYMENT'
                  ? 'Awaiting Payment'
                  : order.paymentStatus === 'PAYMENT_UNDER_VERIFICATION'
                    ? 'Payment Under Verification'
                    : order.paymentStatus === 'PAYMENT_REJECTED'
                      ? 'Payment Rejected'
                      : isConfirmed
                        ? 'Confirmed / Paid'
                        : order.paymentStatus}
              </span>
            </p>
          </div>
        </div>

        {/* Bill To & Ship To Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Billed To & Delivery Recipient
            </span>
            <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
            {order.organizationName && (
              <p className="font-semibold text-slate-800">{order.organizationName}</p>
            )}
            {order.gstin && (
              <p className="font-mono font-medium text-slate-700">GSTIN: {order.gstin}</p>
            )}
            <p className="text-slate-600">{order.shippingAddressLine1}</p>
            {order.shippingAddressLine2 && <p className="text-slate-600">{order.shippingAddressLine2}</p>}
            <p className="text-slate-700 font-medium">
              {order.district}, {order.state} — {order.pinCode}
            </p>
            <p className="text-slate-600">Mobile: +91 {order.customerPhone}</p>
            {order.customerWhatsapp && (
              <p className="text-slate-600">
                WhatsApp: {order.customerWhatsapp.startsWith('+') ? order.customerWhatsapp : `+91 ${order.customerWhatsapp}`}
              </p>
            )}
            <p className="text-slate-600">Email: {order.customerEmail}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Supply & Payment Reference
            </span>
            <p className="text-slate-600">
              Place of Supply: <strong className="text-slate-900">{order.state} (Code: 08)</strong>
            </p>
            <p className="text-slate-600">
              Delivery Logistics Zone:{' '}
              <strong className="text-slate-900">{order.financials.deliveryZoneName}</strong>
            </p>
            <p className="text-slate-600">
              Payment Method:{' '}
              <strong className="text-slate-900">
                {order.paymentMethod === 'MANUAL_BANK_TRANSFER' ? 'Direct Bank Transfer' : 'Manual UPI QR'}
              </strong>
            </p>
            <p className="text-slate-600">
              UTR / Bank Reference:{' '}
              <strong className="font-mono text-slate-900">
                {order.paymentReferenceUTR || 'Awaiting customer remittance'}
              </strong>
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-800 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-2">#</th>
                <th className="py-2.5 px-2">Description of Goods &amp; Supplies</th>
                <th className="py-2.5 px-2">HSN</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-2 text-right">Unit Rate (₹)</th>
                <th className="py-2.5 px-2 text-right">Taxable Value (₹)</th>
                <th className="py-2.5 px-2 text-right">GST (18%)</th>
                <th className="py-2.5 px-2 text-right">Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((item, index) => {
                const itemTaxable = Math.round((item.totalINR / 1.18) * 100) / 100;
                const itemTax = Math.round((item.totalINR - itemTaxable) * 100) / 100;
                return (
                  <tr key={item.id} className="text-[11px]">
                    <td className="py-3 px-2 text-slate-400 font-mono">{index + 1}</td>
                    <td className="py-3 px-2 font-medium text-slate-900">
                      <span className="font-bold">{item.productName}</span>
                      {item.brandName && (
                        <span className="block text-[10px] text-slate-500 uppercase font-bold">
                          Brand: {item.brandName} • SKU: {item.productSku}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-500">8471</td>
                    <td className="py-3 px-2 text-center font-bold text-slate-900">{item.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono text-slate-700">
                      ₹{item.unitPriceINR.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-700">
                      ₹{itemTaxable.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-600">
                      ₹{itemTax.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-slate-950">
                      ₹{item.totalINR.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="pt-2 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Total in Words:</span>
              <p className="font-semibold text-slate-900 italic">
                {numberToIndianWords(order.totalAmountINR)}
              </p>
            </div>

            {/* Remittance Bank Info on Invoice */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] space-y-1">
              <span className="font-bold text-slate-800 uppercase block">Bank Remittance Particulars</span>
              <p className="text-slate-600">
                A/c Name: <strong>{PAYMENT_CONFIG.bank.accountName}</strong> • A/c No:{' '}
                <strong className="font-mono">{PAYMENT_CONFIG.bank.accountNumber}</strong>
              </p>
              <p className="text-slate-600">
                Bank: {PAYMENT_CONFIG.bank.bankName} • IFSC:{' '}
                <strong className="font-mono">{PAYMENT_CONFIG.bank.ifscCode}</strong>
              </p>
              <p className="text-slate-600">
                UPI ID: <strong className="font-mono text-emerald-800">{PAYMENT_CONFIG.upi.upiId}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Value (Base)</span>
              <span className="font-mono">₹{order.financials.taxableSubtotalINR.toLocaleString('en-IN')}</span>
            </div>

            {order.financials.isInterstate ? (
              <div className="flex justify-between text-slate-600">
                <span>Integrated Tax (IGST 18%)</span>
                <span className="font-mono">₹{order.financials.igstINR.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Central Tax (CGST 9%)</span>
                  <span className="font-mono">₹{order.financials.cgstINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>State Tax (SGST 9%)</span>
                  <span className="font-mono">₹{order.financials.sgstINR.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Freight / Delivery Charges</span>
              <span className="font-mono">
                {order.deliveryFeeINR === 0 ? 'FREE' : `₹${order.deliveryFeeINR}`}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-900 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-950 uppercase">Total Invoice Value</span>
              <span className="text-lg font-black text-slate-950 font-mono">
                ₹{order.totalAmountINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Declaration and Legal Footer */}
        <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 uppercase">Declaration & Terms of Supply:</p>
          <p>1. Goods once dispatched are covered under respective manufacturer warranty terms across authorized service centers.</p>
          <p>2. Payment must be cleared prior to dispatch via verified manual UPI / NEFT transfer.</p>
          <p>3. This is a computer-generated commercial document issued by JK Enterprises, Bikaner, Rajasthan.</p>
          <p className="pt-2 text-right font-semibold text-slate-700">For JK Enterprises — Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};
