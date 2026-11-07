import React from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demoCatalogue';
import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand & Regional Hub Info */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-xs">
                JK
              </div>
              <div>
                <span className="text-base font-bold text-white block tracking-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="text-[11px] text-amber-300 font-medium">
                  जय श्री श्याम • Bikaner Hub
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Commercial procurement, office supplies, computer hardware, electronics, and institutional equipment distribution across Rajasthan.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Central Distribution Hub: {BUSINESS_CONFIG.city}, Rajasthan</span>
            </div>
          </div>

          {/* Column 2: Product Catalogue Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3.5">
              Product Catalogue
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              {DEMO_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/catalogue"
                  className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Open Full Catalogue (55+ Items)</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Institutional Portals */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3.5">
              Customer Portals
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li>
                <span className="text-slate-200 font-medium block">Schools &amp; Computer Labs</span>
                <span className="text-[11px] text-slate-500">Lab equipment packages &amp; monitors</span>
              </li>
              <li>
                <span className="text-slate-200 font-medium block">Offices &amp; Enterprises</span>
                <span className="text-[11px] text-slate-500">Commercial hardware &amp; networking</span>
              </li>
              <li>
                <span className="text-slate-200 font-medium block">Trade &amp; Wholesale</span>
                <span className="text-[11px] text-slate-500">Commercial pricing upon verification</span>
              </li>
              <li>
                <Link href="/account" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Customer Portal &amp; Orders →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Centralized Contact & Inquiries */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3.5">
              Procurement Desk
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <p className="flex items-start gap-2">
                <span className="text-slate-500 shrink-0">📍</span>
                <span className="text-slate-300">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Business Location</span>
                  {BUSINESS_CONFIG.addressLine}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500 shrink-0">📞</span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +91 {BUSINESS_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500 shrink-0">💬</span>
                <a
                  href={BUSINESS_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: +{BUSINESS_CONFIG.whatsappCountryCode} {BUSINESS_CONFIG.whatsappNumber}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500 shrink-0">✉️</span>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-300">
                <span className="block font-bold text-white uppercase text-[10px]">Delivery &amp; Dispatch Desk:</span>
                <a href="tel:+919928769266" className="font-bold underline text-blue-400 hover:text-blue-300">
                  Call 9928769266
                </a>
                <span className="block text-[10px] text-slate-400 mt-0.5">Contact to confirm delivery address, item availability, and dispatch timing.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-10 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 {BUSINESS_CONFIG.name}. All rights reserved. Bikaner, Rajasthan, India.</p>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold">जय श्री श्याम</span>
            <span>•</span>
            <span className="text-slate-400">Serving all 41 Rajasthan Districts</span>
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
