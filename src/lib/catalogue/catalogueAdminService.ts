import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { SystemRole } from '@prisma/client';
import {
  IMPORTED_PRODUCTS,
  IMPORTED_PARENT_CATEGORIES,
  IMPORTED_SUBCATEGORIES,
  IMPORTED_BRANDS,
} from '@/data/importedCatalogueData';
import { SEED_PRODUCTS, SEED_CATEGORIES, SEED_BRANDS } from '../../../prisma/seedData';

export interface AdminProductItem {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  modelNumber: string;
  brand: string;
  category: string;
  categorySlug: string;
  mrpINR: number | null;
  sourcePriceINR: number | null;
  confirmedPriceINR: number | null;
  isPriceConfirmed: boolean;
  warrantyInfo: string;
  isWarrantyConfirmed: boolean;
  publicationStatus: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DEMO';
  isDemo: boolean;
  specifications: { key: string; value: string; group?: string }[];
  images: { imageUrl: string; altText: string; isPrimary: boolean }[];
  sourceUrl?: string;
  sourceRetrievalDate?: string;
  missingFields: string[];
}

export interface AdminCatalogueFilters {
  q?: string;
  brand?: string;
  category?: string;
  publicationStatus?: string;
  priceStatus?: string;
  page?: number;
  limit?: number;
}

export interface AdminCatalogueStats {
  totalProducts: number;
  draftCount: number;
  publishedCount: number;
  demoCount: number;
  confirmedPriceCount: number;
  unconfirmedPriceCount: number;
  missingPriceCount: number;
}

export interface AdminCatalogueResponse {
  products: AdminProductItem[];
  stats: AdminCatalogueStats;
  totalFiltered: number;
  totalPages: number;
  currentPage: number;
  categories: { name: string; slug: string }[];
  brands: { name: string; slug: string }[];
  isDatabaseConnected: boolean;
}

export interface UpdateProductReviewInput {
  productId: string;
  confirmedPriceINR?: number | null;
  isPriceConfirmed?: boolean;
  warrantyInfo?: string;
  isWarrantyConfirmed?: boolean;
  publicationStatus?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  description?: string;
}

interface AuthSessionUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthSessionLike {
  user: AuthSessionUser;
}

/**
 * Validates that the caller is authenticated as ADMIN or STAFF.
 * Throws an explicit error if unauthorized.
 */
export function assertAdminOrStaff(session: AuthSessionLike | null | undefined): void {
  if (!session || !session.user) {
    throw new Error('Authentication required. Access to administrative catalogue desk is denied.');
  }

  const role = session.user.role;
  if (role !== SystemRole.ADMIN && role !== SystemRole.STAFF && role !== 'ADMIN' && role !== 'STAFF') {
    throw new Error('403 Forbidden: Insufficient clearance. Restricted to JK Enterprises Staff and Administrators.');
  }
}

// In-memory mutable cache for development / offline demonstration
const inMemoryAdminStore: Map<string, AdminProductItem> = new Map();

function initializeInMemoryStore(): void {
  if (inMemoryAdminStore.size > 0) return;

  // Add imported expanded products
  IMPORTED_PRODUCTS.forEach((p, idx) => {
    const id = `imp-${idx + 1}-${p.sku.toLowerCase()}`;
    const missing: string[] = [];
    if (!p.sourcePriceINR && !p.mrpINR) missing.push('Price');
    if (!p.specifications || p.specifications.length === 0) missing.push('Specifications');
    if (!p.images || p.images.length === 0) missing.push('Images');
    if (!p.modelNumber || p.modelNumber === 'N/A') missing.push('Model Number');

    inMemoryAdminStore.set(id, {
      id,
      sku: p.sku,
      slug: p.slug,
      name: p.name,
      description: p.description,
      modelNumber: p.modelNumber,
      brand: p.brand,
      category: p.categoryName,
      categorySlug: p.categorySlug,
      mrpINR: p.mrpINR,
      sourcePriceINR: p.sourcePriceINR,
      confirmedPriceINR: null,
      isPriceConfirmed: false,
      warrantyInfo: p.warrantyInfo,
      isWarrantyConfirmed: false,
      publicationStatus: 'DRAFT',
      isDemo: false,
      specifications: p.specifications.map((s) => ({ key: s.key, value: s.value, group: s.group })),
      images: p.images.map((img) => ({ imageUrl: img.imageUrl, altText: img.altText, isPrimary: img.isPrimary })),
      sourceUrl: p.sourceUrl,
      sourceRetrievalDate: p.sourceRetrievalDate,
      missingFields: missing,
    });
  });

  // Also include initial demo products as DEMO status
  SEED_PRODUCTS.forEach((p, idx) => {
    const id = `demo-${idx + 1}`;
    const brand = SEED_BRANDS.find((b) => b.slug === p.brandSlug);
    const cat = SEED_CATEGORIES.find((c) => c.slug === p.categorySlug);

    inMemoryAdminStore.set(id, {
      id,
      sku: p.sku,
      slug: p.slug,
      name: p.name,
      description: p.description,
      modelNumber: p.modelNumber,
      brand: brand?.name || p.brandSlug,
      category: cat?.name || p.categorySlug,
      categorySlug: p.categorySlug,
      mrpINR: p.mrpINR,
      sourcePriceINR: p.demoPriceINR,
      confirmedPriceINR: null,
      isPriceConfirmed: false,
      warrantyInfo: p.warrantyInfo,
      isWarrantyConfirmed: false,
      publicationStatus: 'DEMO',
      isDemo: true,
      specifications: p.specifications.map((s) => ({ key: s.key, value: s.value })),
      images: [],
      missingFields: [],
    });
  });
}

