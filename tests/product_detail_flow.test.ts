import { getProductBySlug, getAllProductSlugs } from '@/lib/catalogue/catalogueService';
import { generateWhatsAppProductLink } from '@/lib/whatsapp/whatsappService';
import { BUSINESS_CONFIG, DELIVERY_NOTICE, DELIVERY_RULES } from '@/lib/config/businessConfig';

export async function testProductDetailFlow(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — PRODUCT DETAIL FLOW & CATALOGUE VERIFICATION');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}${detail ? ` (${detail})` : ''}`);
      failed++;
    }
  }

  // 1. All Product Slugs
  const slugs = await getAllProductSlugs();
  assert(slugs.length >= 55, `getAllProductSlugs returns all products (got ${slugs.length})`);
  const uniqueSlugs = new Set(slugs);
  assert(uniqueSlugs.size === slugs.length, 'All product slugs are strictly unique');
  assert(!slugs.some((s) => !s || s.trim().length === 0), 'No empty or whitespace slugs');

  // 2. Fetch specific products by canonical slug (Intel Core i7-14700K)
  const p1 = await getProductBySlug('intel-core-i7-14700k-desktop-processor');
  assert(p1 !== null, 'Found Intel Core i7-14700K by canonical slug');
  assert(p1?.name.includes('14700K') === true, 'Product name contains 14700K');
  assert(p1?.demoPriceINR === 38900, `Product price matches expected ₹38,900 (got ${p1?.demoPriceINR})`);
  assert(p1?.categoryName === 'Processors & CPUs', `Category is Processors & CPUs (got "${p1?.categoryName}")`);
  assert(p1?.brandName === 'Intel', `Brand is Intel (got "${p1?.brandName}")`);
  assert(p1 !== null && p1.availableStock > 0, 'In-stock status verified (availableStock > 0)');
  assert(p1?.specifications !== undefined && p1.specifications.length > 0, 'Technical specs exist and are populated');
  assert(p1?.mrpINR === 46000, `MRP is ₹46,000 (got ${p1?.mrpINR})`);

  // 3. Fetch featured demo product (Hikvision CCTV Camera)
  const p2 = await getProductBySlug('hikvision-4mp-colorvu-poe-fixed-bullet-camera');
  assert(p2 !== null, 'Found Hikvision 4MP Camera by slug');
  assert(p2?.categoryName === 'CCTV & Surveillance', `Category is CCTV & Surveillance (got "${p2?.categoryName}")`);
  assert(p2?.brandName === 'Hikvision', `Brand is Hikvision (got "${p2?.brandName}")`);
  assert(p2?.demoPriceINR === 3850, `Price is ₹3,850 (got ${p2?.demoPriceINR})`);

  // 4. Fetch catalog seed product (Corsair DDR5 Memory)
  const p3 = await getProductBySlug('corsair-vengeance-32gb-2x16gb-ddr5-6000mhz');
  assert(p3 !== null, 'Found Corsair Vengeance DDR5 RAM by catalog slug');
  assert(p3?.categoryName === 'RAM & Memory', `Category is RAM & Memory (got "${p3?.categoryName}")`);
  assert(p3?.demoPriceINR === 9450, `Price is ₹9,450 (got ${p3?.demoPriceINR})`);

  // 5. Unknown slug must return null (handled by notFound())
  const unknown = await getProductBySlug('non-existent-product-slug-xyz-123');
  assert(unknown === null, 'Unknown slug returns null (triggers Next.js notFound)');

  // 6. WhatsApp Product Link Generation
  if (p1) {
    const waResult = generateWhatsAppProductLink({
      productName: p1.name,
      sku: p1.id,
      priceINR: p1.demoPriceINR,
      category: p1.categoryName,
    });
    assert(waResult.url.startsWith('https://wa.me/919928769266'), 'WhatsApp link directs to official business number');
    assert(waResult.url.includes(encodeURIComponent('14700K')), 'WhatsApp link includes product model');
    assert(waResult.rawMessage.includes('38,900'), 'WhatsApp message includes formatted price');
    assert(waResult.rawMessage.includes(p1.id), 'WhatsApp message includes product SKU / ID');
    assert(waResult.rawMessage.includes(p1.categoryName), 'WhatsApp message includes product category');
  }

  // 7. Delivery Disclaimer & Unconfirmed Rate Status
  assert(typeof DELIVERY_NOTICE === 'string' && DELIVERY_NOTICE.length > 20, 'DELIVERY_NOTICE disclaimer is present');
  assert(DELIVERY_RULES.BIKANER_LOCAL.isRatesConfirmed === false, 'Bikaner local delivery rate is flagged as unconfirmed');
  assert(DELIVERY_RULES.RAJASTHAN_REGIONAL.isRatesConfirmed === false, 'Rajasthan regional delivery rate is flagged as unconfirmed');
  assert(DELIVERY_RULES.INTERSTATE.isRatesConfirmed === false, 'Interstate delivery rate is flagged as unconfirmed');

  // 8. Security & Business Safeguards
  assert(BUSINESS_CONFIG.phone === '9928769266', 'Owner phone number matches');
  assert(BUSINESS_CONFIG.email === 'akguptabkn@gmail.com', 'Owner email matches');

  console.log(`\n================================================================`);
  console.log(`  RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`================================================================\n`);

  return { passed, failed };
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('product_detail_flow.test')) {
  testProductDetailFlow().then(({ failed }) => {
    if (failed > 0) process.exit(1);
  }).catch((err) => {
    console.error('Test suite crashed:', err);
    process.exit(1);
  });
}
