import { ProductDemo } from '@/types';
import { DEMO_FEATURED_PRODUCTS } from '@/data/demoCatalogue';

export interface AssistantResponse {
  message: string;
  recommendedProducts?: ProductDemo[];
  suggestedFollowUps?: string[];
  isDemoReply: true;
}

/**
 * Assistant Service (Stage A - Safe Demo Mode)
 *
 * This service implements a decoupled mock consultation engine.
 * In Stage B, this contract will seamlessly route through a secure Next.js Server Route Handler
 * backed by verified database queries and server-side AI provider integration.
 */
export async function queryAssistantDemo(
  userQuery: string
): Promise<AssistantResponse> {
  // Simulate network roundtrip latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 550));

  const query = userQuery.toLowerCase().trim();

  // 1. Storage / SSD queries
  if (query.includes('ssd') || query.includes('nvme') || query.includes('storage') || query.includes('hard drive')) {
    const ssds = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'storage');
    return {
      message:
        'For office workstations and creator setups, we recommend high-endurance PCIe Gen4 NVMe SSDs for rapid boot and application load times. For heavy multitasking and database work, the Samsung 990 PRO delivers top-tier speed (up to 7,450 MB/s). For budget-friendly high capacity storage, the Crucial P3 Plus 2TB offers exceptional value.\n\n*Note: Sample recommendation based on demo catalogue. Stock and pricing are confirmed during verified procurement.*',
      recommendedProducts: ssds,
      suggestedFollowUps: [
        'What is the difference between PCIe Gen3 and Gen4?',
        'Can I install an M.2 SSD on an older motherboard?',
        'I need 10+ SSDs for our office PCs (B2B enquiry)',
      ],
      isDemoReply: true,
    };
  }

  // 2. RAM / Memory / DDR4 vs DDR5 queries
  if (query.includes('ram') || query.includes('ddr4') || query.includes('ddr5') || query.includes('memory')) {
    const rams = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'memory');
    return {
      message:
        'Hardware Compatibility Notice: DDR4 and DDR5 memory modules use physically different notch keys and voltages; they are NOT interchangeable on the same motherboard.\n\n• DDR4: Ideal for cost-sensitive office PCs and budget builds (up to 3200MHz standard).\n• DDR5: Recommended for modern 13th/14th Gen Intel or AMD AM5 builds for peak bandwidth (6000MHz+ recommended sweet spot).\n\nEnsure your motherboard and CPU generation support your chosen standard.',
      recommendedProducts: rams,
      suggestedFollowUps: [
        'Which RAM is compatible with Intel Core i7-14700?',
        'Is 16GB enough or do I need 32GB for office work?',
        'Show processors compatible with DDR5',
      ],
      isDemoReply: true,
    };
  }

  // 3. Processors / CPU / PC Build queries
  if (query.includes('cpu') || query.includes('processor') || query.includes('intel') || query.includes('amd') || query.includes('build')) {
    const cpus = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'processors');
    return {
      message:
        'For high-productivity workstations, multi-threaded workloads, and heavy business software, the Intel Core i7-14700 (20 cores, 28 threads) provides high multitasking efficiency with support for both DDR4 and DDR5 platforms.\n\nFor institutional setups, pairing this with a reliable B760/Z790 chipset and a minimum 650W 80+ certified power supply ensures 24/7 reliability.',
      recommendedProducts: cpus,
      suggestedFollowUps: [
        'Recommend RAM for the Core i7-14700',
        'What cooler is required for 14th Gen Intel?',
        'Do you provide custom workstation assembly for schools?',
      ],
      isDemoReply: true,
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
        'JK Enterprises aims to serve schools, colleges, educational computer labs, corporate offices, and approved wholesale dealers across Rajasthan.\n\nInstitutional Support Overview (Planned):\n1. Formal commercial purchase estimates and proforma quotations.\n2. Volume pricing options for computer lab hardware, switches, and structured networking.\n3. Structured verification workflow for authorized resellers and institutional purchase orders.\n\n*In this preview environment, please use the contact form placeholder or wait for our upcoming B2B Portal integration.*',
      recommendedProducts: institutionalItems.length > 0 ? institutionalItems : undefined,
      suggestedFollowUps: [
        'What networking equipment is recommended for a 30-PC lab?',
        'How does wholesale buyer verification work?',
        'Which printers have low running costs for school offices?',
      ],
      isDemoReply: true,
    };
  }

  // 5. CCTV, Surveillance, Security queries
  if (query.includes('cctv') || query.includes('camera') || query.includes('security') || query.includes('surveillance') || query.includes('nvr')) {
    const securityItems = DEMO_FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'cctv-security');
    return {
      message:
        'For premises surveillance (offices, schools, retail shops, and warehouses), PoE (Power over Ethernet) IP camera solutions are recommended over older analog systems because they carry power and high-definition video over a single Cat6 network cable.\n\nKey Recommendations:\n• 4MP or higher resolution with 24/7 full-color low-light sensors (e.g. ColorVu).\n• Dedicated surveillance-grade internal hard drive (e.g. WD Purple/Seagate SkyHawk) inside the NVR for continuous write longevity.',
      recommendedProducts: securityItems,
      suggestedFollowUps: [
        'How many days of recording can a 4TB NVR store?',
        'What PoE switch do I need for 8 cameras?',
        'Do these cameras work outdoors in Rajasthan summers?',
      ],
      isDemoReply: true,
    };
  }

  // 6. Rajasthan Delivery & Serviceability queries
  if (query.includes('rajasthan') || query.includes('delivery') || query.includes('jaipur') || query.includes('shipping') || query.includes('location')) {
    return {
      message:
        'Service Area & Delivery Policy (Demo Mode):\n\nJK Enterprises is focused on statewide delivery and institutional IT supply across Rajasthan (Jaipur, Jodhpur, Kota, Bikaner, Udaipur, Ajmer, Bhilwara, Alwar, and surrounding districts).\n\n*Important Transparency Notice:* Accurate shipping transit times, courier serviceability by PIN code, and freight charges will be verified through registered logistics partners upon full production release. No fake delivery dates are generated in this preview.',
      suggestedFollowUps: [
        'Can I pick up orders locally in Rajasthan?',
        'Are bulky items like server racks and monitors shipped safely?',
        'Show all demo categories',
      ],
      isDemoReply: true,
    };
  }

  // Default Fallback
  return {
    message:
      `Thank you for your inquiry about "${userQuery}".\n\nI am the JK Enterprises Virtual Hardware Advisor (Demo Mode). I can assist you with:\n• Storage & SSD recommendations (Gen4/Gen5 NVMe)\n• RAM & Processor compatibility (DDR4 vs DDR5, socket standards)\n• Institutional computer lab hardware & networking switches\n• CCTV surveillance infrastructure\n• Wholesale and B2B inquiry procedures\n\nPlease select one of the suggested topics below or ask a specific hardware question.`,
    suggestedFollowUps: [
      'Recommend an SSD for office workstation upgrades',
      'Show networking gear for school computer labs',
      'What is the difference between DDR4 and DDR5?',
      'How does B2B wholesale quotation work?',
    ],
    isDemoReply: true,
  };
}
