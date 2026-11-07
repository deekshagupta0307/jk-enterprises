/**
 * JK Enterprises — Phase 3 Test Suite
 * 
 * Verifies:
 * 1. Centralized 10% Diwali Discount Engine (PDP, Cart, Checkout, Invoices, Decimal Safety, Non-Duplication)
 * 2. Order Breakdown, Inclusive 18% GST (CGST/SGST/IGST), Delivery Fee Rules, and Grand Total Exact Matching
 * 3. Phase 3 Catalogue Expansion (Online Army Store civilian products + Golchha Computer connectivity products)
 * 4. Compliance & Quarantine Safeguards (Weapons, Insignia, Camouflage Uniforms strictly isolated)
 * 5. Customer Delivery Contact (9928769266) Integration
 * 6. Phase 2 Baseline Preservation (36 staged products, Candidate #48 present, Net Patka quarantined)
 */

import {
  calculateProductDiscount,
  calculateOrderDiscountSnapshot,
  DIWALI_OFFER_CONFIG,
} from '@/lib/pricing/discountService';
import { calculateOrderBreakdown } from '@/lib/delivery/deliveryService';
import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';
import { IMPORTED_PRODUCTS } from '@/data/importedCatalogueData';
import { STAGED_PRODUCTS, QUARANTINED_RESEARCH_PRODUCTS } from '@/data/stagedCatalogueData';
import {
  PHASE3_OAS_PRODUCTS,
  PHASE3_GOLCHHA_PRODUCTS,
  PHASE3_ALL_APPROVED_PRODUCTS,
  PHASE3_QUARANTINED_PRODUCTS,
} from '@/data/phase3ExpandedCatalogueData';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

