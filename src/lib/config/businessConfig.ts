/**
 * Central Business & Commercial Configuration for JK Enterprises
 * 
 * IMPORTANT:
 * All business details, payment endpoints, and WhatsApp numbers are centralized here.
 * Real bank account numbers, UPI IDs, and tax IDs are NOT invented.
 * When real credentials are unavailable, clearly labeled placeholders are used.
 * 
 * To override in production or local deployment, configure the corresponding
 * environment variables in your hosting environment (e.g. Vercel Project Settings or .env).
 */

export interface BankAccountDetails {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  accountType: string;
  isPlaceholder: boolean;
  isConfigured: boolean;
}

export interface UpiPaymentDetails {
  upiId: string;
  payeeName: string;
  qrCodeUrl: string;
  merchantCode?: string;
  isPlaceholder: boolean;
  isConfigured: boolean;
}

export interface BusinessDetails {
  name: string;
  tagline: string;
  location: string;
  state: string;
  city: string;
  addressLine: string;
  pincode: string;
  phone: string;
  formattedPhone: string;
  email: string;
  whatsappNumber: string;
  whatsappCountryCode: string;
  whatsappLink: string;
  gstin: string;
  pan: string;
  isGstinPlaceholder: boolean;
}

export interface DeliveryRule {
  zoneName: string;
  districts: string[];
  minOrderForFreeDeliveryINR: number;
  standardDeliveryFeeINR: number;
  estimatedDeliveryTimeline: string;
  isRatesConfirmed: boolean;
}

export const DELIVERY_NOTICE =
  'Delivery fees, free-delivery thresholds, and district transport estimates are preliminary commercial figures subject to confirmation by JK Enterprises prior to dispatch. Regional logistics across Rajasthan districts are coordinated via third-party road transport and express couriers.';

export const PAYMENT_UNCONFIGURED_NOTICE =
  'Verified payment instructions will be provided after order confirmation.';

function isPlaceholderValue(val?: string | null): boolean {
  if (!val) return true;
  const s = val.trim();
  return (
    s.length === 0 ||
    s.toLowerCase().includes('placeholder') ||
    s.toLowerCase().includes('to be confirmed') ||
    s.includes('XXXX') ||
    s.includes('08AAAAA') ||
    s.includes('AAAAA0000A')
  );
}

const rawGstin = process.env.BUSINESS_GSTIN;
const isGstinPlaceholder = isPlaceholderValue(rawGstin);

const rawPan = process.env.BUSINESS_PAN;
const isPanPlaceholder = isPlaceholderValue(rawPan);

const rawAddress = process.env.BUSINESS_ADDRESS;
const isAddressPlaceholder = isPlaceholderValue(rawAddress);

export const BUSINESS_CONFIG: BusinessDetails = {
  name: 'JK Enterprises',
  tagline: 'Computer Hardware, IT Solutions & Wholesale Supply',
  location: 'Bikaner, Rajasthan, India',
  state: 'Rajasthan',
  city: 'Bikaner',
  addressLine: isAddressPlaceholder
    ? 'Bikaner, Rajasthan, India'
    : rawAddress!.trim(),
  pincode: '334001',
  phone: process.env.BUSINESS_PHONE || '9928769266',
  formattedPhone: '+91 9928769266',
  email: process.env.BUSINESS_EMAIL || 'akguptabkn@gmail.com',
  whatsappNumber: process.env.BUSINESS_WHATSAPP_NUMBER || '9928769266',
  whatsappCountryCode: '91',
  whatsappLink: 'https://wa.me/919928769266',
  gstin: isGstinPlaceholder ? 'Pending verification' : rawGstin!.trim(),
  pan: isPanPlaceholder ? 'Pending verification' : rawPan!.trim(),
  isGstinPlaceholder,
};

const rawUpiId = process.env.PAYMENT_UPI_ID;
const isUpiPlaceholder = isPlaceholderValue(rawUpiId);

const rawAccountNo = process.env.PAYMENT_BANK_ACCOUNT_NUMBER;
const rawIfsc = process.env.PAYMENT_BANK_IFSC;
const rawBankName = process.env.PAYMENT_BANK_NAME;
const rawBranch = process.env.PAYMENT_BANK_BRANCH;

const isBankPlaceholder =
  isPlaceholderValue(rawAccountNo) ||
  isPlaceholderValue(rawIfsc) ||
  isPlaceholderValue(rawBankName) ||
  isPlaceholderValue(rawBranch);

