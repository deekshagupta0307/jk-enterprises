import React from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demoCatalogue';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800">
      {/* Upper Footer: Value Highlights */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <h4 className="font-semibold text-white text-sm">Hardware & IT Distribution</h4>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Components, SSDs, processors, networking, and security solutions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🏫</span>
              <div>
                <h4 className="font-semibold text-white text-sm">Schools, Offices & Labs</h4>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Bulk hardware supply and quotation assistance for educational and corporate IT.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-semibold text-white text-sm">Statewide Rajasthan Reach</h4>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Focused logistics planning for Jaipur, Jodhpur, Kota, Udaipur, and all districts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <div>
                <h4 className="font-semibold text-white text-sm">Commercial Invoicing (Planned)</h4>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Business billing and quotation documentation to be finalized on commercial release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <span className="text-base font-bold text-white block">JK ENTERPRISES</span>
                <span className="text-[10px] text-amber-300 font-medium">Jai Shree Shyam</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Your regional destination for computer hardware, memory, high-speed storage, CCTV surveillance, and IT networking solutions in Rajasthan (Development Preview).
            </p>

            {/* Honest Business Contact Placeholders */}
            <div className="pt-2 space-y-2 border-t border-slate-800 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-300 text-xs">Verified Business Details Notice:</p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">📍 Registered Address:</span>
                <span className="italic">[Official address will be verified upon production launch, Rajasthan, India]</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">📞 Phone:</span>
                <span className="italic">[Official support phone to be verified]</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">✉️ Email:</span>
                <span className="italic">[Official support email to be verified]</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">📋 GSTIN:</span>
                <span className="italic">[GSTIN details to be configured upon commercial activation]</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Hardware Catalogue
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
                  Browse Full 50+ Catalogue →
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

          {/* Project & Transparency */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Preview Transparency
            </h5>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <p>
                <strong className="text-amber-300">Prototype Disclaimer:</strong> All products, pricing, and availability on this site are sample demonstration data.
              </p>
              <p>
                No live payment transactions or persisted cart operations occur in this preview.
              </p>
              <p>
                Logistics timelines, courier rates, and freight eligibility will be confirmed from verified business sources in Stage B.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>
            © 2026 JK Enterprises. All rights reserved. Development Prototype.
          </p>
          <div className="flex items-center gap-4">
            <span>Jai Shree Shyam</span>
            <span>•</span>
            <span>Rajasthan, India</span>
            <span>•</span>
            <span>Next.js 16 App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
