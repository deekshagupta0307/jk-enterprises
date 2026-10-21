'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

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
      setMobileMenuOpen(false);
      setShowSearchDropdown(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

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
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-600 cursor-pointer"
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-xs group-hover:shadow transition-shadow">
                  JK
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                    JK ENTERPRISES
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 tracking-wider uppercase block">
                    Products, Equipment &amp; Supplies
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
                  placeholder="Search products, equipment, supplies, components..."
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
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  aria-label="Search product catalogue"
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
                    <span>Popular Queries</span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      Quick Search
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
                          <span className="text-[10px] text-slate-400 uppercase">Search</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Primary Navigation Actions (Catalogue, Wholesale, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Catalogue Link */}
              <Link
                href="/catalogue"
                className="hidden lg:inline-flex items-center px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold cursor-pointer"
              >
                Catalogue
              </Link>

              {/* B2B / Wholesale Link */}
              <a
                href="#wholesale-section"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <span>Wholesale & B2B</span>
              </a>

              {/* Account Entry Point */}
              <Link
                href="/account"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold cursor-pointer"
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
                onClick={openCart}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-blue-700 transition-colors text-xs font-semibold relative cursor-pointer shadow-xs btn-premium-interactive"
                title="Procurement Cart"
                aria-haspopup="dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-bold bg-blue-500 text-white rounded-full">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, equipment, supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit();
                  }
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                aria-label="Mobile product search"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/catalogue"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50"
              >
                Product Catalogue
              </Link>
              <a
                href="#wholesale-section"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Wholesale &amp; B2B Procurement
              </a>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Customer Account &amp; Orders
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
