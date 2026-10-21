import {
  DELIVERY_RULES,
  RAJASTHAN_DISTRICTS,
  DeliveryRule,
} from '@/lib/config/businessConfig';
import {
  validateIndianMobile,
  validateWhatsAppNumber,
} from '@/lib/validation/phoneValidation';

export interface ShippingAddressInput {
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  organizationName?: string;
  gstin?: string;
  addressLine1: string;
  addressLine2?: string;
  district: string;
  pinCode: string;
  state: string;
}

export interface DeliveryValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedInput?: ShippingAddressInput;
  deliveryRule?: DeliveryRule;
  deliveryFeeINR?: number;
  isFreeDelivery?: boolean;
}

export interface CalculatedOrderBreakdown {
  subtotalINR: number;
  deliveryFeeINR: number;
  taxableSubtotalINR: number;
  cgstINR: number;
  sgstINR: number;
  igstINR: number;
  totalTaxINR: number;
  totalINR: number;
  isInterstate: boolean;
  deliveryZoneName: string;
  deliveryTimeline: string;
}

/**
 * Validates shipping address fields and determines delivery feasibility.
 */
export function validateShippingAddress(
  input: Partial<ShippingAddressInput>,
  subtotalINR: number = 0
): DeliveryValidationResult {
  const errors: Record<string, string> = {};

  const customerName = (input.customerName || '').trim();
  const email = (input.email || '').trim().toLowerCase();
  const rawPhone = input.phone || '';
  const rawWhatsapp = input.whatsapp || '';
  const addressLine1 = (input.addressLine1 || '').trim();
  const addressLine2 = (input.addressLine2 || '').trim();
  const district = (input.district || '').trim();
  const pinCode = (input.pinCode || '').trim();
  const state = (input.state || 'Rajasthan').trim();
  const organizationName = (input.organizationName || '').trim();
  const gstin = (input.gstin || '').trim().toUpperCase();

  // Name validation
  if (!customerName || customerName.length < 2) {
    errors.customerName = 'Please enter a valid full name (at least 2 characters).';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address for order notifications and invoices.';
  }

  // Primary Phone Number validation (strict 10-digit Indian mobile)
  const phoneVal = validateIndianMobile(rawPhone, false);
  if (!phoneVal.isValid) {
    errors.phone = phoneVal.error || 'Please enter a valid 10-digit Indian mobile number for delivery coordination.';
  }

  // Optional WhatsApp Mobile Number validation
  let cleanWhatsapp: string | undefined = undefined;
  if (rawWhatsapp && rawWhatsapp.trim()) {
    const whatsappVal = validateWhatsAppNumber(rawWhatsapp, true);
    if (!whatsappVal.isValid) {
      errors.whatsapp = whatsappVal.error || 'Please enter a valid WhatsApp mobile number.';
    } else {
      cleanWhatsapp = whatsappVal.normalized;
    }
  }

  // Address Line 1
  if (!addressLine1 || addressLine1.length < 5) {
    errors.addressLine1 = 'Please enter a complete street address or building details (min 5 characters).';
  }

  // PIN Code validation (Standard 6-digit Indian Postal PIN)
  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinCode || !pinRegex.test(pinCode)) {
    errors.pinCode = 'Please enter a valid 6-digit Indian PIN code (e.g. 334001).';
  }

  // District validation
  if (!district) {
    errors.district = 'Please select your delivery district.';
  }

  // GSTIN format validation if supplied
  if (gstin) {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstinRegex.test(gstin)) {
      errors.gstin = 'Invalid GSTIN format. Expected standard 15-character Indian GSTIN.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  // Determine delivery rule
  const isBikanerLocal = district.toLowerCase() === 'bikaner' && state.toLowerCase() === 'rajasthan';
  const isRajasthan =
    state.toLowerCase() === 'rajasthan' ||
    RAJASTHAN_DISTRICTS.some((d) => d.toLowerCase() === district.toLowerCase());

  let rule: DeliveryRule;
  if (isBikanerLocal) {
    rule = DELIVERY_RULES.BIKANER_LOCAL;
  } else if (isRajasthan) {
    rule = DELIVERY_RULES.RAJASTHAN_REGIONAL;
  } else {
    rule = DELIVERY_RULES.INTERSTATE;
  }

  const isFreeDelivery = subtotalINR >= rule.minOrderForFreeDeliveryINR;
  const deliveryFeeINR = isFreeDelivery ? 0 : rule.standardDeliveryFeeINR;

  // Normalized 10-digit phone
  const cleanPhone = phoneVal.digitsOnly || rawPhone.replace(/\D/g, '').slice(-10);

  return {
    isValid: true,
    errors: {},
    sanitizedInput: {
      customerName,
      email,
      phone: cleanPhone,
      whatsapp: cleanWhatsapp,
      organizationName: organizationName || undefined,
      gstin: gstin || undefined,
      addressLine1,
      addressLine2: addressLine2 || undefined,
      district,
      pinCode,
      state: isRajasthan ? 'Rajasthan' : state,
    },
    deliveryRule: rule,
    deliveryFeeINR,
    isFreeDelivery,
  };
}

