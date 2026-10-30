'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CatalogueProductView } from '@/lib/catalogue/catalogueService';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ProductDemo } from '@/types';

export interface CatalogueProductCardProps {
  product: CatalogueProductView;
  onQuickView?: (product: ProductDemo) => void;
}

export const CatalogueProductCard: React.FC<CatalogueProductCardProps> = ({ product }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: product.id,
        name: product.name,
        brand: product.brandName,
        category: product.categoryName,
        slug: product.slug,
        priceINR: product.demoPriceINR,
        mrpINR: product.mrpINR,
      },
      1
    );
    setToastMessage(`Added "${product.name}" to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 card-premium-interactive flex flex-col justify-between overflow-hidden shadow-2xs hover:border-blue-300">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-x-2 top-2 z-20 bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-start gap-1.5">
            <span className="text-emerald-400" aria-hidden="true">✓</span>
            <p className="flex-1 font-medium leading-tight">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Top Badges */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2">
        <Badge variant="default" size="sm">
          {product.brandName}
        </Badge>
        <span className="text-[10px] font-mono text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
          {product.sku}
        </span>
      </div>

      {/* Product Visual Area — Navigates to Dedicated Product Page */}
      <Link
        href={`/products/${product.slug}`}
        className="px-4 py-5 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/80 to-white relative focus:outline-hidden focus:ring-2 focus:ring-blue-600 rounded-xl m-1"
        aria-label={`View details for ${product.name}`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-blue-700 shadow-2xs group-hover:scale-105 group-hover:border-blue-300 group-hover:bg-blue-50/40 transition-all duration-200">
          <CategoryIcon slug={product.categorySlug} className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>
        <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {product.brandName} • {product.categoryName}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="focus:outline-hidden focus:ring-2 focus:ring-blue-600 rounded"
          >
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Specifications Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.specifications.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium"
              >
                {spec.key}: {spec.value}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-slate-950">
              ₹{product.demoPriceINR.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 line-through">
              ₹{product.mrpINR.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
              Incl. GST
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Available on Order
            </span>
            <span className="truncate max-w-[120px] text-slate-400">{product.warrantyInfo}</span>
          </div>
        </div>

        {/* Actions — Independent Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <Link
            href={`/products/${product.slug}`}
            className="btn-premium-interactive inline-flex items-center justify-center font-semibold text-[11px] py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          >
            View Details →
          </Link>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="text-[11px] py-1.5 font-semibold"
          >
            Add to Cart +
          </Button>
        </div>
      </div>
    </div>
  );
};
