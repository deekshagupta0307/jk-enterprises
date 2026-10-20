'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demoCatalogue';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const sampleSearchSuggestions = [
    'Samsung 990 PRO NVMe SSD',
    'Intel Core i7-14700 Processor',
    'Corsair 32GB DDR5 6000MHz RAM',
    '24-Port Gigabit Rackmount Switch',
    'Hikvision 4MP ColorVu PoE Camera',
    'HP LaserJet Network Printer',
  ];

  const filteredSuggestions = searchQuery.trim()
    ? sampleSearchSuggestions.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleSearchSuggestions;

  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCartModalOpen(false);
      setAccountModalOpen(false);
      setMobileMenuOpen(false);
      setShowSearchDropdown(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  useEffect(() => {
    if (cartModalOpen || accountModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartModalOpen, accountModalOpen]);

  const handleSearchSubmit = (queryToUse?: string) => {
    const q = queryToUse !== undefined ? queryToUse : searchQuery;
    setShowSearchDropdown(false);
    if (q.trim()) {
      // Smoothly navigate to catalogue
      const catalogueEl = document.getElementById('catalogue-section');
      if (catalogueEl) {
        catalogueEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-sm group-hover:shadow transition-shadow">
                  JK
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                    JK ENTERPRISES
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 tracking-wider uppercase block">
                    IT Hardware & Solutions
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Search Bar (Desktop/Tablet) */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search computer components, SSDs, RAM, networking, CCTV..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchSubmit();
                    } else if (e.key === 'Escape') {
                      setShowSearchDropdown(false);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  aria-label="Search hardware catalogue"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Clear search query"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>Popular Sample Hardware Queries</span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      Demo Suggestions
                    </span>
                  </div>
                  <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((item, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onMouseDown={() => {
                            setSearchQuery(item);
                            handleSearchSubmit(item);
                          }}
                          className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-slate-400" aria-hidden="true">🔍</span>
                            <span>{item}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase">Search Demo</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Actions (Account, Cart, B2B Quick Link) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* B2B / Wholesale Badge Link */}
              <a
                href="#wholesale-section"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <span aria-hidden="true">🏢</span>
                <span>Wholesale & B2B</span>
              </a>

              {/* Account Entry Point */}
              <Link
                href="/account"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-medium cursor-pointer"
                title="Customer Account & Trade Portal"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:inline">Account</span>
              </Link>

              {/* Cart Entry Point */}
              <button
                type="button"
                onClick={() => setCartModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-blue-700 transition-colors text-xs font-semibold relative cursor-pointer shadow-xs"
                title="Shopping Cart (Demo)"
                aria-haspopup="dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-blue-500 text-white rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search components, SSDs, RAM, CCTV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit();
                  }
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Mobile hardware search"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Navigation Bar (Desktop) */}
        <nav aria-label="Product categories" className="hidden lg:block bg-slate-50 border-t border-slate-200 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none font-medium text-slate-700">
              <li>
                <Link
                  href="/catalogue"
                  className="px-3 py-1.5 rounded-md hover:bg-white hover:text-blue-700 text-slate-900 font-semibold transition-colors"
                >
                  Full Catalogue (50+)
                </Link>
              </li>
              {DEMO_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.slug}`}
                    className="px-3 py-1.5 rounded-md hover:bg-white hover:text-blue-700 transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li className="ml-auto">
                <a
                  href="#trust-section"
                  className="px-3 py-1.5 rounded-md text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 font-medium transition-colors"
                >
                  Why JK Enterprises
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Product Categories
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/catalogue"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50"
                >
                  Browse Full Catalogue (50+ Items)
                </Link>
              </li>
              {DEMO_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#wholesale-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 px-3 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
              >
                🏢 Wholesale & B2B Inquiry Guide
              </a>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer block"
              >
                👤 Customer Account & Trade Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Safe Demo Modal */}
      {cartModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCartModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">🛒</span>
                <h3 id="cart-modal-title" className="text-base font-bold text-slate-900">
                  Shopping Cart (Demo Preview)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCartModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
                aria-label="Close cart preview"
              >
                ✕
              </button>
            </div>
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl border border-amber-200" aria-hidden="true">
                ⚠️
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Demo Mode Safeguard</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cart persistence, stock reservations, and online payments are deliberately disabled in this milestone. Real product allocations, verified commercial pricing, and delivery estimates will be configured from authenticated business data in upcoming development phases.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Upcoming Features:</p>
                <p>• Multi-item quote generation for institutions</p>
                <p>• Direct wholesale procurement for verified dealers</p>
                <p>• Regional Rajasthan road freight & express courier options</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCartModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Continue Exploring Demo Catalogue
            </button>
          </div>
        </div>
      )}

      {/* Account Safe Demo Modal */}
      {accountModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAccountModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">👤</span>
                <h3 id="account-modal-title" className="text-base font-bold text-slate-900">
                  Account & B2B Portal (Preview)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAccountModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
                aria-label="Close account modal"
              >
                ✕
              </button>
            </div>
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl border border-blue-200" aria-hidden="true">
                🏢
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Customer & Wholesale Authentication</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authentication and dealer tier verification will be introduced with database support. In production, customers can log in as Retail Buyers, School/Office Procurement Managers, or Authorized Wholesale Resellers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAccountModalOpen(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
