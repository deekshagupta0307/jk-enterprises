'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { CatalogueProductView } from '@/lib/catalogue/catalogueService';
import { generateWhatsAppProductLink } from '@/lib/whatsapp/whatsappService';

interface ProductAddToCartSectionProps {
  product: CatalogueProductView;
}

export const ProductAddToCartSection: React.FC<ProductAddToCartSectionProps> = ({ product }) => {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const maxQty = Math.min(10, Math.max(1, product.availableStock || 5));

  const handleAddToCart = () => {
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
      quantity
    );
    setToastMessage(`Added ${quantity} × "${product.name}" to your cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleBuyNow = () => {
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
      quantity
    );
    router.push('/checkout');
  };

  const whatsAppInfo = generateWhatsAppProductLink({
    productName: product.name,
    sku: product.sku,
    category: product.categoryName,
    priceINR: product.demoPriceINR,
  });

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="p-3 bg-slate-900 text-white rounded-xl text-xs flex items-center justify-between gap-3 shadow-md border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
            <p className="font-medium leading-tight">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={openCart}
            className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline shrink-0 cursor-pointer"
          >
            Open Cart
          </button>
        </div>
      )}

      {/* Quantity Selector & Primary Cart Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between sm:justify-start border border-slate-300 bg-white rounded-xl px-2 py-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium px-2 sm:hidden">Quantity:</span>
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-base font-bold transition-colors cursor-pointer"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-bold text-slate-900 select-none">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= maxQty}
              onClick={() => setQuantity((prev) => Math.min(maxQty, prev + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-base font-bold transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          className="flex-1 text-xs sm:text-sm font-bold py-2.5 shadow-md shadow-blue-500/15"
        >
          Add to Cart +
        </Button>

        {/* Buy Now / Direct Checkout */}
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleBuyNow}
          className="flex-1 text-xs sm:text-sm font-bold py-2.5 border-slate-300 hover:bg-slate-50"
        >
          Buy Now →
        </Button>
      </div>

      {/* WhatsApp & Institutional Inquiries */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 text-xs">
        <a
          href={whatsAppInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-semibold border border-emerald-200 transition-colors"
        >
          <span aria-hidden="true">💬</span>
          <span>Inquire via WhatsApp Desk</span>
        </a>

        <Link
          href="/#wholesale-section"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition-colors"
        >
          <span>Institutional / Bulk Quotation</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};