/**
 * Retrieves catalogue items for the administrative review desk.
 * Enforces role authorization and provides multi-field filtering and metrics.
 */
export async function getAdminCatalogueData(
  session: AuthSessionLike | null | undefined,
  filters: AdminCatalogueFilters = {}
): Promise<AdminCatalogueResponse> {
  assertAdminOrStaff(session);

  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(filters.limit) || 20));

  // 1. If database is configured, query PostgreSQL
  if (isDatabaseConfigured()) {
    try {
      const where: Record<string, unknown> = {};

      if (filters.brand && filters.brand !== 'ALL') {
        where.brand = { slug: { equals: filters.brand.toLowerCase(), mode: 'insensitive' } };
      }

      if (filters.category && filters.category !== 'ALL') {
        where.category = { slug: { equals: filters.category.toLowerCase(), mode: 'insensitive' } };
      }

      if (filters.publicationStatus && filters.publicationStatus !== 'ALL') {
        where.publicationStatus = filters.publicationStatus;
      }

      if (filters.priceStatus === 'CONFIRMED') {
        where.isPriceConfirmed = true;
      } else if (filters.priceStatus === 'UNCONFIRMED') {
        where.isPriceConfirmed = false;
      } else if (filters.priceStatus === 'MISSING') {
        where.demoPriceINR = null;
        where.confirmedPriceINR = null;
      }

      if (filters.q && filters.q.trim()) {
        const query = filters.q.trim();
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
          { modelNumber: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ];
      }

      const [totalCount, draftCount, publishedCount, demoCount, confirmedPriceCount, unconfirmedPriceCount, missingPriceCount] =
        await Promise.all([
          prisma.product.count(),
          prisma.product.count({ where: { publicationStatus: 'DRAFT' } }),
          prisma.product.count({ where: { publicationStatus: 'PUBLISHED' } }),
          prisma.product.count({ where: { publicationStatus: 'DEMO' } }),
          prisma.product.count({ where: { isPriceConfirmed: true } }),
          prisma.product.count({ where: { isPriceConfirmed: false } }),
          prisma.product.count({ where: { demoPriceINR: null, confirmedPriceINR: null } }),
        ]);

      const totalFiltered = await prisma.product.count({ where });
      const dbProducts = await prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ publicationStatus: 'asc' }, { updatedAt: 'desc' }],
        include: {
          brand: true,
          category: true,
          specifications: true,
          images: true,
        },
      });

      const categories = await prisma.category.findMany({
        select: { name: true, slug: true },
        orderBy: { name: 'asc' },
      });

      const brands = await prisma.brand.findMany({
        select: { name: true, slug: true },
        orderBy: { name: 'asc' },
      });

      const products: AdminProductItem[] = dbProducts.map((p) => {
        const missing: string[] = [];
        if (!p.demoPriceINR && !p.confirmedPriceINR && !p.mrpINR) missing.push('Price');
        if (!p.specifications || p.specifications.length === 0) missing.push('Specifications');
        if (!p.images || p.images.length === 0) missing.push('Images');
        if (!p.modelNumber) missing.push('Model Number');

        // Extract source metadata specification if present
        const srcUrlSpec = p.specifications.find((s) => s.key === 'Source URL');
        const srcDateSpec = p.specifications.find((s) => s.key === 'Retrieval Date');

        return {
          id: p.id,
          sku: p.sku,
          slug: p.slug,
          name: p.name,
          description: p.description,
          modelNumber: p.modelNumber || 'N/A',
          brand: p.brand.name,
          category: p.category.name,
          categorySlug: p.category.slug,
          mrpINR: p.mrpINR ? Number(p.mrpINR) : null,
          sourcePriceINR: p.demoPriceINR ? Number(p.demoPriceINR) : null,
          confirmedPriceINR: p.confirmedPriceINR ? Number(p.confirmedPriceINR) : null,
          isPriceConfirmed: p.isPriceConfirmed,
          warrantyInfo: p.warrantyInfo || 'Unconfirmed',
          isWarrantyConfirmed: p.isWarrantyConfirmed,
          publicationStatus: p.publicationStatus as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DEMO',
          isDemo: p.isDemo,
          specifications: p.specifications.map((s) => ({
            key: s.key,
            value: s.value,
            group: s.group || undefined,
          })),
          images: p.images.map((img) => ({
            imageUrl: img.imageUrl,
            altText: img.altText,
            isPrimary: img.isPrimary,
          })),
          sourceUrl: srcUrlSpec?.value,
          sourceRetrievalDate: srcDateSpec?.value,
          missingFields: missing,
        };
      });

      return {
        products,
        stats: {
          totalProducts: totalCount,
          draftCount,
          publishedCount,
          demoCount,
          confirmedPriceCount,
          unconfirmedPriceCount,
          missingPriceCount,
        },
        totalFiltered,
        totalPages: Math.ceil(totalFiltered / limit) || 1,
        currentPage: page,
        categories,
        brands,
        isDatabaseConnected: true,
      };
    } catch (err) {
      console.warn('[Admin Catalogue Service] Database query fallback:', err);
    }
  }

  // 2. Offline / Development Store Fallback
  initializeInMemoryStore();
  let list = Array.from(inMemoryAdminStore.values());

  const totalProducts = list.length;
  let draftCount = 0;
  let publishedCount = 0;
  let demoCount = 0;
  let confirmedPriceCount = 0;
  let unconfirmedPriceCount = 0;
  let missingPriceCount = 0;

  for (const item of list) {
    if (item.publicationStatus === 'DRAFT') draftCount++;
    else if (item.publicationStatus === 'PUBLISHED') publishedCount++;
    else if (item.publicationStatus === 'DEMO') demoCount++;

    if (item.isPriceConfirmed) confirmedPriceCount++;
    else unconfirmedPriceCount++;

    if (!item.sourcePriceINR && !item.confirmedPriceINR) missingPriceCount++;
  }

  // Apply in-memory filters
  if (filters.brand && filters.brand !== 'ALL') {
    list = list.filter((p) => p.brand.toLowerCase() === filters.brand?.toLowerCase());
  }

  if (filters.category && filters.category !== 'ALL') {
    list = list.filter((p) => p.categorySlug.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters.publicationStatus && filters.publicationStatus !== 'ALL') {
    list = list.filter((p) => p.publicationStatus === filters.publicationStatus);
  }

  if (filters.priceStatus === 'CONFIRMED') {
    list = list.filter((p) => p.isPriceConfirmed);
  } else if (filters.priceStatus === 'UNCONFIRMED') {
    list = list.filter((p) => !p.isPriceConfirmed);
  } else if (filters.priceStatus === 'MISSING') {
    list = list.filter((p) => !p.sourcePriceINR && !p.confirmedPriceINR);
  }

  if (filters.q && filters.q.trim()) {
    const qLower = filters.q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.sku.toLowerCase().includes(qLower) ||
        p.modelNumber.toLowerCase().includes(qLower) ||
        p.brand.toLowerCase().includes(qLower)
    );
  }

  const totalFiltered = list.length;
  const totalPages = Math.ceil(totalFiltered / limit) || 1;
  const paginated = list.slice((page - 1) * limit, page * limit);

  // Available categories & brands list
  const allCategoriesMap = new Map<string, string>();
  IMPORTED_PARENT_CATEGORIES.forEach((c) => allCategoriesMap.set(c.slug, c.name));
  IMPORTED_SUBCATEGORIES.forEach((c) => allCategoriesMap.set(c.slug, c.name));
  SEED_CATEGORIES.forEach((c) => allCategoriesMap.set(c.slug, c.name));

  const categories = Array.from(allCategoriesMap.entries()).map(([slug, name]) => ({ slug, name }));

  const allBrandsMap = new Map<string, string>();
  IMPORTED_BRANDS.forEach((b) => allBrandsMap.set(b.slug, b.name));
  SEED_BRANDS.forEach((b) => allBrandsMap.set(b.slug, b.name));
  const brands = Array.from(allBrandsMap.entries()).map(([slug, name]) => ({ slug, name }));

  return {
    products: paginated,
    stats: {
      totalProducts,
      draftCount,
      publishedCount,
      demoCount,
      confirmedPriceCount,
      unconfirmedPriceCount,
      missingPriceCount,
    },
    totalFiltered,
    totalPages,
    currentPage: page,
    categories,
    brands,
    isDatabaseConnected: false,
  };
}

