/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  placeCustomerOrder,
  getOrderSecurely,
  verifyAndConfirmPaymentAttempt,
  updateOrderPaymentUtr,
} from '@/lib/orders/orderService';
import { isDatabaseConfigured } from '@/lib/db/prisma';
import { AuthorizationError } from '@/lib/auth/authorization';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import fs from 'fs';
import path from 'path';

export async function runDurableDatabaseReadinessTests(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — DURABLE DATABASE & PRODUCTION READINESS TEST');
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

  const originalNodeEnv = process.env.NODE_ENV;

  try {
    // ----------------------------------------------------------------
    // SECTION 1: Database Migration & Schema Integrity
    // ----------------------------------------------------------------
    console.log('--- SECTION 1: Database Migration & Schema Integrity ---');

    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    assert(fs.existsSync(schemaPath), 'prisma/schema.prisma exists on disk');

    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    assert(schemaContent.includes('model Order'), 'Order model defined in schema');
    assert(schemaContent.includes('model OrderItem'), 'OrderItem model defined in schema');
    assert(schemaContent.includes('model Invoice'), 'Invoice model defined in schema');
    assert(schemaContent.includes('model User'), 'User (Better Auth) model defined in schema');
    assert(schemaContent.includes('model Session'), 'Session model defined in schema');
    assert(schemaContent.includes('model Account'), 'Account model defined in schema');
    assert(schemaContent.includes('model CustomerProfile'), 'CustomerProfile model defined in schema');
    assert(schemaContent.includes('model Product'), 'Product catalogue model defined in schema');
    assert(schemaContent.includes('model QuotationInquiry'), 'QuotationInquiry model defined in schema');

    const migrationDir = path.join(process.cwd(), 'prisma', 'migrations', '20261022000000_init');
    const migrationSqlPath = path.join(migrationDir, 'migration.sql');
    const lockFilePath = path.join(process.cwd(), 'prisma', 'migrations', 'migration_lock.toml');

    assert(fs.existsSync(migrationSqlPath), 'Initial migration SQL file exists at prisma/migrations/20261022000000_init/migration.sql');
    assert(fs.existsSync(lockFilePath), 'Prisma migration lock file exists at prisma/migrations/migration_lock.toml');

    const migrationSql = fs.readFileSync(migrationSqlPath, 'utf-8');
    assert(migrationSql.includes('CREATE TABLE "orders"'), 'Migration script creates "orders" table');
    assert(migrationSql.includes('CREATE TABLE "order_items"'), 'Migration script creates "order_items" table');
    assert(migrationSql.includes('CREATE TABLE "invoices"'), 'Migration script creates "invoices" table');
    assert(migrationSql.includes('CREATE UNIQUE INDEX "orders_orderNumber_key"'), 'Unique index on orders.orderNumber');
    assert(migrationSql.includes('CREATE UNIQUE INDEX "orders_confirmedOrderNumber_key"'), 'Unique index on orders.confirmedOrderNumber');
    assert(migrationSql.includes('CREATE UNIQUE INDEX "invoices_invoiceNumber_key"'), 'Unique index on invoices.invoiceNumber');
    assert(migrationSql.includes('REFERENCES "orders"("id") ON DELETE CASCADE'), 'Foreign keys cascade from orders to items & invoices');

    // ----------------------------------------------------------------
    // SECTION 2: Database-Unavailable Behavior in Production
    // ----------------------------------------------------------------
    console.log('\n--- SECTION 2: Database-Unavailable Behavior in Production ---');

    (process.env as any).NODE_ENV = 'production';
    const isDbInitiallyConfigured = isDatabaseConfigured();
    // In production without live credentials, order placement should reject or verify persistence
    const prodOrderRes = await placeCustomerOrder({
      items: [{ productId: 'demo-prod-1', quantity: 1 }],
      shipping: {
        customerName: 'Commercial Client',
        email: 'client@example.com',
        phone: '9829012345',
        addressLine1: 'Industrial Area',
        district: 'Bikaner',
        pinCode: '334001',
        state: 'Rajasthan',
      },
      paymentMethod: 'MANUAL_UPI_QR',
    });

    if (!isDbInitiallyConfigured) {
      assert(prodOrderRes.success === false, 'placeCustomerOrder fails in production when DB is unconfigured');
      assert(typeof prodOrderRes.error === 'string' && prodOrderRes.error.includes('Database persistence is not configured'), 'Error message clearly states database persistence requirement');
      assert(prodOrderRes.order === undefined, 'No unpersisted order is returned');
    } else {
      assert(prodOrderRes.success === true, 'placeCustomerOrder succeeds in production when DB is configured');
      assert(prodOrderRes.order?.isPersisted === true, 'Order is marked persisted in production');
    }

    // ----------------------------------------------------------------
    // SECTION 3: Development Sandbox Order Creation & Access Token Security
    // ----------------------------------------------------------------
    console.log('\n--- SECTION 3: Development Sandbox Order Creation & Access Token Security ---');

    (process.env as any).NODE_ENV = 'development';

    const devOrder1 = await placeCustomerOrder({
      items: [
        { productId: 'demo-prod-1', quantity: 2 },
      ],
      shipping: {
        customerName: 'Anoop Kumar',
        email: 'anoop@example.com',
        phone: '9928769266',
        whatsapp: '9928769266',
        addressLine1: 'Rani Bazar',
        district: 'Bikaner',
        pinCode: '334001',
        state: 'Rajasthan',
      },
      paymentMethod: 'MANUAL_UPI_QR',
    });

    assert(devOrder1.success === true, 'Sandbox order successfully created in development');
    assert(devOrder1.order !== undefined, 'Order view returned');
    assert(devOrder1.order?.orderNumber.startsWith('JK-PAY-') === true, 'Assigned payment attempt reference prefix JK-PAY-');
    assert(devOrder1.order?.invoiceNumber.startsWith('JK-PRF-') === true, 'Assigned Proforma Invoice prefix JK-PRF-');
    assert(devOrder1.order?.accessToken ? devOrder1.order.accessToken.length >= 24 : false, 'Secure accessToken generated');
    assert(devOrder1.order?.items.length === 1, 'Order contains 1 line item');
    assert(devOrder1.order?.items[0].quantity === 2, 'Line item quantity is 2');

    const order1 = devOrder1.order!;

    // Non-duplication check: second order generates unique ID and access token
    const devOrder2 = await placeCustomerOrder({
      items: [{ productId: 'demo-prod-1', quantity: 1 }],
      shipping: {
        customerName: 'Second Customer',
        email: 'second@example.com',
        phone: '9829012345',
        addressLine1: 'Station Road',
        district: 'Bikaner',
        pinCode: '334001',
        state: 'Rajasthan',
      },
      paymentMethod: 'MANUAL_BANK_TRANSFER',
    });

    assert(devOrder2.order?.orderNumber !== order1.orderNumber, 'Subsequent orders receive unique order numbers');
    assert(devOrder2.order?.accessToken !== order1.accessToken, 'Subsequent orders receive unique access tokens');

    // ----------------------------------------------------------------
    // SECTION 4: Payment State Transitions & Anti-Fraud Protection
    // ----------------------------------------------------------------
    console.log('\n--- SECTION 4: Payment State Transitions & Anti-Fraud Protection ---');

    // Customer submits UTR
    const utrSubmission = await updateOrderPaymentUtr(order1.orderNumber, 'UPI998877665544', 'Sent via Google Pay');
    assert(utrSubmission.success === true, 'Customer UTR submission accepted');
    assert(utrSubmission.order?.paymentStatus === 'PAYMENT_UNDER_VERIFICATION', 'Status changed to PAYMENT_UNDER_VERIFICATION');
    assert(utrSubmission.order?.isOrderConfirmed === false, 'Order remains UNCONFIRMED after customer UTR');
    assert(utrSubmission.order?.confirmedOrderNumber == null, 'No official Order ID is assigned upon customer UTR');

    // Customer role is strictly forbidden from self-verifying payment
    const regularCustomerSession: AuthenticatedUserSession = {
      user: {
        id: 'cust-777',
        name: 'Regular Customer',
        email: 'customer@example.com',
        role: 'CUSTOMER',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-cust',
        token: 'tok-cust',
        expiresAt: new Date(Date.now() + 86400000),
      },
    };

    let customerBlocked = false;
    try {
      await verifyAndConfirmPaymentAttempt(
        { referenceNumber: order1.orderNumber, action: 'CONFIRM' },
        regularCustomerSession
      );
    } catch (e) {
      if (e instanceof AuthorizationError && e.statusCode === 403) {
        customerBlocked = true;
      }
    }
    assert(customerBlocked, 'Customer role attempting to verify payment triggers 403 FORBIDDEN');

    // Authorized staff confirms payment
    const staffSession: AuthenticatedUserSession = {
      user: {
        id: 'admin-001',
        name: 'Managing Director',
        email: 'admin@jkenterprises.in',
        role: 'ADMIN',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-admin',
        token: 'tok-admin',
        expiresAt: new Date(Date.now() + 86400000),
      },
    };

    const staffVerifyRes = await verifyAndConfirmPaymentAttempt(
      { referenceNumber: order1.orderNumber, action: 'CONFIRM', notes: 'Verified in SBI Bank Current Account' },
      staffSession
    );

    assert(staffVerifyRes.success === true, 'Staff successfully verified payment');
    assert(staffVerifyRes.order?.isOrderConfirmed === true, 'Order is now marked confirmed');
    assert(staffVerifyRes.order?.paymentStatus === 'CONFIRMED', 'Payment status is now CONFIRMED');
    assert(staffVerifyRes.order?.confirmedOrderNumber?.startsWith('JK-ORD-') === true, 'Assigned official Order ID with JK-ORD- prefix');
    assert(staffVerifyRes.order?.invoiceNumber?.startsWith('JK-INV-') === true, 'Assigned official Tax Invoice with JK-INV- prefix');
    assert(staffVerifyRes.order?.verifiedByUserId === staffSession.user.id, 'Audit trail records verifying user ID');

    // Prevent double verification of already confirmed order
    const duplicateVerify = await verifyAndConfirmPaymentAttempt(
      { referenceNumber: order1.orderNumber, action: 'CONFIRM' },
      staffSession
    );
    assert(duplicateVerify.success === false, 'Re-confirming already confirmed order returns error preventing state corruption');

    // ----------------------------------------------------------------
    // SECTION 5: Authorization & Horizontal Privilege Escalation Protection
    // ----------------------------------------------------------------
    console.log('\n--- SECTION 5: Authorization & Horizontal Privilege Escalation Protection ---');

    // Unauthenticated caller without access token
    let unauthenticatedBlocked = false;
    try {
      await getOrderSecurely(order1.orderNumber, null, null);
    } catch (e) {
      if (e instanceof AuthorizationError && e.statusCode === 403) {
        unauthenticatedBlocked = true;
      }
    }
    assert(unauthenticatedBlocked, 'Unauthenticated caller without access token is blocked (403)');

    // Caller with wrong token
    let invalidTokenBlocked = false;
    try {
      await getOrderSecurely(order1.orderNumber, 'fake-token-attempt', null);
    } catch (e) {
      if (e instanceof AuthorizationError && e.statusCode === 403) {
        invalidTokenBlocked = true;
      }
    }
    assert(invalidTokenBlocked, 'Caller with invalid access token is blocked (403)');

    // Caller with correct token
    const authorizedOrder = await getOrderSecurely(order1.orderNumber, order1.accessToken, null);
    assert(authorizedOrder !== null, 'Caller with valid access token receives order');
    assert(authorizedOrder?.orderNumber === order1.orderNumber, 'Retrieved order matches requested reference');

  } finally {
    (process.env as any).NODE_ENV = originalNodeEnv;
  }

  console.log(`\n================================================================`);
  console.log(`  DURABLE DATABASE AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`================================================================\n`);

  return { passed, failed };
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('database_models_and_schema.test')) {
  runDurableDatabaseReadinessTests().then(({ failed }) => {
    if (failed > 0) process.exit(1);
  }).catch((err) => {
    console.error('Test suite crashed:', err);
    process.exit(1);
  });
}
