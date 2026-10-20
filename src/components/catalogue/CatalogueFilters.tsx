'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DemoSeedCategory, DemoSeedBrand } from '../../../prisma/seedData';

export interface CatalogueFiltersProps {
  categories: DemoSeedCategory[];
  brands: DemoSeedBrand[];
  filterableSpecs: Record<string, string[]>;
  activeCategory?: string;
  activeBrand?: string;
  activeMinPrice?: number;
  activeMaxPrice?: number;
  activeSpecKey?: string;
  activeSpecValue?: string;
}

export const CatalogueFilters: React.FC<CatalogueFiltersProps> = ({
  categories,
  brands,
  filterableSpecs,
  activeCategory,
  activeBrand,
  activeMinPrice,
  activeMaxPrice,
  activeSpecKey,
  activeSpecValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPriceInput, setMinPriceInput] = useState<string>(
    activeMinPrice ? String(activeMinPrice) : ''
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    activeMaxPrice ? String(activeMaxPrice) : ''
  );
  const [selectedSpecKey, setSelectedSpecKey] = useState<string>(activeSpecKey || '');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/catalogue?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPriceInput) params.set('minPrice', minPriceInput);
    else params.delete('minPrice');

    if (maxPriceInput) params.set('maxPrice', maxPriceInput);
    else params.delete('maxPrice');

    params.set('page', '1');
    router.push(`/catalogue?${params.toString()}`);
  };

  const handleSpecSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set('specKey', key);
      params.set('specValue', value);
    } else {
      params.delete('specKey');
      params.delete('specValue');
    }
    params.set('page', '1');
    router.push(`/catalogue?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/catalogue');
  };

  const activeFiltersCount = [
    activeCategory && activeCategory !== 'all',
    activeBrand && activeBrand !== 'all',
    activeMinPrice !== undefined,
    activeMaxPrice !== undefined,
    activeSpecKey && activeSpecValue,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filters Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 shadow-xs cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span>
            <span>Filters & Hardware Categories</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white rounded-full px-2 py-0.2 text-[10px]">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <span>{mobileFilterOpen ? '▲ Close' : '▼ Open'}</span>
        </button>
      </div>

      {/* Main Filter Sidebar */}
      <aside
        className={`${
          mobileFilterOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 space-y-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>Filter Catalogue</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[10px]">
                {activeFiltersCount} active
              </span>
            )}
          </h3>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-700 font-semibold underline cursor-pointer"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Categories Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Category
          </label>
          <select
            value={activeCategory || 'all'}
            onChange={(e) => updateParam('category', e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brands Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Brand
          </label>
          <select
            value={activeBrand || 'all'}
            onChange={(e) => updateParam('brand', e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Price Range (Demo ₹)
          </label>
          <form onSubmit={handlePriceApply} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Apply Price
            </button>
          </form>
        </div>

        {/* Technical Specification Facet Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Hardware Specifications
          </label>
          <div className="space-y-2">
            <select
              value={selectedSpecKey || activeSpecKey || ''}
              onChange={(e) => {
                setSelectedSpecKey(e.target.value);
                if (!e.target.value) {
                  updateParam('specKey', null);
                  updateParam('specValue', null);
                }
              }}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Choose Attribute...</option>
              {Object.keys(filterableSpecs).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            {(selectedSpecKey || activeSpecKey) && (
              <select
                value={activeSpecValue || 'all'}
                onChange={(e) =>
                  handleSpecSelect(selectedSpecKey || activeSpecKey || '', e.target.value)
                }
                className="w-full text-xs px-3 py-2 rounded-lg border border-blue-300 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Any {(selectedSpecKey || activeSpecKey)}</option>
                {(filterableSpecs[selectedSpecKey || activeSpecKey || ''] || []).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Demo Status Notice in Sidebar */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <strong>Safe Preview:</strong> All catalogue data is for development and layout verification.
        </div>
      </aside>
    </>
  );
};
