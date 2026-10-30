'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export interface HeroSlide {
  badgeIcon: string;
  badgeText: string;
  title: string;
  highlightedText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  cardFocusTitle: string;
  cardFocusTag: string;
  cardItems: { label: string; detail: string }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    badgeIcon: '📍',
    badgeText: 'Bikaner Hub • Serving All 41 Rajasthan Districts',
    title: 'Reliable Products, Equipment &',
    highlightedText: 'Commercial Supplies',
    description:
      'Commercial procurement and equipment distribution for retail clients, corporate enterprises, schools, and wholesale partners across Rajasthan. Direct manual payment verification and dependable regional order coordination.',
    primaryCtaText: 'Explore Product Catalogue',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'Request Wholesale Quote',
    secondaryCtaHref: '/#wholesale-section',
    cardFocusTitle: 'Commercial Procurement Hub',
    cardFocusTag: 'Rajasthan Regional Hub',
    cardItems: [
      { label: 'Core Categories', detail: '8 Commercial Product Lines' },
      { label: 'Procurement Types', detail: 'Retail & Institutional Bulk' },
      { label: 'Verification', detail: 'Direct UPI & Bank Transfer' },
      { label: 'Hub Dispatch', detail: 'Local Bikaner & Statewide Transport' },
    ],
  },
  {
    badgeIcon: '🏢',
    badgeText: 'Institutional & Enterprise Supply',
    title: 'Quality Equipment & Goods for',
    highlightedText: 'Organizations & Labs',
    description:
      'Equipping schools, computer labs, institutions, and corporate offices with certified IT hardware, workstations, surveillance networks, and office supplies. Verified proforma invoices issued upon administrative credit confirmation.',
    primaryCtaText: 'Browse Categories',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'B2B Quotation Form',
    secondaryCtaHref: '/#wholesale-section',
    cardFocusTitle: 'Institutional Lab & Office Solutions',
    cardFocusTag: 'Schools & Corporate',
    cardItems: [
      { label: 'Workstations', detail: 'Office PCs & Computer Labs' },
      { label: 'Surveillance', detail: 'IP Cameras & NVR Systems' },
      { label: 'Networking', detail: 'Gigabit PoE Switches & Cabling' },
      { label: 'Documentation', detail: 'Itemized Proforma & Tax Invoicing' },
    ],
  },
  {
    badgeIcon: '🚚',
    badgeText: 'Statewide Regional Logistics',
    title: 'Prompt Regional Distribution from',
    highlightedText: 'Bikaner Central Hub',
    description:
      'Coordinating fast local delivery in Bikaner and dedicated road transport across all 41 districts of Rajasthan. Transparent manual UPI QR and NEFT payment verification without unnecessary payment gateway fees.',
    primaryCtaText: 'View Product Catalogue',
    primaryCtaHref: '/catalogue',
    secondaryCtaText: 'WhatsApp Order Desk',
    secondaryCtaHref: 'https://wa.me/919928769266',
    cardFocusTitle: 'Regional Logistics Coordination',
    cardFocusTag: 'Statewide Dispatch',
    cardItems: [
      { label: 'Bikaner City', detail: 'Fast Local Commercial Delivery' },
      { label: 'Rajasthan Districts', detail: 'Road Transport & Express Courier' },
      { label: 'Payment Method', detail: 'Manual UPI QR & NEFT Transfer' },
      { label: 'Desk Support', detail: 'WhatsApp & Direct Phone Guidance' },
    ],
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

  // Automatic slide progression (7s interval), paused on hover/focus or reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="JK Enterprises Commercial Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Semantic H1 Headline, concise text, CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200/90 shadow-2xs select-none">
                <span aria-hidden="true">{activeSlide.badgeIcon}</span>
                <span>{activeSlide.badgeText}</span>
              </span>
            </div>

            {/* Semantic H1: Master page heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.14]">
              {activeSlide.title}{' '}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {activeSlide.highlightedText}
              </span>
            </h1>

            {/* Concise Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
              {activeSlide.description}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={activeSlide.primaryCtaHref}
                className="btn-premium-interactive inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20"
              >
                {activeSlide.primaryCtaText} →
              </Link>
              {activeSlide.secondaryCtaText && activeSlide.secondaryCtaHref && (
                <Link
                  href={activeSlide.secondaryCtaHref}
                  className="btn-premium-interactive inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-2xs"
                >
                  {activeSlide.secondaryCtaText}
                </Link>
              )}
            </div>

            {/* Subtle Commercial Trust Line */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Official Tax Invoicing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Direct Manual UPI &amp; NEFT
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Statewide Rajasthan Dispatch
              </span>
            </div>
          </div>

          {/* Right Column: Refined Commercial Procurement Overview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-6 card-premium-interactive">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                    {activeSlide.cardFocusTag}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    {activeSlide.cardFocusTitle}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-sm font-bold">
                  JK
                </div>
              </div>

              {/* Card Items Grid */}
              <div className="mt-4 space-y-2.5">
                {activeSlide.cardItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-500">{item.label}</span>
                    <span className="font-semibold text-slate-900 text-right">{item.detail}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Action Strip */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Bikaner Trading Office</span>
                <Link
                  href="/catalogue"
                  className="font-semibold text-blue-700 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>View Catalogue</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls (Previous / Next and Slide Indicators) */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between sm:justify-center sm:gap-6">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Indicator Pills */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
