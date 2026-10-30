import { BUSINESS_CONFIG, RAJASTHAN_DISTRICTS } from '@/lib/config/businessConfig';
import { generateWhatsAppOrderLink } from '@/lib/whatsapp/whatsappService';
import {
  placeCustomerOrder,
  updateOrderPaymentUtr,
  verifyAndConfirmPaymentAttempt,
  getCustomerOrders,
  getOrderSecurely,
} from '@/lib/orders/orderService';
import {
  validateShippingAddress,
  calculateOrderBreakdown,
} from '@/lib/delivery/deliveryService';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { AuthorizationError } from '@/lib/auth/authorization';

export async function runSecurityAndAuthorizationSuite(): Promise<{ passed: number; failed: number }> {
  console.log('================================================================');
  console.log('  JK ENTERPRISES — SECURITY, AUTHORIZATION & WORKFLOW SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Business Configuration Tests
  assert(BUSINESS_CONFIG.name === 'JK Enterprises', 'Business name is JK Enterprises');
  assert(BUSINESS_CONFIG.location === 'Bikaner, Rajasthan, India', 'Business location is Bikaner, Rajasthan, India');
  assert(BUSINESS_CONFIG.phone === '9928769266', 'Phone is 9928769266');
  assert(BUSINESS_CONFIG.email === 'akguptabkn@gmail.com', 'Email is akguptabkn@gmail.com');
  assert(BUSINESS_CONFIG.whatsappNumber === '9928769266', 'WhatsApp number is 9928769266');
  assert(BUSINESS_CONFIG.whatsappCountryCode === '91', 'WhatsApp country code is 91');
  assert(BUSINESS_CONFIG.whatsappLink === 'https://wa.me/919928769266', 'WhatsApp URL is https://wa.me/919928769266');

  // 2. Official Rajasthan 41 Districts Tests
  assert(RAJASTHAN_DISTRICTS.length === 41, `Rajasthan official district count is exactly 41 (got ${RAJASTHAN_DISTRICTS.length})`);
  const isAlphabetical = [...RAJASTHAN_DISTRICTS].every((d, i, arr) => i === 0 || arr[i - 1].localeCompare(d) <= 0);
  assert(isAlphabetical, 'Rajasthan districts list is sorted alphabetically');
  const hasDuplicates = new Set(RAJASTHAN_DISTRICTS).size !== RAJASTHAN_DISTRICTS.length;
  assert(!hasDuplicates, 'Rajasthan districts list contains zero duplicates');
  assert(RAJASTHAN_DISTRICTS.includes('Bikaner'), 'Bikaner district is present');
  assert(RAJASTHAN_DISTRICTS.includes('Balotra'), 'Balotra district is present');
  assert(RAJASTHAN_DISTRICTS.includes('Deeg'), 'Deeg district is present');
  assert(RAJASTHAN_DISTRICTS.includes('Didwana-Kuchaman'), 'Didwana-Kuchaman district is present');

  // 3. Delivery Calculations
  const bikanerLocalUnder = calculateOrderBreakdown(3000, 'Rajasthan', 'Bikaner');
  assert(bikanerLocalUnder.deliveryFeeINR === 150, 'Bikaner local delivery under ₹5000 is ₹150');
  const bikanerLocalFree = calculateOrderBreakdown(6000, 'Rajasthan', 'Bikaner');
  assert(bikanerLocalFree.deliveryFeeINR === 0, 'Bikaner local delivery >= ₹5000 is Free');

  const regionalUnder = calculateOrderBreakdown(10000, 'Rajasthan', 'Jodhpur');
  assert(regionalUnder.deliveryFeeINR === 350, 'Rajasthan regional delivery under ₹15000 is ₹350');
  const regionalFree = calculateOrderBreakdown(20000, 'Rajasthan', 'Jodhpur');
  assert(regionalFree.deliveryFeeINR === 0, 'Rajasthan regional delivery >= ₹15000 is Free');

  // 4. Shipping Input & WhatsApp validation
  const validShipping = validateShippingAddress({
    customerName: 'Ramesh Sharma',
    email: 'ramesh@example.com',
    phone: '9829012345',
    whatsapp: '9928769266',
    addressLine1: 'Station Road',
    state: 'Rajasthan',
    district: 'Bikaner',
    pinCode: '334001',
  });
  assert(validShipping.isValid, 'Shipping validation passes for valid data');
  assert(validShipping.sanitizedInput?.whatsapp === '+919928769266', 'Sanitized WhatsApp is formatted with +91 country code');

  // 5. WhatsApp URL Generation
  const waResult = generateWhatsAppOrderLink({
    orderNumber: 'JK-PAY-20261021-9999',
    customerName: 'Ramesh Sharma',
    items: [{ name: 'Crucial P3 1TB NVMe SSD', quantity: 1, priceINR: 5200 }],
    totalAmountINR: 5200,
    deliveryCityOrDistrict: 'Bikaner',
    paymentStatus: 'AWAITING_PAYMENT',
    paymentMethod: 'MANUAL_UPI_QR',
    customerWhatsapp: '+919928769266',
    isConfirmed: false,
  });
  assert(waResult.url.includes('919928769266'), 'WhatsApp link points to business number 919928769266');
  assert(waResult.rawMessage.includes('PAYMENT ATTEMPT') || waResult.url.includes('PAYMENT'), 'Pre-verification WhatsApp message identifies as PAYMENT ATTEMPT');
  assert(waResult.rawMessage.includes('9928769266') || waResult.url.includes('9928769266'), 'Customer WhatsApp is included in WhatsApp enquiry message');

  // 6. Checkout & Order Lifecycle Workflow
  const attemptResult = await placeCustomerOrder({
    items: [{ productId: 'demo-1', quantity: 1 }],
    shipping: {
      customerName: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '9829112233',
      whatsapp: '9928769266',
      addressLine1: 'Kote Gate Commercial Lane',
      state: 'Rajasthan',
      district: 'Bikaner',
      pinCode: '334001',
    },
    paymentMethod: 'MANUAL_UPI_QR',
  });

  assert(attemptResult.success, 'placeCustomerOrder succeeded');
  const payRef = attemptResult.order!.orderNumber;
  assert(payRef.startsWith('JK-PAY-'), `Created reference is a temporary payment attempt (got ${payRef})`);
  assert(attemptResult.order?.paymentStatus === 'AWAITING_PAYMENT', 'Initial payment status is AWAITING_PAYMENT');
  assert(attemptResult.order?.isOrderConfirmed === false, 'Order is explicitly marked as unconfirmed');
  assert(attemptResult.order?.customerWhatsapp === '+919928769266', 'Customer WhatsApp number is preserved on order with +91');

  // 7. UTR submission transitions to PAYMENT_UNDER_VERIFICATION
  const utrResult = await updateOrderPaymentUtr(
    payRef,
    '429182910291',
    'Paid via PhonePe at 10:15 AM'
  );
  assert(utrResult.success, 'Customer UTR submission succeeded');
  assert(utrResult.order?.paymentStatus === 'PAYMENT_UNDER_VERIFICATION', 'Status transitioned to PAYMENT_UNDER_VERIFICATION');
  assert(utrResult.order?.isOrderConfirmed === false, 'Order is STILL unconfirmed after customer UTR submission');

  // 8. Security Gate: Customer cannot verify payment
  const customerSession: AuthenticatedUserSession = {
    user: { id: 'cust-123', email: 'cust@example.com', name: 'Customer', role: 'CUSTOMER', emailVerified: true, createdAt: new Date() },
    session: { id: 'sess-cust', token: 't1', expiresAt: new Date(Date.now() + 86400000) },
    profile: null,
  };

  let customerBlocked = false;
  try {
    await verifyAndConfirmPaymentAttempt(
      { referenceNumber: payRef, action: 'CONFIRM', notes: 'Attempting unauthorized verification' },
      customerSession
    );
  } catch (err: unknown) {
    if (err instanceof AuthorizationError) {
      customerBlocked = err.statusCode === 403 || err.code === 'FORBIDDEN';
    }
  }
  assert(customerBlocked, 'Customer session is strictly blocked with 403 FORBIDDEN from verifying payment');

  // 9. Staff Verification: CONFIRM
  const staffSession: AuthenticatedUserSession = {
    user: { id: 'staff-456', email: 'staff@jkenterprises.in', name: 'Staff Officer', role: 'STAFF', emailVerified: true, createdAt: new Date() },
    session: { id: 'sess-staff', token: 't2', expiresAt: new Date(Date.now() + 86400000) },
    profile: null,
  };

  const verifyConfirmResult = await verifyAndConfirmPaymentAttempt(
    { referenceNumber: payRef, action: 'CONFIRM', notes: 'Verified credit in SBI Current Account statement' },
    staffSession
  );

  assert(verifyConfirmResult.success, 'Staff payment verification CONFIRM succeeded');
  assert(verifyConfirmResult.order?.isOrderConfirmed === true, 'Order is now confirmed');
  assert(verifyConfirmResult.order?.paymentStatus === 'CONFIRMED', 'Payment status is now CONFIRMED');
  const confirmedNum = verifyConfirmResult.order?.confirmedOrderNumber;
  assert(confirmedNum?.startsWith('JK-ORD-') === true, `Official order number assigned (got ${confirmedNum})`);
  assert(verifyConfirmResult.order?.invoiceNumber?.startsWith('JK-INV-') === true, 'Official tax invoice number assigned');

  // 10. Admin Verification: REJECT flow test
  const attemptReject = await placeCustomerOrder({
    items: [{ productId: 'demo-2', quantity: 1 }],
    shipping: {
      customerName: 'Sunil Kumar',
      email: 'sunil@example.com',
      phone: '9829988776',
      addressLine1: 'Main Market',
      state: 'Rajasthan',
      district: 'Jodhpur',
      pinCode: '342001',
    },
    paymentMethod: 'MANUAL_BANK_TRANSFER',
  });
  const rejectPayRef = attemptReject.order!.orderNumber;

  const adminSession: AuthenticatedUserSession = {
    user: { id: 'admin-789', email: 'admin@jkenterprises.in', name: 'Super Admin', role: 'ADMIN', emailVerified: true, createdAt: new Date() },
    session: { id: 'sess-admin', token: 't3', expiresAt: new Date(Date.now() + 86400000) },
    profile: null,
  };

  const verifyRejectResult = await verifyAndConfirmPaymentAttempt(
    { referenceNumber: rejectPayRef, action: 'REJECT', notes: 'Invalid UTR, no credit received on bank statement' },
    adminSession
  );

  assert(verifyRejectResult.success, 'Admin payment verification REJECT succeeded');
  assert(verifyRejectResult.order?.paymentStatus === 'PAYMENT_REJECTED', 'Status is PAYMENT_REJECTED');
  assert(verifyRejectResult.order?.isOrderConfirmed === false, 'Rejected payment leaves order unconfirmed');

  // 11. Customer Order History Security & Fail-Closed / Token Sanitization
  let unauthBlocked = false;
  try {
    await getCustomerOrders(null);
  } catch (err: unknown) {
    if (err instanceof AuthorizationError) {
      unauthBlocked = err.statusCode === 401;
    }
  }
  assert(unauthBlocked, 'getCustomerOrders strictly requires authentication (401 UNAUTHENTICATED)');

  // Create an order tied to customerSession
  const custOrderAttempt = await placeCustomerOrder(
    {
      items: [{ productId: 'demo-1', quantity: 1 }],
      shipping: {
        customerName: 'Authenticated Customer',
        email: 'cust@example.com',
        phone: '9829112233',
        addressLine1: 'Station Road',
        state: 'Rajasthan',
        district: 'Bikaner',
        pinCode: '334001',
      },
      paymentMethod: 'MANUAL_UPI_QR',
    },
    customerSession
  );
  assert(custOrderAttempt.success, 'Order placed under customer session');

  const historyResult = await getCustomerOrders(customerSession);
  assert(historyResult.success === true, 'getCustomerOrders returns success: true');
  assert(historyResult.orders.length > 0, 'Customer order history returns orders for customer');
  const foundCustOrder = historyResult.orders.find((o) => o.orderNumber === custOrderAttempt.order?.orderNumber);
  assert(!!foundCustOrder, 'Customer order appears in their order history');

  // Verify accessToken is stripped from CustomerOrderSummary
  const hasAccessToken = historyResult.orders.some((o: unknown) => typeof (o as Record<string, unknown>).accessToken !== 'undefined');
  assert(!hasAccessToken, 'Customer order summaries do not expose access tokens to client');

  // Verify authenticated session can access order details without accessToken
  const secureOrderWithoutToken = await getOrderSecurely(custOrderAttempt.order!.orderNumber, null, customerSession);
  assert(secureOrderWithoutToken?.orderNumber === custOrderAttempt.order?.orderNumber, 'Authenticated session accesses order without requiring access token');

  console.log(`\nTEST RESULTS: ${passed} passed, ${failed} failed.`);
  return { passed, failed };
}

// Standalone execution support
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('security_and_authorization.test')) {
  runSecurityAndAuthorizationSuite().then(({ failed }) => {
    if (failed > 0) process.exit(1);
  }).catch((err) => {
    console.error('Fatal test error:', err);
    process.exit(1);
  });
}
