import { ProductDemo } from '@/types';
import { DEMO_FEATURED_PRODUCTS } from '@/data/demoCatalogue';

export interface AssistantResponse {
  message: string;
  recommendedProducts?: ProductDemo[];
  suggestedFollowUps?: string[];
  isDemoReply?: boolean;
}

/**
 * JK Assistant Service
 *
 * Professional inquiry assistant providing guidance on product specifications,
 * institutional sourcing, manual payment procedures, and Rajasthan distribution.
 */
export async function queryAssistantDemo(
  userQuery: string
): Promise<AssistantResponse> {
  // Simulate network roundtrip latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 450));

  const query = userQuery.toLowerCase().trim();

  // 1. Storage / SSD queries
  if (query.includes('ssd') || query.includes('nvme') || query.includes('storage') || query.includes('hard drive')) {
    const ssds = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'storage');
    return {
      message:
        'For office workstations and creator setups, high-endurance PCIe Gen4 NVMe SSDs provide rapid boot and data processing speeds. For heavy multitasking and databases, the Samsung 990 PRO delivers high sequential throughput (up to 7,450 MB/s). For budget-friendly high capacity storage, the Crucial P3 Plus 2TB offers exceptional capacity and value.\n\nPrices and bulk allocation can be confirmed via direct inquiry with our Bikaner desk.',
      recommendedProducts: ssds,
      suggestedFollowUps: [
        'What is the difference between PCIe Gen3 and Gen4?',
        'Can I install an M.2 SSD on an older system?',
        'I need multiple SSDs for office PC upgrades',
      ],
      isDemoReply: false,
    };
  }

  // 2. RAM / Memory / DDR4 vs DDR5 queries
  if (query.includes('ram') || query.includes('ddr4') || query.includes('ddr5') || query.includes('memory')) {
    const rams = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'memory');
    return {
      message:
        'Hardware Compatibility Notice: DDR4 and DDR5 memory modules use physically distinct pin arrangements and voltages; they are NOT interchangeable on the same motherboard.\n\n• DDR4: Economical for standard office PCs and general desktop setups (up to 3200MHz).\n• DDR5: Higher bandwidth for modern 13th/14th Gen Intel and AMD AM5 platforms (6000MHz+ recommended sweet spot).\n\nPlease verify that your motherboard chipset and processor generation support your chosen RAM standard.',
      recommendedProducts: rams,
      suggestedFollowUps: [
        'Which RAM is compatible with Intel Core i7-14700?',
        'Is 16GB enough or do I need 32GB for office work?',
        'Show processors compatible with DDR5',
      ],
      isDemoReply: false,
    };
  }

  // 3. Processors / CPU / PC Build queries
  if (query.includes('cpu') || query.includes('processor') || query.includes('intel') || query.includes('amd') || query.includes('build')) {
    const cpus = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'processors');
    return {
      message:
        'For high-productivity workstations, multi-threaded workloads, and heavy business software, the Intel Core i7-14700 (20 cores, 28 threads) provides high multitasking efficiency with support for both DDR4 and DDR5 platforms.\n\nFor institutional setups, pairing this with a reliable B760/Z790 motherboard and a minimum 650W 80+ certified power supply ensures 24/7 reliability.',
      recommendedProducts: cpus,
      suggestedFollowUps: [
        'Recommend RAM for the Core i7-14700',
        'What cooler is required for 14th Gen Intel?',
        'Do you supply complete desktop workstations for institutions?',
      ],
      isDemoReply: false,
    };
  }

  // 4. Institutional, School, Computer Lab, Wholesale, Bulk queries
  if (
    query.includes('school') ||
    query.includes('wholesale') ||
    query.includes('bulk') ||
    query.includes('lab') ||
    query.includes('institution') ||
    query.includes('b2b') ||
    query.includes('quotation')
  ) {
    const institutionalItems = DEMO_FEATURED_PRODUCTS.filter(
      (p) => p.categorySlug === 'networking' || p.categorySlug === 'printers' || p.categorySlug === 'systems'
    );
    return {
      message:
        'JK Enterprises serves businesses, schools, colleges, educational labs, corporate offices, and wholesale partners across Rajasthan.\n\nInstitutional Procurement Services:\n1. Formal commercial purchase estimates and proforma quotations.\n2. Volume pricing options for computer equipment, switches, networking, and office supplies.\n3. Dedicated coordination for institutional purchase orders.\n\nSubmit a quotation request through our homepage form or connect directly with our Bikaner team via WhatsApp at +91 9928769266.',
      recommendedProducts: institutionalItems.length > 0 ? institutionalItems : undefined,
      suggestedFollowUps: [
        'What networking equipment is recommended for a 30-PC lab?',
        'How does wholesale buyer verification work?',
        'Which printers have low running costs for offices?',
      ],
      isDemoReply: false,
    };
  }

  // 5. CCTV, Surveillance, Security queries
  if (query.includes('cctv') || query.includes('camera') || query.includes('security') || query.includes('surveillance') || query.includes('nvr')) {
    const securityItems = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'cctv-security');
    return {
      message:
        'For premises surveillance (offices, schools, commercial shops, and warehouses), PoE (Power over Ethernet) IP camera solutions are recommended over older analog systems because they carry power and high-definition video over a single Cat6 network cable.\n\nKey Recommendations:\n• 4MP or higher resolution with 24/7 full-color low-light sensors (e.g. ColorVu).\n• Dedicated surveillance-grade internal hard drive (e.g. WD Purple/Seagate SkyHawk) inside the NVR for continuous write longevity.',
      recommendedProducts: securityItems,
      suggestedFollowUps: [
        'How many days of recording can a 4TB NVR store?',
        'What PoE switch do I need for 8 cameras?',
        'Do these cameras work outdoors in Rajasthan summers?',
      ],
      isDemoReply: false,
    };
  }

  // 6. Broad Products & Supplies (Stationery, Electronics, Equipment)
  if (
    query.includes('stationery') ||
    query.includes('carpet') ||
    query.includes('rug') ||
    query.includes('equipment') ||
    query.includes('supplies') ||
    query.includes('general') ||
    query.includes('products') ||
    query.includes('categories')
  ) {
    return {
      message:
        'JK Enterprises operates as a broad-spectrum commercial trading and supply enterprise based in Bikaner, Rajasthan.\n\nOur sourcing and procurement capabilities encompass:\n• Computers, IT equipment & workstation accessories\n• Electronics and electrical products\n• Stationery and office supplies\n• Carpets, rugs and commercial floor coverings\n• General commercial equipment, supplies & merchandise\n\nSpecific product lines and availability are verified upon direct inquiry with our Bikaner sales desk.',
      suggestedFollowUps: [
        'How can I request a formal quotation?',
        'Tell me about delivery to other Rajasthan districts',
        'How does manual payment verification work?',
      ],
      isDemoReply: false,
    };
  }

  // 7. Rajasthan Delivery & Serviceability queries
  if (query.includes('rajasthan') || query.includes('delivery') || query.includes('bikaner') || query.includes('jaipur') || query.includes('shipping') || query.includes('location')) {
    return {
      message:
        'Service Area & Delivery Coverage:\n\nJK Enterprises coordinates regional distribution from our central hub in Bikaner, Rajasthan, serving all 41 current districts across the state.\n\n• Bikaner Local Hub: Flat ₹150 (Free for orders ₹5,000+)\n• Rajasthan Regional (All other 40 districts): Flat ₹350 (Free for orders ₹15,000+)\n• Interstate Transport: Flat ₹650 (Free for orders ₹30,000+)\n\nPayments are processed via manual UPI QR code or bank transfer with administrative verification. For direct assistance, contact our Bikaner desk at +91 9928769266 or via WhatsApp.',
      suggestedFollowUps: [
        'How does manual UPI / Bank Transfer payment work?',
        'What are the delivery charges for Bikaner?',
        'Can institutions request formal quotations?',
      ],
      isDemoReply: false,
    };
  }

  // 8. Payment & Verification queries
  if (query.includes('payment') || query.includes('upi') || query.includes('bank') || query.includes('utr') || query.includes('verify')) {
    return {
      message:
        'Payment & Verification Policy:\n\nJK Enterprises accepts manual payments exclusively via UPI QR code or NEFT / RTGS / IMPS bank transfer. No online debit/credit card gateway is used.\n\nWorkflow:\n1. Customer reviews order and generates a Proforma Payment Attempt.\n2. Customer makes the transfer using the displayed QR code or bank account details.\n3. Customer submits the 12-digit UTR reference number.\n4. An authorized administrator verifies the receipt against actual bank/UPI credit.\n5. Only after verification is the order confirmed and final tax invoice issued.',
      suggestedFollowUps: [
        'How long does payment verification take?',
        'Can I pay via cash on delivery?',
        'Where can I view my order status?',
      ],
      isDemoReply: false,
    };
  }

  // Default Fallback
  return {
    message:
      `Thank you for reaching out regarding "${userQuery}".\n\nI am JK Assistant, your digital guide for JK Enterprises (Bikaner, Rajasthan). I can assist you with:\n• Product specifications & hardware compatibility\n• Commercial equipment, office supplies, and general sourcing\n• B2B quotations and institutional purchase orders\n• Statewide delivery across all 41 Rajasthan districts\n• Manual UPI & bank transfer verification instructions\n\nPlease select one of the suggested topics below or ask a specific question.`,
    suggestedFollowUps: [
      'Tell me about your product categories',
      'How does bulk procurement and quotation work?',
      'What are your delivery charges across Rajasthan?',
      'How does manual payment verification work?',
    ],
    isDemoReply: false,
  };
}
