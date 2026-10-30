'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEMO_CATEGORIES, DEMO_FEATURED_PRODUCTS } from '@/data/demoCatalogue';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RAJASTHAN_DISTRICTS, BUSINESS_CONFIG } from '@/lib/config/businessConfig';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import {
  validateIndianMobile,
  validateWhatsAppNumber,
  sanitizeNational10DigitInput,
} from '@/lib/validation/phoneValidation';

import { submitQuotationAction } from '@/lib/quotations/quotationActions';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryReference, setInquiryReference] = useState<string | null>(null);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // B2B Quotation Form States
  const [inquiryOrg, setInquiryOrg] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryDistrict, setInquiryDistrict] = useState('Bikaner');
  const [inquiryReqType, setInquiryReqType] = useState('Commercial Equipment & Supplies');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryPhoneError, setInquiryPhoneError] = useState<string | null>(null);
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState('');
  const [inquiryWhatsappError, setInquiryWhatsappError] = useState<string | null>(null);
  const [inquirySameAsPhone, setInquirySameAsPhone] = useState(false);

  // Sync category filter with URL hash when navigated from header category bar
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      const validCategory = DEMO_CATEGORIES.find((c) => c.slug === hash);
      if (validCategory) {
        setSelectedCategory(validCategory.slug);
      } else if (hash === 'all' || hash === 'catalogue-section') {
        setSelectedCategory('all');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Filter products by active category
  const filteredProducts =
    selectedCategory === 'all'
      ? DEMO_FEATURED_PRODUCTS
      : DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === selectedCategory);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryPhoneError(null);
    setInquiryWhatsappError(null);
    setInquiryError(null);

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

    setInquiryLoading(true);

    try {
      const fullNotes = [
        `Contact Phone: +91 ${pVal.digitsOnly || inquiryPhone}`,
        effectiveWhatsapp.trim() ? `WhatsApp: ${effectiveWhatsapp}` : null,
        inquiryNotes.trim() ? `Requirements: ${inquiryNotes.trim()}` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      const res = await submitQuotationAction({
        organizationName: inquiryOrg.trim(),
        contactName: inquiryContact.trim(),
        district: inquiryDistrict,
        requirementType: inquiryReqType,
        notes: fullNotes,
      });

      if (res.success) {
        setInquirySubmitted(true);
        setInquiryReference(res.inquiryNumber);
      } else {
        setInquiryError(res.message || 'Failed to submit quotation inquiry.');
      }
    } catch {
      setInquiryError('An unexpected error occurred while processing your quotation request.');
    } finally {
      setInquiryLoading(false);
    }
  };

  const commercialFaqs = [
    {
      q: 'What types of commercial products and equipment does JK Enterprises supply?',
      a: 'JK Enterprises supplies a comprehensive range of commercial equipment and supplies across Rajasthan. Our catalogue spans office equipment, computer hardware, NVMe storage drives, memory modules, enterprise networking hardware, CCTV surveillance networks, laser printers, toners, and educational computer lab setups.',
    },
    {
      q: 'How do institutional and bulk quotations work for schools and offices?',
      a: 'Institutions, schools, and corporate businesses can submit their requirements via our quotation form or contact our Bikaner desk directly. We prepare formal itemized proforma invoices with institutional trade pricing and verify payment against manual UPI QR or bank transfer credit.',
    },
    {
      q: 'What payment and tax invoice procedures are followed?',
      a: 'We support direct manual UPI QR payments and bank transfers (NEFT / RTGS / IMPS) without third-party payment gateway fees. Official commercial tax invoices with GSTIN compliance are issued for all purchases to facilitate input tax credit (ITC) claims.',
    },
    {
      q: 'What is your delivery coverage across Rajasthan?',
      a: 'Operating from our central hub in Bikaner, we coordinate prompt local commercial delivery within Bikaner and express road transport / courier dispatch across all 41 districts of Rajasthan.',
    },
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* 1. HERO SECTION: Above-the-fold, immediately visible without layout shifts */}
      <HeroCarousel />

      {/* 2. CATEGORIES GRID */}
      <section id="categories" className="py-12 sm:py-16 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={14} duration={500}>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="primary" size="sm">
                    Product Categories
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">8 Commercial Product Lines</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Explore Products by Category
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  From individual hardware components and office supplies to institutional equipment.
                </p>
              </div>
              <Link
                href="/catalogue"
                className="text-xs text-blue-700 hover:text-blue-800 font-semibold inline-flex items-center gap-1 group"
              >
                <span>View Full Catalogue</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Categories 4-Column Grid with ScrollReveal Stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DEMO_CATEGORIES.map((cat, idx) => (
              <ScrollReveal
                key={cat.id}
                delay={idx * 50}
                duration={500}
                distance={16}
                variant="fade"
              >
                <a
                  id={cat.slug}
                  href="#catalogue-section"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="group p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-slate-50/40 hover:bg-white flex flex-col justify-between cursor-pointer card-premium-interactive h-full"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-700 shadow-2xs group-hover:scale-105 group-hover:border-blue-300 group-hover:bg-blue-50/50 transition-all">
                      <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-3.5 group-hover:text-blue-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{cat.itemCountDemo} Items</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Filter</span>
                      <span>→</span>
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOGUE */}
      <section id="catalogue-section" className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={14} duration={500}>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="primary" size="sm">
                    Featured Inventory
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">Ready for Commercial Procurement</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Featured Products &amp; Equipment
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Popular configurations with indicative pricing, subject to confirmation.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none"
              role="tablist"
              aria-label="Product Category Tabs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Products Grid with ScrollReveal Stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product, idx) => (
              <ScrollReveal
                key={product.id}
                delay={(idx % 4) * 60}
                duration={500}
                distance={16}
                variant="fade"
              >
                <ProductCard
                  product={product}
                />
              </ScrollReveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 my-4 shadow-2xs">
              <span className="text-2xl" aria-hidden="true">🔍</span>
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

          {/* Full Catalogue Action Strip */}
          <ScrollReveal direction="up" distance={14} duration={550} delay={100}>
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>55+ Items Available in Full Catalogue</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Looking for custom specifications or bulk quantities?
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Browse our complete catalogue with spec filters, brand sorting, and transparent pricing.
                </p>
              </div>
              <Link
                href="/catalogue"
                className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Open Full Catalogue →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. WHOLESALE & INSTITUTIONAL PROCUREMENT (B2B / SCHOOLS / OFFICES) */}
      <section id="wholesale-section" className="py-12 sm:py-16 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Explanatory Content */}
            <ScrollReveal className="lg:col-span-7 space-y-6" direction="up" distance={16} duration={550}>
              <div className="inline-flex items-center gap-1.5">
                <Badge variant="primary" size="sm">
                  Institutional &amp; Wholesale Supply
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Commercial &amp; Institutional Supply for Schools, Offices &amp; Businesses
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Whether equipping educational computer labs, procuring office hardware &amp; equipment, or organizing bulk commercial distribution, JK Enterprises coordinates itemized quotation, GST documentation, and regional delivery across Rajasthan.
              </p>

              {/* 3 Audience Segments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-2">
                    🏫
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Schools &amp; Labs</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Computer lab setups, educational workstations &amp; monitors.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm mb-2">
                    🏢
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Offices &amp; Enterprises</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Office supplies, NVMe storage &amp; surveillance infrastructure.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-2">
                    🤝
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Commercial Partners</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Trade pricing and proforma invoicing upon verification.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Contact Note */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span>Direct inquiries or immediate quotation guidance:</span>
                <a
                  href={BUSINESS_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp Desk (+91 {BUSINESS_CONFIG.whatsappNumber})</span>
                  <span>→</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right: B2B Quotation Request Form */}
            <ScrollReveal className="lg:col-span-5" direction="up" distance={16} duration={550} delay={100}>
              <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base">
                  Request an Institutional Quotation
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Itemized pricing and proforma turnaround for schools, offices, and commercial partners.
                </p>

                {inquirySubmitted ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in duration-200">
                    <span className="text-3xl" aria-hidden="true">✅</span>
                    <h4 className="font-bold text-emerald-900 text-sm">Quotation Request Registered</h4>
                    {inquiryReference && (
                      <p className="text-xs font-mono font-bold text-emerald-950 bg-emerald-100/70 py-1 px-2.5 rounded-lg inline-block">
                        Reference: {inquiryReference}
                      </p>
                    )}
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Thank you. Our commercial sales desk in Bikaner has received your request and will prepare an itemized quotation.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setInquirySubmitted(false);
                          setInquiryReference(null);
                          setInquiryOrg('');
                          setInquiryContact('');
                          setInquiryPhone('');
                          setInquiryWhatsapp('');
                          setInquiryNotes('');
                        }}
                        className="text-xs text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    {inquiryError && (
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                        <p className="font-semibold">{inquiryError}</p>
                        <p className="text-[11px] text-rose-700">
                          You can also reach our sales desk directly via WhatsApp at{' '}
                          <a
                            href={BUSINESS_CONFIG.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold underline"
                          >
                            +91 {BUSINESS_CONFIG.whatsappNumber}
                          </a>
                        </p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="b2b-org-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Organization / School / Business Name *
                      </label>
                      <input
                        id="b2b-org-name"
                        type="text"
                        required
                        value={inquiryOrg}
                        onChange={(e) => setInquiryOrg(e.target.value)}
                        placeholder="e.g. St. Xavier School / Tech Corp"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label htmlFor="b2b-contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Person &amp; Designation *
                      </label>
                      <input
                        id="b2b-contact-name"
                        type="text"
                        required
                        value={inquiryContact}
                        onChange={(e) => setInquiryContact(e.target.value)}
                        placeholder="e.g. Principal / Procurement Manager"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Phone & WhatsApp Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="b2b-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                          Contact Mobile *
                        </label>
                        <div
                          className={`flex rounded-lg shadow-2xs overflow-hidden border bg-white transition-all ${
                            inquiryPhoneError
                              ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500'
                              : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                          }`}
                        >
                          <span className="inline-flex items-center px-2.5 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
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
                            className="flex-1 w-full px-2.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
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
                            WhatsApp Number
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
                        <div
                          className={`flex rounded-lg shadow-2xs overflow-hidden border bg-white transition-all ${
                            inquirySameAsPhone ? 'bg-slate-50 opacity-80' : ''
                          } ${
                            inquiryWhatsappError
                              ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500'
                              : 'border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent'
                          }`}
                        >
                          <span className="inline-flex items-center px-2.5 bg-slate-100 text-slate-600 text-xs font-medium border-r border-slate-300 select-none">
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
                            className="flex-1 w-full px-2.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500"
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
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        <select
                          id="b2b-req-type"
                          value={inquiryReqType}
                          onChange={(e) => setInquiryReqType(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option>Commercial Equipment &amp; Supplies</option>
                          <option>Computer Lab Workstations &amp; Hardware</option>
                          <option>Office Stationery &amp; Electronics</option>
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
                        value={inquiryNotes}
                        onChange={(e) => setInquiryNotes(e.target.value)}
                        placeholder="Specify items, specifications, estimated unit quantities or requirements..."
                        className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={inquiryLoading}
                      className="w-full text-xs font-bold py-2.5"
                    >
                      {inquiryLoading ? 'Submitting Quotation Request...' : 'Submit Quotation Request →'}
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. TRUST & COMMITMENTS */}
      <section id="trust-section" className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={14} duration={500}>
            <div className="max-w-2xl mx-auto text-center mb-10">
              <Badge variant="primary" size="sm">
                Our Commitments
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
                Why Partner with JK Enterprises?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Regional commercial supply and equipment distribution for Rajasthan.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ScrollReveal delay={0} duration={500} distance={16}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5 card-premium-interactive h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base" aria-hidden="true">
                  ✓
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Broad Product Range
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Commercial-grade equipment and supplies from verified manufacturers, backed by standard brand warranty and clear specification details.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={70} duration={500} distance={16}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5 card-premium-interactive h-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base" aria-hidden="true">
                  📄
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Commercial Tax Invoicing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Itemized proforma estimates and formal tax invoices with full GST compliance provided for registered enterprises, institutions, and businesses.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140} duration={500} distance={16}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5 card-premium-interactive h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-base" aria-hidden="true">
                  💬
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Dedicated Advisory Desk
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Direct WhatsApp desk support and integrated assistant advisory for order procedures, specifications, and prompt quotation coordination.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={14} duration={500}>
            <div className="text-center mb-8">
              <Badge variant="primary" size="sm">
                Guidance &amp; Questions
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Common guidance regarding product lines, order procedures, and institutional procurement.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {commercialFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <ScrollReveal key={index} delay={index * 50} duration={450} distance={12}>
                  <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-colors">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-slate-400 text-base shrink-0">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${index}`}
                        className="px-4 sm:px-4.5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white"
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
