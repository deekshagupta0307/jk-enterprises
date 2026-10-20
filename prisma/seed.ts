import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { SEED_CATEGORIES, SEED_BRANDS, SEED_PRODUCTS } from './seedData';

function getPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is not defined. Please configure .env before running database seed.'
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

async function main() {
  console.log('--- JK Enterprises Database Seed (Demo Data Foundation) ---');
  const prisma = getPrismaClient();

  try {
    // 1. Upsert Categories
    console.log(`Seeding ${SEED_CATEGORIES.length} categories...`);
    const categoryMap = new Map<string, string>();
    for (const cat of SEED_CATEGORIES) {
      const record = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
        },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
        },
      });
      categoryMap.set(cat.slug, record.id);
    }

    // 2. Upsert Brands
    console.log(`Seeding ${SEED_BRANDS.length} brands...`);
    const brandMap = new Map<string, string>();
    for (const b of SEED_BRANDS) {
      const record = await prisma.brand.upsert({
        where: { slug: b.slug },
        update: {
          name: b.name,
          description: b.description,
        },
        create: {
          name: b.name,
          slug: b.slug,
          description: b.description,
        },
      });
      brandMap.set(b.slug, record.id);
    }

    // 3. Upsert Products, Specifications, and Inventory
    console.log(`Seeding ${SEED_PRODUCTS.length} demo hardware products...`);
    let seededCount = 0;

    for (const p of SEED_PRODUCTS) {
      const categoryId = categoryMap.get(p.categorySlug);
      const brandId = brandMap.get(p.brandSlug);

      if (!categoryId || !brandId) {
        console.warn(`Skipping product ${p.sku}: Missing category (${p.categorySlug}) or brand (${p.brandSlug})`);
        continue;
      }

      const product = await prisma.product.upsert({
        where: { sku: p.sku },
        update: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          modelNumber: p.modelNumber,
          categoryId,
          brandId,
          isDemo: true,
          publicationStatus: 'DEMO',
          demoPriceINR: p.demoPriceINR,
          mrpINR: p.mrpINR,
          isPriceConfirmed: false,
          warrantyInfo: p.warrantyInfo,
          isWarrantyConfirmed: false,
        },
        create: {
          sku: p.sku,
          name: p.name,
          slug: p.slug,
          description: p.description,
          modelNumber: p.modelNumber,
          categoryId,
          brandId,
          isDemo: true,
          publicationStatus: 'DEMO',
          demoPriceINR: p.demoPriceINR,
          mrpINR: p.mrpINR,
          isPriceConfirmed: false,
          warrantyInfo: p.warrantyInfo,
          isWarrantyConfirmed: false,
        },
      });

      // Clear existing specs and re-add for idempotency
      await prisma.productSpecification.deleteMany({
        where: { productId: product.id },
      });

      await prisma.productSpecification.createMany({
        data: p.specifications.map((s) => ({
          productId: product.id,
          key: s.key,
          value: s.value,
          isFilterable: s.isFilterable,
        })),
      });

      // Upsert InventoryRecord
      await prisma.inventoryRecord.upsert({
        where: { productId: product.id },
        update: {
          quantityOnHand: p.quantityOnHand,
          quantityReserved: p.quantityReserved,
          isStockConfirmed: false,
        },
        create: {
          productId: product.id,
          quantityOnHand: p.quantityOnHand,
          quantityReserved: p.quantityReserved,
          isStockConfirmed: false,
        },
      });

      seededCount++;
    }

    console.log(`✔ Successfully seeded ${seededCount} demo products idempotently.`);
  } catch (error) {
    console.error('Database connection or seed execution error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('[Prisma Seed] Process exited with error:', err.message);
  process.exit(1);
});