/**
 * Updates a product's commercial review status (confirmed price, warranty, publication status).
 * Enforces server-side authentication and role restrictions.
 */
export async function updateProductReview(
  session: AuthSessionLike | null | undefined,
  input: UpdateProductReviewInput
): Promise<AdminProductItem> {
  assertAdminOrStaff(session);

  if (!input.productId) {
    throw new Error('Product ID is required.');
  }

  if (isDatabaseConfigured()) {
    try {
      const data: Record<string, unknown> = {};

      if (input.confirmedPriceINR !== undefined) {
        data.confirmedPriceINR = input.confirmedPriceINR;
        data.isPriceConfirmed = input.isPriceConfirmed ?? true;
      } else if (input.isPriceConfirmed !== undefined) {
        data.isPriceConfirmed = input.isPriceConfirmed;
      }

      if (input.warrantyInfo !== undefined) {
        data.warrantyInfo = input.warrantyInfo;
      }

      if (input.isWarrantyConfirmed !== undefined) {
        data.isWarrantyConfirmed = input.isWarrantyConfirmed;
      }

      if (input.publicationStatus !== undefined) {
        data.publicationStatus = input.publicationStatus;
      }

      if (input.description !== undefined) {
        data.description = input.description;
      }

      const updated = await prisma.product.update({
        where: { id: input.productId },
        data,
        include: {
          brand: true,
          category: true,
          specifications: true,
          images: true,
        },
      });

      return {
        id: updated.id,
        sku: updated.sku,
        slug: updated.slug,
        name: updated.name,
        description: updated.description,
        modelNumber: updated.modelNumber || 'N/A',
        brand: updated.brand.name,
        category: updated.category.name,
        categorySlug: updated.category.slug,
        mrpINR: updated.mrpINR ? Number(updated.mrpINR) : null,
        sourcePriceINR: updated.demoPriceINR ? Number(updated.demoPriceINR) : null,
        confirmedPriceINR: updated.confirmedPriceINR ? Number(updated.confirmedPriceINR) : null,
        isPriceConfirmed: updated.isPriceConfirmed,
        warrantyInfo: updated.warrantyInfo || 'Unconfirmed',
        isWarrantyConfirmed: updated.isWarrantyConfirmed,
        publicationStatus: updated.publicationStatus as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DEMO',
        isDemo: updated.isDemo,
        specifications: updated.specifications.map((s) => ({
          key: s.key,
          value: s.value,
          group: s.group || undefined,
        })),
        images: updated.images.map((img) => ({
          imageUrl: img.imageUrl,
          altText: img.altText,
          isPrimary: img.isPrimary,
        })),
        missingFields: [],
      };
    } catch (err) {
      console.warn('[Admin Catalogue Service] DB updateProductReview fallback:', err);
    }
  }

  // Fallback to in-memory store
  initializeInMemoryStore();
  const existing = inMemoryAdminStore.get(input.productId);
  if (!existing) {
    throw new Error(`Product not found with ID: ${input.productId}`);
  }

  if (input.confirmedPriceINR !== undefined) {
    existing.confirmedPriceINR = input.confirmedPriceINR;
    existing.isPriceConfirmed = input.isPriceConfirmed ?? true;
  } else if (input.isPriceConfirmed !== undefined) {
    existing.isPriceConfirmed = input.isPriceConfirmed;
  }

  if (input.warrantyInfo !== undefined) {
    existing.warrantyInfo = input.warrantyInfo;
  }

  if (input.isWarrantyConfirmed !== undefined) {
    existing.isWarrantyConfirmed = input.isWarrantyConfirmed;
  }

  if (input.publicationStatus !== undefined) {
    existing.publicationStatus = input.publicationStatus;
  }

  if (input.description !== undefined) {
    existing.description = input.description;
  }

  inMemoryAdminStore.set(input.productId, existing);
  return existing;
}

/**
 * Bulk approves selected products for public listing.
 */
export async function bulkApproveProducts(
  session: AuthSessionLike | null | undefined,
  productIds: string[]
): Promise<{ updatedCount: number }> {
  assertAdminOrStaff(session);

  if (!productIds || productIds.length === 0) {
    return { updatedCount: 0 };
  }

  if (isDatabaseConfigured()) {
    try {
      const res = await prisma.product.updateMany({
        where: { id: { in: productIds } },
        data: { publicationStatus: 'PUBLISHED' },
      });
      return { updatedCount: res.count };
    } catch (err) {
      console.warn('[Admin Catalogue Service] DB bulkApprove fallback:', err);
    }
  }

  initializeInMemoryStore();
  let count = 0;
  for (const id of productIds) {
    const item = inMemoryAdminStore.get(id);
    if (item) {
      item.publicationStatus = 'PUBLISHED';
      inMemoryAdminStore.set(id, item);
      count++;
    }
  }
  return { updatedCount: count };
}