/**
 * Calculates complete order financials (subtotal, shipping, GST breakdown, grand total).
 * Tax rate: 18% standard for computer hardware & IT peripherals.
 * Intra-state Rajasthan billing: CGST 9% + SGST 9%.
 * Inter-state billing: IGST 18%.
 */
export function calculateOrderBreakdown(
  subtotalINR: number,
  state: string = 'Rajasthan',
  district: string = 'Bikaner'
): CalculatedOrderBreakdown {
  const safeSubtotal = Math.max(0, Math.round(subtotalINR * 100) / 100);

  const isBikanerLocal = district.toLowerCase() === 'bikaner' && state.toLowerCase() === 'rajasthan';
  const isRajasthan =
    state.toLowerCase() === 'rajasthan' ||
    RAJASTHAN_DISTRICTS.some((d) => d.toLowerCase() === district.toLowerCase());

  let rule: DeliveryRule;
  if (isBikanerLocal) {
    rule = DELIVERY_RULES.BIKANER_LOCAL;
  } else if (isRajasthan) {
    rule = DELIVERY_RULES.RAJASTHAN_REGIONAL;
  } else {
    rule = DELIVERY_RULES.INTERSTATE;
  }

  const deliveryFeeINR = safeSubtotal >= rule.minOrderForFreeDeliveryINR ? 0 : rule.standardDeliveryFeeINR;

  // Total payable
  const totalINR = Math.round((safeSubtotal + deliveryFeeINR) * 100) / 100;

  // Hardware pricing displayed on storefront is inclusive of 18% GST.
  // We extract taxable base value: Taxable = Total / 1.18
  const taxableSubtotalINR = Math.round((safeSubtotal / 1.18) * 100) / 100;
  const totalTaxINR = Math.round((safeSubtotal - taxableSubtotalINR) * 100) / 100;

  let cgstINR = 0;
  let sgstINR = 0;
  let igstINR = 0;

  if (isRajasthan) {
    // Intra-state split
    cgstINR = Math.round((totalTaxINR / 2) * 100) / 100;
    sgstINR = Math.round((totalTaxINR - cgstINR) * 100) / 100;
  } else {
    // Inter-state integrated tax
    igstINR = totalTaxINR;
  }

  return {
    subtotalINR: safeSubtotal,
    deliveryFeeINR,
    taxableSubtotalINR,
    cgstINR,
    sgstINR,
    igstINR,
    totalTaxINR,
    totalINR,
    isInterstate: !isRajasthan,
    deliveryZoneName: rule.zoneName,
    deliveryTimeline: rule.estimatedDeliveryTimeline,
  };
}
