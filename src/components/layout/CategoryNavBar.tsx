'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export interface CategoryNavItem {
  id: string;
  name: string;
  shortName: string;
  slug: string;
}

const CATEGORY_NAV_ITEMS: CategoryNavItem[] = [
  { id: 'cat-all', name: 'All Products', shortName: 'All Products', slug: 'all' },
  { id: 'cat-cpu', name: 'Processors & CPUs', shortName: 'Processors', slug: 'processors' },
  { id: 'cat-storage', name: 'Storage & SSDs', shortName: 'Storage & SSDs', slug: 'storage' },
  { id: 'cat-memory', name: 'RAM & Memory', shortName: 'Memory & RAM', slug: 'memory' },
  { id: 'cat-systems', name: 'Computers & Workstations', shortName: 'Workstations & PCs', slug: 'systems' },
  { id: 'cat-networking', name: 'Networking & WiFi', shortName: 'Networking', slug: 'networking' },
  { id: 'cat-security', name: 'CCTV & Security', shortName: 'CCTV & Security', slug: 'cctv-security' },
  { id: 'cat-printers', name: 'Printers & Toners', shortName: 'Printers & Supplies', slug: 'printers' },
  { id: 'cat-peripherals', name: 'Monitors & Peripherals', shortName: 'Displays & Peripherals', slug: 'peripherals' },
  { id: 'cat-military-outdoor', name: 'Military & Outdoor Products', shortName: 'Military & Outdoor', slug: 'military-outdoor' },
  { id: 'cat-cables-connectivity', name: 'Cables & Connectivity', shortName: 'Cables & Adapters', slug: 'cables-connectivity' },
  { id: 'cat-stationery-office', name: 'Stationery & Office Supplies', shortName: 'Stationery & Office', slug: 'stationery-office' },
  { id: 'cat-furnishing-carpets', name: 'Commercial Furnishing & Carpets', shortName: 'Furnishings & Carpets', slug: 'furnishing-carpets' },
];

export const CategoryNavBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Compute active category cleanly from current route during render
  const currentCategory = pathname === '/catalogue' ? searchParams.get('category') || 'all' : 'all';

  return (
    <nav
      aria-label="Product Categories Navigation"
      className="w-full bg-white/95 backdrop-blur-xs border-t border-slate-100 border-b border-slate-200/80 select-none shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isActive = currentCategory === item.slug;
            // On home page, smooth scroll to category via hash; on other pages navigate to /catalogue
            const targetHref =
              item.slug === 'all'
                ? pathname === '/' ? '/#catalogue-section' : '/catalogue'
                : pathname === '/' ? `/#${item.slug}` : `/catalogue?category=${item.slug}`;

            return (
              <Link
                key={item.id}
                href={targetHref}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs border border-blue-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
                title={`Browse ${item.name}`}
              >
                <span
                  className={`transition-colors shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  <CategoryIcon slug={item.slug} className="w-3.5 h-3.5" />
                </span>
                <span>{item.shortName}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