export async function runPhase3DiwaliAndExpansionTests(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — PHASE 3 DIWALI DISCOUNT & EXPANSION SUITE');
  console.log('================================================================');

  let passed = 0;
  let failed = 0;

  const test = (description: string, fn: () => void) => {
    try {
      fn();
      passed++;
    } catch (err: unknown) {
      console.error(`  ✕ ${description}: ${(err as Error).message}`);
      failed++;
    }
  };

  console.log('\n--- 1. Centralized Diwali 10% Discount Engine ---');
  test('DIWALI_OFFER_CONFIG defines 10% discount and DIWALI10 code', () => {
    assert(DIWALI_OFFER_CONFIG.offerCode === 'DIWALI10', 'Promo code is DIWALI10');
    assert(DIWALI_OFFER_CONFIG.discountPercent === 10, 'Discount is 10%');
    assert(DIWALI_OFFER_CONFIG.isActive === true, 'Diwali offer is active');
  });

  test('calculateProductDiscount correctly computes 10% discount and rounded prices', () => {
    const res1 = calculateProductDiscount(1000);
    assert(res1.originalPriceINR === 1000, 'Original price preserved');
    assert(res1.discountAmountINR === 100, 'Discount amount is 100');
    assert(res1.finalPayableINR === 900, 'Discounted price is 900');
    assert(res1.isOfferApplied === true, 'Discount flagged as applied');

    // Fractional paise rounding test (e.g., ₹1,499 -> 10% = 149.9 -> rounded to ₹150)
    const res2 = calculateProductDiscount(1499);
    assert(res2.originalPriceINR === 1499, 'Original price 1499');
    assert(res2.discountAmountINR === 150, 'Discount amount rounded to 150');
    assert(res2.finalPayableINR === 1349, 'Discounted price is 1349 (1499 - 150)');
  });

  test('calculateOrderDiscountSnapshot correctly applies DIWALI10 to subtotal', () => {
    const snap = calculateOrderDiscountSnapshot(77250);
    assert(snap.originalSubtotalINR === 77250, 'Gross subtotal is 77250');
    assert(snap.discountAmountINR === 7725, '10% discount amount is 7725');
    assert(snap.discountedSubtotalINR === 69525, 'Net discounted subtotal is 69525 (77250 - 7725)');
    assert(snap.isOfferApplied === true, 'Discount applied');
    assert(snap.offerCode === 'DIWALI10', 'Offer code DIWALI10 retained');
  });

  test('calculateOrderDiscountSnapshot handles 0 or negative subtotal gracefully', () => {
    const snap = calculateOrderDiscountSnapshot(0);
    assert(snap.discountAmountINR === 0, 'No discount on zero subtotal');
    assert(snap.discountedSubtotalINR === 0, 'Subtotal is 0');
    assert(snap.isOfferApplied === false, 'isOfferApplied is false');
  });

  console.log('\n--- 2. Order Financial Breakdown & Inclusive GST Extraction ---');
  test('calculateOrderBreakdown with DIWALI10 applies discount and extracts GST accurately', () => {
    const breakdown = calculateOrderBreakdown(77250, 'Rajasthan', 'Bikaner', 'DIWALI10');
    assert(breakdown.originalSubtotalINR === 77250, 'Gross subtotal is 77250');
    assert(breakdown.discountAmountINR === 7725, '10% Diwali discount is 7725');
    assert(breakdown.subtotalINR === 69525, 'Payable merchandise subtotal is 69525');
    assert(breakdown.deliveryFeeINR === 0, 'Free delivery in Bikaner for subtotal >= 5000');
    assert(breakdown.totalINR === 69525, 'Grand total is exactly 69525');
    
    // GST extraction: subtotal inclusive of 18% GST (taxableBase + GST = subtotal)
    const expectedBase = Math.round((69525 / 1.18) * 100) / 100;
    const expectedGst = Math.round((69525 - expectedBase) * 100) / 100;
    assert(breakdown.taxableSubtotalINR === expectedBase, `Taxable base is ₹${expectedBase}`);
    assert(breakdown.totalTaxINR === expectedGst, `Total GST is ₹${expectedGst}`);
    assert(breakdown.isInterstate === false, 'Intra-state Rajasthan');
    assert(Math.abs(breakdown.cgstINR - expectedGst / 2) <= 0.01, 'CGST is half of GST');
    assert(Math.round((breakdown.cgstINR + breakdown.sgstINR) * 100) / 100 === breakdown.totalTaxINR, 'CGST + SGST equals total GST');
    assert(breakdown.igstINR === 0, 'IGST is 0 for Rajasthan delivery');
  });

  test('calculateOrderBreakdown handles non-Bikaner Rajasthan delivery fee', () => {
    const breakdown = calculateOrderBreakdown(2000, 'Rajasthan', 'Jaipur', 'DIWALI10');
    assert(breakdown.originalSubtotalINR === 2000, 'Gross subtotal is 2000');
    assert(breakdown.discountAmountINR === 200, 'Discount is 200');
    assert(breakdown.subtotalINR === 1800, 'Discounted subtotal is 1800');
    assert(breakdown.deliveryFeeINR === 350, 'Rajasthan regional delivery fee is 350');
    assert(breakdown.totalINR === 2150, 'Grand total is 2150 (1800 + 350)');
  });

  test('calculateOrderBreakdown handles interstate IGST billing', () => {
    const breakdown = calculateOrderBreakdown(5000, 'Delhi', 'New Delhi', 'DIWALI10');
    assert(breakdown.isInterstate === true, 'Identified as interstate');
    assert(breakdown.cgstINR === 0, 'CGST is 0');
    assert(breakdown.sgstINR === 0, 'SGST is 0');
    assert(breakdown.igstINR === breakdown.totalTaxINR, 'IGST equals total GST');
  });

  console.log('\n--- 3. Customer Delivery Contact Verification ---');
  test('Delivery phone 9928769266 is configured in business contact settings', () => {
    assert(BUSINESS_CONFIG.phone === '9928769266' || BUSINESS_CONFIG.phone.includes('9928769266'), 'Phone is 9928769266');
    assert(BUSINESS_CONFIG.whatsappNumber === '9928769266' || BUSINESS_CONFIG.whatsappNumber.includes('9928769266'), 'WhatsApp is 9928769266');
  });

  console.log('\n--- 4. Phase 2 Baseline Preservation ---');
  test('Phase 2 staged dataset retains exactly 36 products', () => {
    assert(STAGED_PRODUCTS.length === 36, `Exactly 36 Phase 2 products preserved (actual: ${STAGED_PRODUCTS.length})`);
    const oasCount = STAGED_PRODUCTS.filter((p) => p.sku.startsWith('JK-OAS-')).length;
    const golchhaCount = STAGED_PRODUCTS.filter((p) => p.sku.startsWith('JK-GOL-')).length;
    assert(oasCount === 20, `Phase 2 OAS count is 20 (actual: ${oasCount})`);
    assert(golchhaCount === 16, `Phase 2 Golchha count is 16 (actual: ${golchhaCount})`);
  });

  test('Candidate #48 (Multybyte Type-C Printer Cable 1.5m) is present in Phase 2 dataset', () => {
    const p48 = STAGED_PRODUCTS.find((p) => p.sku === 'JK-GOL-MB-TCPRN-15M');
    assert(Boolean(p48), 'Candidate #48 is present');
    assert(p48?.modelNumber === 'PM-42', 'Model is PM-42');
  });

  test('JK-OAS-NET-PATKA-NP is retained in quarantine and not staged for sale', () => {
    const stagedPatka = STAGED_PRODUCTS.find((p) => p.sku === 'JK-OAS-NET-PATKA-NP');
    assert(!stagedPatka, 'Net Patka is absent from staged products');
    const quarPatka = QUARANTINED_RESEARCH_PRODUCTS.find((p) => p.sku === 'JK-OAS-NET-PATKA-NP');
    assert(Boolean(quarPatka), 'Net Patka is present in QUARANTINED_RESEARCH_PRODUCTS');
  });

  console.log('\n--- 5. Phase 3 Catalogue Expansion Scope & Safeguards ---');
  test('Phase 3 approved dataset contains exactly 20 new products (10 OAS + 10 Golchha)', () => {
    assert(PHASE3_OAS_PRODUCTS.length === 10, `10 Phase 3 OAS products (actual: ${PHASE3_OAS_PRODUCTS.length})`);
    assert(PHASE3_GOLCHHA_PRODUCTS.length === 10, `10 Phase 3 Golchha products (actual: ${PHASE3_GOLCHHA_PRODUCTS.length})`);
    assert(PHASE3_ALL_APPROVED_PRODUCTS.length === 20, `Total 20 Phase 3 approved products (actual: ${PHASE3_ALL_APPROVED_PRODUCTS.length})`);
  });

  test('All Phase 3 products strictly enforce DRAFT, unconfirmed price/warranty, and empty images', () => {
    for (const p of PHASE3_ALL_APPROVED_PRODUCTS) {
      assert(p.publicationStatus === 'DRAFT', `Product ${p.sku} is DRAFT`);
      assert(p.isDemo === false, `Product ${p.sku} isDemo is false`);
      assert(p.isPriceConfirmed === false, `Product ${p.sku} isPriceConfirmed is false`);
      assert(p.isWarrantyConfirmed === false, `Product ${p.sku} isWarrantyConfirmed is false`);
      assert(Array.isArray(p.images) && p.images.length === 0, `Product ${p.sku} images is empty array []`);
      assert(Boolean(p.sourceUrl), `Product ${p.sku} has factual sourceUrl`);
      assert(Boolean(p.sourceRetrievalDate), `Product ${p.sku} has sourceRetrievalDate`);
    }
  });

  test('All Phase 3 products have globally unique SKUs and URL slugs', () => {
    const allSkus = new Set<string>();
    const allSlugs = new Set<string>();
    let duplicateSkus = 0;
    let duplicateSlugs = 0;

    const allCombined = [
      ...IMPORTED_PRODUCTS,
      ...STAGED_PRODUCTS,
      ...PHASE3_ALL_APPROVED_PRODUCTS,
    ];

    for (const p of allCombined) {
      if (allSkus.has(p.sku)) duplicateSkus++;
      allSkus.add(p.sku);

      if (allSlugs.has(p.slug)) duplicateSlugs++;
      allSlugs.add(p.slug);
    }

    assert(duplicateSkus === 0, `All ${allCombined.length} SKUs across all phases are globally unique`);
    assert(duplicateSlugs === 0, `All ${allCombined.length} slugs across all phases are globally unique`);
  });

  test('Phase 3 Quarantine strictly isolates restricted products with detailed compliance reasons', () => {
    assert(PHASE3_QUARANTINED_PRODUCTS.length === 4, `4 sensitive items quarantined (actual: ${PHASE3_QUARANTINED_PRODUCTS.length})`);
    for (const q of PHASE3_QUARANTINED_PRODUCTS) {
      assert(Boolean(q.quarantineReason && q.quarantineReason.length > 10), `Quarantine reason documented for ${q.sku}`);
      assert(q.publicationStatus === 'DRAFT', `Quarantined item ${q.sku} is DRAFT`);
    }
    
    // Confirm prohibited categories are in quarantine
    const hasInsignia = PHASE3_QUARANTINED_PRODUCTS.some((q) => q.sku === 'JK-OAS-P3-QUAR-INSIG');
    const hasKnife = PHASE3_QUARANTINED_PRODUCTS.some((q) => q.sku === 'JK-OAS-P3-QUAR-KNIFE');
    const hasHolster = PHASE3_QUARANTINED_PRODUCTS.some((q) => q.sku === 'JK-OAS-P3-QUAR-HOLSTER');
    const hasUniform = PHASE3_QUARANTINED_PRODUCTS.some((q) => q.sku === 'JK-OAS-P3-QUAR-UNIF');
    
    assert(hasInsignia, 'Regiment insignia lapel pin is quarantined');
    assert(hasKnife, 'Restricted combat knife is quarantined');
    assert(hasHolster, 'Firearm/pistol holster is quarantined');
    assert(hasUniform, 'Official combat uniform camouflage is quarantined');
  });

  console.log('================================================================');
  console.log(`  PHASE 3 RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================');

  return { passed, failed };
}

if (process.argv[1]?.includes('phase3_diwali_and_expansion')) {
  runPhase3DiwaliAndExpansionTests().catch(console.error);
}
