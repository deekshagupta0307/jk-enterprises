'use server';

import {
  submitQuotationInquiry,
  SubmitQuotationInput,
  SubmitQuotationResult,
} from './quotationService';

/**
 * Server Action: Submits a quotation inquiry.
 * When database is configured, durably registers inquiry in PostgreSQL QuotationInquiry table.
 * When in production without database, fails securely with clear notice.
 */
export async function submitQuotationAction(
  input: SubmitQuotationInput
): Promise<SubmitQuotationResult> {
  try {
    return await submitQuotationInquiry(input);
  } catch (err) {
    return {
      success: false,
      inquiryNumber: '',
      isPersisted: false,
      isDemo: false,
      message: err instanceof Error ? err.message : 'Failed to submit quotation inquiry.',
    };
  }
}
