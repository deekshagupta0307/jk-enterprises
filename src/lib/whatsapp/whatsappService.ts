import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';

export interface WhatsAppOrderSummary {
  orderNumber: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    priceINR: number;
  }>;
  totalAmountINR: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentReferenceUTR?: string | null;
  deliveryCityOrDistrict?: string;
  customerWhatsapp?: string | null;
  isConfirmed?: boolean;
}

export interface WhatsAppProductInquiry {
  productName: string;
  sku: string;
  category?: string;
  priceINR?: number;
}

/**
 * Normalizes phone numbers to standard international digits without symbols for wa.me links
 */
export function getSanitizedWhatsAppNumber(rawNumber: string = BUSINESS_CONFIG.whatsappNumber): string {
  // Strip non-digit characters
  const digits = rawNumber.replace(/\D/g, '');
  // Default to India country code 91 if 10 digits provided
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Builds a direct WhatsApp chat URL with a concise, pre-filled order inquiry message.
 * Safe: Uses encodeURIComponent to prevent injection or broken URLs.
 * Privacy: Does not expose credit card numbers or sensitive internal tokens.
 */
export function generateWhatsAppOrderLink(order: WhatsAppOrderSummary): {
  url: string;
  rawMessage: string;
  phoneNumber: string;
} {
  const cleanNumber = getSanitizedWhatsAppNumber();

  const itemListText = (order.items || [])
    .map((item, index) => `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.priceINR.toLocaleString('en-IN')}`)
    .join('\n');

  const utrNotice = order.paymentReferenceUTR
    ? `\n*Bank / UPI UTR Reference:* ${order.paymentReferenceUTR}`
    : '\n*Payment:* Manual UPI / Bank Transfer pending';

  const rawMessage = [
    `*Namaste JK Enterprises (Sales Desk),*`,
    order.isConfirmed
      ? `I have a confirmed order on your website and would like to check dispatch status.`
      : `I have submitted a payment attempt on your website and request verification of my transfer.`,
    ``,
    `*Reference Number:* ${order.orderNumber}`,
    `*Customer Name:* ${order.customerName}`,
    order.customerWhatsapp ? `*WhatsApp Mobile:* ${order.customerWhatsapp}` : null,
    order.deliveryCityOrDistrict ? `*Delivery Destination:* ${order.deliveryCityOrDistrict}, Rajasthan` : null,
    `*Status:* ${order.paymentStatus}`,
    utrNotice,
    ``,
    `*Items:*`,
    itemListText,
    ``,
    `*Payable Amount:* ₹${order.totalAmountINR.toLocaleString('en-IN')}`,
    ``,
    `Kindly confirm receipt of funds and expected dispatch.`,
  ]
    .filter(Boolean)
    .join('\n');

  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(rawMessage)}`;

  return {
    url,
    rawMessage,
    phoneNumber: cleanNumber,
  };
}

/**
 * Builds a direct WhatsApp chat URL to enquire about a specific hardware product
 */
export function generateWhatsAppProductLink(product: WhatsAppProductInquiry): {
  url: string;
  rawMessage: string;
} {
  const cleanNumber = getSanitizedWhatsAppNumber();

  const priceText = product.priceINR ? ` (Listed Price: ₹${product.priceINR.toLocaleString('en-IN')})` : '';

  const rawMessage = [
    `*Namaste JK Enterprises,*`,
    `I am interested in procuring the following hardware item:`,
    ``,
    `*Product:* ${product.productName}${priceText}`,
    `*SKU:* ${product.sku}`,
    product.category ? `*Category:* ${product.category}` : null,
    ``,
    `Could you please share commercial availability, warranty terms, and institutional / wholesale quantity rates?`,
  ]
    .filter(Boolean)
    .join('\n');

  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(rawMessage)}`;

  return {
    url,
    rawMessage,
  };
}

export const WHATSAPP_DISCLAIMER =
  'Note: Opening WhatsApp prepares a message in your WhatsApp application. Sending the message communicates directly with our sales desk; it does not automatically mark an order as paid.';
