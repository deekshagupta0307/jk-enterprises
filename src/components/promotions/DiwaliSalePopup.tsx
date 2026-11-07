'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

export const DiwaliSalePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Appears on initial visit and on every page refresh.
  // Stays closed during client-side SPA link navigation within the same page session.
  useEffect(() => {
    // If user refreshes the page, window is reloaded.
    // We check sessionStorage for dismissed flag within the active SPA navigation session.
    const hasDismissedInCurrentNavSession = sessionStorage.getItem('jk_diwali_popup_dismissed_session');
    
    // Reset on window beforeunload so full page refresh re-triggers the popup
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('jk_diwali_popup_dismissed_session');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (!hasDismissedInCurrentNavSession) {
      // Short delay for smooth entry after hydration
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem('jk_diwali_popup_dismissed_session', 'true');
  }, []);

  const handleShopNow = useCallback(() => {
    handleDismiss();
    router.push('/catalogue');
  }, [handleDismiss, router]);

  // Keyboard accessibility: Escape key dismisses dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diwali-sale-heading"
      aria-describedby="diwali-sale-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        // Dismiss when clicking directly on backdrop
        if (e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-red-950 text-white border-2 border-amber-500/60 shadow-2xl overflow-hidden p-6 sm:p-8 transform transition-all animate-scale-up"
      >
        {/* Festive Golden Glow Accents */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />

        {/* Top Close Button (✕) */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleDismiss}
          aria-label="Close Diwali Sale announcement"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-amber-200 hover:text-white border border-amber-500/30 flex items-center justify-center transition-colors cursor-pointer text-base font-bold shadow-md"
        >
          ✕
        </button>

        {/* Header Visual: Festive Diya / Lamp */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-red-600/30 border border-amber-400/50 shadow-inner mb-3.5">
            <svg
              className="w-10 h-10 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Diya Base */}
              <path
                d="M3 14C3 18 7 21 12 21C17 21 21 18 21 14C21 13.5 20.5 13 20 13H4C3.5 13 3 13.5 3 14Z"
                fill="#d97706"
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
              <path
                d="M4 14C5.5 15.5 8.5 16.5 12 16.5C15.5 16.5 18.5 15.5 20 14"
                stroke="#fef08a"
                strokeWidth="1"
              />
              {/* Flame */}
              <path
                d="M12 3C12 3 9.5 7 9.5 9.5C9.5 10.88 10.62 12 12 12C13.38 12 14.5 10.88 14.5 9.5C14.5 7 12 3 12 3Z"
                fill="#ef4444"
              />
              <path
                d="M12 5C12 5 10.5 8 10.5 9.5C10.5 10.33 11.17 11 12 11C12.83 11 13.5 10.33 13.5 9.5C13.5 8 12 5 12 5Z"
                fill="#fbbf24"
              />
              <circle cx="12" cy="9.5" r="1" fill="#ffffff" />
            </svg>
          </div>

          {/* Festive Badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-300 border border-amber-400/40 shadow-xs">
              ✨ FESTIVE CELEBRATION OFFER ✨
            </span>
          </div>

          {/* Master Headline */}
          <h2
            id="diwali-sale-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-3 leading-snug"
          >
            Diwali Sale — Get{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              10% OFF
            </span>{' '}
            Storewide
          </h2>

          {/* Description */}
          <p id="diwali-sale-description" className="text-xs sm:text-sm text-amber-100/90 mt-2 leading-relaxed">
            Automatic 10% festive discount applied across all eligible commercial IT equipment, tactical outdoor
            merchandise, connectivity cables &amp; office supplies. Verified GST input tax credit (ITC) invoices with rapid
            dispatch from Bikaner.
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="mt-5 p-3.5 rounded-2xl bg-black/40 border border-amber-500/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
              Festive Promo Code
            </span>
            <span className="font-mono text-base font-extrabold text-white tracking-widest">DIWALI10</span>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            Auto-Applied at Checkout
          </span>
        </div>

        {/* Value Bullet Points */}
        <div className="mt-4 space-y-1.5 text-xs text-amber-200/90">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">✓</span>
            <span>Flat 10% discount deducted from your total merchandise value</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">✓</span>
            <span>Inclusive 18% GST with transparent CGST/SGST/IGST tax breakdown</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">✓</span>
            <span>Free local delivery in Bikaner on orders of ₹5,000 and above</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleShopNow}
            className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/30 transition-transform active:scale-[0.99] cursor-pointer"
          >
            Shop Diwali Deals Now →
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-amber-200/70 hover:text-white transition-colors cursor-pointer text-center"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

