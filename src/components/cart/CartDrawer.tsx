'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, totalItems, subtotalINR, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, handleKeyDown]);

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🛒</span>
              <div>
                <h2 id="cart-drawer-title" className="text-base font-bold text-slate-900">
                  Procurement Cart
                </h2>
                <p className="text-[11px] text-slate-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-lg transition-colors cursor-pointer text-sm font-bold"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h3 className="font-bold text-slate-900 text-base">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our computer hardware catalogue to add processors, storage drives, memory modules, or surveillance items.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={closeCart}
                    className="font-bold text-xs"
                  >
                    Browse Product Catalogue →
                  </Button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex gap-3 items-start hover:border-slate-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    🖥️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        {item.brand && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                            {item.brand}
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md text-xs transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-bold"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-bold"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-950 block">
                          ₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          @ ₹{item.priceINR.toLocaleString('en-IN')} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotalINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Delivery Estimate</span>
                  <span className="text-emerald-700 font-medium">Calculated at Checkout (Bikaner Hub)</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-100">
                  <span>GST / Commercial Taxes</span>
                  <span>Included in prices</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-1">
                  <span>Estimated Total</span>
                  <span className="text-blue-900">₹{subtotalINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
                <span className="text-sm">ℹ️</span>
                <p className="leading-tight">
                  <strong>Manual Payment:</strong> Paid via UPI QR or Bank NEFT upon review. No online cards.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer btn-premium-interactive"
                >
                  Proceed to Review & Manual Payment →
                </Link>
                <div className="flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-slate-400 hover:text-rose-600 font-medium cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
