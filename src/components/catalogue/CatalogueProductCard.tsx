'use client';

import React, { useState } from 'react';
import { CatalogueProductView } from '@/lib/catalogue/catalogueService';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductDemo } from '@/types';

export interface CatalogueProductCardProps {
  product: CatalogueProductView;
  onQuickView: (product: ProductDemo) => void;
}

export const CatalogueProductCard: React.FC<CatalogueProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDemoAction = () => {
    setToastMessage(`Demo Notice: Added "${product.name.slice(0, 24)}..." to demo quotation.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Adapt to ProductDemo interface for QuickView modal
  const demoProductAdapter: ProductDemo = {
    id: product.id,
    name: product.name,
    brand: product.brandName,
    category: product.categoryName,
    categorySlug: product.categorySlug,
    demoPriceINR: product.demoPriceINR,
    mrpINR: product.mrpINR,
    shortSpecs: product.specifications.slice(0, 4).map((s) => `${s.key}: ${s.value}`),
    fullSpecs: Object.fromEntries(product.specifications.map((s) => [s.key, s.value])),
    isDemo: true,
    badge: product.availableStock > 0 ? 'Sample Allocation' : undefined,
    inStockDemo: product.availableStock > 0,
    warrantyDemo: product.warrantyInfo,
  };

  const getCategoryIcon = (catSlug: string) => {
    switch (catSlug) {
      case 'processors':
        return '⚡';
      case 'ssds':
        return '💾';
      case 'memory':
        return '🧠';
      case 'hdds':
        return '💽';
      case 'networking':
        return '🌐';
      case 'cctv-security':
        return '📹';
      case 'monitors':
        return '🖥️';
      case 'printers':
        return '🖨️';
      case 'ups-power':
        return '🔋';
      default:
        return '💻';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Toast Alert */}
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

      {/* Top Badges */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2">
        <Badge variant="demo" size="sm">
          Demo SKU
        </Badge>
        <span className="text-[10px] font-mono text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
          {product.sku}
        </span>
      </div>

      {/* Image Graphic / Icon Placeholder */}
      <div
        onClick={() => onQuickView(demoProductAdapter)}
        className="px-4 py-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/80 to-white relative cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onQuickView(demoProductAdapter);
          }
        }}
        aria-label={`View specifications for ${product.name}`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-105 transition-transform duration-200 shadow-inner">
          <span aria-hidden="true">{getCategoryIcon(product.categorySlug)}</span>
        </div>
        <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {product.brandName} • {product.categoryName}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onQuickView(demoProductAdapter)}
            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Specifications Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.specifications.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
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
            <span className="text-[9px] text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200 font-semibold">
              Demo
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>
              Sample Qty: <strong className="text-slate-700">{product.availableStock}</strong> (Demo)
            </span>
            <span className="truncate max-w-[120px]">{product.warrantyInfo}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickView(demoProductAdapter)}
            className="text-[11px] py-1.5 font-semibold"
          >
            Quick Specs
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDemoAction}
            className="text-[11px] py-1.5 font-semibold"
          >
            Demo Quote +
          </Button>
        </div>
      </div>
    </div>
  );
};
