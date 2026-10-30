import {
  validateIndianMobile,
  validateWhatsAppNumber,
  sanitizeNational10DigitInput,
} from '@/lib/validation/phoneValidation';
import {
  validateShippingAddress,
  calculateOrderBreakdown,
} from '@/lib/delivery/deliveryService';
import {
  placeCustomerOrder,
  resolveProduct,
  verifyAndConfirmPaymentAttempt,
} from '@/lib/orders/orderService';
import { verifyPaymentAction } from '@/lib/orders/orderActions';
import { PaymentMethod } from '@prisma/client';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { AuthorizationError } from '@/lib/auth/authorization';

export async function runAuditSuite(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — AUDIT & REGRESSION TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${detail || 'Assertion failed'}`);
      failed++;
    }
  }

  // ====================================================================
  // TEST SECTION 1: STRICT 10-DIGIT INDIAN PHONE NUMBER VALIDATION
  // ====================================================================
  console.log('--- 1. Strict Indian Phone Validation ---');

  // Exact 10 digits
  const p1 = validateIndianMobile('9829012345', false);
  assert(p1.isValid && p1.digitsOnly === '9829012345' && p1.normalized === '+919829012345', 'Valid 10-digit mobile passes and normalizes to +919829012345');

  // Leading +91 with spaces and hyphens
  const p2 = validateIndianMobile('+91 98290-12345', false);
  assert(p2.isValid && p2.digitsOnly === '9829012345', '+91 prefix with spaces and hyphens normalizes to 10 digits (9829012345)');

  // +91 with parentheses
  const p3 = validateIndianMobile('+91 (98290) 12345', false);
  assert(p3.isValid && p3.digitsOnly === '9829012345', '+91 with parentheses normalizes properly');

  // Leading 0 prefix
  const p4 = validateIndianMobile('09829012345', false);
  assert(p4.isValid && p4.digitsOnly === '9829012345', 'Leading 0 prefix normalizes to 10 digits');

  // Leading 91 without plus prefix
  const p4b = validateIndianMobile('919829012345', false);
  assert(p4b.isValid && p4b.digitsOnly === '9829012345', 'Leading 91 prefix without plus normalizes to 10 digits');

  // Fewer than 10 digits (9 digits)
  const p5 = validateIndianMobile('982901234', false);
  assert(!p5.isValid && Boolean(p5.error?.includes('too short')), '9 digits rejected as too short');

  // More than 10 digits (11 digits without country code)
  const p6 = validateIndianMobile('98290123456', false);
  assert(!p6.isValid && Boolean(p6.error?.includes('too long')), '11 digits rejected as too long');

  // 12 digits
  const p7 = validateIndianMobile('982901234567', false);
  assert(!p7.isValid, '12 digits rejected');

  // Alphabetic characters
  const p8 = validateIndianMobile('98290ABCDE', false);
  assert(!p8.isValid && Boolean(p8.error?.includes('alphabetic')), 'Letters rejected');

  // Multiple country codes (+91+91)
  const p9 = validateIndianMobile('+91+919829012345', false);
  assert(!p9.isValid && Boolean(p9.error?.includes('multiple country codes')), 'Chained +91+91 country codes rejected');

  // Starts with invalid digit (< 6, e.g. 5)
  const p10 = validateIndianMobile('5829012345', false);
  assert(!p10.isValid && Boolean(p10.error?.includes('6, 7, 8, or 9')), 'Starting with 5 rejected (must start with 6-9)');

  // Optional empty primary mobile
  const p11 = validateIndianMobile('', true);
  assert(p11.isValid && p11.normalized === undefined, 'Empty optional phone passes');

  // Required empty primary mobile
  const p12 = validateIndianMobile('', false);
  assert(!p12.isValid && Boolean(p12.error?.includes('required')), 'Empty required phone rejected');

  // Optional WhatsApp tests
  const w1 = validateWhatsAppNumber('', true);
  assert(w1.isValid && w1.normalized === undefined, 'Empty optional WhatsApp number is valid');

  const w2 = validateWhatsAppNumber('+91 9928769266', true);
  assert(w2.isValid && w2.normalized === '+919928769266', 'Provided WhatsApp normalizes with +91 format');

  const w3 = validateWhatsAppNumber('982901234', true);
  assert(!w3.isValid, '9-digit WhatsApp number rejected');

  // Client-Side Input Clamping & Normalization Tests (sanitizeNational10DigitInput)
  console.log('\n--- 1b. Input Clamping & Sanitization Regression ---');
  assert(sanitizeNational10DigitInput('98765432101') === '9876543210', 'Typing 11th digit is strictly clamped to 10 digits');
  assert(sanitizeNational10DigitInput('987654321099999') === '9876543210', 'Pasting overlength number is strictly clamped to 10 digits');
  assert(sanitizeNational10DigitInput('+91 9928769266') === '9928769266', 'Pasting +91 prefixed number strips prefix and returns 10 national digits');
  assert(sanitizeNational10DigitInput('09928769266') === '9928769266', 'Pasting 0-prefixed number strips prefix and returns 10 national digits');
  assert(sanitizeNational10DigitInput('919928769266') === '9928769266', 'Pasting 91-prefixed 12-digit string strips country code and returns 10 national digits');
  assert(sanitizeNational10DigitInput('(99287) 69266') === '9928769266', 'Pasting formatted string strips spaces/parentheses to 10 digits');
  assert(sanitizeNational10DigitInput('99287abc69266') === '9928769266', 'Typing letters in phone input strips alphabetic characters immediately');
  assert(sanitizeNational10DigitInput('') === '', 'Empty string returns empty string');

  // Server-side validation via validateShippingAddress
  const addrWithBadPhone = {
    customerName: 'Anil Kumar',
    email: 'anil@example.com',
    phone: '98290ABC', // Invalid
    addressLine1: 'Station Road',
    district: 'Bikaner',
    pinCode: '334001',
    state: 'Rajasthan',
  };
  const addrRes = validateShippingAddress(addrWithBadPhone, 5000);
  assert(!addrRes.isValid && Boolean(addrRes.errors.phone), 'Server-side shipping address validation catches bad phone');

  // ====================================================================
  // TEST SECTION 2: CHECKOUT CATALOGUE RESOLUTION & DEMO-PROD-2 FIX
  // ====================================================================
  console.log('\n--- 2. Product Resolution & ₹77,250 Cart Regression ---');

  // 1. Resolve demo-prod-2 (Intel Core i7-14700, ₹34,500)
  const prod2 = await resolveProduct('demo-prod-2');
  assert(prod2 !== null, 'demo-prod-2 resolves through authoritative path');
  assert(prod2?.priceINR === 34500, `demo-prod-2 price is ₹34,500 (got: ₹${prod2?.priceINR})`);
  assert(Boolean(prod2?.name.includes('Intel Core i7-14700')), `demo-prod-2 name is Intel Core i7-14700 (got: ${prod2?.name})`);

  // 2. Resolve 14700K (Intel Core i7-14700K, ₹38,900)
  const prod14700k = await resolveProduct('DEMO-CPU-14700K');
  assert(prod14700k !== null, 'DEMO-CPU-14700K resolves');
  assert(prod14700k?.priceINR === 38900, `DEMO-CPU-14700K price is ₹38,900 (got: ₹${prod14700k?.priceINR})`);

  // 3. Resolve Hikvision PoE camera (₹3,850)
  const prodCctv = await resolveProduct('demo-prod-5');
  assert(prodCctv !== null, 'demo-prod-5 (Hikvision camera) resolves');
  assert(prodCctv?.priceINR === 3850, `demo-prod-5 price is ₹3,850 (got: ₹${prodCctv?.priceINR})`);

  // 4. Cart Total Verification: 34,500 + 38,900 + 3,850 = ₹77,250
  const cartSubtotal = (prod2?.priceINR || 0) + (prod14700k?.priceINR || 0) + (prodCctv?.priceINR || 0);
  assert(cartSubtotal === 77250, `Cart items sum precisely to ₹77,250 (calculated: ₹${cartSubtotal})`);

  // 5. Test placeCustomerOrder with the exact 3-item cart
  const testOrderInput = {
    items: [
      { productId: 'demo-prod-2', quantity: 1, clientSuppliedPriceINR: 999 }, // Tampered client price
      { productId: 'DEMO-CPU-14700K', quantity: 1, clientSuppliedPriceINR: 1 },
      { productId: 'demo-prod-5', quantity: 1, clientSuppliedPriceINR: 50 },
    ],
    shipping: {
      customerName: 'Anil Kumar',
      email: 'anil@example.com',
      phone: '+91 99287-69266',
      whatsapp: '9928769266',
      addressLine1: 'Station Road, Bikaner',
      district: 'Bikaner',
      pinCode: '334001',
      state: 'Rajasthan',
    },
    paymentMethod: PaymentMethod.MANUAL_UPI_QR,
  };

  const orderResult = await placeCustomerOrder(testOrderInput);
  assert(orderResult.success === true, 'Cart with demo-prod-2 successfully places order');
  assert(
    orderResult.order?.subtotalINR === 77250,
    `Server authoritative subtotal ignores tampered prices and calculates ₹77,250 (got: ₹${orderResult.order?.subtotalINR})`
  );
  assert(
    orderResult.order?.deliveryFeeINR === 0,
    'Order >= ₹5,000 in Bikaner hub receives free delivery'
  );
  assert(
    orderResult.order?.totalAmountINR === 77250,
    `Total payable amount is ₹77,250 (got: ₹${orderResult.order?.totalAmountINR})`
  );

  // 6. Test obsolete / deleted product ID rejection and recovery error
  const invalidOrderInput = {
    items: [
      { productId: 'demo-prod-2', quantity: 1 },
      { productId: 'completely-obsolete-id-xyz', quantity: 1 },
    ],
    shipping: testOrderInput.shipping,
    paymentMethod: PaymentMethod.MANUAL_UPI_QR,
  };

  const invalidResult = await placeCustomerOrder(invalidOrderInput);
  assert(invalidResult.success === false, 'Order with invalid product ID is rejected');
  assert(
    invalidResult.invalidProductId === 'completely-obsolete-id-xyz',
    'Rejection explicitly flags the exact invalidProductId for customer recovery'
  );
  assert(
    Boolean(invalidResult.error?.includes('could not be located')),
    'Error message gives clear, actionable explanation without internal DB leaks'
  );

  // ====================================================================
  // TEST SECTION 3: ADMIN PAYMENT AUTHORIZATION & STATE PERSISTENCE
  // ====================================================================
  console.log('\n--- 3. Payment Verification & Admin Authorization ---');

  if (orderResult.order) {
    const testOrderNumber = orderResult.order.orderNumber;

    // Unauthenticated caller
    const unauthRes = await verifyPaymentAction(testOrderNumber, 'CONFIRM');
    assert(
      unauthRes.success === false && Boolean(unauthRes.error?.includes('Authentication required')),
      'Unauthenticated caller cannot verify payment (401/403)'
    );

    // Caller with CUSTOMER role
    const customerSession: AuthenticatedUserSession = {
      user: {
        id: 'cust-123',
        email: 'customer@example.com',
        role: 'CUSTOMER',
        name: 'Customer',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-123',
        token: 'token-123',
        expiresAt: new Date(Date.now() + 3600000),
      },
    };

    try {
      await verifyAndConfirmPaymentAttempt(
        { referenceNumber: testOrderNumber, action: 'CONFIRM' },
        customerSession
      );
      assert(false, 'Customer role must not be able to verify payments');
    } catch (err: unknown) {
      const e = err as AuthorizationError;
      assert(
        Boolean(e.message?.includes('Administrative verification') || e.statusCode === 403),
        'Customer role rejected with 403 Forbidden'
      );
    }

    // Caller with STAFF / ADMIN role
    const adminSession: AuthenticatedUserSession = {
      user: {
        id: 'admin-1',
        email: 'admin@jkenterprises.com',
        role: 'ADMIN',
        name: 'JK Admin',
        emailVerified: true,
        createdAt: new Date(),
      },
      profile: null,
      session: {
        id: 'sess-admin',
        token: 'token-admin',
        expiresAt: new Date(Date.now() + 3600000),
      },
    };

    const confirmRes = await verifyAndConfirmPaymentAttempt(
      { referenceNumber: testOrderNumber, action: 'CONFIRM', notes: 'NEFT credit verified in SBI bank account' },
      adminSession
    );

    assert(confirmRes.success === true, 'Staff/Admin successfully confirms payment');
    assert(
      confirmRes.order?.isOrderConfirmed === true,
      'Order marked confirmed upon authorized verification'
    );
    assert(
      Boolean(confirmRes.order?.confirmedOrderNumber?.startsWith('JK-ORD-')),
      `Official confirmed order number assigned: ${confirmRes.order?.confirmedOrderNumber}`
    );
    assert(
      Boolean(confirmRes.order?.invoiceNumber?.startsWith('JK-INV-')),
      `Official tax invoice assigned: ${confirmRes.order?.invoiceNumber}`
    );
    assert(
      confirmRes.order?.verifiedByUserId === 'admin-1',
      'Audit trail records verifying admin user ID'
    );

    // Duplicate confirmation rejection
    const dupRes = await verifyAndConfirmPaymentAttempt(
      { referenceNumber: testOrderNumber, action: 'CONFIRM' },
      adminSession
    );
    assert(
      dupRes.success === false && Boolean(dupRes.error?.includes('already confirmed')),
      'Re-confirming an already confirmed order returns error preventing state corruption'
    );
  }

  // ====================================================================
  // TEST SECTION 4: DELIVERY LOGISTICS & FINANCIALS
  // ====================================================================
  console.log('\n--- 4. Delivery Logistics & Financial Calculations ---');

  // Bikaner local under threshold (₹3,000 < ₹5,000 threshold)
  const bknUnder = calculateOrderBreakdown(3000, 'Rajasthan', 'Bikaner');
  assert(bknUnder.deliveryFeeINR === 150, 'Bikaner under ₹5,000 charges ₹150 local delivery');
  assert(bknUnder.totalINR === 3150, 'Bikaner under ₹5,000 total is ₹3,150');

  // Bikaner local over threshold (₹6,000 >= ₹5,000 threshold)
  const bknOver = calculateOrderBreakdown(6000, 'Rajasthan', 'Bikaner');
  assert(bknOver.deliveryFeeINR === 0, 'Bikaner >= ₹5,000 receives FREE delivery');
  assert(bknOver.totalINR === 6000, 'Bikaner >= ₹5,000 total is ₹6,000');

  // Other Rajasthan district (Jodhpur)
  const jodhpurOrder = calculateOrderBreakdown(4000, 'Rajasthan', 'Jodhpur');
  assert(jodhpurOrder.deliveryFeeINR === 350, 'Rajasthan other district charges ₹350 regional delivery');
  assert(jodhpurOrder.totalINR === 4350, 'Jodhpur total is ₹4,350');

  // Interstate (Delhi)
  const interstateOrder = calculateOrderBreakdown(4000, 'Delhi', 'Central Delhi');
  assert(interstateOrder.isInterstate === true, 'Delhi identified as interstate delivery');
  assert(interstateOrder.igstINR > 0, 'Interstate delivery computes IGST');
  assert(interstateOrder.cgstINR === 0 && interstateOrder.sgstINR === 0, 'Interstate delivery has 0 CGST and SGST');

  console.log('\n================================================================');
  console.log(`  RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  return { passed, failed };
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('unit_and_flow_audit.test')) {
  runAuditSuite().then(({ failed }) => {
    if (failed > 0) process.exit(1);
  }).catch((err) => {
    console.error('Test suite crashed:', err);
    process.exit(1);
  });
}
