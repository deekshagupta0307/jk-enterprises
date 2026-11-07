import { runAuditSuite } from './unit_and_flow_audit.test';
import { testProductDetailFlow } from './product_detail_flow.test';
import { runSecurityAndAuthorizationSuite } from './security_and_authorization.test';
import { runDurableDatabaseReadinessTests } from './database_models_and_schema.test';
import { runTargetedPreproductionCheck } from './payment_safety_and_preproduction.test';
import { runCatalogueExpansionTests } from './catalogue_expansion_and_import.test';
import { runPhase3DiwaliAndExpansionTests } from './phase3_diwali_and_expansion.test';
import { isDatabaseConfigured } from '@/lib/db/prisma';

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       JK ENTERPRISES — AUTOMATED TEST SUITE RUNNER           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  let totalPassed = 0;
  let totalFailed = 0;

  const suites: { name: string; runner: () => Promise<{ passed: number; failed: number }> }[] = [
    { name: 'Unit & Flow Audit Suite', runner: runAuditSuite },
    { name: 'Product Detail Flow & Catalogue Suite', runner: testProductDetailFlow },
    { name: 'Security, Authorization & Workflow Suite', runner: runSecurityAndAuthorizationSuite },
    { name: 'Database Models & Schema Readiness Suite', runner: runDurableDatabaseReadinessTests },
    { name: 'Targeted Pre-Production Safety Suite', runner: runTargetedPreproductionCheck },
    { name: 'Catalogue Expansion, Dry Run & Review Suite', runner: runCatalogueExpansionTests },
    { name: 'Phase 3 Diwali Discount & Expansion Suite', runner: runPhase3DiwaliAndExpansionTests },
  ];

  for (const s of suites) {
    try {
      console.log(`\n>>> Running: ${s.name}...`);
      const { passed, failed } = await s.runner();
      totalPassed += passed;
      totalFailed += failed;
    } catch (err) {
      console.error(`Suite ${s.name} encountered an unexpected fatal error:`, err);
      totalFailed++;
    }
  }

  console.log('\n════════════════════════════════════════════════════════════════');
  console.log(`  AGGREGATE TEST RESULTS: ${totalPassed} PASSED, ${totalFailed} FAILED`);
  console.log('════════════════════════════════════════════════════════════════');

  const dbConfigured = isDatabaseConfigured();
  console.log(`\nDatabase Integration Status: ${dbConfigured ? 'CONNECTED' : 'NOT CONFIGURED'}`);
  if (dbConfigured) {
    console.log('To run live PostgreSQL persistence integration tests: npm run test:db');
  }

  if (totalFailed > 0) {
    console.error(`\n✖ Test execution finished with ${totalFailed} failing checks.`);
    process.exit(1);
  } else {
    console.log(`\n✔ All ${totalPassed} checks completed successfully.`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
