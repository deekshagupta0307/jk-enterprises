'use client';

import React, { useEffect, useCallback } from 'react';
import { ProductDemo } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export interface ProductQuickViewModalProps {
  product: ProductDemo | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, handleKeyDown]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary" size="sm">
                Specifications
              </Badge>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {product.brand}
              </span>
            </div>
            <h3 id="quickview-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Specs Table */}
        <div className="py-4 space-y-4">
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-xs text-blue-900 leading-relaxed flex items-center gap-2.5">
            <span className="text-base" aria-hidden="true">🛡️</span>
            <span>All hardware units are brand new, genuine components backed by official manufacturer warranty across authorized service centers.</span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Hardware Highlights
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.shortSpecs.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-md font-medium"
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

          {product.fullSpecs && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Detailed Technical Specifications
              </h4>
              <dl className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {Object.entries(product.fullSpecs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 px-3 py-2 bg-white even:bg-slate-50/70">
                    <dt className="font-semibold text-slate-700">{key}</dt>
                    <dd className="col-span-2 text-slate-600">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="pt-2 flex items-baseline justify-between">
            <div>
              <span className="text-xl font-extrabold text-slate-950">
                ₹{product.demoPriceINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through ml-2">
                ₹{product.mrpINR.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {product.warrantyDemo}
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-100 flex gap-2">
          <Button variant="outline" size="md" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                brand: product.brand,
                category: product.category,
                slug: product.categorySlug,
                priceINR: product.demoPriceINR,
                mrpINR: product.mrpINR,
              }, 1);
              onClose();
            }}
          >
            Add to Cart +
          </Button>
        </div>
      </div>
    </div>
  );
};
