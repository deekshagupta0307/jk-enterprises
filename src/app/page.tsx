'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES, DEMO_FEATURED_PRODUCTS } from '@/data/demoCatalogue';
import { ProductDemo } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductQuickViewModal } from '@/components/products/ProductQuickViewModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RAJASTHAN_DISTRICTS, BUSINESS_CONFIG } from '@/lib/config/businessConfig';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import {
  validateIndianMobile,
  validateWhatsAppNumber,
  sanitizeNational10DigitInput,
} from '@/lib/validation/phoneValidation';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDemo | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quotation form states
  const [inquiryDistrict, setInquiryDistrict] = useState('Bikaner');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryPhoneError, setInquiryPhoneError] = useState<string | null>(null);
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState('');
  const [inquiryWhatsappError, setInquiryWhatsappError] = useState<string | null>(null);
  const [inquirySameAsPhone, setInquirySameAsPhone] = useState(false);

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
    setInquiryPhoneError(null);
    setInquiryWhatsappError(null);

    const pVal = validateIndianMobile(inquiryPhone, false);
    if (!pVal.isValid) {
      setInquiryPhoneError(pVal.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const effectiveWhatsapp = inquirySameAsPhone ? inquiryPhone : inquiryWhatsapp;
    if (effectiveWhatsapp.trim()) {
      const wVal = validateWhatsAppNumber(effectiveWhatsapp, true);
      if (!wVal.isValid) {
        setInquiryWhatsappError(wVal.error || 'Please enter a valid WhatsApp number.');
        return;
      }
    }

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
    }, 6000);
  };

  const faqs = [
    {
      q: 'How do I choose between DDR4 and DDR5 RAM?',
      a: 'DDR4 and DDR5 memory modules have different physical pin layouts and voltages; they are not interchangeable on the same motherboard. DDR4 is economical for standard office workstations, while DDR5 offers higher memory bandwidth for 13th/14th Gen Intel and AMD AM5 platforms. Ask JK Assistant for specific compatibility.',
    },
    {
      q: 'What SSD is recommended for heavy office workstations?',
      a: 'For responsive boot times and heavy application multitasking, PCIe Gen4 NVMe M.2 SSDs (such as the Samsung 990 PRO or Crucial P3 Plus) are recommended. They deliver sequential read speeds exceeding 5,000 MB/s compared to older 500 MB/s SATA SSDs.',
    },
    {
      q: 'How will commercial invoicing and institutional orders work?',
      a: 'JK Enterprises provides formal commercial proforma documentation and tax invoices verified against actual manual UPI / Bank Transfer credit. Schools, educational trusts, and businesses can submit their GSTIN to request input tax credit (ITC) documentation upon administrative verification.',
    },
    {
      q: 'What is the delivery coverage across Rajasthan?',
      a: 'Our central trading hub in Bikaner coordinates regional distribution across all 41 current districts of Rajasthan, with flat local delivery rates for Bikaner and express courier/transport dispatch statewide.',
    },
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* 1. HERO SECTION: Self-advancing carousel covering broad JK Enterprises trading scope */}
      <HeroCarousel />

      {/* 2. CATEGORIES GRID */}
      <section id="categories" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="primary" size="sm">
                  Product Categories
                </Badge>
                <span className="text-xs text-slate-400">• Comprehensive Sourcing Range</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Products by Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                From individual equipment and components to complete institutional supplies.
              </p>
            </div>
            <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
              8 Core Categories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {DEMO_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                id={cat.slug}
                href="#catalogue-section"
                onClick={() => setSelectedCategory(cat.slug)}
                className="group p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-slate-50/50 hover:bg-white flex flex-col justify-between cursor-pointer card-premium-interactive"
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
                  <span className="text-slate-400 font-medium">{cat.itemCountDemo} Products</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Filter →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOGUE */}
      <section id="catalogue-section" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="primary" size="sm">
                  Featured Products
                </Badge>
                <span className="text-xs text-slate-500">• Ready for Procurement</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Products &amp; Equipment
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore popular specifications, competitive pricing, and immediate dispatch options.
              </p>
            </div>
            <div className="text-xs text-slate-600">
              Showing <strong>{filteredProducts.length}</strong> products
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
                No products match this category filter.
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
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>55+ Products &amp; Supplies Available in Catalogue</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">Looking for specific products, configurations or bulk supplies?</h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Explore our full catalogue with category filters, specification details, and clear price indications.
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
                Commercial &amp; Institutional Supply for Schools, Offices &amp; Businesses
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you are planning educational lab setups, equipping an office with IT hardware &amp; commercial supplies, or procuring merchandise in bulk, JK Enterprises coordinates wholesale quotes and regional delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🏫</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Schools &amp; Institutions</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Computer lab packages, educational supplies &amp; monitors.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🏢</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Offices &amp; Enterprises</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Office equipment, NVMe storage &amp; security setups.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xl" aria-hidden="true">🤝</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">Commercial Partners</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Trade pricing upon business verification.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Commercial Assistance Notice:</p>
                <p>
                  Trade discounts, credit policies, and volume pricing are tailored per institutional requirements upon review by our commercial sales desk in {BUSINESS_CONFIG.city}. Direct desk support: <a href={BUSINESS_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">WhatsApp (+91 {BUSINESS_CONFIG.whatsappNumber})</a>.
                </p>
              </div>
            </div>

            {/* Right: B2B Quotation Request Form */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base">
                Request an Institutional Quotation
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Fast commercial quote turnaround for schools, laboratories, offices, and wholesale partners.
              </p>

              {inquirySubmitted ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in duration-200">
                  <span className="text-3xl" aria-hidden="true">✅</span>
                  <h4 className="font-bold text-emerald-900 text-sm">Quotation Request Logged!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you. Our commercial sales desk in Bikaner has received your request and will prepare an itemized quote with institutional pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="b2b-org-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / School / Business Name *
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
                      Contact Person & Designation *
                    </label>
                    <input
                      id="b2b-contact-name"
                      type="text"
                      required
                      placeholder="e.g. Principal / IT Manager"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Phone & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="b2b-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Mobile Number *
                      </label>
                      <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                        inquiryPhoneError ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                      }`}>
                        <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                          +91
                        </span>
                        <input
                          id="b2b-phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="9876543210"
                          value={inquiryPhone}
                          onChange={(e) => {
                            const cleaned = sanitizeNational10DigitInput(e.target.value);
                            setInquiryPhone(cleaned);
                            if (inquirySameAsPhone) {
                              setInquiryWhatsapp(cleaned);
                            }
                            if (inquiryPhoneError) {
                              const check = validateIndianMobile(cleaned, false);
                              if (check.isValid) setInquiryPhoneError(null);
                            }
                          }}
                          onBlur={() => {
                            if (inquiryPhone.trim()) {
                              const check = validateIndianMobile(inquiryPhone, false);
                              if (!check.isValid) {
                                setInquiryPhoneError(check.error || 'Please enter a valid 10-digit Indian mobile number.');
                              } else {
                                setInquiryPhoneError(null);
                              }
                            }
                          }}
                          className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                          aria-label="10-digit Contact Mobile Number"
                        />
                      </div>
                      {inquiryPhoneError && (
                        <p className="text-[10px] text-rose-600 mt-1">{inquiryPhoneError}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="b2b-whatsapp" className="block text-xs font-semibold text-slate-700">
                          WhatsApp Mobile Number
                        </label>
                        {inquiryPhone.length === 10 && (
                          <label className="flex items-center gap-1 text-[10px] text-blue-700 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={inquirySameAsPhone}
                              onChange={(e) => {
                                setInquirySameAsPhone(e.target.checked);
                                if (e.target.checked) {
                                  setInquiryWhatsapp(inquiryPhone);
                                  setInquiryWhatsappError(null);
                                }
                              }}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Same as mobile</span>
                          </label>
                        )}
                      </div>
                      <div className={`flex rounded-xl shadow-xs overflow-hidden border bg-white transition-all ${
                        inquirySameAsPhone ? 'bg-slate-50 opacity-80' : ''
                      } ${
                        inquiryWhatsappError ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500' : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                      }`}>
                        <span className="inline-flex items-center px-3 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
                          +91
                        </span>
                        <input
                          id="b2b-whatsapp"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="WhatsApp number"
                          value={inquirySameAsPhone ? inquiryPhone : inquiryWhatsapp}
                          disabled={inquirySameAsPhone}
                          onChange={(e) => {
                            const cleaned = sanitizeNational10DigitInput(e.target.value);
                            setInquiryWhatsapp(cleaned);
                            if (inquirySameAsPhone && cleaned !== inquiryPhone) {
                              setInquirySameAsPhone(false);
                            }
                            if (inquiryWhatsappError) {
                              const check = validateWhatsAppNumber(cleaned, true);
                              if (check.isValid) setInquiryWhatsappError(null);
                            }
                          }}
                          onBlur={() => {
                            const effective = inquirySameAsPhone ? inquiryPhone : inquiryWhatsapp;
                            if (effective.trim()) {
                              const check = validateWhatsAppNumber(effective, true);
                              if (!check.isValid) {
                                setInquiryWhatsappError(check.error || 'Please enter a valid WhatsApp number.');
                              } else {
                                setInquiryWhatsappError(null);
                              }
                            }
                          }}
                          className="flex-1 w-full px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500"
                          aria-label="WhatsApp Number (10 digits)"
                        />
                      </div>
                      {inquiryWhatsappError && (
                        <p className="text-[10px] text-rose-600 mt-1">{inquiryWhatsappError}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="b2b-district" className="block text-xs font-semibold text-slate-700 mb-1">
                        District (Rajasthan) *
                      </label>
                      <select
                        id="b2b-district"
                        value={inquiryDistrict}
                        onChange={(e) => setInquiryDistrict(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {RAJASTHAN_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="b2b-req-type" className="block text-xs font-semibold text-slate-700 mb-1">
                        Requirement Type
                      </label>
                      <select id="b2b-req-type" className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <option>Commercial Equipment &amp; Supplies</option>
                        <option>Computer Lab Workstations &amp; IT</option>
                        <option>Office Stationery &amp; Furnishings</option>
                        <option>CCTV Surveillance Network</option>
                        <option>Bulk Wholesale Distribution</option>
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
                      placeholder="Specify items, specifications, estimated unit quantities or requirements..."
                      className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full text-xs font-bold">
                    Submit Quotation Request →
                  </Button>
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
              Regional commercial supply and equipment distribution for Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 card-premium-interactive">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                ✓
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Broad Product Range
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Products catalogued from recognized brands and equipment lines. Sourcing channels and warranty terms will be confirmed upon commercial launch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 card-premium-interactive">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                📄
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Commercial Invoicing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial proforma estimates and official tax invoices provided for registered enterprises, educational institutions, and businesses upon manual payment verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 card-premium-interactive">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold" aria-hidden="true">
                🤖
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                JK Assistant Advisory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fast product advisory, order procedure guidance, and quotation assistance with our built-in assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="primary" size="sm">
              Guidance &amp; Questions
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Common guidance regarding product lines, order placement, and institutional procurement.
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
