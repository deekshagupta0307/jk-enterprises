'use server';

import { getServerSession } from '@/lib/auth/session';
import {
  getAdminCatalogueData,
  updateProductReview,
  bulkApproveProducts,
  AdminCatalogueFilters,
  AdminCatalogueResponse,
  UpdateProductReviewInput,
  AdminProductItem,
} from './catalogueAdminService';

export interface AdminActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Fetches filtered catalogue data for the administrative review desk.
 * Requires ADMIN or STAFF authorization.
 */
export async function getAdminCatalogueDataAction(
  filters: AdminCatalogueFilters = {}
): Promise<AdminActionResult<AdminCatalogueResponse>> {
  try {
    const session = await getServerSession();
    if (!session) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as staff or administrator.',
      };
    }

    const data = await getAdminCatalogueData(session, filters);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to retrieve catalogue review data.',
    };
  }
}

/**
 * Server Action: Updates commercial attributes of an imported product (verified selling price, warranty, publication status).
 * Restricted strictly to authorized ADMIN or STAFF members.
 */
export async function updateProductReviewAction(
  input: UpdateProductReviewInput
): Promise<AdminActionResult<AdminProductItem>> {
  try {
    const session = await getServerSession();
    if (!session) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as staff or administrator.',
      };
    }

    const updated = await updateProductReview(session, input);
    return { success: true, data: updated };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update product review status.',
    };
  }
}

/**
 * Server Action: Bulk publishes approved products.
 * Restricted strictly to authorized ADMIN or STAFF members.
 */
export async function bulkApproveProductsAction(
  productIds: string[]
): Promise<AdminActionResult<{ updatedCount: number }>> {
  try {
    const session = await getServerSession();
    if (!session) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as staff or administrator.',
      };
    }

    const result = await bulkApproveProducts(session, productIds);
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to bulk approve products.',
    };
  }
}
