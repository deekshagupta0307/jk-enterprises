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
  title: 'Hardware & IT Catalogue | JK Enterprises Rajasthan',
  description:
    'Browse our comprehensive range of computer processors, NVMe SSDs, DDR4/DDR5 RAM, networking hardware, CCTV cameras, and IT equipment. Serving Rajasthan institutions, businesses, and wholesale dealers.',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Product Catalogue', isCurrent: true }]} className="mb-6" />

        {/* Page Header & Database Connection Notice */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Hardware & IT Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore 50+ computer components, high-speed storage, enterprise networking, and security solutions.
            </p>
          </div>

          {/* Database Connection Status Badge */}
          <div className="self-start md:self-auto">
            {result.isDatabaseConnected ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>PostgreSQL Connected</span>
              </div>
            ) : result.databaseError ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <div>
                  <span className="font-semibold">Database Error (Demo Active):</span>
                  <span className="text-[11px] text-rose-800 ml-1">
                    Query failed. Serving 55 seed products.
                  </span>
                </div>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <div>
                  <span className="font-semibold">Demo Sandbox:</span>
                  <span className="text-[11px] text-amber-800 ml-1">
                    PostgreSQL Offline (55 Seed Products Active)
                  </span>
                </div>
              </div>
            )}
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
