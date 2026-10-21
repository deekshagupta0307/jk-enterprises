'use server';

import {
  placeCustomerOrder,
  updateOrderPaymentUtr,
  PlaceOrderInput,
  OrderView,
} from './orderService';
import { getServerSession } from '@/lib/auth/session';

export interface OrderActionResult<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
  data?: T;
}

export interface PlacedOrderSummaryData {
  orderNumber: string;
  confirmedOrderNumber?: string | null;
  isOrderConfirmed: boolean;
  invoiceNumber: string;
  accessToken: string;
  totalAmountINR: number;
  paymentStatus: string;
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string | null;
  isDemo: boolean;
  isPersisted: boolean;
}

/**
 * Server Action: Places a manual payment attempt.
 * Validates shipping, verifies product pricing on the server, and returns payment attempt summary.
 */
export async function submitOrderAction(input: PlaceOrderInput): Promise<OrderActionResult<PlacedOrderSummaryData>> {
  try {
    const session = await getServerSession();
    const result = await placeCustomerOrder(input, session);

    if (!result.success || !result.order) {
      return {
        success: false,
        error: result.error || 'Failed to initialize payment attempt. Please review your details.',
        errors: {
          ...result.errors,
          ...(result.invalidProductId ? { invalidProductId: result.invalidProductId } : {}),
        },
      };
    }

    const order: OrderView = result.order;

    return {
      success: true,
      message: 'Payment attempt created. Please complete your manual payment using the instructions.',
      data: {
        orderNumber: order.orderNumber,
        confirmedOrderNumber: order.confirmedOrderNumber,
        isOrderConfirmed: order.isOrderConfirmed,
        invoiceNumber: order.invoiceNumber,
        accessToken: order.accessToken,
        totalAmountINR: order.totalAmountINR,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerWhatsapp: order.customerWhatsapp,
        isDemo: order.isDemo,
        isPersisted: order.isPersisted,
      },
    };
  } catch (err) {
    console.error('[Submit Order Error]:', err instanceof Error ? err.message : err);
    return {
      success: false,
      error: 'An unexpected error occurred while processing your checkout. Please try again.',
    };
  }
}

/**
 * Server Action: Submits a customer's payment UTR / Transaction Reference number.
 * Updates order to PAYMENT_UNDER_VERIFICATION.
 */
export async function submitPaymentUtrAction(
  orderNumber: string,
  utrNumber: string,
  notes?: string
): Promise<OrderActionResult> {
  try {
    const result = await updateOrderPaymentUtr(orderNumber, utrNumber, notes);
    return result;
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update transaction reference.',
    };
  }
}

/**
 * Server Action: Admin verification of manual bank/UPI payment against credit.
 * Restricted strictly to authorized ADMIN or STAFF members.
 */
export async function verifyPaymentAction(
  referenceNumber: string,
  action: 'CONFIRM' | 'REJECT',
  notes?: string
): Promise<OrderActionResult<OrderView>> {
  try {
    const session = await getServerSession();
    if (!session) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as an administrator or staff member.',
      };
    }

    const { verifyAndConfirmPaymentAttempt } = await import('./orderService');
    const result = await verifyAndConfirmPaymentAttempt(
      { referenceNumber, action, notes },
      session
    );

    return result;
  } catch (err) {
    console.error('[Verify Payment Action Error]:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to verify payment reference.',
    };
  }
}
