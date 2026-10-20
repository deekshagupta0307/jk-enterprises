import { headers } from 'next/headers';
import { auth } from './auth';
import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { sanitizeErrorMessage } from '@/lib/catalogue/catalogueService';
import {
  SystemRole,
  CustomerType,
  BusinessVerificationStatus,
  WholesaleApprovalStatus,
} from '@prisma/client';

export interface AuthenticatedUserSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: SystemRole;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
  };
  profile: {
    id: string;
    customerType: CustomerType;
    organizationName?: string | null;
    gstin?: string | null;
    businessVerificationStatus: BusinessVerificationStatus;
    businessVerificationNotes?: string | null;
    businessVerifiedAt?: Date | null;
    wholesaleApprovalStatus: WholesaleApprovalStatus;
    wholesaleApprovalNotes?: string | null;
    wholesaleApprovedAt?: Date | null;
    district?: string | null;
    state: string;
  } | null;
  session: {
    id: string;
    token: string;
    expiresAt: Date;
  };
}

/**
 * Validates the current incoming request session server-side.
 * Resolves User and associated CustomerProfile from PostgreSQL database.
 * Returns null if unauthenticated or if database is unconfigured.
 */
export async function getServerSession(): Promise<AuthenticatedUserSession | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const reqHeaders = await headers();
    const sessionRes = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!sessionRes || !sessionRes.user) {
      return null;
    }

    // Fetch user profile from database
    const profile = await prisma.customerProfile.findUnique({
      where: { userId: sessionRes.user.id },
    });

    return {
      user: {
        id: sessionRes.user.id,
        email: sessionRes.user.email,
        name: sessionRes.user.name,
        role: (sessionRes.user.role as SystemRole) || SystemRole.CUSTOMER,
        emailVerified: sessionRes.user.emailVerified,
        image: sessionRes.user.image,
        createdAt: sessionRes.user.createdAt,
      },
      profile: profile
        ? {
            id: profile.id,
            customerType: profile.customerType,
            organizationName: profile.organizationName,
            gstin: profile.gstin,
            businessVerificationStatus: profile.businessVerificationStatus,
            businessVerificationNotes: profile.businessVerificationNotes,
            businessVerifiedAt: profile.businessVerifiedAt,
            wholesaleApprovalStatus: profile.wholesaleApprovalStatus,
            wholesaleApprovalNotes: profile.wholesaleApprovalNotes,
            wholesaleApprovedAt: profile.wholesaleApprovedAt,
            district: profile.district,
            state: profile.state,
          }
        : null,
      session: {
        id: sessionRes.session.id,
        token: sessionRes.session.token,
        expiresAt: sessionRes.session.expiresAt,
      },
    };
  } catch (err) {
    const rawMsg = err instanceof Error ? err.message : String(err);
    console.warn(
      '[Session Resolution] Failed to resolve session (returning unauthenticated):',
      sanitizeErrorMessage(rawMsg)
    );
    return null;
  }
}
