'use server';

import { auth } from './auth';
import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { requireAuth } from './authorization';
import {
  CustomerType,
  BusinessVerificationStatus,
  WholesaleApprovalStatus,
} from '@prisma/client';

export interface ActionResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  isDatabaseConnected?: boolean;
}

/**
 * Server action: Registers a new customer account.
 * Strict safeguards:
 * - Assigns role = CUSTOMER unconditionally.
 * - If user requests BUSINESS, verification is initialized to PENDING (never verified).
 * - If user requests WHOLESALE, approval is initialized to PENDING (never approved).
 * - Offline guard: Does not invent accounts if database is not connected.
 */
export async function registerCustomerAction(formData: {
  name: string;
  email: string;
  password: string;
  customerType?: 'RETAIL' | 'BUSINESS' | 'WHOLESALE';
  organizationName?: string;
  gstin?: string;
  district?: string;
  phone?: string;
}): Promise<ActionResponse> {
  if (!isDatabaseConfigured()) {
    return {
      success: false,
      error:
        'PostgreSQL database is currently unconfigured or offline. Customer accounts cannot be persisted in this demo sandbox.',
      isDatabaseConnected: false,
    };
  }

  // 1. Validation
  const name = (formData.name || '').trim();
  const email = (formData.email || '').trim().toLowerCase();
  const password = formData.password || '';

  if (!name || name.length < 2) {
    return { success: false, error: 'Full name must be at least 2 characters.' };
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!password || password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const requestedType =
    formData.customerType === 'BUSINESS'
      ? CustomerType.BUSINESS
      : formData.customerType === 'WHOLESALE'
        ? CustomerType.WHOLESALE
        : CustomerType.RETAIL;

  try {
    // 2. Register User via Better Auth (role is locked to CUSTOMER by config)
    const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!user || !user.user) {
      return { success: false, error: 'Failed to create account.' };
    }

    const userId = user.user.id;

    // 3. Create initial CustomerProfile with unverified status
    await prisma.customerProfile.create({
      data: {
        userId,
        customerType: requestedType,
        organizationName: (formData.organizationName || '').trim().slice(0, 150) || null,
        gstin: (formData.gstin || '').trim().slice(0, 20) || null,
        phone: (formData.phone || '').trim().slice(0, 20) || null,
        district: (formData.district || '').trim().slice(0, 50) || null,
        // Statuses are strictly pending/unverified
        businessVerificationStatus:
          requestedType === CustomerType.BUSINESS || requestedType === CustomerType.WHOLESALE
            ? BusinessVerificationStatus.PENDING
            : BusinessVerificationStatus.UNVERIFIED,
        wholesaleApprovalStatus:
          requestedType === CustomerType.WHOLESALE
            ? WholesaleApprovalStatus.PENDING
            : WholesaleApprovalStatus.NONE,
      },
    });

    return {
      success: true,
      message:
        requestedType === CustomerType.WHOLESALE
          ? 'Account created. Your wholesale partner registration is pending administrative approval.'
          : requestedType === CustomerType.BUSINESS
            ? 'Account created. Business verification is under review.'
            : 'Customer account created successfully.',
    };
  } catch (err) {
    console.warn('[Register Customer Error]:', err instanceof Error ? err.message : err);
    return {
      success: false,
      error:
        err instanceof Error && err.message.includes('already exists')
          ? 'An account with this email address already exists.'
          : 'Failed to complete registration. Please verify database connection.',
    };
  }
}

/**
 * Server action: Customer sign in.
 */
export async function loginCustomerAction(formData: {
  email: string;
  password: string;
}): Promise<ActionResponse> {
  if (!isDatabaseConfigured()) {
    return {
      success: false,
      error:
        'PostgreSQL database is currently unconfigured or offline. Sign-in is disabled in this demo sandbox.',
      isDatabaseConnected: false,
    };
  }

  const email = (formData.email || '').trim().toLowerCase();
  const password = formData.password || '';

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!res || !res.user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    return { success: true, message: 'Signed in successfully.' };
  } catch (err) {
    console.warn('[Login Error]:', err instanceof Error ? err.message : err);
    return {
      success: false,
      error: 'Invalid email or password. Please verify your credentials.',
    };
  }
}

/**
 * Server action: Sign out.
 */
export async function logoutCustomerAction(): Promise<ActionResponse> {
  if (!isDatabaseConfigured()) {
    return { success: true, message: 'Signed out.' };
  }

  try {
    await auth.api.signOut();
    return { success: true, message: 'Signed out successfully.' };
  } catch (err) {
    console.warn('[SignOut Error]:', err instanceof Error ? err.message : err);
    return { success: true };
  }
}

/**
 * Server action: Request wholesale trade status.
 * Requires user to be signed in. Updates status to PENDING.
 */
export async function requestWholesaleApprovalAction(input: {
  organizationName: string;
  gstin?: string;
  district: string;
  applicationNotes?: string;
}): Promise<ActionResponse> {
  const session = await requireAuth();

  if (!isDatabaseConfigured()) {
    return {
      success: false,
      error: 'Database is unconfigured. Wholesale application requires a connected database.',
    };
  }

  const organizationName = (input.organizationName || '').trim().slice(0, 150);
  const district = (input.district || '').trim().slice(0, 50);

  if (!organizationName || !district) {
    return {
      success: false,
      error: 'Organization / Business name and District are required for wholesale application.',
    };
  }

  try {
    await prisma.customerProfile.upsert({
      where: { userId: session.user.id },
      update: {
        customerType: CustomerType.WHOLESALE,
        organizationName,
        gstin: (input.gstin || '').trim().slice(0, 20) || null,
        district,
        wholesaleApprovalStatus: WholesaleApprovalStatus.PENDING,
        wholesaleApprovalNotes: (input.applicationNotes || '').trim().slice(0, 500) || null,
      },
      create: {
        userId: session.user.id,
        customerType: CustomerType.WHOLESALE,
        organizationName,
        gstin: (input.gstin || '').trim().slice(0, 20) || null,
        district,
        wholesaleApprovalStatus: WholesaleApprovalStatus.PENDING,
        wholesaleApprovalNotes: (input.applicationNotes || '').trim().slice(0, 500) || null,
      },
    });

    return {
      success: true,
      message:
        'Wholesale partner application submitted. Status is now PENDING administrative verification.',
    };
  } catch (err) {
    console.warn('[Wholesale Request Error]:', err instanceof Error ? err.message : err);
    return {
      success: false,
      error: 'Failed to submit wholesale application. Please try again later.',
    };
  }
}
