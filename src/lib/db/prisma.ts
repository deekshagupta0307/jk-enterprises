import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length === 0) return false;
  if (!trimmed.startsWith('postgresql://') && !trimmed.startsWith('postgres://')) return false;
  if (
    trimmed.includes('YOUR_PASSWORD') ||
    trimmed.includes('placeholder') ||
    trimmed.includes('replace-with') ||
    trimmed.includes('example.com')
  ) {
    return false;
  }
  return true;
}

/**
 * Safely sanitizes database error messages and connection strings,
 * ensuring no credentials, passwords, or connection URIs are exposed.
 */
export function sanitizeDatabaseError(error: unknown): string {
  if (!error) return 'Unknown database error';
  const rawMsg = error instanceof Error ? error.message : String(error);
  return rawMsg
    .replace(/postgres(?:ql)?:\/\/[^@\s'"]+@/gi, 'postgresql://***:***@')
    .replace(/(:|\/\/)([^:]+):([^@]+)@/g, '$1***:***@')
    .replace(/password(=|:\s*)[^;&\s]+/gi, 'password$1***');
}

/**
 * Safely verifies that PostgreSQL is reachable by executing a lightweight ping query (`SELECT 1`).
 * Returns `{ connected: true }` on success, or `{ connected: false, error: string }` on failure.
 * Database credentials in error messages are safely sanitized.
 */
export async function checkDatabaseConnectivity(timeoutMs: number = 8000): Promise<{ connected: boolean; error?: string }> {
  if (!isDatabaseConfigured()) {
    return {
      connected: false,
      error: 'DATABASE_URL is not configured or contains placeholder credentials in environment.',
    };
  }
  try {
    const client = getPrismaClient();
    const pingPromise = client.$queryRaw`SELECT 1`;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Database connection timed out after ${timeoutMs}ms`)), timeoutMs)
    );
    await Promise.race([pingPromise, timeoutPromise]);
    return { connected: true };
  } catch (err) {
    return { connected: false, error: sanitizeDatabaseError(err) };
  }
}

export function getPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || !isDatabaseConfigured()) {
    throw new Error(
      'PrismaClient cannot connect: DATABASE_URL is not configured or PostgreSQL connection is unavailable.'
    );
  }

  if (!globalThis.prismaGlobal) {
    const adapter = new PrismaPg({ connectionString });
    globalThis.prismaGlobal = new PrismaClient({ adapter });
  }

  return globalThis.prismaGlobal;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (isDatabaseConfigured()) {
      const client = getPrismaClient();
      return Reflect.get(client, prop);
    }
    // Return a safe nested proxy when DB is unconfigured so module inspection works
    return new Proxy({}, {
      get(_mTarget, methodProp) {
        return () => {
          throw new Error(
            `PrismaClient cannot execute "${String(prop)}.${String(methodProp)}": DATABASE_URL is not configured or PostgreSQL connection is unavailable.`
          );
        };
      },
    });
  },
});

export default prisma;
