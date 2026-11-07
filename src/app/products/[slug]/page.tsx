import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getAllProductSlugs,
  getCatalogueProducts,
} from '@/lib/catalogue/catalogueService';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ProductAddToCartSection } from '@/components/products/ProductAddToCartSection';
import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';
import { calculateProductDiscount } from '@/lib/pricing/discountService';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolved = await params;
  const product = await getProductBySlug(resolved.slug);

  if (!product) {
    return {
      title: 'Product Not Found | JK Enterprises Rajasthan',
      description: 'The requested product could not be located in our commercial catalogue.',
    };
  }

  const siteUrl = process.env.BETTER_AUTH_URL || 'https://jkenterprises-rajasthan.in';
  const productUrl = `${siteUrl}/products/${product.slug}`;

  return {
    title: `${product.name} | JK Enterprises Rajasthan`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | JK Enterprises Rajasthan`,
      description: product.description,
      url: productUrl,
      type: 'website',
      siteName: BUSINESS_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | JK Enterprises`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolved = await params;
  const product = await getProductBySlug(resolved.slug);

  if (!product) {
    notFound();
  }

  // Fetch related products in the same category for quick discovery
  const relatedResult = await getCatalogueProducts({
    category: product.categorySlug,
    limit: 4,
  });
  const relatedProducts = relatedResult.products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const discountAmount = product.mrpINR > product.demoPriceINR ? product.mrpINR - product.demoPriceINR : 0;
  const discountPercent =
    product.mrpINR > 0 ? Math.round((discountAmount / product.mrpINR) * 100) : 0;

  // Schema.org structured data without fabricated reviews or ratings
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    mpn: product.modelNumber || product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brandName,
    },
    category: product.categoryName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.demoPriceINR,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Store',
        name: BUSINESS_CONFIG.name,
      },
    },
  };

  return (
    <main className="flex-1 bg-slate-50/70 py-8 sm:py-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Catalogue', href: '/catalogue' },
            { label: product.categoryName, href: `/catalogue?category=${product.categorySlug}` },
            { label: product.name, isCurrent: true },
          ]}
          className="mb-6"
        />

        {/* Back to Catalogue Quick Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            <span>←</span>
            <span>Return to Product Catalogue</span>
          </Link>
          <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
        </div>

        {/* Primary Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Product Visual Presentation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200 flex flex-col items-center justify-center p-8 overflow-hidden group">
                {/* Brand watermark badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="primary" size="sm">
                    {product.brandName}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-mono text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {product.sku}
                  </span>
                </div>

                {/* Central SVG Hardware Graphic */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-blue-700 shadow-md group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
                  <CategoryIcon slug={product.categorySlug} className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>

                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {product.brandName} • {product.categoryName}
                </span>

                {/* Status chip */}
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Available on Order</span>
                  </span>
                </div>
              </div>

              {/* Sourcing & Warranty Trust Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <span className="font-bold text-slate-900 block text-xs">Warranty Support</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{product.warrantyInfo}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <span className="font-bold text-slate-900 block text-xs">Tax Invoicing</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Provisional GST / Commercial Invoicing</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details, Pricing, and Cart Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Link
                    href={`/catalogue?category=${product.categorySlug}`}
                    className="text-xs font-bold uppercase tracking-wider text-blue-700 hover:underline"
                  >
                    {product.categoryName}
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    href={`/catalogue?brand=${product.brandSlug}`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    {product.brandName}
                  </Link>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {product.modelNumber && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Model Number: <strong className="text-slate-700">{product.modelNumber}</strong>
                  </p>
                )}
              </div>

              {/* Pricing Box with Centralized 10% Diwali Discount */}
              {(() => {
                const diwali = calculateProductDiscount(product.demoPriceINR, true);
                return (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/90 space-y-2">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950">
                        ₹{diwali.finalPayableINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm sm:text-base text-slate-400 line-through">
                        ₹{product.demoPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full font-bold border border-amber-300">
                        Diwali Sale 10% OFF
                      </span>
                      <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                        Incl. Applicable GST
                      </span>
                    </div>

                    <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                      <span>🎉</span>
                      <span>Diwali Festive Offer saves ₹{diwali.discountAmountINR.toLocaleString('en-IN')} on this order</span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-amber-100">
                      Standard MRP: ₹{product.mrpINR.toLocaleString('en-IN')}. Price inclusive of Goods and Services Tax. Full statutory GST tax invoice generated upon order confirmation.
                    </p>
                  </div>
                );
              })()}

              {/* Add to Cart, Buy Now, and Quantity Controls */}
              <ProductAddToCartSection product={product} />

              {/* Preliminary Delivery Notice */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span aria-hidden="true">🚚</span>
                  <span>Regional Delivery &amp; Dispatch Coordination</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Fast local dispatch from our Bikaner distribution center across all Rajasthan districts. Please contact JK Enterprises at <a href="tel:+919928769266" className="font-bold underline text-blue-700">9928769266</a> to confirm delivery address, item availability, and delivery timing.
                </p>
                <p className="text-[10px] text-slate-400">
                  * Note: Delivery timelines, freight charges, and free-delivery thresholds are preliminary estimates subject to commercial verification prior to dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Technical Specifications &amp; Parameters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified catalogue specifications for {product.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {product.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs"
              >
                <span className="font-medium text-slate-500">{spec.key}</span>
                <span className="font-semibold text-slate-900 text-right">{spec.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Brand</span>
              <span className="font-semibold text-slate-900">{product.brandName}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Category</span>
              <span className="font-semibold text-slate-900">{product.categoryName}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Standard Warranty</span>
              <span className="font-semibold text-slate-900">{product.warrantyInfo}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">SKU / Item Code</span>
              <span className="font-semibold text-slate-900 font-mono">{product.sku}</span>
            </div>
          </div>
        </div>

        {/* Description & Institutional Procurement Guidance */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950">
            Commercial Description &amp; Use Cases
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-1">
            <span className="font-bold block">Institutional &amp; School Lab Suitability:</span>
            <p className="text-blue-900/80 leading-relaxed">
              For computer labs, educational trusts, and business establishments requiring multiple units or complete lab builds, formal proforma documentation and volume allocations can be requested through our Bikaner commercial desk.
            </p>
          </div>
        </div>

        {/* Related Products in the same category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-950">
                Related {product.categoryName}
              </h3>
              <Link
                href={`/catalogue?category=${product.categorySlug}`}
                className="text-xs text-blue-700 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
              >
                <span>View all in {product.categoryName}</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-blue-700">{rel.brandName}</span>
                      <span className="font-mono text-[10px]">{rel.sku}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-black text-slate-950 text-sm">
                      ₹{rel.demoPriceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
