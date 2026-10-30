import { prisma, checkDatabaseConnectivity, sanitizeDatabaseError } from '@/lib/db/prisma';
import {
  IMPORTED_PARENT_CATEGORIES,
  IMPORTED_SUBCATEGORIES,
  IMPORTED_BRANDS,
  IMPORTED_PRODUCTS,
} from '@/data/importedCatalogueData';

export interface ImportOptions {
  dryRun?: boolean;
  forcePriceOverwrite?: boolean;
  allowOfflineValidation?: boolean;
  batchSize?: number;
}

export interface ImportReport {
  timestamp: string;
  isDryRun: boolean;
  isDatabaseConnected: boolean;
  isOfflineValidation?: boolean;
  databaseNotice?: string;
  categories: {
    parentCategories: number;
    subcategories: number;
    reused: number;
    wouldCreate: number;
    created: number; // Actually created in DB (0 in dry-run)
  };
  brands: {
    total: number;
    reused: number;
    wouldCreate: number;
    created: number; // Actually created in DB (0 in dry-run)
  };
  products: {
    totalEvaluated: number;
    wouldCreate: number; // In dry run
    wouldUpdate: number; // In dry run
    created: number;     // Actually created in DB (0 in dry-run)
    updated: number;     // Actually updated in DB (0 in dry-run)
    skipped: number;
    priceSafeguarded: number;
  };
  brandBreakdown: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  dataCompleteness: {
    withModelNumber: number;
    withMrp: number;
    withSourcePrice: number;
    withSpecifications: number;
    withImages: number;
    missingSourcePrice: number;
  };
  unaccessedSources: {
    name: string;
    url: string;
    reason: string;
  }[];
  errors: string[];
}

/**
 * Idempotently imports or updates the expanded product catalogue.
 * Supports --dry-run mode and safeguards already confirmed business prices.
 * Fails closed if the database cannot be connected.
 */
