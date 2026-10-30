import type { MetadataRoute } from 'next';
import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { PublicationStatus } from '@prisma/client';

/**
 * Dynamic Sitemap Generator for JK Enterprises Rajasthan
 * 
 * Safeguards:
 * - Emits only verified, published, non-demo products (publicationStatus: PUBLISHED, isDemo: false).
 * - Emits only categories that contain at least one published, non-demo product.
 * - If the database is unconfigured or a query error occurs, fails safe to static indexable routes only.
 * - Never advertises demo catalogue items as verified commercial listings.
 * - Strips trailing slashes from baseUrl and supports production domain configuration.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.BETTER_AUTH_URL || 'https://jkenterprises-rajasthan.in').replace(/\/+$/, '');
  const currentDate = new Date().toISOString();

  // Core public static routes that are always eligible for search engine indexing
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/account/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/account/register`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // If database is offline or unconfigured, emit only verified static routes (no demo products)
  if (!isDatabaseConfigured()) {
    return staticRoutes;
  }

  try {
    // 1. Fetch only verified, published commercial products (strictly excluding DEMO records)
    const publishedProducts = await prisma.product.findMany({
      where: {
        publicationStatus: PublicationStatus.PUBLISHED,
        isDemo: false,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      take: 5000,
    });

    const productRoutes: MetadataRoute.Sitemap = publishedProducts.map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: prod.updatedAt ? prod.updatedAt.toISOString() : currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // 2. Fetch categories containing at least one published non-demo product
    const eligibleCategories = await prisma.category.findMany({
      where: {
        products: {
          some: {
            publicationStatus: PublicationStatus.PUBLISHED,
            isDemo: false,
          },
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const categoryRoutes: MetadataRoute.Sitemap = eligibleCategories.map((cat) => ({
      url: `${baseUrl}/catalogue?category=${cat.slug}`,
      lastModified: cat.updatedAt ? cat.updatedAt.toISOString() : currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch (err) {
    // Fail-safe: if database query fails during build or runtime, return only static routes
    // Never advertise unverified demo products on database failure
    console.warn(
      '[Sitemap Generation Notice]: Database query failed or unavailable. Emitting static routes only.',
      err instanceof Error ? err.message : err
    );
    return staticRoutes;
  }
}
