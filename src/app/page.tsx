'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES, DEMO_FEATURED_PRODUCTS } from '@/data/demoCatalogue';
import { ProductDemo } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductQuickViewModal } from '@/components/products/ProductQuickViewModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDemo | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync category filter with URL hash if user clicked header nav link
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      const validCategory = DEMO_CATEGORIES.find((c) => c.slug === hash);
      if (validCategory) {
        setSelectedCategory(validCategory.slug);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Filter products by selected category tab
  const filteredProducts =
    selectedCategory === 'all'
      ? DEMO_FEATURED_PRODUCTS
      : DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === selectedCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
    }, 6000);
  };

  const faqs = [
    {
      q: 'How do I choose between DDR4 and DDR5 RAM?',
      a: 'DDR4 and DDR5 memory modules have different physical pin layouts and voltages; they are not interchangeable on the same motherboard. DDR4 is economical for standard office workstations, while DDR5 offers higher memory bandwidth for 13th/14th Gen Intel and AMD AM5 platforms. Ask our AI Assistant for specific motherboard compatibility.',
    },
    {
      q: 'What SSD is recommended for heavy office workstations?',
      a: 'For responsive boot times and heavy application multitasking, PCIe Gen4 NVMe M.2 SSDs (such as the Samsung 990 PRO or Crucial P3 Plus) are recommended. They deliver sequential read speeds exceeding 5,000 MB/s compared to older 500 MB/s SATA SSDs.',
    },
    {
      q: 'How will commercial invoicing and institutional orders work?',
      a: 'On commercial launch, JK Enterprises intends to provide tax-compliant business invoicing for eligible hardware purchases. Schools, educational trusts, and businesses will be able to submit their GSTIN to request input tax credit (ITC) documentation and formal proforma quotations upon verification.',
    },
    {
      q: 'What is the delivery coverage across Rajasthan?',
      a: 'Our target distribution network spans Jaipur, Jodhpur, Kota, Udaipur, Bikaner, Ajmer, Alwar, and surrounding districts. Exact shipping charges and courier transit times will be verified with logistics partners on production release.',
    },
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Top Badges */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <span>श्री</span>
                <span>Jai Shree Shyam</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800 border border-blue-200">
                <span>📍</span>
                <span>IT Distribution & Procurement in Rajasthan</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Reliable Hardware & IT Solutions for <span className="text-blue-600">Rajasthan</span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Computer components, high-speed NVMe storage, processors, enterprise networking, and CCTV security equipment. Planned for retail users, schools, corporate offices, and wholesale partners.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Browse Full Catalogue (55+ Products)</span>
                <span>→</span>
              </Link>
              <a
                href="#catalogue-section"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all text-center cursor-pointer"
              >
                Featured Quick View ↓
              </a>
            </div>

            {/* Transparent Demo Indicator */}
            <p className="text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200 rounded-lg py-1 px-3 inline-block">
              ℹ️ Preview Prototype: Displayed hardware items, prices, and specs are demonstration data.
            </p>
          </div>

          {/* Value Highlights Cards */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-2xl" aria-hidden="true">⚡</span>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">Latest Components</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Intel, AMD, DDR5 & Gen4/Gen5 SSDs</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-2xl" aria-hidden="true">🏫</span>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">School & Office Labs</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Turnkey networking, switches & PCs</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-2xl" aria-hidden="true">🏢</span>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">Approved Wholesale</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Trade pricing upon verification</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-2xl" aria-hidden="true">🤖</span>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">AI Hardware Advisor</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Instant specs & compatibility advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section id="categories" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="primary" size="sm">
                  Hardware Categories
                </Badge>
                <span className="text-xs text-slate-400">• Comprehensive IT Range</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Hardware by Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                From individual upgrade components to complete institutional IT infrastructure.
              </p>
            </div>
            <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-medium">
              Demo Inventory Preview
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {DEMO_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                id={cat.slug}
                href="#catalogue-section"
                onClick={() => setSelectedCategory(cat.slug)}
                className="group p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-slate-50/50 hover:bg-white flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                    {cat.slug === 'processors' && '⚡'}
                    {cat.slug === 'storage' && '💾'}
                    {cat.slug === 'memory' && '🧠'}
                    {cat.slug === 'systems' && '🖥️'}
                    {cat.slug === 'networking' && '🌐'}
                    {cat.slug === 'cctv-security' && '📹'}
                    {cat.slug === 'printers' && '🖨️'}
                    {cat.slug === 'peripherals' && '🖱️'}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{cat.itemCountDemo} Sample SKUs</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Filter →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOGUE (DEMO) */}
      <section id="catalogue-section" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="demo" size="sm">
                  Demo Products
                </Badge>
                <span className="text-xs text-slate-500">• Prototype Storefront</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured IT Hardware & Components
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Sample catalogue showcasing specifications, pricing display, and interactive quick views.
              </p>
            </div>
            <div className="text-xs text-slate-600">
              Showing <strong>{filteredProducts.length}</strong> demo products
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none" role="tablist" aria-label="Product Category Tabs">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Products
            </button>
            {DEMO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 my-4">
              <span className="text-3xl" aria-hidden="true">🔍</span>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                No demo products match this category filter.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="mt-3 text-xs text-blue-600 font-semibold underline cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          )}

          {/* Link to Full Catalogue */}
          <div className="mt-10 p-6 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>55+ Hardware SKUs Available in Database</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">Looking for specific sockets, memory speeds or interfaces?</h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Explore our full server-queried catalogue with technical specification filters, brand toggles, and price bounds.
              </p>
            </div>
            <Link
              href="/catalogue"
              className="shrink-0 px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-950 font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Open Full Catalogue (55+ Items) →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHOLESALE & INSTITUTIONAL PROCUREMENT (B2B / SCHOOLS / OFFICES) */}
      <section id="wholesale-section" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Explanatory Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5">
                <Badge variant="primary" size="sm">
                  Institutional & Wholesale Solutions
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Turnkey Hardware Supply for Schools, Offices & Dealers
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you are planning a 50-workstation computer lab in a school, upgrading network infrastructure for an enterprise, or reselling hardware as an approved dealer, JK Enterprises is building a dedicated B2B procurement workflow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🏫</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Schools & Colleges</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Computer lab bulk packages, gigabit cabling & monitors.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🏢</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Offices & Firms</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    LaserJet printers, NVMe storage & PoE security setups.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🤝</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Approved Dealers</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Trade pricing upon business verification.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-semibold text-amber-950">Transparency & Safeguard Notice:</p>
                <p>
                  Wholesale trade discounts, credit policies, and minimum order quantities are established upon direct distributor agreement. They are not hardcoded or fabricated in this preview.
                </p>
              </div>
            </div>

            {/* Right: Mock B2B Inquiry Form (Safe Preview) */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base">
                Request a Formal Quotation (Preview)
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Demonstrates the upcoming institutional quotation workflow.
              </p>

              {inquirySubmitted ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in duration-200">
                  <span className="text-3xl" aria-hidden="true">✅</span>
                  <h4 className="font-bold text-emerald-900 text-sm">Demo Inquiry Acknowledged!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you. In production, this form will connect directly to our Rajasthan commercial sales desk for price estimations and quotation preparation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="b2b-org-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / School / Business Name
                    </label>
                    <input
                      id="b2b-org-name"
                      type="text"
                      required
                      placeholder="e.g. St. Xavier School / Tech Corp"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="b2b-contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Person & Designation
                    </label>
                    <input
                      id="b2b-contact-name"
                      type="text"
                      required
                      placeholder="e.g. Principal / IT Manager"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="b2b-district" className="block text-xs font-semibold text-slate-700 mb-1">
                        District (Rajasthan)
                      </label>
                      <select id="b2b-district" className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <option>Jaipur</option>
                        <option>Jodhpur</option>
                        <option>Kota</option>
                        <option>Udaipur</option>
                        <option>Bikaner</option>
                        <option>Ajmer</option>
                        <option>Alwar</option>
                        <option>Other Rajasthan District</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="b2b-req-type" className="block text-xs font-semibold text-slate-700 mb-1">
                        Requirement Type
                      </label>
                      <select id="b2b-req-type" className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <option>Computer Lab Setup</option>
                        <option>Bulk SSD / RAM Upgrade</option>
                        <option>CCTV Surveillance</option>
                        <option>Networking Switches</option>
                        <option>Dealer Wholesale Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="b2b-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                      Estimated Quantities / Requirements
                    </label>
                    <textarea
                      id="b2b-notes"
                      rows={3}
                      placeholder="Describe items, specifications or expected quantity..."
                      className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full text-xs font-semibold">
                    Submit Demo Inquiry
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center">
                    Simulated action • No data transmitted to external servers
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST & SERVICE VALUES (GENUINE, NON-FABRICATED) */}
      <section id="trust-section" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="primary" size="sm">
              Our Commitments
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Partner with JK Enterprises?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Regional hardware supply for Rajasthan grounded in transparent business practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                ✓
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Branded Hardware Range
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Products catalogued from recognized brands and hardware lines. Sourcing channels and warranty terms will be confirmed upon commercial launch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                📄
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Commercial Invoicing (Planned)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial invoicing designed to support registered businesses and educational institutions with formal tax documentation upon production rollout.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                🤖
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                AI Hardware Advisory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminate compatibility guesswork with our built-in hardware advisor for motherboard, CPU, RAM, and storage matching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HARDWARE FAQ SECTION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="primary" size="sm">
              Guidance & Questions
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently Asked Hardware Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Common technical guidance regarding memory standards, storage upgrades, and B2B orders.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 text-base">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
