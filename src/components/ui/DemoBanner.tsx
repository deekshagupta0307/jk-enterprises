'use client';

import React, { useState } from 'react';

export const DemoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="bg-amber-500 text-amber-950 text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-amber-600">
        <span>⚠ Prototype Preview Mode Active</span>
        <button
          onClick={() => setIsOpen(true)}
          className="underline font-semibold hover:text-black cursor-pointer ml-2"
        >
          View Disclaimer Details
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Demo environment notice" className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 mt-0.5 text-base" aria-hidden="true">
            🛠️
          </span>
          <div>
            <p className="font-semibold text-amber-950">
              DEVELOPMENT DEMO & PREVIEW ENVIRONMENT
            </p>
            <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
              All catalogue items, prices, specifications, and availability displayed on this website are mock sample data for interface evaluation. Live checkout, persisted shopping cart, and order processing are currently disabled. Real inventory and verified contact details will be enabled in future milestones.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wider">
            Safe Demo Mode
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-amber-700 hover:text-amber-950 font-bold p-1 rounded hover:bg-amber-100 transition-colors cursor-pointer"
            title="Minimize disclaimer"
            aria-label="Minimize demo banner"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
};
