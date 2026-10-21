'use client';

import React, { useState } from 'react';
import { ProductDemo } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export interface ProductCardProps {
  product: ProductDemo;
  onQuickView?: (product: ProductDemo) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        slug: product.categorySlug,
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

  // Helper icon for categories
  const getCategoryIcon = (catSlug: string) => {
    switch (catSlug) {
      case 'storage':
        return '💾';
      case 'processors':
        return '⚡';
      case 'memory':
        return '🧠';
      case 'networking':
        return '🌐';
      case 'cctv-security':
        return '📹';
      case 'printers':
        return '🖨️';
      case 'peripherals':
        return '🖥️';
      default:
        return '💻';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 card-premium-interactive flex flex-col justify-between overflow-hidden">
      {/* Toast Notification for demo add-to-cart */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-x-2 top-2 z-20 bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-start gap-1.5">
            <span className="text-amber-400" aria-hidden="true">ℹ️</span>
            <p className="flex-1 font-medium leading-tight">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Top Header & Badges */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2">
        <Badge variant={product.badge ? 'primary' : 'default'} size="sm">
          {product.badge || 'Genuine Part'}
        </Badge>
        <span className="text-[10px] font-mono text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
          {product.brand}
        </span>
      </div>

      {/* Product Image / Hardware Graphic Placeholder */}
      <div className="px-4 py-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/80 to-white relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-105 transition-transform duration-200 shadow-inner">
          {getCategoryIcon(product.categorySlug)}
        </div>
        <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {product.brand} • {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Short Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.shortSpecs.map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] sm:text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Stock Note */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-slate-950">
              ₹{product.demoPriceINR.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{product.mrpINR.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
              Incl. GST
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              In Stock
            </span>
            <span>{product.warrantyDemo}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {onQuickView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickView(product)}
              className="text-xs font-semibold"
            >
              Quick Specs
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className={`text-xs font-semibold ${!onQuickView ? 'col-span-2' : ''}`}
          >
            Add to Cart +
          </Button>
        </div>
      </div>
    </div>
  );
};
