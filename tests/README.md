# JK Enterprises — Automated Test Suites

Tracked, versioned automated test suites for the JK Enterprises web application.

## Overview of Test Suites

| Test File | Description | Environment Requirements |
| :--- | :--- | :--- |
| `tests/unit_and_flow_audit.test.ts` | Tests strict 10-digit Indian phone validation (+91 normalizations), shipping input clamping, server-side address validation, product resolution, delivery tiered calculation, cart pricing, and 403 Forbidden checks. | **None (Offline / In-Memory)** |
| `tests/product_detail_flow.test.ts` | Tests product slug resolution, MRP vs. demo pricing calculations, specifications extraction, WhatsApp link encoding, and delivery preliminary status notices. | **None (Offline / In-Memory)** |
| `tests/security_and_authorization.test.ts` | Tests business config integrity, 41 official Rajasthan districts, customer UTR state transitions, customer role payment verification rejection (403), and staff CONFIRM/REJECT authorization. | **None (Offline / In-Memory)** |
| `tests/database_models_and_schema.test.ts` | Tests Prisma schema existence, model relations, migration SQL index definitions, production persistence enforcement, and horizontal privilege escalation prevention. | **None (Offline / In-Memory)** |
| `tests/payment_safety_and_preproduction.test.ts` | Tests unconfigured payment fallback behavior, sandbox isolation, guest access token validation, and copy disclaimers. | **None (Offline / In-Memory)** |
| `tests/postgres_persistence.integration.test.ts` | Tests real PostgreSQL multi-table ACID transactions, atomic rollback on failure, quotation inquiry creation, and isolated test data cleanup. | **Requires live PostgreSQL (`DATABASE_URL` in `.env.local`)** |

## Running the Tests

### 1. Run All Offline Unit & Flow Tests
```bash
npm test
```
*Executes all offline suites in sequence via `tsx tests/run_all.ts`.*

### 2. Run Individual Test Suites
```bash
npx tsx tests/unit_and_flow_audit.test.ts
npx tsx tests/product_detail_flow.test.ts
npx tsx tests/security_and_authorization.test.ts
npx tsx tests/database_models_and_schema.test.ts
npx tsx tests/payment_safety_and_preproduction.test.ts
```

### 3. Run Live PostgreSQL Persistence Integration Test
```bash
npm run test:db
```
*Note: This test connects to the configured PostgreSQL database, creates isolated test records with prefix `JK-TEST-...`, verifies persistence and transaction rollback, and strictly cleans up test records in the `finally` block.*
