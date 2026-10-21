import React from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demoCatalogue';
import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800">

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Sacred Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base">
                JK
              </div>
              <div>
                <span className="text-base font-bold text-white block">{BUSINESS_CONFIG.name}</span>
                <span className="text-[10px] text-amber-300 font-medium">Jai Shree Shyam</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Your trusted partner for commercial equipment, supplies, computer hardware, electronics, and institutional procurement in Bikaner and across Rajasthan.
            </p>

            {/* Centralized Business Contact Details */}
            <div className="pt-2 space-y-2 border-t border-slate-800 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-300 text-xs">Business Contact Details:</p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">📍 Location:</span>
                <span className="text-slate-200">{BUSINESS_CONFIG.addressLine}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">📞 Phone:</span>
                <a href={`tel:${BUSINESS_CONFIG.phone}`} className="text-slate-200 hover:text-white transition-colors">
                  {BUSINESS_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">💬 WhatsApp:</span>
                <a
                  href={BUSINESS_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  +{BUSINESS_CONFIG.whatsappCountryCode} {BUSINESS_CONFIG.whatsappNumber}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">✉️ Email:</span>
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-slate-200 hover:text-white transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Product Catalogue
            </h5>
            <ul className="space-y-2 text-slate-400">
              {DEMO_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href={`#${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/catalogue" className="text-blue-400 hover:text-blue-300">
                  Browse Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Segments */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Customer Portals
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">Retail Customers</span>
                <p className="text-[11px] text-slate-500">PC upgrades & components</p>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Schools & Computer Labs</span>
                <p className="text-[11px] text-slate-500">Networking & lab workstations</p>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Offices & Businesses</span>
                <p className="text-[11px] text-slate-500">Printers, security & servers</p>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Approved Wholesale</span>
                <p className="text-[11px] text-slate-500">Dealer tier pricing upon KYC</p>
              </li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Logistics & Assurance
            </h5>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <p>
                <strong className="text-slate-200">Central Hub Dispatch:</strong> Fast ground logistics across Bikaner and all 41 Rajasthan districts.
              </p>
              <p>
                <strong className="text-slate-200">Direct Payment:</strong> Verified manual UPI QR code & bank transfer with administrative confirmation.
              </p>
              <p>
                <strong className="text-slate-200">Manufacturer Warranty:</strong> All components supported across authorized regional service centers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>
            © 2026 {BUSINESS_CONFIG.name}. All rights reserved. Bikaner, Rajasthan, India.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-semibold">Jai Shree Shyam</span>
            <span>•</span>
            <span>Bikaner, Rajasthan, India</span>
            <span>•</span>
            <a
              href={BUSINESS_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Order Assistance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
