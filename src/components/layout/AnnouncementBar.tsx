import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Left: Sacred invocation */}
        <div className="flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            श्री
          </span>
          <span className="tracking-wide text-amber-200 font-semibold">
            Jai Shree Shyam
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Computer Hardware, IT Solutions & Institutional Supply
          </span>
        </div>

        {/* Right: Regional service note & B2B guidance */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Serving Rajasthan from Bikaner Hub (All 41 Districts)
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-amber-300 font-medium hidden sm:inline">
            B2B & School Lab Inquiries Welcome
          </span>
        </div>
      </div>
    </div>
  );
};
