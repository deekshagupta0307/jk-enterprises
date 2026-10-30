/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  placeCustomerOrder,
  getOrderSecurely,
  verifyAndConfirmPaymentAttempt,
  updateOrderPaymentUtr,
} from '@/lib/orders/orderService';
import { DELIVERY_RULES, DELIVERY_NOTICE } from '@/lib/config/businessConfig';
import { AuthorizationError } from '@/lib/auth/authorization';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { isDatabaseConfigured } from '@/lib/db/prisma';

export async function runTargetedPreproductionCheck(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — TARGETED PRE-PRODUCTION AUDIT SUITE');
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
    // 1. Production Checkout & Database Persistence Safety
    // ----------------------------------------------------------------
    console.log('--- 1. Production Checkout & Database Persistence Safety ---');

    (process.env as any).NODE_ENV = 'production';
    const isDbInitiallyConfigured = isDatabaseConfigured();

    const prodOrderResult = await placeCustomerOrder({
      items: [{ productId: 'demo-prod-2', quantity: 1 }],
      shipping: {
        customerName: 'Test Buyer',
        email: 'buyer@example.com',
        phone: '9829012345',
        addressLine1: 'Station Road',
        district: 'Bikaner',
        pinCode: '334001',
        state: 'Rajasthan',
      },
      paymentMethod: 'MANUAL_UPI_QR',
    });

    if (!isDbInitiallyConfigured) {
      assert(
        prodOrderResult.success === false,
        'In production, checkout fails when database is unconfigured'
      );
      assert(
        typeof prodOrderResult.error === 'string' &&
          prodOrderResult.error.includes('Database persistence is not configured'),
        'Production failure error message clearly identifies missing database persistence'
      );
      assert(
        prodOrderResult.order === undefined,
        'No order object is returned on failed production persistence'
      );
    } else {
      assert(prodOrderResult.success === true, 'In production, checkout succeeds with configured database');
      assert(prodOrderResult.order?.isPersisted === true, 'Order marked persisted');
    }

    // ----------------------------------------------------------------
    // 2. Development / Sandbox Order Isolation
    // ----------------------------------------------------------------
    console.log('\n--- 2. Development / Sandbox Order Isolation ---');
    (process.env as any).NODE_ENV = 'development';

    const devOrderResult = await placeCustomerOrder({
      items: [{ productId: 'demo-prod-2', quantity: 1 }],
      shipping: {
        customerName: 'Dev Tester',
        email: 'tester@example.com',
        phone: '9829012345',
        addressLine1: 'Kote Gate',
        district: 'Bikaner',
        pinCode: '334001',
        state: 'Rajasthan',
      },
      paymentMethod: 'MANUAL_UPI_QR',
    });

    assert(devOrderResult.success === true, 'Sandbox order allowed in development');
    assert(devOrderResult.order !== undefined, 'Sandbox order returned');
    assert(devOrderResult.order?.isOrderConfirmed === false, 'Sandbox order initially unconfirmed');
    assert(
      devOrderResult.order?.orderNumber.startsWith('JK-PAY-') === true,
      'Initial reference is a payment attempt (JK-PAY-...)'
    );

    const createdOrder = devOrderResult.order!;

    // ----------------------------------------------------------------
    // 3. Authorization & Privilege Escalation Guards
    // ----------------------------------------------------------------
    console.log('\n--- 3. Authorization & Privilege Escalation Guards ---');

    // Guest accessing with wrong token
    let unauthorizedBlocked = false;
    try {
      await getOrderSecurely(createdOrder.orderNumber, 'wrong-token-xyz');
    } catch (err) {
      if (err instanceof AuthorizationError) {
        unauthorizedBlocked = true;
      }
    }
    assert(unauthorizedBlocked, 'Access denied with wrong accessToken (403)');

    // Authorized access with correct token
    const authorizedGuest = await getOrderSecurely(createdOrder.orderNumber, createdOrder.accessToken);
    assert(authorizedGuest !== null, 'Access granted with valid accessToken');

    // Customer role cannot verify payments
    const customerSession = {
      user: {
        id: 'cust-123',
        name: 'Regular Customer',
        email: 'cust@example.com',
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
    } as unknown as AuthenticatedUserSession;

    let customerVerifyBlocked = false;
    try {
      await verifyAndConfirmPaymentAttempt(
        { referenceNumber: createdOrder.orderNumber, action: 'CONFIRM' },
        customerSession
      );
    } catch (err) {
      if (err instanceof AuthorizationError && err.statusCode === 403) {
        customerVerifyBlocked = true;
      }
    }
    assert(customerVerifyBlocked, 'Customer session blocked from confirming payment (403)');

    // Customer UTR submission must NEVER confirm payment
    const utrResult = await updateOrderPaymentUtr(createdOrder.orderNumber, '987654321012', 'Transferred via UPI');
    assert(utrResult.success === true, 'UTR update succeeded');
    assert(utrResult.order?.paymentStatus === 'PAYMENT_UNDER_VERIFICATION', 'Status is PAYMENT_UNDER_VERIFICATION');
    assert(utrResult.order?.isOrderConfirmed === false, 'Order is STILL unconfirmed after customer UTR submission');
    assert(utrResult.order?.confirmedOrderNumber == null, 'No confirmedOrderNumber assigned on customer UTR submission');

    // Authorized Staff confirmation
    const staffSession = {
      user: {
        id: 'staff-999',
        name: 'Accounts Staff',
        email: 'staff@jkenterprises.in',
        role: 'STAFF',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-staff',
        token: 'tok-staff',
        expiresAt: new Date(Date.now() + 86400000),
      },
    } as unknown as AuthenticatedUserSession;

    const staffVerifyResult = await verifyAndConfirmPaymentAttempt(
      { referenceNumber: createdOrder.orderNumber, action: 'CONFIRM', notes: 'Verified in SBI Current Account' },
      staffSession
    );
    assert(staffVerifyResult.success === true, 'Staff successfully confirmed payment');
    assert(staffVerifyResult.order?.isOrderConfirmed === true, 'Order is now confirmed');
    assert(staffVerifyResult.order?.paymentStatus === 'CONFIRMED', 'Payment status is now CONFIRMED');
    assert(staffVerifyResult.order?.confirmedOrderNumber?.startsWith('JK-ORD-') === true, 'Official JK-ORD-... assigned');

    // ----------------------------------------------------------------
    // 4. Delivery Rules Preliminary Status
    // ----------------------------------------------------------------
    console.log('\n--- 4. Delivery Rules Preliminary Status ---');
    assert(DELIVERY_RULES.BIKANER_LOCAL.isRatesConfirmed === false, 'Bikaner local delivery marked isRatesConfirmed: false');
    assert(DELIVERY_RULES.RAJASTHAN_REGIONAL.isRatesConfirmed === false, 'Rajasthan regional delivery marked isRatesConfirmed: false');
    assert(DELIVERY_RULES.INTERSTATE.isRatesConfirmed === false, 'Interstate delivery marked isRatesConfirmed: false');
    assert(typeof DELIVERY_NOTICE === 'string' && DELIVERY_NOTICE.includes('preliminary commercial figures'), 'DELIVERY_NOTICE contains preliminary figures disclaimer');

  } finally {
    (process.env as any).NODE_ENV = originalNodeEnv;
  }

  console.log(`\n================================================================`);
  console.log(`  TARGETED AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`================================================================\n`);

  return { passed, failed };
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('payment_safety_and_preproduction.test')) {
  runTargetedPreproductionCheck().then(({ failed }) => {
    if (failed > 0) process.exit(1);
  }).catch((err) => {
    console.error('Test suite crashed:', err);
    process.exit(1);
  });
}