export const PAYMENT_CONFIG = {
  upi: {
    upiId: isUpiPlaceholder ? '' : rawUpiId!.trim(),
    payeeName: process.env.PAYMENT_PAYEE_NAME || 'JK Enterprises',
    qrCodeUrl: process.env.PAYMENT_UPI_QR_URL || '',
    isPlaceholder: isUpiPlaceholder,
    isConfigured: !isUpiPlaceholder,
  } as UpiPaymentDetails,

  bank: {
    accountName: process.env.PAYMENT_BANK_ACCOUNT_NAME || 'JK Enterprises',
    accountNumber: isBankPlaceholder ? '' : rawAccountNo!.trim(),
    ifscCode: isBankPlaceholder ? '' : rawIfsc!.trim(),
    bankName: isBankPlaceholder ? '' : rawBankName!.trim(),
    branch: isBankPlaceholder ? '' : rawBranch!.trim(),
    accountType: 'Current Account',
    isPlaceholder: isBankPlaceholder,
    isConfigured: !isBankPlaceholder,
  } as BankAccountDetails,

  instructions: [
    'JK Enterprises accepts manual payments exclusively via UPI QR code or NEFT / RTGS / IMPS bank transfer.',
    'No online credit/debit card gateway or netbanking portal is used.',
    'After transferring the exact order amount, note down the 12-digit UTR or Transaction Reference number.',
    'Submit the UTR reference number on the payment verification screen.',
    'An authorized administrator will verify your payment against bank credit before confirming the order.',
  ],
};

/**
 * Rajasthan Official Serviceable Districts (All 41 current official districts)
 * Alphabetically sorted and verified with official Rajasthan Gazette / Cabinet Notifications:
 * 33 Original Districts + 8 Retained Restructured Districts = 41 Total.
 */
export const RAJASTHAN_DISTRICTS = [
  'Ajmer',
  'Alwar',
  'Balotra',
  'Banswara',
  'Baran',
  'Barmer',
  'Beawar',
  'Bharatpur',
  'Bhilwara',
  'Bikaner',
  'Bundi',
  'Chittorgarh',
  'Churu',
  'Dausa',
  'Deeg',
  'Dholpur',
  'Didwana-Kuchaman',
  'Dungarpur',
  'Hanumangarh',
  'Jaipur',
  'Jaisalmer',
  'Jalore',
  'Jhalawar',
  'Jhunjhunu',
  'Jodhpur',
  'Karauli',
  'Khairthal-Tijara',
  'Kota',
  'Kotputli-Behror',
  'Nagaur',
  'Pali',
  'Phalodi',
  'Pratapgarh',
  'Rajsamand',
  'Salumbar',
  'Sawai Madhopur',
  'Sikar',
  'Sirohi',
  'Sri Ganganagar',
  'Tonk',
  'Udaipur',
] as const;

export type RajasthanDistrict = (typeof RAJASTHAN_DISTRICTS)[number];

export const DELIVERY_RULES: Record<'BIKANER_LOCAL' | 'RAJASTHAN_REGIONAL' | 'INTERSTATE', DeliveryRule> = {
  BIKANER_LOCAL: {
    zoneName: 'Bikaner Urban / Local Area',
    districts: ['Bikaner'],
    minOrderForFreeDeliveryINR: 5000,
    standardDeliveryFeeINR: 150,
    estimatedDeliveryTimeline: 'Same-day or next business day local delivery (Bikaner Hub)',
    isRatesConfirmed: false,
  },
  RAJASTHAN_REGIONAL: {
    zoneName: 'Rajasthan Regional Courier & Road Freight',
    districts: [...RAJASTHAN_DISTRICTS].filter((d) => d !== 'Bikaner'),
    minOrderForFreeDeliveryINR: 15000,
    standardDeliveryFeeINR: 350,
    estimatedDeliveryTimeline: '2 to 4 business days via regional express logistics',
    isRatesConfirmed: false,
  },
  INTERSTATE: {
    zoneName: 'Interstate / All-India Road Transport',
    districts: [],
    minOrderForFreeDeliveryINR: 30000,
    standardDeliveryFeeINR: 650,
    estimatedDeliveryTimeline: '4 to 7 business days via surface cargo',
    isRatesConfirmed: false,
  },
};
