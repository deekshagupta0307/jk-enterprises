import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto text-3xl font-black mb-4">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Hardware Page Not Found
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested product category, SKU, or page could not be located in our hardware catalogue.
        </p>

        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs text-slate-700 space-y-1.5">
          <p className="font-semibold text-slate-900">Try one of these options:</p>
          <p>• Explore our computer components & SSD catalogue</p>
          <p>• Ask the Virtual Hardware Advisor floating in the bottom-right</p>
          <p>• Review wholesale & institutional procurement guides</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/#processors"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            Browse Processors
          </Link>
        </div>
      </div>
    </main>
  );
}
