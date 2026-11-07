'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductDemo } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { calculateProductDiscount } from '@/lib/pricing/discountService';

export interface ProductCardProps {
  product: ProductDemo;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { addItem } = useCart();

  const productSlug = product.slug || product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        slug: productSlug,
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
      {/* Toast Notification for add-to-cart */}
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

      {/* Top Header: Badge & Brand */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2">
        <Badge variant={product.badge ? 'primary' : 'default'} size="sm">
          {product.badge || 'Commercial Spec'}
        </Badge>
        <span className="text-[10px] font-mono text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
          {product.brand}
        </span>
      </div>

      {/* Product Visual Area — Navigates to Product Detail Page */}
      <Link
        href={`/products/${productSlug}`}
        className="px-4 py-5 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/70 to-white relative focus:outline-hidden focus:ring-2 focus:ring-blue-600 rounded-xl m-1"
        aria-label={`View details for ${product.name}`}
      >
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-blue-700 shadow-2xs group-hover:scale-105 group-hover:border-blue-300 group-hover:bg-blue-50/40 transition-all duration-200">
          <CategoryIcon slug={product.categorySlug} className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>
        <span className="mt-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {product.brand} • {product.category}
        </span>
      </Link>

      {/* Product Information Body */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${productSlug}`}
            className="focus:outline-hidden focus:ring-2 focus:ring-blue-600 rounded"
          >
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Short Specs Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.shortSpecs.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] sm:text-[11px] text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing, Tax Status & Warranty */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          {(() => {
            const discount = calculateProductDiscount(product.demoPriceINR, true);
            return (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-slate-950">
                    ₹{discount.finalPayableINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.demoPriceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                    Diwali 10% OFF
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
                  <span>MRP ₹{product.mrpINR.toLocaleString('en-IN')} • Incl. GST</span>
                  <span className="text-emerald-700 font-semibold text-[10px]">Save ₹{discount.discountAmountINR.toLocaleString('en-IN')}</span>
                </div>
              </>
            );
          })()}

          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Available on Order
            </span>
            <span className="text-slate-400">{product.warrantyDemo}</span>
          </div>
        </div>

        {/* Actions — Independent Buttons without invalid nested interactive tags */}
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${productSlug}`}
            className="btn-premium-interactive inline-flex items-center justify-center font-semibold text-xs py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          >
            View Details →
          </Link>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="text-xs font-semibold py-1.5"
          >
            Add to Cart +
          </Button>
        </div>
      </div>
    </div>
  );
};
