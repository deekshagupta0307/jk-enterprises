import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { sanitizeErrorMessage } from '@/lib/catalogue/catalogueService';

export interface SubmitQuotationInput {
  organizationName: string;
  contactName: string;
  district: string;
  requirementType: string;
  notes?: string;
}

export interface SubmitQuotationResult {
  success: boolean;
  inquiryNumber: string;
  isPersisted: boolean;
  isDemo: boolean;
  message: string;
}

/**
 * Validates and submits a quotation inquiry with strict privacy controls.
 * Contact information is stored exclusively in internal inquiry records and
 * is NEVER exposed through any public catalogue or search endpoint.
 */
export async function submitQuotationInquiry(
  input: SubmitQuotationInput
): Promise<SubmitQuotationResult> {
  // 1. Sanitize & Validate input
  const organizationName = (input.organizationName || '').trim().slice(0, 150);
  const contactName = (input.contactName || '').trim().slice(0, 100);
  const district = (input.district || '').trim().slice(0, 50);
  const requirementType = (input.requirementType || '').trim().slice(0, 100);
  const notes = (input.notes || '').trim().slice(0, 1000);

  if (!organizationName || !contactName) {
    throw new Error('Organization name and contact person are required fields.');
  }

  const generatedInquiryNum = `JK-INQ-${Date.now().toString(36).toUpperCase()}`;

  // 2. Persist to PostgreSQL if connected
  if (isDatabaseConfigured()) {
    try {
      await prisma.quotationInquiry.create({
        data: {
          inquiryNumber: generatedInquiryNum,
          organizationName,
          contactName,
          district,
          requirementType,
          notes,
          status: 'SUBMITTED',
          isDemo: true, // Marked as demo until commercial verification
        },
      });

      return {
        success: true,
        inquiryNumber: generatedInquiryNum,
        isPersisted: true,
        isDemo: true,
        message:
          'Your quotation inquiry has been securely registered in the internal database. Our commercial team will review specifications.',
      };
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        '[Quotation Service] Database persistence failed, returning safe simulation acknowledgment:',
        sanitizeErrorMessage(rawMsg)
      );
    }
  }

  // 3. Fallback simulation (when database is offline or unconfigured)
  return {
    success: true,
    inquiryNumber: generatedInquiryNum,
    isPersisted: false,
    isDemo: true,
    message:
      'Demo Simulation: Inquiry acknowledged. In production, this connects securely to our commercial sales desk.',
  };
}
