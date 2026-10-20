import React from 'react';

export default function CatalogueLoading() {
  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-36 bg-slate-200 rounded-lg mb-6" />

        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-72 bg-slate-300 rounded-xl" />
            <div className="h-4 w-96 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-8 w-44 bg-slate-200 rounded-xl" />
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-72 h-[500px] bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="h-6 w-24 bg-slate-200 rounded" />
            <div className="h-32 bg-slate-100 rounded-xl" />
            <div className="h-32 bg-slate-100 rounded-xl" />
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="h-14 bg-white rounded-2xl border border-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="h-40 bg-slate-100 rounded-xl" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
