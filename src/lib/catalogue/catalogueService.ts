import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_PRODUCTS,
  DemoSeedProduct,
  DemoSeedCategory,
  DemoSeedBrand,
} from '../../../prisma/seedData';
import {
  IMPORTED_PARENT_CATEGORIES,
  IMPORTED_SUBCATEGORIES,
} from '@/data/importedCatalogueData';

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
      const andConditions: Record<string, unknown>[] = [
        { publicationStatus: { in: ['DEMO', 'PUBLISHED'] } },
      ];

      if (params.category && params.category !== 'all') {
        andConditions.push({
          OR: [
            { category: { slug: params.category } },
            { category: { parent: { slug: params.category } } },
          ],
        });
      }

      if (params.brand && params.brand !== 'all') {
        andConditions.push({ brand: { slug: params.brand } });
      }

      if (params.q && params.q.trim()) {
        const query = params.q.trim();
        andConditions.push({
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } },
            { modelNumber: { contains: query, mode: 'insensitive' } },
          ],
        });
      }

      if (params.minPrice !== undefined || params.maxPrice !== undefined) {
        andConditions.push({
          demoPriceINR: {
            gte: params.minPrice !== undefined ? params.minPrice : 0,
            lte: params.maxPrice !== undefined ? params.maxPrice : 1000000,
          },
        });
      }

      if (params.specKey && params.specValue) {
        andConditions.push({
          specifications: {
            some: {
              key: params.specKey,
              value: params.specValue,
            },
          },
        });
      }

      const whereClause = { AND: andConditions };

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

  // Category filter with parent hierarchy support
  if (params.category && params.category !== 'all') {
    const matchingSubSlugs = IMPORTED_SUBCATEGORIES
      .filter((s) => s.parentSlug === params.category)
      .map((s) => s.slug);
    filtered = filtered.filter(
      (p) => p.categorySlug === params.category || matchingSubSlugs.includes(p.categorySlug)
    );
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

  // Combine seed categories and imported category tree for rich navigation
  const combinedCategories: DemoSeedCategory[] = [...SEED_CATEGORIES];
  const existingCatSlugs = new Set(SEED_CATEGORIES.map((c) => c.slug));

  for (const parent of IMPORTED_PARENT_CATEGORIES) {
    if (!existingCatSlugs.has(parent.slug)) {
      existingCatSlugs.add(parent.slug);
      combinedCategories.push({
        id: `cat-${parent.slug}`,
        name: parent.name,
        slug: parent.slug,
        description: parent.description,
        icon: parent.icon,
      });
    }
  }

  for (const sub of IMPORTED_SUBCATEGORIES) {
    if (!existingCatSlugs.has(sub.slug)) {
      existingCatSlugs.add(sub.slug);
      combinedCategories.push({
        id: `cat-${sub.slug}`,
        name: sub.name,
        slug: sub.slug,
        description: sub.description,
        parentId: sub.parentSlug ? `cat-${sub.parentSlug}` : undefined,
      });
    }
  }

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
    categories: combinedCategories,
    brands: SEED_BRANDS,
    filterableSpecs,
  };
}

/**
 * Retrieves a single product by its stable unique slug or fallback ID.
 * Returns null if not found.
 */
