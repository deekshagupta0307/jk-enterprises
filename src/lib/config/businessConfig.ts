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
}

export interface UpiPaymentDetails {
  upiId: string;
  payeeName: string;
  qrCodeUrl: string;
  merchantCode?: string;
  isPlaceholder: boolean;
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
}

export const BUSINESS_CONFIG: BusinessDetails = {
  name: 'JK Enterprises',
  tagline: 'Computer Hardware, IT Solutions & Wholesale Supply',
  location: 'Bikaner, Rajasthan, India',
  state: 'Rajasthan',
  city: 'Bikaner',
  addressLine:
    process.env.BUSINESS_ADDRESS ||
    'Bikaner, Rajasthan, India (Registered physical address to be confirmed by owner)',
  pincode: '334001',
  phone: process.env.BUSINESS_PHONE || '9928769266',
  formattedPhone: '+91 9928769266',
  email: process.env.BUSINESS_EMAIL || 'akguptabkn@gmail.com',
  whatsappNumber: process.env.BUSINESS_WHATSAPP_NUMBER || '9928769266',
  whatsappCountryCode: '91',
  whatsappLink: 'https://wa.me/919928769266',
  gstin: process.env.BUSINESS_GSTIN || '08AAAAA0000A1Z5 (Configuration Placeholder - Owner to confirm GSTIN)',
  pan: process.env.BUSINESS_PAN || 'AAAAA0000A (Configuration Placeholder - Owner to confirm PAN)',
  isGstinPlaceholder: !process.env.BUSINESS_GSTIN,
};

export const PAYMENT_CONFIG = {
  upi: {
    upiId: process.env.PAYMENT_UPI_ID || 'jkenterprises@upi (Configuration Placeholder - Owner to configure)',
    payeeName: process.env.PAYMENT_PAYEE_NAME || 'JK Enterprises (Sales Desk)',
    qrCodeUrl: process.env.PAYMENT_UPI_QR_URL || '',
    isPlaceholder: !process.env.PAYMENT_UPI_ID,
  } as UpiPaymentDetails,

  bank: {
    accountName: process.env.PAYMENT_BANK_ACCOUNT_NAME || 'JK Enterprises',
    accountNumber:
      process.env.PAYMENT_BANK_ACCOUNT_NUMBER || 'XXXXXXXXXXXX1234 (Configuration Placeholder - Owner to configure)',
    ifscCode: process.env.PAYMENT_BANK_IFSC || 'SBIN000XXXX (Configuration Placeholder - Owner to configure)',
    bankName: process.env.PAYMENT_BANK_NAME || 'State Bank of India (SBI)',
    branch: process.env.PAYMENT_BANK_BRANCH || 'Bikaner Branch, Rajasthan',
    accountType: 'Current Account',
    isPlaceholder: !process.env.PAYMENT_BANK_ACCOUNT_NUMBER,
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
  },
  RAJASTHAN_REGIONAL: {
    zoneName: 'Rajasthan Regional Courier & Road Freight',
    districts: [...RAJASTHAN_DISTRICTS].filter((d) => d !== 'Bikaner'),
    minOrderForFreeDeliveryINR: 15000,
    standardDeliveryFeeINR: 350,
    estimatedDeliveryTimeline: '2 to 4 business days via regional express logistics',
  },
  INTERSTATE: {
    zoneName: 'Interstate / All-India Road Transport',
    districts: [],
    minOrderForFreeDeliveryINR: 30000,
    standardDeliveryFeeINR: 650,
    estimatedDeliveryTimeline: '4 to 7 business days via surface cargo',
  },
};
