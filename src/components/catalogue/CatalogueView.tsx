'use client';

import React, { useState } from 'react';
import { CatalogueProductView } from '@/lib/catalogue/catalogueService';
import { CatalogueProductCard } from './CatalogueProductCard';
import { ProductQuickViewModal } from '@/components/products/ProductQuickViewModal';
import { ProductDemo } from '@/types';

export interface CatalogueViewProps {
  products: CatalogueProductView[];
  totalCount: number;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDemo | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 space-y-3">
        <span className="text-4xl" aria-hidden="true">🔍</span>
        <h3 className="font-bold text-slate-900 text-base">No Matching Hardware Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          No catalogue items match your current filter selection. Try removing specific criteria or resetting all filters.
        </p>
        <a
          href="/catalogue"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Reset All Filters
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {products.map((p) => (
          <CatalogueProductCard
            key={p.sku}
            product={p}
            onQuickView={(item) => setQuickViewProduct(item)}
          />
        ))}
      </div>

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