export async function getProductBySlug(
  slug: string
): Promise<CatalogueProductView | null> {
  const cleanSlug = (slug || '').trim().toLowerCase();
  if (!cleanSlug) return null;

  // 1. Attempt PostgreSQL query if database is configured
  if (isDatabaseConfigured()) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: { equals: cleanSlug, mode: 'insensitive' } },
            { id: { equals: cleanSlug, mode: 'insensitive' } },
            { sku: { equals: cleanSlug, mode: 'insensitive' } },
          ],
          publicationStatus: { in: ['DEMO', 'PUBLISHED'] },
        },
        include: {
          brand: true,
          category: true,
          specifications: true,
          inventory: true,
        },
      });

      if (product) {
        const onHand = product.inventory?.quantityOnHand || 0;
        const reserved = product.inventory?.quantityReserved || 0;
        return {
          id: product.id,
          sku: product.sku,
          slug: product.slug,
          name: product.name,
          description: product.description,
          modelNumber: product.modelNumber || '',
          brandName: product.brand.name,
          brandSlug: product.brand.slug,
          categoryName: product.category.name,
          categorySlug: product.category.slug,
          demoPriceINR: Number(product.demoPriceINR || 0),
          mrpINR: Number(product.mrpINR || 0),
          isPriceConfirmed: product.isPriceConfirmed,
          warrantyInfo: product.warrantyInfo || 'Manufacturer Warranty (Sample)',
          isWarrantyConfirmed: product.isWarrantyConfirmed,
          isDemo: product.isDemo,
          publicationStatus: product.publicationStatus,
          quantityOnHand: onHand,
          quantityReserved: reserved,
          availableStock: Math.max(0, onHand - reserved),
          isStockConfirmed: product.inventory?.isStockConfirmed || false,
          specifications: product.specifications.map((s) => ({
            key: s.key,
            value: s.value,
            isFilterable: s.isFilterable,
          })),
        };
      }
    } catch (err) {
      console.warn('[Catalogue Service] getProductBySlug DB query failed:', err);
    }
  }

  // 2. Fallback: Search SEED_PRODUCTS dataset
  const seedIndex = SEED_PRODUCTS.findIndex(
    (p, idx) =>
      p.slug.toLowerCase() === cleanSlug ||
      p.sku.toLowerCase() === cleanSlug ||
      `demo-${idx + 1}` === cleanSlug
  );

  if (seedIndex !== -1) {
    return mapSeedToView(SEED_PRODUCTS[seedIndex], seedIndex);
  }

  // Also check DEMO_FEATURED_PRODUCTS for direct id/slug match
  const { DEMO_FEATURED_PRODUCTS } = await import('@/data/demoCatalogue');
  const feat = DEMO_FEATURED_PRODUCTS.find(
    (p) => p.slug?.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug
  );

  if (feat) {
    const matchedSeedIdx = feat.slug ? SEED_PRODUCTS.findIndex((s) => s.slug === feat.slug) : -1;
    if (matchedSeedIdx !== -1) {
      return mapSeedToView(SEED_PRODUCTS[matchedSeedIdx], matchedSeedIdx);
    }
    // Convert featured demo product to complete CatalogueProductView
    const specsList: { key: string; value: string; isFilterable: boolean }[] = [];
    if (feat.fullSpecs) {
      for (const [key, value] of Object.entries(feat.fullSpecs)) {
        specsList.push({ key, value, isFilterable: true });
      }
    } else if (feat.shortSpecs) {
      for (const s of feat.shortSpecs) {
        const parts = s.split(':');
        specsList.push({
          key: parts.length > 1 ? parts[0].trim() : 'Parameter',
          value: parts.length > 1 ? parts.slice(1).join(':').trim() : s.trim(),
          isFilterable: true,
        });
      }
    }

    return {
      id: feat.id,
      sku: feat.id.toUpperCase(),
      slug: feat.slug || feat.id,
      name: feat.name,
      description: feat.shortSpecs ? feat.shortSpecs.join(' • ') : feat.name,
      modelNumber: feat.id,
      brandName: feat.brand || 'Commercial Grade',
      brandSlug: feat.brand?.toLowerCase().replace(/\s+/g, '-') || 'general',
      categoryName: feat.category,
      categorySlug: feat.categorySlug || feat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      demoPriceINR: feat.demoPriceINR,
      mrpINR: feat.mrpINR || Math.round(feat.demoPriceINR * 1.15),
      isPriceConfirmed: false,
      warrantyInfo: feat.warrantyDemo || 'Standard Manufacturer Warranty (Sample)',
      isWarrantyConfirmed: false,
      isDemo: true,
      publicationStatus: 'DEMO',
      quantityOnHand: feat.inStockDemo ? 10 : 0,
      quantityReserved: 0,
      availableStock: feat.inStockDemo ? 10 : 0,
      isStockConfirmed: false,
      specifications: specsList,
    };
  }

  return null;
}

/**
 * Returns all available product slugs for static generation, sitemap, and routing.
 */
export async function getAllProductSlugs(): Promise<string[]> {
  if (isDatabaseConfigured()) {
    try {
      const products = await prisma.product.findMany({
        select: { slug: true },
        where: { publicationStatus: { in: ['DEMO', 'PUBLISHED'] } },
      });
      if (products.length > 0) {
        return products.map((p) => p.slug);
      }
    } catch {
      // Fallback to seed data
    }
  }
  const seedSlugs = SEED_PRODUCTS.map((p) => p.slug);
  const { DEMO_FEATURED_PRODUCTS } = await import('@/data/demoCatalogue');
  const featSlugs = DEMO_FEATURED_PRODUCTS.map((p) => p.slug || p.id).filter(Boolean);
  return Array.from(new Set([...seedSlugs, ...featSlugs]));
}

