import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/db/prisma';

export const DEV_FALLBACK_AUTH_SECRET =
  'jk-enterprises-dev-secret-key-32-chars-long-minimum-entropy';
export const BUILD_TIME_AUTH_SECRET =
  'build-time-static-eval-secret-only-not-for-runtime-use-32ch';

/**
 * Resolves the authentication secret with strict environment-aware security:
 * 1. In production runtime:
 *    - Fails securely (throws fatal error) if BETTER_AUTH_SECRET is absent, empty, < 32 chars,
 *      or uses development/placeholder fallback values.
 * 2. In build time (NEXT_PHASE === 'phase-production-build'):
 *    - Returns BUILD_TIME_AUTH_SECRET to allow static page evaluation and build verification to pass cleanly.
 * 3. In local development:
 *    - Falls back to DEV_FALLBACK_AUTH_SECRET if BETTER_AUTH_SECRET is not configured.
 */
export const getAuthSecret = (): string => {
  const secret = process.env.BETTER_AUTH_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

  // Build-time static compilation on Vercel or local machine
  if (isBuildPhase) {
    if (secret && secret.length >= 32) {
      return secret;
    }
    return BUILD_TIME_AUTH_SECRET;
  }

  // Production runtime (serving live requests)
  if (isProduction) {
    if (!secret || secret.trim().length === 0) {
      throw new Error(
        'FATAL [Security Gate]: BETTER_AUTH_SECRET environment variable is missing in production runtime. Refusing to initialize authentication.'
      );
    }
    if (
      secret.length < 32 ||
      secret === DEV_FALLBACK_AUTH_SECRET ||
      secret === BUILD_TIME_AUTH_SECRET ||
      secret.includes('placeholder') ||
      secret.includes('dev-secret')
    ) {
      throw new Error(
        'FATAL [Security Gate]: BETTER_AUTH_SECRET in production runtime must be a high-entropy secret of at least 32 characters. Development, build-time, or placeholder secrets are strictly prohibited.'
      );
    }
    return secret;
  }

  // Local development fallback
  return secret || DEV_FALLBACK_AUTH_SECRET;
};

/**
 * Resolves the application base URL, supporting explicit env configuration,
 * Vercel deployment URLs, and local development.
 */
export const getBaseURL = (): string => {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

/**
 * Compiles a list of trusted origins for CORS and CSRF protection.
 * Supports primary domain, Vercel preview/production URLs, and custom domain aliases.
 */
export const getTrustedOrigins = (): string[] => {
  const origins = new Set<string>();

  const base = getBaseURL();
  if (base) origins.add(base);

  if (process.env.BETTER_AUTH_URL) {
    origins.add(process.env.BETTER_AUTH_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.AUTH_TRUSTED_ORIGINS) {
    for (const origin of process.env.AUTH_TRUSTED_ORIGINS.split(',')) {
      const trimmed = origin.trim();
      if (trimmed) origins.add(trimmed);
    }
  }

  return Array.from(origins);
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: getAuthSecret(),
  baseURL: getBaseURL(),
  trustedOrigins: getTrustedOrigins(),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'CUSTOMER',
        input: false, // Strict: Prevent client input from setting role
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
});
