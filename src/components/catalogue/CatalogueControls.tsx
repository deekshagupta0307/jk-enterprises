'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export interface CatalogueControlsProps {
  totalCount: number;
  currentSort?: string;
  currentLimit: number;
  currentQuery?: string;
  activeCategory?: string;
  activeBrand?: string;
  activeMinPrice?: number;
  activeMaxPrice?: number;
  activeSpecKey?: string;
  activeSpecValue?: string;
}

export const CatalogueControls: React.FC<CatalogueControlsProps> = ({
  totalCount,
  currentSort = 'newest',
  currentLimit = 12,
  currentQuery = '',
  activeCategory,
  activeBrand,
  activeMinPrice,
  activeMaxPrice,
  activeSpecKey,
  activeSpecValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentQuery);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/catalogue?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', searchInput.trim() || null);
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    if (key === 'spec') {
      params.delete('specKey');
      params.delete('specValue');
    }
    if (key === 'price') {
      params.delete('minPrice');
      params.delete('maxPrice');
    }
    params.set('page', '1');
    router.push(`/catalogue?${params.toString()}`);
  };

  const hasActiveFilters = Boolean(
    activeCategory ||
      activeBrand ||
      activeMinPrice !== undefined ||
      activeMaxPrice !== undefined ||
      (activeSpecKey && activeSpecValue) ||
      currentQuery
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Top Search & Sort Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search within hardware catalogue..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-16 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span aria-hidden="true">🔍</span>
          </div>
          <button
            type="submit"
            className="absolute inset-y-1 right-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Find
          </button>
        </form>

        {/* Sort & Limit Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 text-xs">
            <label htmlFor="catalogue-sort" className="text-slate-500 font-medium">
              Sort:
            </label>
            <select
              id="catalogue-sort"
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="newest">Featured (Newest)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <label htmlFor="catalogue-limit" className="text-slate-500 font-medium">
              Show:
            </label>
            <select
              id="catalogue-limit"
              value={String(currentLimit)}
              onChange={(e) => updateParam('limit', e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="12">12 / page</option>
              <option value="24">24 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips / Pills */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">Applied Filters:</span>

          {currentQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Query: &quot;{currentQuery}&quot;
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  removeFilter('q');
                }}
                className="hover:text-blue-950 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {activeCategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Category: {activeCategory}
              <button
                type="button"
                onClick={() => removeFilter('category')}
                className="hover:text-slate-950 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {activeBrand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Brand: {activeBrand}
              <button
                type="button"
                onClick={() => removeFilter('brand')}
                className="hover:text-slate-950 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {(activeMinPrice !== undefined || activeMaxPrice !== undefined) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Price: ₹{activeMinPrice || 0} - ₹{activeMaxPrice || 'Max'}
              <button
                type="button"
                onClick={() => removeFilter('price')}
                className="hover:text-slate-950 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          {activeSpecKey && activeSpecValue && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {activeSpecKey}: {activeSpecValue}
              <button
                type="button"
                onClick={() => removeFilter('spec')}
                className="hover:text-slate-950 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}

          <span className="ml-auto text-slate-400 text-xs">
            {totalCount} product{totalCount === 1 ? '' : 's'} found
          </span>
        </div>
      )}
    </div>
  );
};
