import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getCatalogueProducts, CatalogueFilterParams } from '@/lib/catalogue/catalogueService';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CatalogueFilters } from '@/components/catalogue/CatalogueFilters';
import { CatalogueControls } from '@/components/catalogue/CatalogueControls';
import { CatalogueView } from '@/components/catalogue/CatalogueView';
import { CataloguePagination } from '@/components/catalogue/CataloguePagination';
import CatalogueLoading from './loading';

export const metadata: Metadata = {
  title: 'Product & Equipment Catalogue | JK Enterprises Rajasthan',
  description:
    'Browse our comprehensive range of commercial products, computer hardware, NVMe storage, networking equipment, and security systems across Rajasthan.',
  alternates: {
    canonical: '/catalogue',
  },
  openGraph: {
    title: 'Product & Equipment Catalogue | JK Enterprises Rajasthan',
    description:
      'Browse commercial products, computer hardware, storage, and security solutions for Rajasthan retail, institutional, and wholesale clients.',
    url: '/catalogue',
    type: 'website',
  },
};

interface CataloguePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CatalogueContent({ searchParams }: CataloguePageProps) {
  const resolvedParams = await searchParams;

  const getString = (val: string | string[] | undefined): string | undefined => {
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const category = getString(resolvedParams.category);
  const brand = getString(resolvedParams.brand);
  const minPriceStr = getString(resolvedParams.minPrice);
  const maxPriceStr = getString(resolvedParams.maxPrice);
  const specKey = getString(resolvedParams.specKey);
  const specValue = getString(resolvedParams.specValue);
  const q = getString(resolvedParams.q);
  const sort = getString(resolvedParams.sort) as CatalogueFilterParams['sort'];
  const pageStr = getString(resolvedParams.page);
  const limitStr = getString(resolvedParams.limit);

  const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;
  const parsedPage = pageStr ? parseInt(pageStr, 10) : 1;
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const limit = limitStr === '24' ? 24 : 12;

  const result = await getCatalogueProducts({
    category,
    brand,
    minPrice: isNaN(minPrice as number) ? undefined : minPrice,
    maxPrice: isNaN(maxPrice as number) ? undefined : maxPrice,
    specKey,
    specValue,
    q,
    sort,
    page,
    limit,
  });

  return (
    <main className="flex-1 bg-slate-50 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: result.products.map((p, idx) => ({
              '@type': 'ListItem',
              position: (page - 1) * limit + idx + 1,
              name: p.name,
              description: p.description,
            })),
          }),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Product Catalogue', isCurrent: true }]} className="mb-6" />

        {/* Page Header & Database Connection Notice */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Product &amp; Equipment Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore commercial goods, computer components, high-speed storage, enterprise networking, and equipment.
            </p>
          </div>

          {/* Catalogue Overview Badge */}
          <div className="self-start md:self-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Available Inventory ({result.totalCount} Products)</span>
            </div>
          </div>
        </div>

        {/* Catalogue Body Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Filters Sidebar */}
          <CatalogueFilters
            categories={result.categories}
            brands={result.brands}
            filterableSpecs={result.filterableSpecs}
            activeCategory={category}
            activeBrand={brand}
            activeMinPrice={minPrice}
            activeMaxPrice={maxPrice}
            activeSpecKey={specKey}
            activeSpecValue={specValue}
          />

          {/* Main Product Column */}
          <div className="flex-1 w-full">
            {/* Search, Sort & Active Filter Tags */}
            <CatalogueControls
              totalCount={result.totalCount}
              currentSort={sort}
              currentLimit={limit}
              currentQuery={q}
              activeCategory={category}
              activeBrand={brand}
              activeMinPrice={minPrice}
              activeMaxPrice={maxPrice}
              activeSpecKey={specKey}
              activeSpecValue={specValue}
            />

            {/* Product Cards Grid */}
            <CatalogueView products={result.products} totalCount={result.totalCount} />

            {/* Pagination Links */}
            <CataloguePagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              searchParams={resolvedParams}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CataloguePage(props: CataloguePageProps) {
  return (
    <Suspense fallback={<CatalogueLoading />}>
      <CatalogueContent {...props} />
    </Suspense>
  );
}
