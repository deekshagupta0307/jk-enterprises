import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BETTER_AUTH_URL || 'https://jkenterprises-rajasthan.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/catalogue', '/catalogue/'],
        disallow: [
          '/account/',
          '/checkout',
          '/checkout/',
          '/orders/',
          '/api/',
          '/_not-found',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
