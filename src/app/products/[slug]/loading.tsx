import React from 'react';

export default function ProductDetailLoading() {
  return (
    <main className="flex-1 bg-slate-50/70 py-8 sm:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-48 bg-slate-200 rounded mb-6" />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-4/3 rounded-2xl bg-slate-100" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="h-16 bg-slate-100 rounded-xl" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-8 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-32 bg-slate-100 rounded" />
              </div>

              <div className="h-28 bg-slate-100 rounded-2xl" />

              <div className="h-12 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
