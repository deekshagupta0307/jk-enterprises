'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export interface LandscapeHeroBanner {
  id: string;
  badgeTag: string;
  badgeIcon: string;
  categoryLabel: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  highlights: string[];
  themeGradient: string;
  borderAccent: string;
  badgeStyle: string;
  buttonStyle: string;
  svgGraphic: React.ReactNode;
}

const HERO_BANNERS: LandscapeHeroBanner[] = [
  {
    id: 'banner-it-hardware',
    badgeTag: 'ENTERPRISE IT & NETWORKING',
    badgeIcon: '💻',
    categoryLabel: 'Computer Hardware & Electronics',
    titlePrefix: 'Enterprise IT Hardware, Workstations &',
    titleHighlight: 'Network Infrastructure',
    subtitle:
      'Equipping schools, computer labs, institutions, and corporate enterprises across Rajasthan with verified desktop processors, NVMe storage drives, PoE gigabit switches, and CCTV surveillance networks.',
    primaryCtaText: 'Explore IT Hardware',
    primaryCtaHref: '/catalogue?category=computer-peripherals',
    secondaryCtaText: 'Request Bulk Quote',
    secondaryCtaHref: '/#wholesale-section',
    highlights: ['Intel & AMD Workstations', 'Gigabit PoE Switches', 'Enterprise NVMe & RAM', 'Verified GST Tax Invoices'],
    themeGradient: 'from-slate-900 via-blue-950 to-indigo-950 text-white',
    borderAccent: 'border-blue-700/40',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    buttonStyle: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25',
    svgGraphic: (
      <svg className="w-full h-full max-h-72 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="50" width="320" height="200" rx="16" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
        <rect x="70" y="80" width="110" height="130" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
        <circle cx="125" cy="125" r="28" fill="#1d4ed8" fillOpacity="0.4" stroke="#93c5fd" strokeWidth="2" />
        <path d="M125 105v40M105 125h40" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" />
        <rect x="90" y="170" width="70" height="8" rx="4" fill="#38bdf8" />
        <rect x="90" y="184" width="45" height="6" rx="3" fill="#64748b" />
        
        {/* Server Rack / Network Unit */}
        <rect x="210" y="80" width="130" height="36" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="228" cy="98" r="4" fill="#10b981" />
        <circle cx="242" cy="98" r="4" fill="#38bdf8" />
        <line x1="260" y1="94" x2="320" y2="94" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="102" x2="300" y2="102" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        
        <rect x="210" y="128" width="130" height="36" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="228" cy="146" r="4" fill="#10b981" />
        <circle cx="242" cy="146" r="4" fill="#fbbf24" />
        <line x1="260" y1="142" x2="310" y2="142" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="150" x2="290" y2="150" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        <rect x="210" y="174" width="130" height="36" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="228" cy="192" r="4" fill="#10b981" />
        <circle cx="242" cy="192" r="4" fill="#10b981" />
        <line x1="260" y1="188" x2="325" y2="188" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        
        {/* High-speed circuit traces */}
        <path d="M180 145h30" stroke="#60a5fa" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M180 100h30" stroke="#38bdf8" strokeWidth="2" />
        <path d="M180 190h30" stroke="#818cf8" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'banner-military-outdoor',
    badgeTag: 'RUGGED OUTDOOR & FIELD ESSENTIALS',
    badgeIcon: '🏕️',
    categoryLabel: 'Military & Outdoor Products (Civilian Utility)',
    titlePrefix: 'Civilian Trekking Rucksacks, Outdoor Boots &',
    titleHighlight: 'Weather-Shield Field Gear',
    subtitle:
      'High-capacity modular backpacks, heavy-duty outdoor combat boots, ripstop cargo apparel, and all-weather camping supplies engineered for trekking expeditions, security personnel, and civilian outdoor use.',
    primaryCtaText: 'View Tactical Gear',
    primaryCtaHref: '/catalogue?category=military-outdoor',
    secondaryCtaText: 'Wholesale Inquiry',
    secondaryCtaHref: '/#wholesale-section',
    highlights: ['MOLLE Field Rucksacks', 'Heavy-Duty Jungle Boots', 'Ripstop Cargo Apparel', 'Weather-Shield Ponchos'],
    themeGradient: 'from-stone-900 via-neutral-900 to-amber-950 text-white',
    borderAccent: 'border-amber-600/40',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    buttonStyle: 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold shadow-amber-600/25',
    svgGraphic: (
      <svg className="w-full h-full max-h-72 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Mountain Silhouette Background */}
        <path d="M30 240L130 90L220 200L290 120L370 240H30Z" fill="#292524" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M110 120L130 90L150 120L135 125L110 120Z" fill="#fef3c7" fillOpacity="0.8" />
        <path d="M275 140L290 120L305 140L295 145L275 140Z" fill="#fef3c7" fillOpacity="0.8" />
        
        {/* Tactical Backpack Outline */}
        <rect x="140" y="110" width="120" height="140" rx="18" fill="#1c1917" stroke="#f59e0b" strokeWidth="2.5" />
        <path d="M170 110V85a30 30 0 0160 0v25" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
        <rect x="155" y="135" width="90" height="40" rx="6" fill="#292524" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="165" y1="155" x2="235" y2="155" stroke="#78716c" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="155" y="185" width="90" height="45" rx="6" fill="#292524" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="165" y1="205" x2="235" y2="205" stroke="#78716c" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Compass Dial Indicator */}
        <circle cx="310" cy="85" r="32" fill="#1c1917" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="310" cy="85" r="2" fill="#fbbf24" />
        <polygon points="310,60 316,85 304,85" fill="#ef4444" />
        <polygon points="310,110 316,85 304,85" fill="#e2e8f0" />
      </svg>
    ),
  },
  {
    id: 'banner-cables-connectivity',
    badgeTag: 'HIGH-SPEED CABLES & ADAPTERS',
    badgeIcon: '🔌',
    categoryLabel: 'Cables & Connectivity Solutions',
    titlePrefix: 'Certified High-Speed Cables, Active Converters &',
    titleHighlight: 'Type-C Multiport Docks',
    subtitle:
      'Ultra-high bandwidth HDMI 2.1 8K cords, 305m Cat6 networking cables, active VGA-to-HDMI signal converters, high-speed USB-C hubs, and heavy-duty computer power lines for offices and labs.',
    primaryCtaText: 'Browse Cables & Converters',
    primaryCtaHref: '/catalogue?category=cables-connectivity',
    secondaryCtaText: 'Order via WhatsApp',
    secondaryCtaHref: 'https://wa.me/919928769266',
    highlights: ['HDMI 2.1 & 4K DisplayPort', 'Cat6 Structured Patch Cables', 'Active Video Converters', 'Multi-Port USB-C Hubs'],
    themeGradient: 'from-slate-950 via-teal-950 to-cyan-950 text-white',
    borderAccent: 'border-cyan-600/40',
    badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    buttonStyle: 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-cyan-500/25',
    svgGraphic: (
      <svg className="w-full h-full max-h-72 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Curving High-Speed Cable Loop */}
        <path d="M50 150 C 120 70, 180 230, 260 150 C 310 90, 360 130, 380 150" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M50 150 C 120 70, 180 230, 260 150 C 310 90, 360 130, 380 150" stroke="#67e8f9" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" fill="none" />
        
        {/* Gold-Plated HDMI / Video Connector */}
        <g transform="translate(60, 110)">
          <rect x="0" y="20" width="70" height="40" rx="8" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <path d="M70 28 L95 28 L95 52 L70 52 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="74" y="33" width="16" height="14" fill="#1e293b" />
          <circle cx="20" cy="40" r="4" fill="#06b6d4" />
          <text x="32" y="44" fill="#a5f3fc" fontSize="10" fontWeight="bold">HDMI</text>
        </g>
        
        {/* Type-C Multiport Hub */}
        <g transform="translate(230, 100)">
          <rect x="0" y="0" width="110" height="75" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <rect x="15" y="15" width="22" height="8" rx="2" fill="#38bdf8" />
          <rect x="45" y="15" width="22" height="8" rx="2" fill="#38bdf8" />
          <rect x="75" y="15" width="22" height="8" rx="2" fill="#38bdf8" />
          <rect x="15" y="35" width="30" height="12" rx="2" fill="#eab308" />
          <rect x="55" y="35" width="38" height="12" rx="2" fill="#64748b" />
          <circle cx="95" cy="58" r="3" fill="#10b981" />
        </g>
      </svg>
    ),
  },
  {
    id: 'banner-stationery-furnishings',
    badgeTag: 'INSTITUTIONAL SUPPLIES & INTERIORS',
    badgeIcon: '🏢',
    categoryLabel: 'Office Supplies, Stationery & Furnishings',
    titlePrefix: 'Administrative Stationery, Executive Chairs &',
    titleHighlight: 'Commercial Carpets',
    subtitle:
      'Complete administrative procurement solutions for Rajasthan schools, universities, offices, and courts: register books, copier paper, ergonomic office seating, conference desks, and heavy-duty floor carpets.',
    primaryCtaText: 'Explore Office & Furnishings',
    primaryCtaHref: '/#wholesale-section',
    secondaryCtaText: 'Call 9928769266',
    secondaryCtaHref: 'tel:+919928769266',
    highlights: ['Register Books & Paper', 'Executive Ergonomic Seating', 'Commercial Carpets & Rugs', 'Bikaner Central Dispatch'],
    themeGradient: 'from-slate-900 via-zinc-900 to-amber-950 text-white',
    borderAccent: 'border-amber-500/40',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    buttonStyle: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-amber-500/25',
    svgGraphic: (
      <svg className="w-full h-full max-h-72 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Executive Office Chair Graphic */}
        <g transform="translate(80, 80)">
          {/* Chair Backrest */}
          <rect x="40" y="20" width="50" height="70" rx="10" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
          {/* Headrest */}
          <rect x="47" y="5" width="36" height="15" rx="5" fill="#3f3f46" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Seat Cushion */}
          <rect x="35" y="90" width="60" height="18" rx="6" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
          {/* Base Stem & Wheels */}
          <line x1="65" y1="108" x2="65" y2="135" stroke="#71717a" strokeWidth="4" />
          <line x1="35" y1="135" x2="95" y2="135" stroke="#71717a" strokeWidth="3" />
          <circle cx="35" cy="140" r="4" fill="#a1a1aa" />
          <circle cx="65" cy="140" r="4" fill="#a1a1aa" />
          <circle cx="95" cy="140" r="4" fill="#a1a1aa" />
        </g>

        {/* Commercial Carpet Pattern & Stationery Register */}
        <g transform="translate(220, 90)">
          {/* Layered Commercial Carpet */}
          <rect x="10" y="70" width="130" height="60" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
          <rect x="25" y="80" width="100" height="40" rx="4" fill="#27272a" stroke="#d97706" strokeWidth="1" />
          
          {/* Stationery Register / Document Dossier */}
          <rect x="30" y="10" width="80" height="55" rx="4" fill="#3f3f46" stroke="#e4e4e7" strokeWidth="1.5" />
          <rect x="30" y="10" width="12" height="55" fill="#ef4444" />
          <line x1="48" y1="22" x2="95" y2="22" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="32" x2="90" y2="32" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="48" y1="42" x2="85" y2="42" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic rotation every 5.5 seconds, paused on hover/focus or reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const activeBanner = HERO_BANNERS[currentSlide];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="JK Enterprises Commercial Categories Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative overflow-hidden bg-slate-950 py-6 sm:py-8 lg:py-10 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full Landscape Banner Card Container */}
        <div
          className={`relative rounded-3xl border bg-gradient-to-br ${activeBanner.themeGradient} ${activeBanner.borderAccent} shadow-2xl p-6 sm:p-8 lg:p-12 overflow-hidden transition-all duration-700`}
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Area (7 Cols on Desktop) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Category & Region Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${activeBanner.badgeStyle}`}
                >
                  <span aria-hidden="true">{activeBanner.badgeIcon}</span>
                  <span>{activeBanner.badgeTag}</span>
                </span>
                <span className="text-xs font-medium text-slate-300 hidden sm:inline-flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Rajasthan Hub • Bikaner Dispatch
                </span>
              </div>

              {/* Master Heading (H1 for first slide, H2 for subsequent to maintain semantic document outline) */}
              {currentSlide === 0 ? (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.12]">
                  {activeBanner.titlePrefix}{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                    {activeBanner.titleHighlight}
                  </span>
                </h1>
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.12]">
                  {activeBanner.titlePrefix}{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                    {activeBanner.titleHighlight}
                  </span>
                </h2>
              )}

              {/* Subtitle / Value Proposition */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                {activeBanner.subtitle}
              </p>

              {/* Feature Chips / Trust Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {activeBanner.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-[11px] font-medium text-slate-200 text-center truncate"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={activeBanner.primaryCtaHref}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${activeBanner.buttonStyle}`}
                >
                  {activeBanner.primaryCtaText} →
                </Link>
                <Link
                  href={activeBanner.secondaryCtaHref}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-xs transition-colors cursor-pointer"
                >
                  {activeBanner.secondaryCtaText}
                </Link>
              </div>
            </div>

            {/* Right Visual Area (5 Cols on Desktop) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-md p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
                {activeBanner.svgGraphic}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Navigation Strip */}
        <div className="mt-4 flex items-center justify-between sm:justify-center sm:gap-6">
          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous landscape banner"
            className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-sm hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Banner slides">
            {HERO_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Go to ${banner.badgeTag}`}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-9 bg-blue-500' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next landscape banner"
            className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-sm hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
