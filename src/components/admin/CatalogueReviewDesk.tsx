'use client';

import React, { useState, useTransition } from 'react';
import {
  AdminProductItem,
  AdminCatalogueResponse,
} from '@/lib/catalogue/catalogueAdminService';
import {
  updateProductReviewAction,
  bulkApproveProductsAction,
  getAdminCatalogueDataAction,
} from '@/lib/catalogue/catalogueAdminActions';

interface Props {
  initialData: AdminCatalogueResponse;
  userRole: string;
  userName: string;
}

export const CatalogueReviewDesk: React.FC<Props> = ({ initialData, userRole, userName }) => {
  const [data, setData] = useState<AdminCatalogueResponse>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriceStatus, setSelectedPriceStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeEditingProduct, setActiveEditingProduct] = useState<AdminProductItem | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [editPriceConfirmed, setEditPriceConfirmed] = useState<boolean>(false);
  const [editWarranty, setEditWarranty] = useState<string>('');
  const [editWarrantyConfirmed, setEditWarrantyConfirmed] = useState<boolean>(false);
  const [editPublicationStatus, setEditPublicationStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('DRAFT');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  // Trigger server-filtered data fetch
  const refreshData = (newPage: number = currentPage) => {
    startTransition(async () => {
      const res = await getAdminCatalogueDataAction({
        q: searchQuery,
        brand: selectedBrand,
        category: selectedCategory,
        publicationStatus: selectedStatus,
        priceStatus: selectedPriceStatus,
        page: newPage,
        limit: 20,
      });

      if (res.success && res.data) {
        setData(res.data);
        setCurrentPage(newPage);
      } else {
        setFeedbackMsg({ type: 'error', text: res.error || 'Failed to refresh catalogue.' });
      }
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData(1);
  };

  const openEditModal = (p: AdminProductItem) => {
    setActiveEditingProduct(p);
    setEditPrice(p.confirmedPriceINR !== null ? String(p.confirmedPriceINR) : '');
    setEditPriceConfirmed(p.isPriceConfirmed);
    setEditWarranty(p.warrantyInfo || '');
    setEditWarrantyConfirmed(p.isWarrantyConfirmed);
    setEditPublicationStatus(p.publicationStatus === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT');
    setFeedbackMsg(null);
  };

  const saveProductReview = () => {
    if (!activeEditingProduct) return;

    startTransition(async () => {
      const parsedPrice = editPrice.trim() !== '' ? Number(editPrice) : null;
      if (editPriceConfirmed && (parsedPrice === null || isNaN(parsedPrice) || parsedPrice <= 0)) {
        setFeedbackMsg({ type: 'error', text: 'Please enter a valid positive selling price before confirming.' });
        return;
      }

      const res = await updateProductReviewAction({
        productId: activeEditingProduct.id,
        confirmedPriceINR: parsedPrice,
        isPriceConfirmed: editPriceConfirmed,
        warrantyInfo: editWarranty.trim(),
        isWarrantyConfirmed: editWarrantyConfirmed,
        publicationStatus: editPublicationStatus,
      });

      if (res.success && res.data) {
        setFeedbackMsg({ type: 'success', text: `Product "${res.data.name}" updated successfully.` });
        // Update local list
        setData((prev) => ({
          ...prev,
          products: prev.products.map((item) => (item.id === res.data!.id ? res.data! : item)),
        }));
        setActiveEditingProduct(null);
      } else {
        setFeedbackMsg({ type: 'error', text: res.error || 'Failed to update review status.' });
      }
    });
  };

  const handleBulkApprove = () => {
    if (selectedProductIds.size === 0) return;
    if (!confirm(`Are you sure you want to approve ${selectedProductIds.size} selected products for public listing?`)) return;

    startTransition(async () => {
      const res = await bulkApproveProductsAction(Array.from(selectedProductIds));
      if (res.success) {
        setFeedbackMsg({ type: 'success', text: `Successfully approved ${res.data?.updatedCount} products for publication.` });
        setSelectedProductIds(new Set());
        refreshData(currentPage);
      } else {
        setFeedbackMsg({ type: 'error', text: res.error || 'Bulk approval failed.' });
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.size === data.products.length) {
      setSelectedProductIds(new Set());
    } else {
      setSelectedProductIds(new Set(data.products.map((p) => p.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedProductIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedProductIds(next);
  };

  // Export full current view to CSV for offline family / business review
  const exportToCSV = () => {
    const headers = [
      'SKU',
      'Model Number',
      'Brand',
      'Category',
      'Product Name',
      'Source MRP (INR)',
      'Source Listed Price (INR)',
      'Approved Selling Price (INR)',
      'Price Verified Status',
      'Warranty Info',
      'Publication Status',
      'Source Website URL',
      'Source Retrieval Date',
    ];

    const rows = data.products.map((p) => [
      `"${p.sku}"`,
      `"${p.modelNumber}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      p.mrpINR ?? '',
      p.sourcePriceINR ?? '',
      p.confirmedPriceINR ?? '',
      p.isPriceConfirmed ? 'VERIFIED' : 'UNVERIFIED',
      `"${(p.warrantyInfo || '').replace(/"/g, '""')}"`,
      p.publicationStatus,
      `"${p.sourceUrl || ''}"`,
      `"${p.sourceRetrievalDate || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `JK_Enterprises_Catalogue_Review_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-xs uppercase font-bold tracking-wider opacity-75 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Total Products</div>
          <div className="text-2xl font-black text-slate-900">{data.stats.totalProducts}</div>
          <div className="text-[10px] text-slate-400">In Catalogue Database</div>
        </div>

        <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/80 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">Pending Review</div>
          <div className="text-2xl font-black text-amber-900">{data.stats.draftCount}</div>
          <div className="text-[10px] text-amber-600 font-medium">Marked DRAFT / Private</div>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">Approved Live</div>
          <div className="text-2xl font-black text-emerald-900">{data.stats.publishedCount}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Published on Website</div>
        </div>

        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200/80 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">Verified Prices</div>
          <div className="text-2xl font-black text-indigo-900">{data.stats.confirmedPriceCount}</div>
          <div className="text-[10px] text-indigo-600 font-medium">Owner Confirmed</div>
        </div>

        <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-orange-700 tracking-wider">Unconfirmed Price</div>
          <div className="text-2xl font-black text-orange-900">{data.stats.unconfirmedPriceCount}</div>
          <div className="text-[10px] text-orange-600 font-medium">Reference MRP / Indicative</div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Missing Prices</div>
          <div className="text-2xl font-black text-slate-800">{data.stats.missingPriceCount}</div>
          <div className="text-[10px] text-slate-400">Needs Quotation / Inquiry</div>
        </div>
      </div>

      {/* Commercial Safeguard Alert Banner */}
      <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl flex items-start justify-between gap-3 text-xs text-amber-900 leading-relaxed">
        <div className="flex items-start gap-3">
          <span className="text-base select-none" aria-hidden="true">⚠️</span>
          <div>
            <strong className="font-bold">Commercial Safeguard Active:</strong> Sourced reference prices from FINGERS &amp; HP India are indicative manufacturer estimates for internal preparation. Products remain in <strong>DRAFT</strong> status until commercial terms, local taxes, and selling margins are reviewed and confirmed with business ownership. Unverified items are strictly hidden from public customers and sitemaps.
          </div>
        </div>
        <div className="text-[10px] text-amber-800 font-semibold shrink-0 bg-amber-100/80 px-2.5 py-1 rounded-xl">
          Desk Operator: {userName} ({userRole})
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name, SKU, model number, or brand..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="ALL">All Brands</option>
              {data.brands.map((b) => (
                <option key={b.slug} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="ALL">All Categories</option>
              {data.categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft (Pending Review)</option>
              <option value="PUBLISHED">Published (Approved)</option>
              <option value="DEMO">Demo Seed Data</option>
            </select>

            <select
              value={selectedPriceStatus}
              onChange={(e) => {
                setSelectedPriceStatus(e.target.value);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="ALL">All Price States</option>
              <option value="UNCONFIRMED">Unconfirmed Price</option>
              <option value="CONFIRMED">Verified / Confirmed Price</option>
              <option value="MISSING">Missing Price</option>
            </select>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Filtering...' : 'Apply Filters'}
            </button>

            <button
              type="button"
              onClick={exportToCSV}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Download CSV for offline family review in Excel / Sheets"
            >
              <span>📥</span> Export CSV
            </button>
          </div>
        </form>

        {/* Bulk Action Controls */}
        {selectedProductIds.size > 0 && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">
              {selectedProductIds.size} products selected
            </span>
            <button
              onClick={handleBulkApprove}
              disabled={isPending}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
            >
              Approve Selected for Public Listing
            </button>
          </div>
        )}
      </div>

      {/* Main Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={data.products.length > 0 && selectedProductIds.size === data.products.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                </th>
                <th className="py-3 px-3">Product / SKU</th>
                <th className="py-3 px-3">Brand &amp; Category</th>
                <th className="py-3 px-3">Source MRP &amp; Listed Price</th>
                <th className="py-3 px-3">JK Selling Price</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No products match the selected search or filter criteria.
                  </td>
                </tr>
              ) : (
                data.products.map((p) => {
                  const isSelected = selectedProductIds.has(p.id);
                  const isVerified = p.isPriceConfirmed;

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-slate-50' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(p.id)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                      </td>

                      {/* Product Name & SKU */}
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>SKU: <strong className="font-mono text-slate-700">{p.sku}</strong></span>
                          <span>•</span>
                          <span>Model: <span className="font-mono text-slate-700">{p.modelNumber}</span></span>
                        </div>
                        {p.missingFields.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {p.missingFields.map((f) => (
                              <span key={f} className="text-[9px] bg-rose-50 text-rose-700 px-1.5 py-0.2 rounded font-semibold">
                                Missing {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Brand & Category */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{p.brand}</div>
                        <div className="text-[10px] text-slate-500">{p.category}</div>
                      </td>

                      {/* Source MRP & Reference Price */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {p.sourcePriceINR ? (
                          <div>
                            <div className="font-bold text-slate-800">₹{p.sourcePriceINR.toLocaleString('en-IN')}</div>
                            {p.mrpINR && p.mrpINR > p.sourcePriceINR && (
                              <div className="text-[10px] text-slate-400 line-through">MRP: ₹{p.mrpINR.toLocaleString('en-IN')}</div>
                            )}
                            <div className="text-[9px] text-amber-700 font-semibold bg-amber-50 px-1 py-0.2 rounded inline-block mt-0.5">
                              Indicative Ref
                            </div>
                          </div>
                        ) : p.mrpINR ? (
                          <div>
                            <div className="font-bold text-slate-800">MRP: ₹{p.mrpINR.toLocaleString('en-IN')}</div>
                            <div className="text-[9px] text-slate-400">Listed as MRP only</div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Not Listed on Source</span>
                        )}
                      </td>

                      {/* Approved Business Selling Price */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {isVerified && p.confirmedPriceINR ? (
                          <div>
                            <div className="font-bold text-emerald-700 text-sm">₹{p.confirmedPriceINR.toLocaleString('en-IN')}</div>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                              ✓ Verified Price
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-slate-400 italic">Unconfirmed</span>
                            <div className="text-[9px] text-amber-600 font-medium">Needs Owner Review</div>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.publicationStatus === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.publicationStatus === 'DEMO'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {p.publicationStatus}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(p)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold text-[11px] transition-colors"
                        >
                          Review &amp; Price
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing {(currentPage - 1) * 20 + 1} to {Math.min(currentPage * 20, data.totalFiltered)} of {data.totalFiltered} products
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => refreshData(currentPage - 1)}
              disabled={currentPage <= 1 || isPending}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 font-medium"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-slate-800">
              {currentPage} / {data.totalPages || 1}
            </span>
            <button
              onClick={() => refreshData(currentPage + 1)}
              disabled={currentPage >= data.totalPages || isPending}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Review & Edit Modal */}
      {activeEditingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Commercial Review
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">{activeEditingProduct.name}</h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  SKU: {activeEditingProduct.sku} • Model: {activeEditingProduct.modelNumber}
                </div>
              </div>
              <button
                onClick={() => setActiveEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Source Reference Information (Read-only) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>🌐</span> Sourced Information from {activeEditingProduct.brand} Store
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Source MRP</div>
                  <div className="font-bold text-slate-800">
                    {activeEditingProduct.mrpINR ? `₹${activeEditingProduct.mrpINR.toLocaleString('en-IN')}` : 'Not Available'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Source Listed Price</div>
                  <div className="font-bold text-slate-800">
                    {activeEditingProduct.sourcePriceINR ? `₹${activeEditingProduct.sourcePriceINR.toLocaleString('en-IN')}` : 'Not Available'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Retrieval Date</div>
                  <div className="text-slate-700">{activeEditingProduct.sourceRetrievalDate || '2026-10-25'}</div>
                </div>
              </div>
              {activeEditingProduct.sourceUrl && (
                <div className="pt-1">
                  <a
                    href={activeEditingProduct.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-[11px] font-medium"
                  >
                    View Official Manufacturer Page ↗
                  </a>
                </div>
              )}
            </div>

            {/* Business Ownership Commercial Input Form */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
                JK Enterprises Selling &amp; Approval Terms
              </h3>

              {/* Selling Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Approved Business Selling Price (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    placeholder="Enter verified commercial price..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-bold text-slate-900"
                  />
                </div>
                <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editPriceConfirmed}
                    onChange={(e) => setEditPriceConfirmed(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Mark Price as Officially Verified &amp; Confirmed with Business Owner</span>
                </label>
              </div>

              {/* Warranty Info */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Warranty Information
                </label>
                <input
                  type="text"
                  value={editWarranty}
                  onChange={(e) => setEditWarranty(e.target.value)}
                  placeholder="e.g. 1 Year Manufacturer Warranty"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900"
                />
                <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editWarrantyConfirmed}
                    onChange={(e) => setEditWarrantyConfirmed(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Mark Warranty Terms as Verified</span>
                </label>
              </div>

              {/* Publication Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Publication Status
                </label>
                <select
                  value={editPublicationStatus}
                  onChange={(e) => setEditPublicationStatus(e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold"
                >
                  <option value="DRAFT">DRAFT (Keep Private / Internal Review Only)</option>
                  <option value="PUBLISHED">PUBLISHED (Make Publicly Visible on Website)</option>
                  <option value="ARCHIVED">ARCHIVED (Discontinued / Hidden)</option>
                </select>
                {editPublicationStatus === 'PUBLISHED' && !editPriceConfirmed && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    ⚠️ Caution: Publishing without confirming business price will present indicative reference pricing on public catalogue.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProductReview}
                disabled={isPending}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