export async function importCatalogue(options: ImportOptions = {}): Promise<ImportReport> {
  const isDryRun = options.dryRun ?? false;
  const forcePriceOverwrite = options.forcePriceOverwrite ?? false;
  const allowOfflineValidation = options.allowOfflineValidation ?? false;

  const report: ImportReport = {
    timestamp: new Date().toISOString(),
    isDryRun,
    isDatabaseConnected: false,
    categories: {
      parentCategories: IMPORTED_PARENT_CATEGORIES.length,
      subcategories: IMPORTED_SUBCATEGORIES.length,
      reused: 0,
      wouldCreate: 0,
      created: 0,
    },
    brands: {
      total: IMPORTED_BRANDS.length,
      reused: 0,
      wouldCreate: 0,
      created: 0,
    },
    products: {
      totalEvaluated: IMPORTED_PRODUCTS.length,
      wouldCreate: 0,
      wouldUpdate: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      priceSafeguarded: 0,
    },
    brandBreakdown: {},
    categoryBreakdown: {},
    dataCompleteness: {
      withModelNumber: 0,
      withMrp: 0,
      withSourcePrice: 0,
      withSpecifications: 0,
      withImages: 0,
      missingSourcePrice: 0,
    },
    unaccessedSources: [
      {
        name: 'HP India Care Packs & Device Services',
        url: 'https://www.hp.com/in-en/shop/listings/accessories',
        reason: 'Excluded non-hardware warranty service SKUs to focus strictly on physical IT peripherals and accessories.',
      },
    ],
    errors: [],
  };

  // 1. Calculate static completeness metrics from source dataset
  for (const p of IMPORTED_PRODUCTS) {
    report.brandBreakdown[p.brand] = (report.brandBreakdown[p.brand] || 0) + 1;
    report.categoryBreakdown[p.categorySlug] = (report.categoryBreakdown[p.categorySlug] || 0) + 1;

    if (p.modelNumber && p.modelNumber !== 'N/A') report.dataCompleteness.withModelNumber++;
    if (p.mrpINR && p.mrpINR > 0) report.dataCompleteness.withMrp++;
    if (p.sourcePriceINR && p.sourcePriceINR > 0) report.dataCompleteness.withSourcePrice++;
    else report.dataCompleteness.missingSourcePrice++;
    if (p.specifications && p.specifications.length > 0) report.dataCompleteness.withSpecifications++;
    if (p.images && p.images.length > 0) report.dataCompleteness.withImages++;
  }

  // 2. Truthful Database Verification
  const dbHealth = await checkDatabaseConnectivity();
  report.isDatabaseConnected = dbHealth.connected;

  if (!dbHealth.connected) {
    report.databaseNotice = dbHealth.error || 'Database connection is unavailable.';

    if (!allowOfflineValidation) {
      report.errors.push(`Database connection failed: ${dbHealth.error || 'Unable to connect to PostgreSQL.'}`);
      // Fail closed: zero created, zero updated, zero wouldCreate
      return report;
    }

    // Offline dataset-only validation mode
    report.isOfflineValidation = true;
    report.databaseNotice = 'Offline dataset-only validation. Zero database records were read or modified.';

    const seenSkus = new Set<string>();
    const seenSlugs = new Set<string>();

    for (const p of IMPORTED_PRODUCTS) {
      if (seenSkus.has(p.sku)) {
        report.errors.push(`Duplicate SKU detected: ${p.sku}`);
      }
      seenSkus.add(p.sku);

      if (seenSlugs.has(p.slug)) {
        report.errors.push(`Duplicate slug detected: ${p.slug}`);
      }
      seenSlugs.add(p.slug);
    }

    return report;
  }

  // 3. Database is confirmed connected: Run live or dry-run database matching
  try {
    // A. Parent Categories
    const categoryMap = new Map<string, string>(); // slug -> id

    for (const parent of IMPORTED_PARENT_CATEGORIES) {
      const existing = await prisma.category.findFirst({
        where: { slug: { equals: parent.slug, mode: 'insensitive' } },
      });

      if (existing) {
        report.categories.reused++;
        categoryMap.set(parent.slug, existing.id);
        if (!isDryRun) {
          await prisma.category.update({
            where: { id: existing.id },
            data: {
              name: existing.name,
              description: existing.description || parent.description,
              icon: existing.icon || parent.icon,
            },
          });
        }
      } else {
        if (isDryRun) {
          report.categories.wouldCreate++;
          categoryMap.set(parent.slug, `dry-cat-${parent.slug}`);
        } else {
          report.categories.created++;
          const created = await prisma.category.create({
            data: {
              name: parent.name,
              slug: parent.slug,
              description: parent.description,
              icon: parent.icon,
            },
          });
          categoryMap.set(parent.slug, created.id);
        }
      }
    }

    // B. Subcategories
    for (const sub of IMPORTED_SUBCATEGORIES) {
      const parentId = sub.parentSlug ? categoryMap.get(sub.parentSlug) : undefined;
      const existing = await prisma.category.findFirst({
        where: { slug: { equals: sub.slug, mode: 'insensitive' } },
      });

      if (existing) {
        report.categories.reused++;
        categoryMap.set(sub.slug, existing.id);
        if (!isDryRun) {
          // Strictly preserve existing hierarchy: do not alter existing.parentId (e.g. networking, monitors, ups-power)
          await prisma.category.update({
            where: { id: existing.id },
            data: {
              name: existing.name,
              description: existing.description || sub.description,
              parentId: existing.parentId,
            },
          });
        }
      } else {
        if (isDryRun) {
          report.categories.wouldCreate++;
          categoryMap.set(sub.slug, `dry-cat-${sub.slug}`);
        } else {
          report.categories.created++;
          const created = await prisma.category.create({
            data: {
              name: sub.name,
              slug: sub.slug,
              description: sub.description,
              parentId: parentId && !parentId.startsWith('dry-') ? parentId : null,
            },
          });
          categoryMap.set(sub.slug, created.id);
        }
      }
    }

    // C. Brands
    const brandMap = new Map<string, string>(); // slug -> id

    for (const brand of IMPORTED_BRANDS) {
      const existing = await prisma.brand.findFirst({
        where: { slug: { equals: brand.slug, mode: 'insensitive' } },
      });

      if (existing) {
        report.brands.reused++;
        brandMap.set(brand.slug, existing.id);
      } else {
        if (isDryRun) {
          report.brands.wouldCreate++;
          brandMap.set(brand.slug, `dry-brand-${brand.slug}`);
        } else {
          report.brands.created++;
          const created = await prisma.brand.create({
            data: {
              name: brand.name,
              slug: brand.slug,
              description: brand.description,
            },
          });
          brandMap.set(brand.slug, created.id);
        }
      }
    }

    // D. Products
    for (const prod of IMPORTED_PRODUCTS) {
      try {
        const brandId = brandMap.get(prod.brand.toLowerCase());
        const categoryId = categoryMap.get(prod.categorySlug);

        if (!brandId || !categoryId) {
          report.products.skipped++;
          report.errors.push(`Product "${prod.name}" skipped: Category (${prod.categorySlug}) or Brand (${prod.brand}) missing.`);
          continue;
        }

        // Check if product already exists by SKU, Slug, or (Brand + ModelNumber)
        const orConditions: Record<string, unknown>[] = [
          { sku: prod.sku },
          { slug: prod.slug },
        ];
        if (!brandId.startsWith('dry-')) {
          orConditions.push({
            AND: [
              { brandId: brandId },
              { modelNumber: prod.modelNumber },
            ],
          });
        }

        const existingProduct = await prisma.product.findFirst({
          where: { OR: orConditions },
        });

        if (isDryRun) {
          if (existingProduct) {
            report.products.wouldUpdate++;
            if (existingProduct.isPriceConfirmed && !forcePriceOverwrite) {
              report.products.priceSafeguarded++;
            }
          } else {
            report.products.wouldCreate++;
          }
          continue; // Zero database mutations during dry-run
        }

        // Execute Live Write (Only when !isDryRun)
        if (existingProduct) {
          const isPriceLocked = existingProduct.isPriceConfirmed && !forcePriceOverwrite;
          if (isPriceLocked) {
            report.products.priceSafeguarded++;
          }

          // Atomically update product metadata, specifications, and images in a durable transaction
          await prisma.$transaction(async (tx) => {
            await tx.product.update({
              where: { id: existingProduct.id },
              data: {
                name: prod.name,
                description: prod.description,
                modelNumber: prod.modelNumber,
                categoryId,
                brandId,
                mrpINR: prod.mrpINR ? prod.mrpINR : existingProduct.mrpINR,
                demoPriceINR: isPriceLocked ? existingProduct.demoPriceINR : (prod.sourcePriceINR || existingProduct.demoPriceINR),
                warrantyInfo: prod.warrantyInfo,
                publicationStatus: existingProduct.publicationStatus === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
              },
            });

            await tx.productSpecification.deleteMany({ where: { productId: existingProduct.id } });
            if (prod.specifications.length > 0) {
              await tx.productSpecification.createMany({
                data: prod.specifications.map((s) => ({
                  productId: existingProduct.id,
                  group: s.group || 'Technical Details',
                  key: s.key,
                  value: s.value,
                  isFilterable: s.isFilterable,
                })),
              });
            }

            await tx.productImage.deleteMany({ where: { productId: existingProduct.id } });
            if (prod.images.length > 0) {
              await tx.productImage.createMany({
                data: prod.images.map((img, idx) => ({
                  productId: existingProduct.id,
                  imageUrl: img.imageUrl,
                  altText: img.altText,
                  isPrimary: img.isPrimary,
                  sortOrder: idx,
                })),
              });
            }
          });

          report.products.updated++;
        } else {
          // Create new unreviewed DRAFT product
          await prisma.product.create({
            data: {
              sku: prod.sku,
              slug: prod.slug,
              name: prod.name,
              description: prod.description,
              modelNumber: prod.modelNumber,
              brandId,
              categoryId,
              publicationStatus: 'DRAFT',
              isDemo: false,
              demoPriceINR: prod.sourcePriceINR,
              mrpINR: prod.mrpINR,
              isPriceConfirmed: false,
              warrantyInfo: prod.warrantyInfo,
              isWarrantyConfirmed: false,
              customerSegments: ['RETAIL', 'INSTITUTIONAL', 'WHOLESALE'],
              inventory: {
                create: {
                  quantityOnHand: 0,
                  quantityReserved: 0,
                  isStockConfirmed: false,
                  location: 'Warehouse - Bikaner Pending Verification',
                },
              },
              specifications: {
                create: prod.specifications.map((s) => ({
                  group: s.group || 'Technical Details',
                  key: s.key,
                  value: s.value,
                  isFilterable: s.isFilterable,
                })),
              },
              images: {
                create: prod.images.map((img, idx) => ({
                  imageUrl: img.imageUrl,
                  altText: img.altText,
                  isPrimary: img.isPrimary,
                  sortOrder: idx,
                })),
              },
            },
          });

          report.products.created++;
        }
      } catch (prodErr) {
        report.errors.push(`Failed product "${prod.name}" (${prod.sku}): ${sanitizeDatabaseError(prodErr)}`);
      }
    }
  } catch (err) {
    report.errors.push(`Catalogue import fatal error: ${sanitizeDatabaseError(err)}`);
  }

  return report;
}
