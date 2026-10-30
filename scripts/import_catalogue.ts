#!/usr/bin/env node
/**
 * JK Enterprises — Product Catalogue Import Script
 * 
 * Usage:
 *   npm run catalogue:dry-run
 *   npm run catalogue:import
 *   npx tsx scripts/import_catalogue.ts --dry-run
 *   npx tsx scripts/import_catalogue.ts
 *   npx tsx scripts/import_catalogue.ts --offline
 */

import path from 'path';
import dotenv from 'dotenv';

// 1. Explicitly load environment variables from .env.local followed by .env
// Adheres strictly to the project's established pattern (prisma/seed.ts, tests/postgres_persistence.integration.test.ts)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: '.env.local' });
dotenv.config();

import { checkDatabaseConnectivity } from '../src/lib/db/prisma';
import { importCatalogue } from '../src/lib/catalogue/catalogueImportService';

async function run() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isOffline = args.includes('--offline') || args.includes('--offline-validate');
  const forcePriceOverwrite = args.includes('--force-price');

  console.log('='.repeat(70));
  console.log('JK ENTERPRISES — PRODUCT CATALOGUE EXPANSION & IMPORT');
  console.log('='.repeat(70));
  const modeLabel = isOffline
    ? 'OFFLINE VALIDATION (Dataset Integrity Only — No DB Connectivity)'
    : isDryRun
    ? 'DRY RUN (Simulation Against PostgreSQL — Zero Database Mutations)'
    : 'LIVE IMPORT (PostgreSQL / Neon Durable Persistence)';
  console.log(`Execution Mode:  ${modeLabel}`);
  console.log(`Price Safeguard: ${forcePriceOverwrite ? 'FORCE OVERWRITE' : 'ENABLED (Verified Prices Preserved)'}`);
  console.log(`Timestamp:       ${new Date().toISOString()}`);
  console.log('-'.repeat(70));

  // 2. Truthful Database Verification
  if (!isOffline) {
    process.stdout.write('Checking PostgreSQL database connection... ');
    const dbHealth = await checkDatabaseConnectivity();

    if (!dbHealth.connected) {
      console.log('FAILED ✕');
      console.error('\n' + '='.repeat(70));
      console.error('FATAL DATABASE CONNECTIVITY ERROR:');
      console.error(`  ${dbHealth.error || 'Unable to connect to PostgreSQL.'}`);
      console.error('The catalogue importer requires an active, reachable PostgreSQL database.');
      if (isDryRun) {
        console.error('Database-backed dry-run validation could not run because the database is unavailable.');
      } else {
        console.error('Persistent import aborted. Zero catalogue modifications performed.');
      }
      console.error('='.repeat(70));
      process.exit(1);
    }

    console.log('CONNECTED ✓');
    console.log('Target Database: PostgreSQL / Neon (Active ping verified via SELECT 1)');
    console.log('-'.repeat(70));
  } else {
    console.log('Database Mode:   OFFLINE (Database verification skipped by --offline request)');
    console.log('-'.repeat(70));
  }

  // 3. Execute Import (Dry Run, Live Import, or Offline Validation)
  const startTime = Date.now();
  const report = await importCatalogue({
    dryRun: isDryRun || isOffline,
    forcePriceOverwrite,
    allowOfflineValidation: isOffline,
  });
  const durationMs = Date.now() - startTime;

  if (report.errors.length > 0) {
    console.error('\n[ERRORS DETECTED]');
    for (const err of report.errors) {
      console.error(`  ! ${err}`);
    }
  }

  console.log('\n[1/5] CATEGORY & BRAND SUMMARY');
  console.log(`  Database Status:               ${report.isDatabaseConnected ? 'Connected (PostgreSQL / Neon)' : 'Offline / Unconnected'}`);
  console.log(`  Parent Categories Evaluated:   ${report.categories.parentCategories}`);
  console.log(`  Subcategories Evaluated:       ${report.categories.subcategories}`);
  console.log(`  Existing Categories Reused:    ${report.categories.reused}`);
  if (isDryRun || isOffline) {
    console.log(`  Categories to Create (Dry-Run): ${report.categories.wouldCreate}`);
    console.log(`  Categories Actually Created:   0 (Dry-Run: Zero DB Writes)`);
  } else {
    console.log(`  Categories to Create (Dry-Run): 0`);
    console.log(`  Categories Actually Created:   ${report.categories.created}`);
  }
  console.log(`  Brands Evaluated:              ${report.brands.total}`);
  console.log(`  Existing Brands Reused:        ${report.brands.reused}`);
  if (isDryRun || isOffline) {
    console.log(`  Brands to Create (Dry-Run):    ${report.brands.wouldCreate}`);
    console.log(`  Brands Actually Created:       0 (Dry-Run: Zero DB Writes)`);
  } else {
    console.log(`  Brands to Create (Dry-Run):    0`);
    console.log(`  Brands Actually Created:       ${report.brands.created}`);
  }

  console.log('\n[2/5] PRODUCT IMPORT METRICS');
  console.log(`  Total Products Evaluated:      ${report.products.totalEvaluated}`);
  if (isDryRun || isOffline) {
    console.log(`  Products to Create (Dry-Run):  ${report.products.wouldCreate}`);
    console.log(`  Products to Update (Dry-Run):  ${report.products.wouldUpdate}`);
    console.log(`  Products Actually Created:     0 (Dry-Run: Zero DB Writes)`);
    console.log(`  Products Actually Updated:     0 (Dry-Run: Zero DB Writes)`);
  } else {
    console.log(`  Products to Create (Dry-Run):  0`);
    console.log(`  Products to Update (Dry-Run):  0`);
    console.log(`  Products Actually Created:     ${report.products.created}`);
    console.log(`  Products Actually Updated:     ${report.products.updated}`);
  }
  console.log(`  Products Skipped:              ${report.products.skipped}`);
  console.log(`  Prices Safeguarded:            ${report.products.priceSafeguarded}`);
  console.log(`  Failed DB Operations / Errors: ${report.errors.length}`);

  console.log('\n[3/5] BRAND BREAKDOWN');
  for (const [brand, count] of Object.entries(report.brandBreakdown)) {
    console.log(`  - ${brand.padEnd(16)}: ${count} products`);
  }

  console.log('\n[4/5] CATEGORY BREAKDOWN');
  for (const [cat, count] of Object.entries(report.categoryBreakdown)) {
    console.log(`  - ${cat.padEnd(26)}: ${count} products`);
  }

  console.log('\n[5/5] DATA COMPLETENESS & AUDIT');
  console.log(`  Products with Model Numbers:   ${report.dataCompleteness.withModelNumber} / ${report.products.totalEvaluated}`);
  console.log(`  Products with MRP:             ${report.dataCompleteness.withMrp} / ${report.products.totalEvaluated}`);
  console.log(`  Products with Source Price:    ${report.dataCompleteness.withSourcePrice} / ${report.products.totalEvaluated}`);
  console.log(`  Products with Specifications:  ${report.dataCompleteness.withSpecifications} / ${report.products.totalEvaluated}`);
  console.log(`  Products with Images:          ${report.dataCompleteness.withImages} / ${report.products.totalEvaluated}`);
  console.log(`  Missing / Incomplete Prices:   ${report.dataCompleteness.missingSourcePrice}`);

  if (report.unaccessedSources.length > 0) {
    console.log('\n[EXCLUDED / UNACCESSED SOURCES]');
    for (const src of report.unaccessedSources) {
      console.log(`  - ${src.name} (${src.url})`);
      console.log(`    Reason: ${src.reason}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  if (isOffline) {
    if (report.errors.length > 0) {
      console.error(`Offline validation encountered ${report.errors.length} error(s). Validation FAILED.`);
      console.error('='.repeat(70));
      process.exit(1);
    }
    console.log(`Offline dataset validation completed successfully in ${durationMs}ms.`);
    console.log('ZERO database queries or modifications were performed.');
    console.log('='.repeat(70));
    process.exit(0);
  }

  if (isDryRun) {
    if (report.errors.length > 0) {
      console.error(`Dry-run simulation encountered ${report.errors.length} error(s). Validation FAILED.`);
      console.error('='.repeat(70));
      process.exit(1);
    }
    console.log(`Dry-run simulation completed successfully in ${durationMs}ms.`);
    console.log('ZERO database records were created or modified.');
    console.log('='.repeat(70));
    process.exit(0);
  }

  // Persistent Import
  if (report.products.created === 0 && report.products.updated === 0 && report.products.totalEvaluated > 0) {
    console.error(`Persistent import FAILED: 0 database writes occurred despite ${report.products.totalEvaluated} products evaluated.`);
    console.error('='.repeat(70));
    process.exit(1);
  }

  if (report.errors.length > 0) {
    console.error(`Persistent import finished with ${report.errors.length} error(s).`);
    console.error('='.repeat(70));
    process.exit(1);
  }

  console.log(`Live import completed successfully in ${durationMs}ms.`);
  console.log(`${report.products.created} products created, ${report.products.updated} products updated in PostgreSQL.`);
  console.log('='.repeat(70));
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal Import Failure:', err instanceof Error ? err.message : err);
  process.exit(1);
});
