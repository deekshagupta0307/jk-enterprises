/**
 * Strict Phone Number Validation & Normalization Utility
 * Specifically tailored for Indian mobile numbers (+91) with support for optional WhatsApp numbers.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  normalized?: string;
  digitsOnly?: string;
}

/**
 * Validates and normalizes an Indian 10-digit mobile number.
 * 
 * Rules:
 * - Permitted prefixes: +91, 91 (with leading separator), or 0.
 * - Separators allowed: spaces, hyphens, parentheses.
 * - Rejects multiple country codes (e.g., +91+91 or +91 91).
 * - Rejects any alphabetic characters or symbols.
 * - Must resolve to EXACTLY 10 digits.
 * - First digit must be 6, 7, 8, or 9 (valid Indian mobile ranges).
 * - If optional is true and input is blank, returns isValid: true.
 */
export function validateIndianMobile(
  input: string | undefined | null,
  isOptional: boolean = false
): PhoneValidationResult {
  const raw = (input || '').trim();

  if (!raw) {
    if (isOptional) {
      return { isValid: true, normalized: undefined, digitsOnly: undefined };
    }
    return {
      isValid: false,
      error: 'Mobile number is required.',
    };
  }

  // Reject alphabetic characters immediately
  if (/[a-zA-Z]/.test(raw)) {
    return {
      isValid: false,
      error: 'Phone number cannot contain alphabetic characters.',
    };
  }

  // Detect and reject repeated/multiple country codes
  // e.g. "+91+91", "+91 91", "+9191" followed by number
  if (/(\+?91[\s\-()]*){2,}/.test(raw)) {
    return {
      isValid: false,
      error: 'Invalid phone format: multiple country codes detected.',
    };
  }

  // Check for invalid punctuation (only +, -, (, ), and whitespace permitted)
  if (/[^0-9+\-()\s]/.test(raw)) {
    return {
      isValid: false,
      error: 'Phone number contains invalid punctuation or special characters.',
    };
  }

  // Strip spaces, hyphens, parentheses
  let cleaned = raw.replace(/[\s\-()]/g, '');

  // Handle country code prefixes
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('91') && cleaned.length > 10) {
    // Only strip 91 if length is greater than 10 (e.g. 919928769266 -> 9928769266)
    cleaned = cleaned.substring(2);
  }

  // Check if anything other than digits remains
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Please enter numbers only.',
    };
  }

  // Strict length check: MUST BE EXACTLY 10 DIGITS
  if (cleaned.length < 10) {
    return {
      isValid: false,
      error: `Phone number is too short (${cleaned.length}/10 digits). Please enter a full 10-digit mobile number.`,
    };
  }

  if (cleaned.length > 10) {
    return {
      isValid: false,
      error: `Phone number is too long (${cleaned.length} digits). An Indian mobile number must be exactly 10 digits.`,
    };
  }

  // Check Indian mobile prefix: must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Invalid mobile number: Indian mobile numbers must start with 6, 7, 8, or 9.',
    };
  }

  return {
    isValid: true,
    digitsOnly: cleaned,
    normalized: `+91${cleaned}`,
  };
}

/**
 * Validates an optional WhatsApp number.
 * Can be a standard Indian 10-digit number or international E.164 number.
 */
export function validateWhatsAppNumber(
  input: string | undefined | null,
  isOptional: boolean = true
): PhoneValidationResult {
  const raw = (input || '').trim();

  if (!raw) {
    if (isOptional) {
      return { isValid: true, normalized: undefined, digitsOnly: undefined };
    }
    return { isValid: false, error: 'WhatsApp number is required.' };
  }

  // First try validating as Indian mobile
  const indianResult = validateIndianMobile(raw, isOptional);
  if (indianResult.isValid) {
    return indianResult;
  }

  // If input starts with a foreign country code (+1, +44, etc.)
  if (raw.startsWith('+')) {
    const cleaned = raw.replace(/[\s\-()]/g, '');
    if (/^\+[1-9]\d{7,14}$/.test(cleaned)) {
      return {
        isValid: true,
        digitsOnly: cleaned.substring(1),
        normalized: cleaned,
      };
    }
  }

  // Return the error from Indian validation
  return indianResult;
}

/**
 * Sanitizes and strictly clamps an input typed or pasted into a 10-digit Indian national mobile field:
 * - Strips non-digits
 * - If user typed/pasted with leading +91 or 91 or 0 prefix, strips it to extract the 10 national digits
 * - Clamps strictly to a maximum of 10 digits
 */
export function sanitizeNational10DigitInput(val: string): string {
  if (!val) return '';
  let cleaned = val.trim();
  // Strip leading +91 or 0 prefix if present
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  const digitsOnly = cleaned.replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.substring(2).slice(0, 10);
  }
  return digitsOnly.slice(0, 10);
}
