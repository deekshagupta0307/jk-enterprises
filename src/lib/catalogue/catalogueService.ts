import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_PRODUCTS,
  DemoSeedProduct,
  DemoSeedCategory,
  DemoSeedBrand,
} from '../../../prisma/seedData';

export interface CatalogueFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  specKey?: string;
  specValue?: string;
  q?: string;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
  page?: number;
  limit?: number;
}

export interface CatalogueProductView {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  modelNumber: string;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
  demoPriceINR: number;
  mrpINR: number;
  isPriceConfirmed: boolean;
  warrantyInfo: string;
  isWarrantyConfirmed: boolean;
  isDemo: boolean;
  publicationStatus: string;
  quantityOnHand: number;
  quantityReserved: number;
  availableStock: number;
  isStockConfirmed: boolean;
  specifications: { key: string; value: string; isFilterable: boolean }[];
}

export interface CatalogueResult {
  products: CatalogueProductView[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  isDatabaseConnected: boolean;
  dataSource: 'POSTGRESQL' | 'DEMO_DATA_FALLBACK';
  databaseNotice: string;
  databaseError?: string;
  categories: DemoSeedCategory[];
  brands: DemoSeedBrand[];
  filterableSpecs: Record<string, string[]>;
}

/**
 * Strips sensitive credentials or URI authentication tokens from error strings
 */
export function sanitizeErrorMessage(msg: string): string {
  return msg.replace(/postgresql:\/\/[^@\s]+@/gi, 'postgresql://***:***@');
}

/**
 * Normalizes a DemoSeedProduct into the standardized CatalogueProductView
 */
function mapSeedToView(p: DemoSeedProduct, index: number): CatalogueProductView {
  const brand = SEED_BRANDS.find((b) => b.slug === p.brandSlug);
  const category = SEED_CATEGORIES.find((c) => c.slug === p.categorySlug);
  const available = Math.max(0, p.quantityOnHand - p.quantityReserved);

  return {
    id: `demo-${index + 1}`,
    sku: p.sku,
    slug: p.slug,
    name: p.name,
    description: p.description,
    modelNumber: p.modelNumber,
    brandName: brand?.name || p.brandSlug,
    brandSlug: p.brandSlug,
    categoryName: category?.name || p.categorySlug,
    categorySlug: p.categorySlug,
    demoPriceINR: p.demoPriceINR,
    mrpINR: p.mrpINR,
    isPriceConfirmed: false,
    warrantyInfo: p.warrantyInfo,
    isWarrantyConfirmed: false,
    isDemo: true,
    publicationStatus: 'DEMO',
    quantityOnHand: p.quantityOnHand,
    quantityReserved: p.quantityReserved,
    availableStock: available,
    isStockConfirmed: false,
    specifications: p.specifications,
  };
}

/**
 * Filterable specification options compiled from seed data
 */
export function getFilterableSpecOptions(): Record<string, string[]> {
  const options: Record<string, Set<string>> = {
    'Socket': new Set(),
    'Memory Type': new Set(),
    'Capacity': new Set(),
    'Interface': new Set(),
    'Form Factor': new Set(),
    'Port Count': new Set(),
    'Resolution': new Set(),
    'Screen Size': new Set(),
  };

  for (const prod of SEED_PRODUCTS) {
    for (const spec of prod.specifications) {
      if (options[spec.key]) {
        options[spec.key].add(spec.value);
      }
    }
  }

  const result: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(options)) {
    result[k] = Array.from(v).sort();
  }
  return result;
}

/**
 * Retrieves catalogue products with server-side URL filtering and pagination.
 * Attempts real PostgreSQL query if configured, with transparent demo fallback.
 */
