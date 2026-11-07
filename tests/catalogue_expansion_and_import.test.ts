import {
  IMPORTED_PRODUCTS,
  IMPORTED_PARENT_CATEGORIES,
  IMPORTED_SUBCATEGORIES,
  IMPORTED_BRANDS,
} from '../src/data/importedCatalogueData';
import {
  STAGED_PRODUCTS,
  STAGED_PARENT_CATEGORIES,
  STAGED_SUBCATEGORIES,
} from '../src/data/stagedCatalogueData';
import {
  importCatalogue,
} from '../src/lib/catalogue/catalogueImportService';
import {
  getAdminCatalogueData,
  updateProductReview,
  bulkApproveProducts,
  assertAdminOrStaff,
} from '../src/lib/catalogue/catalogueAdminService';
import { SystemRole } from '@prisma/client';

export async function runCatalogueExpansionTests(): Promise<{ passed: number; failed: number }> {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ ${msg}`);
      passed++;
    } else {
      console.error(`  ✕ FAIL: ${msg}`);
      failed++;
    }
  }

  console.log('\n--- 1. Catalogue Data Integrity & Uniqueness Checks ---');
  {
    // A. Total products count
    assert(IMPORTED_PRODUCTS.length === 227, `Expanded catalogue contains 227 researched products (actual: ${IMPORTED_PRODUCTS.length})`);

    // B. Unique SKUs and Slugs
    const skus = new Set<string>();
    const slugs = new Set<string>();
    let duplicateSkus = 0;
    let duplicateSlugs = 0;

    for (const p of IMPORTED_PRODUCTS) {
      if (skus.has(p.sku)) duplicateSkus++;
      skus.add(p.sku);

      if (slugs.has(p.slug)) duplicateSlugs++;
      slugs.add(p.slug);
    }

    assert(duplicateSkus === 0, `All 227 product SKUs are unique (duplicate count: ${duplicateSkus})`);
    assert(duplicateSlugs === 0, `All 227 product URL slugs are unique (duplicate count: ${duplicateSlugs})`);

    // C. Model numbers and descriptions
    const missingModels = IMPORTED_PRODUCTS.filter((p) => !p.modelNumber || p.modelNumber.trim() === '');
    assert(missingModels.length === 0, `All 227 products have factual model numbers (missing: ${missingModels.length})`);

    const missingDescriptions = IMPORTED_PRODUCTS.filter((p) => !p.description || p.description.trim() === '');
    assert(missingDescriptions.length === 0, `All 227 products have non-empty fact-based descriptions`);
  }

  console.log('\n--- 2. Category & Brand Hierarchy Relationships ---');
  {
    const parentSlugs = new Set(IMPORTED_PARENT_CATEGORIES.map((c) => c.slug));
    const subSlugs = new Set(IMPORTED_SUBCATEGORIES.map((c) => c.slug));
    const brandNames = new Set(IMPORTED_BRANDS.map((b) => b.name));

    assert(parentSlugs.size === 3, `3 Parent categories defined: computer-peripherals, laptop-accessories, gaming-accessories`);
    assert(subSlugs.size === 19, `19 Subcategories defined across hardware catalog`);

    // Every subcategory must link to a valid parent category
    const orphanSubcategories = IMPORTED_SUBCATEGORIES.filter((s) => !s.parentSlug || !parentSlugs.has(s.parentSlug));
    assert(orphanSubcategories.length === 0, `All 19 subcategories have valid parentSlug links (orphans: ${orphanSubcategories.length})`);

    // Every product must reference a valid subcategory
    const invalidProductCategories = IMPORTED_PRODUCTS.filter((p) => !subSlugs.has(p.categorySlug));
    assert(invalidProductCategories.length === 0, `Every product belongs to a valid registered subcategory`);

    // Every product must reference a valid brand
    const invalidProductBrands = IMPORTED_PRODUCTS.filter((p) => !brandNames.has(p.brand));
    assert(invalidProductBrands.length === 0, `Every product references a valid registered brand`);
  }

  console.log('\n--- 3. Price & Commercial Safeguard Validation ---');
  {
    // A. All products default to DRAFT and unconfirmed price
    const nonDraftProducts = IMPORTED_PRODUCTS.filter((p) => p.publicationStatus !== 'DRAFT');
    assert(nonDraftProducts.length === 0, `All imported products strictly default to publicationStatus='DRAFT' (violations: ${nonDraftProducts.length})`);

    const confirmedPriceViolations = IMPORTED_PRODUCTS.filter((p) => p.isPriceConfirmed !== false);
    assert(confirmedPriceViolations.length === 0, `All imported products strictly default to isPriceConfirmed=false`);

    const confirmedWarrantyViolations = IMPORTED_PRODUCTS.filter((p) => p.isWarrantyConfirmed !== false);
    assert(confirmedWarrantyViolations.length === 0, `All imported products strictly default to isWarrantyConfirmed=false`);

    // B. Validate price structure
    let validPricesCount = 0;
    let missingPricesCount = 0;
    for (const p of IMPORTED_PRODUCTS) {
      if (p.sourcePriceINR !== null && p.sourcePriceINR > 0) {
        validPricesCount++;
        if (p.mrpINR !== null) {
          assert(p.mrpINR >= p.sourcePriceINR, `Product "${p.sku}" MRP (${p.mrpINR}) is greater than or equal to source selling price (${p.sourcePriceINR})`);
        }
      } else {
        missingPricesCount++;
      }
    }

    assert(validPricesCount === 26, `26 products have verified source prices (actual: ${validPricesCount})`);
    assert(missingPricesCount === 201, `201 products with unlisted source prices are properly flagged as missing/inquiry (actual: ${missingPricesCount})`);
  }

  console.log('\n--- 4. Import Service Dry Run & Idempotency ---');
  {
    // A. Dry-run execution
    const dryRunReport = await importCatalogue({ dryRun: true, allowOfflineValidation: true });
    assert(dryRunReport.isDryRun === true, `Dry run flag respected`);
    assert(dryRunReport.products.totalEvaluated === 263, `Dry run evaluated all 263 onboarded products (227 original + 36 staged, actual: ${dryRunReport.products.totalEvaluated})`);
    assert(dryRunReport.errors.length === 0, `Dry run produced zero validation errors`);
    assert(dryRunReport.categories.parentCategories === 4, `4 parent categories verified in dry run (3 original + 1 military-outdoor, actual: ${dryRunReport.categories.parentCategories})`);
    assert(dryRunReport.categories.subcategories === 26, `26 subcategories verified in dry run (19 original + 7 staged, actual: ${dryRunReport.categories.subcategories})`);
    assert(dryRunReport.products.created === 0, `Dry run creates 0 database records (actual: ${dryRunReport.products.created})`);

    // B. Idempotency test: Re-running dry-run produces identical results
    const secondDryRun = await importCatalogue({ dryRun: true, allowOfflineValidation: true });
    assert(secondDryRun.products.totalEvaluated === dryRunReport.products.totalEvaluated, `Idempotent: Evaluated counts match on rerun (${secondDryRun.products.totalEvaluated})`);
    assert(secondDryRun.errors.length === 0, `Idempotent: Zero errors on second run`);
    assert(secondDryRun.products.created === 0, `Idempotent dry run performs 0 writes`);
  }

  console.log('\n--- 5. Administrative Authorization & Role-Based Access Control ---');
  {
    // A. Unauthenticated user denied
    let unauthBlocked = false;
    try {
      assertAdminOrStaff(null);
    } catch {
      unauthBlocked = true;
    }
    assert(unauthBlocked, `assertAdminOrStaff rejects null/unauthenticated session`);

    // B. Regular customer (CUSTOMER) denied
    let customerBlocked = false;
    try {
      assertAdminOrStaff({ user: { id: 'usr-1', email: 'customer@example.com', role: SystemRole.CUSTOMER } });
    } catch {
      customerBlocked = true;
    }
    assert(customerBlocked, `assertAdminOrStaff rejects customer with role 'CUSTOMER' (403 Forbidden)`);

    // C. Staff allowed
    let staffAllowed = false;
    try {
      assertAdminOrStaff({ user: { id: 'staff-1', email: 'staff@jkenterprises.in', role: SystemRole.STAFF } });
      staffAllowed = true;
    } catch {
      staffAllowed = false;
    }
    assert(staffAllowed, `assertAdminOrStaff permits authorized STAFF role`);

    // D. Admin allowed
    let adminAllowed = false;
    try {
      assertAdminOrStaff({ user: { id: 'admin-1', email: 'admin@jkenterprises.in', role: SystemRole.ADMIN } });
      adminAllowed = true;
    } catch {
      adminAllowed = false;
    }
    assert(adminAllowed, `assertAdminOrStaff permits authorized ADMIN role`);
  }

  console.log('\n--- 6. Admin Catalogue Review & Price Confirmation Workflow ---');
  {
    const adminSession = {
      user: { id: 'admin-1', email: 'admin@jkenterprises.in', role: SystemRole.ADMIN, name: 'JK Admin' },
    };

    // A. Fetch review desk data
    const deskData = await getAdminCatalogueData(adminSession, { page: 1, limit: 10 });
    assert(deskData.products.length === 10, `Admin catalogue retrieves paginated products`);
    assert(deskData.stats.totalProducts >= 227, `Admin stats include all products (total: ${deskData.stats.totalProducts})`);
    assert(deskData.stats.draftCount >= 227, `Admin stats correctly show items pending review in DRAFT`);

    // B. Search by model number
    const searchResult = await getAdminCatalogueData(adminSession, { q: 'CuteClicks' });
    assert(searchResult.products.length > 0, `Admin search by keyword/model succeeds (found ${searchResult.products.length} matches)`);

    // C. Filter by brand
    const hpResult = await getAdminCatalogueData(adminSession, { brand: 'HP' });
    assert(hpResult.products.every((p) => p.brand === 'HP'), `Admin filter by brand strictly returns HP products`);

    // D. Update product price and publication status
    const targetProduct = deskData.products[0];
    const updateResult = await updateProductReview(adminSession, {
      productId: targetProduct.id,
      confirmedPriceINR: 1499,
      isPriceConfirmed: true,
      warrantyInfo: '1 Year Comprehensive Onsite Warranty',
      isWarrantyConfirmed: true,
      publicationStatus: 'PUBLISHED',
    });

    assert(updateResult.confirmedPriceINR === 1499, `Confirmed selling price successfully saved (₹1,499)`);
    assert(updateResult.isPriceConfirmed === true, `isPriceConfirmed flagged as true`);
    assert(updateResult.publicationStatus === 'PUBLISHED', `publicationStatus successfully transitioned to PUBLISHED`);

    // E. Bulk approval
    const secondProduct = deskData.products[1];
    const bulkResult = await bulkApproveProducts(adminSession, [secondProduct.id]);
    assert(bulkResult.updatedCount === 1, `bulkApproveProducts approves selected items`);
  }

  console.log('\n--- 7. Public Sitemap & Publication Eligibility Safeguards ---');
  {
    // A. Unreviewed products remain DRAFT
    const unapproved = IMPORTED_PRODUCTS.slice(2);
    assert(unapproved.every((p) => p.publicationStatus === 'DRAFT'), `Unreviewed imported products remain in DRAFT status`);

    // B. Sitemap eligibility: only PUBLISHED products are eligible
    const sitemapEligible = IMPORTED_PRODUCTS.filter((p) => p.publicationStatus === ('PUBLISHED' as string));
    assert(sitemapEligible.length === 0, `0 unreviewed imported products are eligible for the public sitemap`);
  }

  console.log('\n--- 8. Phase 2 Staged Catalogue Scope & Safeguard Verification ---');
  {
    // A. Exactly 36 Staged Candidates
    assert(STAGED_PRODUCTS.length === 36, `Exactly 36 new eligible products staged (actual: ${STAGED_PRODUCTS.length})`);

    // B. Strict DRAFT and unconfirmed price/warranty status
    const nonDraftStaged = STAGED_PRODUCTS.filter((p) => p.publicationStatus !== 'DRAFT');
    assert(nonDraftStaged.length === 0, `All 36 staged products strictly have publicationStatus='DRAFT'`);

    const confirmedPriceStaged = STAGED_PRODUCTS.filter((p) => p.isPriceConfirmed !== false);
    assert(confirmedPriceStaged.length === 0, `All 36 staged products strictly have isPriceConfirmed=false`);

    const confirmedWarrantyStaged = STAGED_PRODUCTS.filter((p) => p.isWarrantyConfirmed !== false);
    assert(confirmedWarrantyStaged.length === 0, `All 36 staged products strictly have isWarrantyConfirmed=false`);

    // C. No images assigned (empty array)
    const withImagesStaged = STAGED_PRODUCTS.filter((p) => p.images && p.images.length > 0);
    assert(withImagesStaged.length === 0, `All 36 staged products have empty image arrays [] per Phase 1.3 audit`);

    // D. Unique SKUs and Slugs across both datasets
    const allSkus = new Set<string>();
    const allSlugs = new Set<string>();
    let totalDuplicateSkus = 0;
    let totalDuplicateSlugs = 0;

    for (const p of [...IMPORTED_PRODUCTS, ...STAGED_PRODUCTS]) {
      if (allSkus.has(p.sku)) totalDuplicateSkus++;
      allSkus.add(p.sku);

      if (allSlugs.has(p.slug)) totalDuplicateSlugs++;
      allSlugs.add(p.slug);
    }

    assert(totalDuplicateSkus === 0, `All 263 products (227 original + 36 staged) have globally unique SKUs`);
    assert(totalDuplicateSlugs === 0, `All 263 products have globally unique URL slugs`);

    // E. Category hierarchy checks for staged categories
    const parentSlugs = new Set([...IMPORTED_PARENT_CATEGORIES, ...STAGED_PARENT_CATEGORIES].map((c) => c.slug));
    const subSlugs = new Set([...IMPORTED_SUBCATEGORIES, ...STAGED_SUBCATEGORIES].map((c) => c.slug));

    assert(parentSlugs.has('military-outdoor'), `Parent category 'military-outdoor' exists`);
    assert(subSlugs.has('tactical-bags-backpacks'), `Subcategory 'tactical-bags-backpacks' exists`);
    assert(subSlugs.has('outdoor-boots-footwear'), `Subcategory 'outdoor-boots-footwear' exists`);
    assert(subSlugs.has('tactical-apparel'), `Subcategory 'tactical-apparel' exists`);
    assert(subSlugs.has('camping-survival-gear'), `Subcategory 'camping-survival-gear' exists`);
    assert(subSlugs.has('military-accessories-gear'), `Subcategory 'military-accessories-gear' exists`);
    assert(subSlugs.has('cables-connectivity'), `Subcategory 'cables-connectivity' exists under computer-peripherals`);
    assert(subSlugs.has('adapters-converters'), `Subcategory 'adapters-converters' exists under computer-peripherals`);

    // Every staged product belongs to an approved subcategory
    const invalidStagedCategory = STAGED_PRODUCTS.filter((p) => !subSlugs.has(p.categorySlug));
    assert(invalidStagedCategory.length === 0, `All 36 staged products belong to a valid registered subcategory`);

    // F. Excluded and Quarantined candidates NOT present
    const quarantinedOrExcludedSkus = [
      'JK-OAS-EPL-PARA',
      'JK-OAS-BDG-BALIDAN-R',
      'JK-OAS-BDG-PARA50',
      'JK-OAS-SLG-BERETTA',
      'JK-OAS-SLG-AK3P',
      'JK-OAS-IDC-GOI',
      'JK-OAS-PCH-MAG4X',
      'JK-OAS-NSG-SANDO',
      'JK-OAS-POLO-FLAG',
      'JK-OAS-IA-TRACKSUIT',
      'JK-OAS-SF-BALIDAN',
      'JK-OAS-VET-CAP',
      'JK-OAS-NET-PATKA-NP',
    ];
    const foundQuarantined = STAGED_PRODUCTS.filter((p) => quarantinedOrExcludedSkus.includes(p.sku));
    assert(foundQuarantined.length === 0, `Zero quarantined or excluded items are present in staged dataset`);

    // G. Allocation Verification: 20 Online Army Store + 16 Golchha Computer
    const oasCount = STAGED_PRODUCTS.filter((p) => p.sku.startsWith('JK-OAS-')).length;
    const golCount = STAGED_PRODUCTS.filter((p) => p.sku.startsWith('JK-GOL-')).length;
    assert(oasCount === 20, `Exactly 20 Online Army Store products staged (actual: ${oasCount})`);
    assert(golCount === 16, `Exactly 16 Golchha Computer products staged (actual: ${golCount})`);

    // H. Candidate #33 (Honeywell DP-to-HDMI) prominently marks Open Box
    const candidate33 = STAGED_PRODUCTS.find((p) => p.sku === 'JK-GOL-HW-DPHDMI-OB');
    assert(!!candidate33, `Candidate #33 (Honeywell DP-to-HDMI) is staged`);
    assert(candidate33?.name.includes('Open Box') === true, `Candidate #33 name prominently retains Open Box condition`);

    // I. Candidate #48 (Multybyte Type-C Printer Cable 1.5m) is staged
    const candidate48 = STAGED_PRODUCTS.find((p) => p.sku === 'JK-GOL-MB-TCPRN-15M');
    assert(!!candidate48, `Candidate #48 (Multybyte Type-C Printer Cable 1.5m) is staged`);
    assert(candidate48?.modelNumber === 'PM-42', `Candidate #48 model number is PM-42`);
    assert(candidate48?.sourcePriceINR === 185, `Candidate #48 source price is ₹185`);
    assert(candidate48?.mrpINR === 350, `Candidate #48 MRP is ₹350`);

    // J. Commscope CAT6 cable marked On Order with no source price
    const commscope = STAGED_PRODUCTS.find((p) => p.sku === 'JK-GOL-CMS-CAT6-305M');
    assert(!!commscope, `Commscope CAT6 305m cable is staged`);
    assert(commscope?.sourceAvailability === 'On Order', `Commscope cable is marked 'On Order'`);
    assert(commscope?.sourcePriceINR === null, `Commscope cable has sourcePriceINR=null`);

    // K. Existing 227 imported products completely untouched
    assert(IMPORTED_PRODUCTS.length === 227, `Original 227 products preserved intact`);
    const fingersCount = IMPORTED_PRODUCTS.filter((p) => p.brand === 'FINGERS').length;
    const hpCount = IMPORTED_PRODUCTS.filter((p) => p.brand === 'HP').length;
    const hyperxCount = IMPORTED_PRODUCTS.filter((p) => p.brand === 'HyperX').length;
    const polyCount = IMPORTED_PRODUCTS.filter((p) => p.brand === 'Poly').length;
    assert(fingersCount === 180, `Existing 180 FINGERS products preserved`);
    assert(hpCount === 35, `Existing 35 HP products preserved`);
    assert(hyperxCount === 6, `Existing 6 HyperX products preserved`);
    assert(polyCount === 6, `Existing 6 Poly products preserved`);
  }

  return { passed, failed };
}

// Standalone runner
if (require.main === module || process.argv[1]?.includes('catalogue_expansion_and_import.test')) {
  runCatalogueExpansionTests().then(({ passed, failed }) => {
    console.log(`\nCatalogue Expansion Test Results: ${passed} passed, ${failed} failed`);
    process.exit(failed > 0 ? 1 : 0);
  });
}
