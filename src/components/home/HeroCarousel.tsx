'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export interface HeroSlide {
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  accentGradient: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    badgeIcon: '📍',
    badgeText: 'Bikaner Hub • Serving All 41 Rajasthan Districts',
    title: 'Reliable Products, Equipment & Commercial Supplies',
    description:
      'Serving retail customers, corporate enterprises, schools, and wholesale partners across Rajasthan. Broad-spectrum procurement, transparent manual payment verification, and dedicated order coordination.',
    primaryCtaText: 'Explore Product Catalogue',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'Request Wholesale Quote',
    secondaryCtaHref: '#quotation-form',
    accentGradient: 'from-blue-600 via-indigo-600 to-slate-900',
  },
  {
    badgeIcon: '🏢',
    badgeText: 'Institutional & Enterprise Procurement',
    title: 'Quality Equipment & Goods for Organizations',
    description:
      'From stationery and office supplies to commercial electronics, networking hardware, and surveillance equipment. Formal purchase orders and proforma documentation verified directly against bank transfer credit.',
    primaryCtaText: 'Browse Categories',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'B2B Procurement Inquiry',
    secondaryCtaHref: '#quotation-form',
    accentGradient: 'from-slate-900 via-blue-900 to-indigo-950',
  },
  {
    badgeIcon: '🚚',
    badgeText: 'Statewide Regional Logistics',
    title: 'Prompt Regional Distribution from Bikaner Hub',
    description:
      'Fast local delivery in Bikaner and coordinated express road transport across all 41 current districts of Rajasthan. Straightforward manual UPI QR code and NEFT transfer without gateway surcharges.',
    primaryCtaText: 'View Delivery Coverage',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'Contact WhatsApp Desk',
    secondaryCtaHref: 'https://wa.me/919928769266',
    accentGradient: 'from-indigo-900 via-slate-900 to-blue-950',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic slide progression (6.5s interval), paused on hover/focus or reduced motion
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="JK Enterprises Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center min-h-[340px] sm:min-h-[380px] flex flex-col justify-between">
          {/* Slide Content with smooth transition */}
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Top Badge */}
            <div className="inline-flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200/90 select-none shadow-2xs">
                <span aria-hidden="true">{activeSlide.badgeIcon}</span>
                <span>{activeSlide.badgeText}</span>
              </span>
            </div>

            {/* Main Headline: Primary H1 semantic element */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.14]">
              {activeSlide.title.includes('Commercial Supplies') ? (
                <>
                  Reliable Products, Equipment &amp;{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Commercial Supplies
                  </span>
                </>
              ) : activeSlide.title.includes('Bikaner Hub') ? (
                <>
                  Prompt Regional Distribution from{' '}
                  <span className="text-blue-600">Bikaner Hub</span>
                </>
              ) : (
                <>
                  Quality Equipment &amp; Goods for{' '}
                  <span className="text-blue-600">Organizations</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {activeSlide.description}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={activeSlide.primaryCtaHref}
                className="btn-premium-interactive inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20"
              >
                {activeSlide.primaryCtaText} →
              </Link>
              <Link
                href={activeSlide.secondaryCtaHref}
                className="btn-premium-interactive inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-2xs"
              >
                {activeSlide.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Carousel Controls (Dots & Previous/Next buttons) */}
          <div className="mt-8 pt-4 flex items-center justify-center gap-4">
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              ‹
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={currentSlide === idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-7 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
