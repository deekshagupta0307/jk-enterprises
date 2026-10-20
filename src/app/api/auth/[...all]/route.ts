import { auth } from '@/lib/auth/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { isDatabaseConfigured } from '@/lib/db/prisma';
import { sanitizeErrorMessage } from '@/lib/catalogue/catalogueService';
import { NextResponse } from 'next/server';

const authHandlers = toNextJsHandler(auth);

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          'PostgreSQL database is currently unconfigured or offline. Real customer account authentication requires an active PostgreSQL connection.',
        isDatabaseConnected: false,
      },
      { status: 503 }
    );
  }

  try {
    return await authHandlers.GET(request);
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    console.warn('[Better Auth GET error]:', sanitizeErrorMessage(raw));
    return NextResponse.json(
      { error: 'Authentication service temporarily unavailable.', isDatabaseConnected: false },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          'PostgreSQL database is currently unconfigured or offline. Real customer account authentication requires an active PostgreSQL connection.',
        isDatabaseConnected: false,
      },
      { status: 503 }
    );
  }

  try {
    return await authHandlers.POST(request);
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    console.warn('[Better Auth POST error]:', sanitizeErrorMessage(raw));
    return NextResponse.json(
      { error: 'Authentication service temporarily unavailable.', isDatabaseConnected: false },
      { status: 503 }
    );
  }
}
