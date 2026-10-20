import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(url && url.trim().length > 0 && !url.includes('placeholder'));
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
