import React from 'react';
import Link from 'next/link';

export interface CataloguePaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}

export const CataloguePagination: React.FC<CataloguePaginationProps> = ({
  currentPage,
  totalPages,
  searchParams,
}) => {
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (val !== undefined && key !== 'page') {
        if (Array.isArray(val)) {
          val.forEach((v) => params.append(key, v));
        } else {
          params.set(key, val);
        }
      }
    }
    params.set('page', String(pageNumber));
    return `/catalogue?${params.toString()}`;
  };

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, and window around current
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    }
  }

  return (
    <nav
      aria-label="Catalogue pagination"
      className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
    >
      <div className="text-slate-500 font-medium">
        Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed select-none">
            ← Previous
          </span>
        )}

        {/* Numeric Page Buttons */}
        {pages.map((p, idx) => {
          const isCurrent = p === currentPage;
          const prevPage = pages[idx - 1];
          const hasGap = prevPage && p - prevPage > 1;

          return (
            <React.Fragment key={p}>
              {hasGap && <span className="px-2 text-slate-400 select-none">...</span>}
              <Link
                href={createPageUrl(p)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs transition-colors ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </Link>
            </React.Fragment>
          );
        })}

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed select-none">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
};