export async function getCatalogueProducts(
  params: CatalogueFilterParams = {}
): Promise<CatalogueResult> {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = params.limit === 24 ? 24 : 12;
  const filterableSpecs = getFilterableSpecOptions();
  let databaseError: string | null = null;

  // 1. Attempt PostgreSQL Query if database is configured
  if (isDatabaseConfigured()) {
    try {
      const whereClause: Record<string, unknown> = {
        publicationStatus: { in: ['DEMO', 'PUBLISHED'] },
      };

      if (params.category && params.category !== 'all') {
        whereClause.category = { slug: params.category };
      }

      if (params.brand && params.brand !== 'all') {
        whereClause.brand = { slug: params.brand };
      }

      if (params.q && params.q.trim()) {
        const query = params.q.trim();
        whereClause.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
          { modelNumber: { contains: query, mode: 'insensitive' } },
        ];
      }

      if (params.minPrice !== undefined || params.maxPrice !== undefined) {
        whereClause.demoPriceINR = {
          gte: params.minPrice !== undefined ? params.minPrice : 0,
          lte: params.maxPrice !== undefined ? params.maxPrice : 1000000,
        };
      }

      if (params.specKey && params.specValue) {
        whereClause.specifications = {
          some: {
            key: params.specKey,
            value: params.specValue,
          },
        };
      }

      let orderBy: Record<string, string> = { createdAt: 'desc' };
      if (params.sort === 'price_asc') orderBy = { demoPriceINR: 'asc' };
      else if (params.sort === 'price_desc') orderBy = { demoPriceINR: 'desc' };
      else if (params.sort === 'name_asc') orderBy = { name: 'asc' };
      else if (params.sort === 'name_desc') orderBy = { name: 'desc' };

      const totalCount = await prisma.product.count({ where: whereClause });
      const products = await prisma.product.findMany({
        where: whereClause,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: true,
          category: true,
          specifications: true,
          inventory: true,
        },
      });

      const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
      const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });

      const mappedProducts: CatalogueProductView[] = products.map((p) => {
        const onHand = p.inventory?.quantityOnHand || 0;
        const reserved = p.inventory?.quantityReserved || 0;
        return {
          id: p.id,
          sku: p.sku,
          slug: p.slug,
          name: p.name,
          description: p.description,
          modelNumber: p.modelNumber || '',
          brandName: p.brand.name,
          brandSlug: p.brand.slug,
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          demoPriceINR: Number(p.demoPriceINR || 0),
          mrpINR: Number(p.mrpINR || 0),
          isPriceConfirmed: p.isPriceConfirmed,
          warrantyInfo: p.warrantyInfo || 'Manufacturer Warranty (Sample)',
          isWarrantyConfirmed: p.isWarrantyConfirmed,
          isDemo: p.isDemo,
          publicationStatus: p.publicationStatus,
          quantityOnHand: onHand,
          quantityReserved: reserved,
          availableStock: Math.max(0, onHand - reserved),
          isStockConfirmed: p.inventory?.isStockConfirmed || false,
          specifications: p.specifications.map((s) => ({
            key: s.key,
            value: s.value,
            isFilterable: s.isFilterable,
          })),
        };
      });

      return {
        products: mappedProducts,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
        currentPage: page,
        limit,
        isDatabaseConnected: true,
        dataSource: 'POSTGRESQL',
        databaseNotice: 'Serving verified data from connected PostgreSQL database.',
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          icon: c.icon || undefined,
          parentId: c.parentId || undefined,
        })),
        brands: brands.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          description: b.description || undefined,
        })),
        filterableSpecs,
      };
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err);
      databaseError = sanitizeErrorMessage(rawMsg);
      console.warn(
        '[Catalogue Service] PostgreSQL query failed with error (sanitized):',
        databaseError
      );
    }
  }

  // 2. Fallback: Filter and paginate in-memory across the 55-item seed dataset
  let filtered = SEED_PRODUCTS.map(mapSeedToView);

  // Category filter
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === params.category);
  }

  // Brand filter
  if (params.brand && params.brand !== 'all') {
    filtered = filtered.filter((p) => p.brandSlug === params.brand);
  }

  // Keyword search
  if (params.q && params.q.trim()) {
    const qLower = params.q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        p.sku.toLowerCase().includes(qLower) ||
        p.brandName.toLowerCase().includes(qLower)
    );
  }

  // Price range
  if (params.minPrice !== undefined && !isNaN(params.minPrice)) {
    filtered = filtered.filter((p) => p.demoPriceINR >= (params.minPrice as number));
  }
  if (params.maxPrice !== undefined && !isNaN(params.maxPrice)) {
    filtered = filtered.filter((p) => p.demoPriceINR <= (params.maxPrice as number));
  }

  // Technical specification filter
  if (params.specKey && params.specValue && params.specValue !== 'all') {
    filtered = filtered.filter((p) =>
      p.specifications.some(
        (s) => s.key === params.specKey && s.value === params.specValue
      )
    );
  }

  // Sorting
  if (params.sort === 'price_asc') {
    filtered.sort((a, b) => a.demoPriceINR - b.demoPriceINR);
  } else if (params.sort === 'price_desc') {
    filtered.sort((a, b) => b.demoPriceINR - a.demoPriceINR);
  } else if (params.sort === 'name_asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (params.sort === 'name_desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

  return {
    products: paginatedProducts,
    totalCount,
    totalPages,
    currentPage: page,
    limit,
    isDatabaseConnected: false,
    dataSource: 'DEMO_DATA_FALLBACK',
    databaseError: databaseError || undefined,
    databaseNotice: databaseError
      ? `PostgreSQL query error (${databaseError}). Falling back to 55 verified demo items from prisma/seedData.ts.`
      : 'PostgreSQL is not configured in this environment (DATABASE_URL absent). Displaying 55 verified demo items from prisma/seedData.ts with full multi-dimensional search, specification filtering, and pagination.',
    categories: SEED_CATEGORIES,
    brands: SEED_BRANDS,
    filterableSpecs,
  };
}
