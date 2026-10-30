import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50/70">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black mb-4">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
          Product or Page Not Found
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested product, category, or page could not be located in our commercial catalogue.
        </p>

        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs text-slate-700 space-y-1.5">
          <p className="font-semibold text-slate-900">Recommended options:</p>
          <p>• Explore the complete 55+ product catalogue</p>
          <p>• Search products using the top navigation search bar</p>
          <p>• Contact our Bikaner commercial sales desk via WhatsApp</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/catalogue"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Browse Catalogue
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
