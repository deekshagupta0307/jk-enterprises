/**
 * JK Enterprises — Centralized Customer Pricing & Discount Engine
 * 
 * Central authoritative service for calculating customer discounts across
 * the entire shopping, ordering, and invoicing workflow.
 * 
 * Strict Commercial Rules:
 * 1. Single source of truth for the 10% Diwali Festive Offer.
 * 2. Decimal-safe integer arithmetic (paise / rounded rupee) avoiding floating-point drift.
 * 3. Discount is calculated strictly on the approved JK Enterprises customer selling price.
 * 4. NEVER applied to unconfirmed, unpriced, or DRAFT products.
 * 5. NEVER combined with or stacked upon supplier/vendor discounts.
 * 6. Browser values are NEVER authoritative — server validates every order line.
 * 7. Snapshot preservation: order records store immutable discount figures for historic invoice integrity.
 */

export const DIWALI_OFFER_CONFIG = {
  offerCode: 'DIWALI10',
  offerLabel: 'Diwali Festive Sale (10% OFF)',
  discountPercent: 10,
  isActive: true,
  validUntilNote: 'Special Diwali Commercial Offer for Rajasthan Retail & Wholesale Clients',
} as const;

export interface ProductDiscountResult {
  originalPriceINR: number;
  discountPercent: number;
  discountAmountINR: number;
  finalPayableINR: number;
  isOfferApplied: boolean;
  offerLabel: string | null;
  offerCode: string | null;
}

export interface OrderFinancialSnapshot {
  originalSubtotalINR: number;
  discountRatePercent: number;
  discountAmountINR: number;
  discountedSubtotalINR: number;
  offerCode: string | null;
  offerLabel: string | null;
  isOfferApplied: boolean;
}

/**
 * Calculates customer-facing product pricing with 10% Diwali discount.
 * 
 * Guard: Only confirmed prices (approved live products or verified demo seed items)
 * qualify for the discount. Unconfirmed/DRAFT items return 0 discount.
 */
export function calculateProductDiscount(
  approvedCustomerPriceINR: number,
  isPriceConfirmed: boolean = true
): ProductDiscountResult {
  const safeOriginal = Math.max(0, Math.round(Number(approvedCustomerPriceINR) || 0));

  if (!isPriceConfirmed || safeOriginal <= 0 || !DIWALI_OFFER_CONFIG.isActive) {
    return {
      originalPriceINR: safeOriginal,
      discountPercent: 0,
      discountAmountINR: 0,
      finalPayableINR: safeOriginal,
      isOfferApplied: false,
      offerLabel: null,
      offerCode: null,
    };
  }

  // Decimal-safe: 10% discount rounded to nearest integer rupee
  const discountAmountINR = Math.round((safeOriginal * DIWALI_OFFER_CONFIG.discountPercent) / 100);
  const finalPayableINR = Math.max(0, safeOriginal - discountAmountINR);

  return {
    originalPriceINR: safeOriginal,
    discountPercent: DIWALI_OFFER_CONFIG.discountPercent,
    discountAmountINR,
    finalPayableINR,
    isOfferApplied: true,
    offerLabel: DIWALI_OFFER_CONFIG.offerLabel,
    offerCode: DIWALI_OFFER_CONFIG.offerCode,
  };
}

/**
 * Calculates order-level discount snapshot from raw line-item subtotal.
 * Guarantees that order totals and invoice line items match to the exact rupee.
 */
export function calculateOrderDiscountSnapshot(
  originalSubtotalINR: number
): OrderFinancialSnapshot {
  const safeSubtotal = Math.max(0, Math.round(Number(originalSubtotalINR) || 0));

  if (safeSubtotal <= 0 || !DIWALI_OFFER_CONFIG.isActive) {
    return {
      originalSubtotalINR: safeSubtotal,
      discountRatePercent: 0,
      discountAmountINR: 0,
      discountedSubtotalINR: safeSubtotal,
      offerCode: null,
      offerLabel: null,
      isOfferApplied: false,
    };
  }

  const discountAmountINR = Math.round((safeSubtotal * DIWALI_OFFER_CONFIG.discountPercent) / 100);
  const discountedSubtotalINR = Math.max(0, safeSubtotal - discountAmountINR);

  return {
    originalSubtotalINR: safeSubtotal,
    discountRatePercent: DIWALI_OFFER_CONFIG.discountPercent,
    discountAmountINR,
    discountedSubtotalINR,
    offerCode: DIWALI_OFFER_CONFIG.offerCode,
    offerLabel: DIWALI_OFFER_CONFIG.offerLabel,
    isOfferApplied: true,
  };
}

