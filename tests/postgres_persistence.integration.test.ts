import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { isDatabaseConfigured, getPrismaClient } from '@/lib/db/prisma';
import {
  placeCustomerOrder,
  verifyAndConfirmPaymentAttempt,
  updateOrderPaymentUtr,
} from '@/lib/orders/orderService';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { OrderStatus, InvoiceType } from '@prisma/client';

export async function runRealPostgresPersistenceTests(): Promise<{
  executed: boolean;
  passed: boolean;
  error?: string;
  reason?: string;
}> {
  console.log('================================================================');
  console.log('JK Enterprises — Live PostgreSQL Persistence Integration Test');
  console.log('================================================================');

  const configured = isDatabaseConfigured();
  console.log(`[Check 1] Database URL Configured: ${configured}`);

  if (!configured) {
    console.log('\n[STATUS] Real PostgreSQL is NOT configured.');
    console.log('[DECLARATION] Live database tests were NOT executed and will NOT be falsely reported as passed.');
    console.log('\nSteps to run live integration tests:');
    console.log('1. Ensure DATABASE_URL is configured in .env.local.');
    console.log('2. Ensure migrations are deployed: npx prisma migrate deploy.');
    console.log('3. Run command: npm run test:db');
    return { executed: false, passed: false, reason: 'DATABASE_URL_NOT_CONFIGURED' };
  }

  // Attempt real connection
  let prisma;
  try {
    prisma = getPrismaClient();
    await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('✔ Real PostgreSQL connection established successfully.');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('✖ PostgreSQL connection failed:', msg);
    return { executed: true, passed: false, error: msg };
  }

  const testInquiryNumber = `JK-TEST-INQ-${Date.now()}`;
  let createdOrderNumber: string | null = null;

  try {
    // --------------------------------------------------------------------------
    // Test 1: Create and retrieve a test quotation inquiry
    // --------------------------------------------------------------------------
    console.log('\n--- Test 1: Create & Retrieve Test Quotation Inquiry ---');
    const createdInquiry = await prisma.quotationInquiry.create({
      data: {
        inquiryNumber: testInquiryNumber,
        organizationName: 'JK Test Institutions (Bikaner)',
        contactName: 'Mr. Test Auditor',
        district: 'Bikaner',
        requirementType: 'Bulk Procurement Verification',
        notes: 'Automated integration test for launch readiness.',
        status: 'SUBMITTED',
        isDemo: true,
      },
    });
    console.log(`Created test inquiry with ID: ${createdInquiry.id}`);

    const retrievedInquiry = await prisma.quotationInquiry.findUnique({
      where: { inquiryNumber: testInquiryNumber },
    });

    if (!retrievedInquiry || retrievedInquiry.contactName !== 'Mr. Test Auditor') {
      throw new Error('Test 1 Failed: Quotation inquiry not retrieved authoritatively from PostgreSQL.');
    }
    console.log(`✔ Test 1 Passed: Inquiry ${testInquiryNumber} created and verified in PostgreSQL.`);

    // --------------------------------------------------------------------------
    // Test 2: Verify order and invoice persistence using supported workflow
    // --------------------------------------------------------------------------
    console.log('\n--- Test 2: Verify Order & Invoice Persistence ---');
    const orderRes = await placeCustomerOrder({
      items: [{ productId: 'DEMO-SSD-990PRO-1TB', quantity: 2 }],
      shipping: {
        customerName: 'Integration Test Buyer',
        email: 'test-buyer@jkenterprises.test',
        phone: '9928769266',
        addressLine1: 'Industrial Area, Rani Bazar',
        district: 'Bikaner',
        state: 'Rajasthan',
        pinCode: '334001',
      },
      paymentMethod: 'MANUAL_UPI_QR',
      notes: 'Automated Day 2 Persistence Test Order',
    });

    if (!orderRes.success || !orderRes.order) {
      throw new Error(`Test 2 Failed: placeCustomerOrder failed: ${orderRes.error}`);
    }

    createdOrderNumber = orderRes.order.orderNumber;
    console.log(`✔ Test 2 Passed: Order ${createdOrderNumber} (ID: ${orderRes.order.id}) created via durable transaction.`);

    // --------------------------------------------------------------------------
    // Test 3: Confirm records remain retrievable after a fresh database query
    // --------------------------------------------------------------------------
    console.log('\n--- Test 3: Fresh Database Query Verification ---');
    const freshDbOrder = await prisma.order.findUnique({
      where: { orderNumber: createdOrderNumber },
      include: { items: true, invoice: true },
    });

    if (!freshDbOrder || !freshDbOrder.invoice || freshDbOrder.items.length !== 1) {
      throw new Error('Test 3 Failed: Fresh query did not return order, items, and proforma invoice.');
    }
    if (freshDbOrder.invoice.invoiceType !== InvoiceType.PROFORMA_INVOICE) {
      throw new Error('Test 3 Failed: Initial invoice must be PROFORMA_INVOICE.');
    }
    console.log(`✔ Test 3 Passed: Order ${createdOrderNumber} authoritatively verified via fresh DB query.`);

    // --------------------------------------------------------------------------
    // Test 4: Verify rollback / error handling for failed transactions
    // --------------------------------------------------------------------------
    console.log('\n--- Test 4: Transaction Rollback Verification ---');
    const rollbackOrderNum = `JK-TEST-ROLLBACK-${Date.now()}`;
    let rollbackOccurred = false;

    try {
      await prisma.$transaction(async (tx) => {
        // Step A: Insert test order
        await tx.order.create({
          data: {
            orderNumber: rollbackOrderNum,
            customerName: 'Rollback Tester',
            customerEmail: 'rollback@test.com',
            customerPhone: '9928769266',
            shippingAddressLine1: 'Test St',
            district: 'Bikaner',
            pinCode: '334001',
            state: 'Rajasthan',
            paymentMethod: 'MANUAL_UPI_QR',
            paymentStatus: OrderStatus.AWAITING_PAYMENT,
            subtotalINR: 1000,
            deliveryFeeINR: 0,
            taxINR: 180,
            totalAmountINR: 1180,
            accessToken: 'token123',
          },
        });

        // Step B: Intentionally trigger error to force transaction abort
        throw new Error('INTENTIONAL_SIMULATED_TRANSACTION_FAILURE');
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('INTENTIONAL_SIMULATED_TRANSACTION_FAILURE')) {
        rollbackOccurred = true;
      }
    }

    const checkRollback = await prisma.order.findUnique({
      where: { orderNumber: rollbackOrderNum },
    });

    if (checkRollback !== null || !rollbackOccurred) {
      throw new Error('Test 4 Failed: Transaction was not rolled back properly.');
    }
    console.log('✔ Test 4 Passed: Transaction rollback verified. Zero orphaned records created.');

    // --------------------------------------------------------------------------
    // Test 5: Confirm unauthorized payment confirmation is rejected
    // --------------------------------------------------------------------------
    console.log('\n--- Test 5: Payment Security & Authorization Verification ---');
    const utrUpdate = await updateOrderPaymentUtr(createdOrderNumber, 'UTR1234567890');
    if (!utrUpdate.success || utrUpdate.order?.paymentStatus !== OrderStatus.PAYMENT_UNDER_VERIFICATION) {
      throw new Error('Test 5 Failed: Customer UTR did not transition to PAYMENT_UNDER_VERIFICATION.');
    }
    if (utrUpdate.order?.isOrderConfirmed === true) {
      throw new Error('Test 5 CRITICAL FAILURE: Customer UTR confirmed payment illegally!');
    }

    const unauthorizedSession: AuthenticatedUserSession = {
      user: {
        id: 'cust-user-1',
        name: 'Regular Customer',
        email: 'customer@example.com',
        role: 'CUSTOMER',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-1',
        token: 'token',
        expiresAt: new Date(Date.now() + 3600000),
      },
    };

    let authorizationBlocked = false;
    try {
      await verifyAndConfirmPaymentAttempt(
        { referenceNumber: createdOrderNumber, action: 'CONFIRM' },
        unauthorizedSession
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isAuthErr =
        msg.includes('Administrative verification required') ||
        (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 403);
      if (isAuthErr) {
        authorizationBlocked = true;
      }
    }

    if (!authorizationBlocked) {
      throw new Error('Test 5 CRITICAL FAILURE: Unauthorized customer was able to confirm payment!');
    }
    console.log('✔ Test 5 Passed: Unauthorized payment confirmation strictly rejected with 403 Forbidden.');

    return { executed: true, passed: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('✖ Persistence Test Suite Error:', msg);
    return { executed: true, passed: false, error: msg };
  } finally {
    // --------------------------------------------------------------------------
    // Test 6: Clean up only test records created by these tests
    // --------------------------------------------------------------------------
    console.log('\n--- Test 6: Safe Cleanup of Test Records Only ---');
    try {
      if (testInquiryNumber) {
        await prisma.quotationInquiry.deleteMany({
          where: { inquiryNumber: testInquiryNumber },
        });
      }
      if (createdOrderNumber) {
        await prisma.invoice.deleteMany({
          where: { order: { orderNumber: createdOrderNumber } },
        });
        await prisma.orderItem.deleteMany({
          where: { order: { orderNumber: createdOrderNumber } },
        });
        await prisma.order.deleteMany({
          where: { orderNumber: createdOrderNumber },
        });
      }
      console.log('✔ Test 6 Passed: Only test records cleaned up. Real customer data untouched.');
    } catch (cleanupErr: unknown) {
      const msg = cleanupErr instanceof Error ? cleanupErr.message : String(cleanupErr);
      console.warn('Warning during cleanup:', msg);
    } finally {
      await prisma.$disconnect();
    }
  }
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('postgres_persistence.integration.test')) {
  runRealPostgresPersistenceTests().then((res) => {
    if (!res.passed && res.executed) process.exit(1);
  }).catch((err) => {
    console.error('Integration test crashed:', err);
    process.exit(1);
  });
}
