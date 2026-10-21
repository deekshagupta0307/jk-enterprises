import { prisma, isDatabaseConfigured } from '@/lib/db/prisma';
import { SEED_PRODUCTS, DemoSeedProduct } from '../../../prisma/seedData';
import {
  validateShippingAddress,
  calculateOrderBreakdown,
  ShippingAddressInput,
  CalculatedOrderBreakdown,
} from '@/lib/delivery/deliveryService';
import {
  OrderStatus,
  PaymentMethod,
  InvoiceType,
} from '@prisma/client';
import { AuthenticatedUserSession } from '@/lib/auth/session';
import { AuthorizationError, verifySupportAccess } from '@/lib/auth/authorization';
import crypto from 'crypto';

export interface OrderLineItemInput {
  productId: string;
  quantity: number;
}

export interface PlaceOrderInput {
  items: OrderLineItemInput[];
  shipping: ShippingAddressInput;
  paymentMethod: 'MANUAL_UPI_QR' | 'MANUAL_BANK_TRANSFER';
  paymentReferenceUTR?: string;
  notes?: string;
}

export interface OrderItemView {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  brandName?: string | null;
  unitPriceINR: number;
  quantity: number;
  totalINR: number;
}

export interface OrderView {
  id: string;
  orderNumber: string; // Payment attempt reference (e.g. JK-PAY-...) or confirmed order number
  confirmedOrderNumber?: string | null; // Official Order ID (e.g. JK-ORD-...) assigned ONLY after admin verification
  isOrderConfirmed: boolean;
  invoiceNumber: string; // JK-PRF-... (Proforma) or JK-INV-... (Final Tax Invoice)
  invoiceType: InvoiceType;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp?: string | null;
  organizationName?: string | null;
  gstin?: string | null;
  shippingAddressLine1: string;
  shippingAddressLine2?: string | null;
  district: string;
  pinCode: string;
  state: string;
  paymentMethod: PaymentMethod;
  paymentStatus: OrderStatus;
  paymentReferenceUTR?: string | null;
  paymentNotes?: string | null;
  verifiedAt?: Date | null;
  verifiedByUserId?: string | null;
  verificationNotes?: string | null;
  subtotalINR: number;
  deliveryFeeINR: number;
  taxINR: number;
  totalAmountINR: number;
  isDemo: boolean;
  isPersisted: boolean;
  accessToken: string;
  items: OrderItemView[];
  financials: CalculatedOrderBreakdown;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory simulation cache when PostgreSQL is unconfigured / offline
const inMemoryOrderStore = new Map<string, OrderView>();

/**
 * Legacy ID map connecting homepage and demo catalogue product IDs to authoritative SKUs.
 * Preserves compatibility with existing customer carts and localStorage data.
 */
const LEGACY_PRODUCT_ID_MAP: Record<string, string> = {
  'demo-prod-1': 'DEMO-SSD-990PRO-1TB',
  'demo-prod-2': 'DEMO-CPU-14700',
  'demo-prod-3': 'DEMO-RAM-COR-32G-D5',
  'demo-prod-4': 'DEMO-NET-TPL-24G',
  'demo-prod-5': 'DEMO-SEC-CAM-4MP-CV',
  'demo-prod-6': 'DEMO-PRN-HP-M404DN',
  'demo-prod-7': 'DEMO-MON-DELL-P2723D',
  'demo-prod-8': 'DEMO-SSD-CRU-2TB-P3',
};

/**
 * Resolves a product and its canonical pricing, checking database first and fallback seed data
 */
export async function resolveProduct(productIdOrSku: string): Promise<{
  id: string;
  sku: string;
  name: string;
  brandName: string;
  priceINR: number;
} | null> {
  if (!productIdOrSku || typeof productIdOrSku !== 'string') return null;

  const normalizedInput = productIdOrSku.trim();
  const legacyMappedSku = LEGACY_PRODUCT_ID_MAP[normalizedInput.toLowerCase()];
  const lookupKeys = [normalizedInput, legacyMappedSku].filter(Boolean) as string[];

  if (isDatabaseConfigured()) {
    try {
      for (const key of lookupKeys) {
        const dbProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { id: key },
              { sku: { equals: key, mode: 'insensitive' } },
              { slug: { equals: key, mode: 'insensitive' } },
            ],
          },
          include: { brand: true },
        });
        if (dbProduct) {
          const price = Number(dbProduct.confirmedPriceINR || dbProduct.demoPriceINR || 0);
          return {
            id: dbProduct.id,
            sku: dbProduct.sku,
            name: dbProduct.name,
            brandName: dbProduct.brand.name,
            priceINR: price,
          };
        }
      }
    } catch {
      // Fall through to seed data
    }
  }

  // Lookup in static catalogue seed data
  for (const key of lookupKeys) {
    const keyLower = key.toLowerCase();
    const seed = SEED_PRODUCTS.find(
      (p: DemoSeedProduct, idx: number) =>
        p.sku.toLowerCase() === keyLower ||
        p.slug.toLowerCase() === keyLower ||
        `demo-${idx + 1}` === key ||
        `demo-${idx + 1}` === normalizedInput
    );

    if (seed) {
      return {
        id: seed.sku,
        sku: seed.sku,
        name: seed.name,
        brandName: seed.brandSlug.toUpperCase(),
        priceINR: seed.demoPriceINR,
      };
    }
  }

  return null;
}

/**
 * Validates, calculates, and creates a customer order.
 * Strictly verifies prices and recalculates totals on the server.
 */
export async function placeCustomerOrder(
  input: PlaceOrderInput,
  session?: AuthenticatedUserSession | null
): Promise<{
  success: boolean;
  order?: OrderView;
  error?: string;
  errors?: Record<string, string>;
  invalidProductId?: string;
}> {
  if (!input.items || input.items.length === 0) {
    return { success: false, error: 'Your cart is empty. Please add items before checking out.' };
  }

  // 1. Resolve and verify all products and quantities
  const resolvedItems: Array<{
    productId: string;
    productSku: string;
    productName: string;
    brandName?: string;
    unitPriceINR: number;
    quantity: number;
    totalINR: number;
  }> = [];

  let rawSubtotal = 0;

  for (const item of input.items) {
    const qty = Math.max(1, Math.min(50, Math.floor(Number(item.quantity) || 1)));
    const product = await resolveProduct(item.productId);

    if (!product) {
      return {
        success: false,
        error: `Item in your cart (ID: ${item.productId}) could not be located in our authoritative catalogue. Please remove this item from your cart to proceed with the remaining items.`,
        invalidProductId: item.productId,
        errors: {
          invalidProductId: item.productId,
          cart: `Item (ID: ${item.productId}) is no longer available.`,
        },
      };
    }

    const itemTotal = Math.round(product.priceINR * qty * 100) / 100;
    rawSubtotal += itemTotal;

    resolvedItems.push({
      productId: product.id,
      productSku: product.sku,
      productName: product.name,
      brandName: product.brandName,
      unitPriceINR: product.priceINR,
      quantity: qty,
      totalINR: itemTotal,
    });
  }

  // 2. Validate shipping address & determine delivery rules
  const validation = validateShippingAddress(input.shipping, rawSubtotal);
  if (!validation.isValid || !validation.sanitizedInput) {
    return {
      success: false,
      error: 'Please correct the highlighted errors in your delivery information.',
      errors: validation.errors,
    };
  }

  const shipping = validation.sanitizedInput;

  // 3. Recalculate complete server-side financials
  const financials = calculateOrderBreakdown(rawSubtotal, shipping.state, shipping.district);

  // Guard: In production, durable database persistence is mandatory.
  if (process.env.NODE_ENV === 'production' && !isDatabaseConfigured()) {
    return {
      success: false,
      error:
        'Database persistence is not configured on this environment (DATABASE_URL is missing or unverified). Real customer orders cannot be processed until durable database storage is connected.',
    };
  }

  // 4. Generate unique identifiers for Payment Attempt
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // A payment attempt reference begins with JK-PAY- (NOT a confirmed order yet)
  const orderNumber = `JK-PAY-${dateStr}-${randomSuffix}`;
  const invoiceNumber = `JK-PRF-${dateStr}-${randomSuffix}`;
  const accessToken = crypto.randomBytes(16).toString('hex');

  // 5. Determine initial status:
  // If customer provided a non-empty UTR string, status is PAYMENT_UNDER_VERIFICATION.
  // Otherwise, AWAITING_PAYMENT.
  // NEVER automatically mark as PAID!
  const utrTrimmed = (input.paymentReferenceUTR || '').trim().slice(0, 50);
  const paymentStatus: OrderStatus = utrTrimmed.length >= 6
    ? OrderStatus.PAYMENT_UNDER_VERIFICATION
    : OrderStatus.AWAITING_PAYMENT;

  const paymentMethod: PaymentMethod =
    input.paymentMethod === 'MANUAL_BANK_TRANSFER'
      ? PaymentMethod.MANUAL_BANK_TRANSFER
      : PaymentMethod.MANUAL_UPI_QR;

  const userId = session?.user?.id || null;

  // 6. Persist to PostgreSQL if configured
  if (isDatabaseConfigured()) {
    try {
      const dbOrder = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            orderNumber,
            confirmedOrderNumber: null,
            userId,
            customerName: shipping.customerName,
            customerEmail: shipping.email,
            customerPhone: shipping.phone,
            customerWhatsapp: shipping.whatsapp || null,
            organizationName: shipping.organizationName || null,
            gstin: shipping.gstin || null,
            shippingAddressLine1: shipping.addressLine1,
            shippingAddressLine2: shipping.addressLine2 || null,
            district: shipping.district,
            pinCode: shipping.pinCode,
            state: shipping.state,
            paymentMethod,
            paymentStatus,
            paymentReferenceUTR: utrTrimmed || null,
            paymentNotes: (input.notes || '').trim().slice(0, 500) || null,
            subtotalINR: financials.subtotalINR,
            deliveryFeeINR: financials.deliveryFeeINR,
            taxINR: financials.totalTaxINR,
            totalAmountINR: financials.totalINR,
            isDemo: false,
            accessToken,
            items: {
              create: resolvedItems.map((ri) => ({
                productId: ri.productId,
                productSku: ri.productSku,
                productName: ri.productName,
                brandName: ri.brandName || null,
                unitPriceINR: ri.unitPriceINR,
                quantity: ri.quantity,
                totalINR: ri.totalINR,
              })),
            },
            invoice: {
              create: {
                invoiceNumber,
                invoiceType: InvoiceType.PROFORMA_INVOICE,
                totalAmount: financials.totalINR,
                notes: 'Proforma Invoice / Payment Instructions — Order Unconfirmed (Awaiting Admin Verification)',
              },
            },
          },
          include: {
            items: true,
            invoice: true,
          },
        });
        return createdOrder;
      });

      const orderView: OrderView = {
        id: dbOrder.id,
        orderNumber: dbOrder.orderNumber,
        confirmedOrderNumber: dbOrder.confirmedOrderNumber,
        isOrderConfirmed: false,
        invoiceNumber: dbOrder.invoice?.invoiceNumber || invoiceNumber,
        invoiceType: dbOrder.invoice?.invoiceType || InvoiceType.PROFORMA_INVOICE,
        userId: dbOrder.userId,
        customerName: dbOrder.customerName,
        customerEmail: dbOrder.customerEmail,
        customerPhone: dbOrder.customerPhone,
        customerWhatsapp: dbOrder.customerWhatsapp,
        organizationName: dbOrder.organizationName,
        gstin: dbOrder.gstin,
        shippingAddressLine1: dbOrder.shippingAddressLine1,
        shippingAddressLine2: dbOrder.shippingAddressLine2,
        district: dbOrder.district,
        pinCode: dbOrder.pinCode,
        state: dbOrder.state,
        paymentMethod: dbOrder.paymentMethod,
        paymentStatus: dbOrder.paymentStatus,
        paymentReferenceUTR: dbOrder.paymentReferenceUTR,
        paymentNotes: dbOrder.paymentNotes,
        subtotalINR: Number(dbOrder.subtotalINR),
        deliveryFeeINR: Number(dbOrder.deliveryFeeINR),
        taxINR: Number(dbOrder.taxINR),
        totalAmountINR: Number(dbOrder.totalAmountINR),
        isDemo: false,
        isPersisted: true,
        accessToken,
        items: dbOrder.items.map((it) => ({
          id: it.id,
          productId: it.productId || it.productSku,
          productSku: it.productSku,
          productName: it.productName,
          brandName: it.brandName,
          unitPriceINR: Number(it.unitPriceINR),
          quantity: it.quantity,
          totalINR: Number(it.totalINR),
        })),
        financials,
        createdAt: dbOrder.createdAt,
        updatedAt: dbOrder.updatedAt,
      };

      inMemoryOrderStore.set(orderNumber, orderView);

      return { success: true, order: orderView };
    } catch (err) {
      console.warn('[Order Persistence Error, falling back to simulated session order]:', err);
    }
  }

  // 7. Fallback Simulation (Database Unconfigured / Offline Sandbox)
  const simulatedOrder: OrderView = {
    id: `sim-${orderNumber}`,
    orderNumber,
    confirmedOrderNumber: null,
    isOrderConfirmed: false,
    invoiceNumber,
    invoiceType: InvoiceType.PROFORMA_INVOICE,
    userId,
    customerName: shipping.customerName,
    customerEmail: shipping.email,
    customerPhone: shipping.phone,
    customerWhatsapp: shipping.whatsapp || null,
    organizationName: shipping.organizationName || null,
    gstin: shipping.gstin || null,
    shippingAddressLine1: shipping.addressLine1,
    shippingAddressLine2: shipping.addressLine2 || null,
    district: shipping.district,
    pinCode: shipping.pinCode,
    state: shipping.state,
    paymentMethod,
    paymentStatus,
    paymentReferenceUTR: utrTrimmed || null,
    paymentNotes: (input.notes || '').trim().slice(0, 500) || null,
    subtotalINR: financials.subtotalINR,
    deliveryFeeINR: financials.deliveryFeeINR,
    taxINR: financials.totalTaxINR,
    totalAmountINR: financials.totalINR,
    isDemo: true,
    isPersisted: false,
    accessToken,
    items: resolvedItems.map((ri, idx) => ({
      id: `sim-item-${idx + 1}`,
      productId: ri.productId,
      productSku: ri.productSku,
      productName: ri.productName,
      brandName: ri.brandName,
      unitPriceINR: ri.unitPriceINR,
      quantity: ri.quantity,
      totalINR: ri.totalINR,
    })),
    financials,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  inMemoryOrderStore.set(orderNumber, simulatedOrder);

  return { success: true, order: simulatedOrder };
}

/**
 * Submits or updates a payment UTR / Transaction Reference number for a payment attempt.
 * Transitions status to PAYMENT_UNDER_VERIFICATION.
 * Does NOT mark as paid or confirmed.
 */
export async function updateOrderPaymentUtr(
  orderNumber: string,
  utrNumber: string,
  notes?: string
): Promise<{ success: boolean; message?: string; error?: string; order?: OrderView }> {
  const cleanUtr = (utrNumber || '').trim().replace(/[^a-zA-Z0-9]/g, '').slice(0, 30);
  if (!cleanUtr || cleanUtr.length < 6) {
    return {
      success: false,
      error: 'Please enter a valid Bank / UPI Transaction Reference or UTR number (at least 6 characters).',
    };
  }

  // Update in memory store
  let order = inMemoryOrderStore.get(orderNumber) || null;
  if (!order) {
    for (const val of inMemoryOrderStore.values()) {
      if (val.orderNumber === orderNumber || val.confirmedOrderNumber === orderNumber) {
        order = val;
        break;
      }
    }
  }

  if (order) {
    order.paymentReferenceUTR = cleanUtr;
    order.paymentStatus = OrderStatus.PAYMENT_UNDER_VERIFICATION;
    if (notes) order.paymentNotes = notes.slice(0, 500);
    order.updatedAt = new Date();
  }

  if (isDatabaseConfigured()) {
    try {
      const updated = await prisma.order.update({
        where: { orderNumber },
        data: {
          paymentReferenceUTR: cleanUtr,
          paymentStatus: OrderStatus.PAYMENT_UNDER_VERIFICATION,
          paymentNotes: notes ? notes.slice(0, 500) : undefined,
        },
      });
      if (order) {
        order.paymentReferenceUTR = updated.paymentReferenceUTR;
        order.paymentStatus = updated.paymentStatus;
      }
    } catch {
      // Ignored if DB offline
    }
  }

  return {
    success: true,
    message: 'Payment reference submitted. Your payment attempt is now under administrative verification.',
    order: order || undefined,
  };
}

export interface VerifyPaymentInput {
  referenceNumber: string;
  action: 'CONFIRM' | 'REJECT';
  notes?: string;
  verifiedAmountINR?: number;
}

/**
 * Admin Operation: Verifies payment against actual bank/UPI credit.
 * ONLY authorized STAFF or ADMIN can execute this.
 * When CONFIRMED: Assigns official Order ID (JK-ORD-...), generates final Tax Invoice (JK-INV-...).
 * When REJECTED: Marks status as PAYMENT_REJECTED with reason notes.
 */
export async function verifyAndConfirmPaymentAttempt(
  input: VerifyPaymentInput,
  session: AuthenticatedUserSession
): Promise<{ success: boolean; message?: string; error?: string; order?: OrderView }> {
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
    throw new AuthorizationError(
      'Administrative verification required. Only authorized staff can verify manual payments.',
      'FORBIDDEN',
      403
    );
  }

  const { referenceNumber, action, notes } = input;
  const order = await getOrderSecurely(referenceNumber, null, session);

  if (!order) {
    return { success: false, error: 'Payment attempt or order not found.' };
  }

  if (order.isOrderConfirmed && action === 'CONFIRM') {
    return { success: false, error: 'This order is already confirmed and verified.' };
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const now = new Date();

  if (action === 'CONFIRM') {
    const confirmedOrderNumber = order.confirmedOrderNumber || `JK-ORD-${dateStr}-${randomSuffix}`;
    const invoiceNumber = `JK-INV-${dateStr}-${randomSuffix}`;

    order.isOrderConfirmed = true;
    order.confirmedOrderNumber = confirmedOrderNumber;
    order.paymentStatus = OrderStatus.CONFIRMED;
    order.invoiceNumber = invoiceNumber;
    order.invoiceType = InvoiceType.TAX_INVOICE;
    order.verifiedAt = now;
    order.verifiedByUserId = session.user.id;
    order.verificationNotes = notes || 'Payment verified against bank credit by authorized administrator.';
    order.updatedAt = now;

    inMemoryOrderStore.set(order.orderNumber, order);
    inMemoryOrderStore.set(confirmedOrderNumber, order);
    inMemoryOrderStore.set(invoiceNumber, order);

    if (isDatabaseConfigured()) {
      try {
        await prisma.$transaction([
          prisma.order.update({
            where: { orderNumber: order.orderNumber },
            data: {
              confirmedOrderNumber,
              paymentStatus: OrderStatus.CONFIRMED,
              verifiedAt: now,
              verifiedByUserId: session.user.id,
              verificationNotes: order.verificationNotes,
            },
          }),
          prisma.invoice.upsert({
            where: { orderId: order.id },
            create: {
              invoiceNumber,
              orderId: order.id,
              invoiceType: InvoiceType.TAX_INVOICE,
              totalAmount: order.totalAmountINR,
              notes: 'Official Tax Invoice — Payment Verified',
            },
            update: {
              invoiceNumber,
              invoiceType: InvoiceType.TAX_INVOICE,
              notes: 'Official Tax Invoice — Payment Verified',
            },
          }),
        ]);
      } catch (e) {
        console.error('[Verify Order DB Error]:', e);
      }
    }

    return {
      success: true,
      message: `Payment verified. Official Order ${confirmedOrderNumber} confirmed with Tax Invoice ${invoiceNumber}.`,
      order,
    };
  } else {
    // REJECT
    order.paymentStatus = OrderStatus.PAYMENT_REJECTED;
    order.verificationNotes = notes || 'Payment reference could not be verified against bank/UPI credit.';
    order.updatedAt = now;

    inMemoryOrderStore.set(order.orderNumber, order);

    if (isDatabaseConfigured()) {
      try {
        await prisma.order.update({
          where: { orderNumber: order.orderNumber },
          data: {
            paymentStatus: OrderStatus.PAYMENT_REJECTED,
            verificationNotes: order.verificationNotes,
          },
        });
      } catch (e) {
        console.error('[Reject Order DB Error]:', e);
      }
    }

    return {
      success: true,
      message: 'Payment reference rejected. Customer notified on verification screen.',
      order,
    };
  }
}

/**
 * Retrieves order details with strict authorization checks.
 * Prevents horizontal privilege escalation.
 */
export async function getOrderSecurely(
  identifier: string,
  accessToken?: string | null,
  session?: AuthenticatedUserSession | null
): Promise<OrderView | null> {
  // 1. Check in-memory store (by attempt orderNumber, confirmedOrderNumber, or invoiceNumber)
  let order = inMemoryOrderStore.get(identifier) || null;
  if (!order) {
    for (const val of inMemoryOrderStore.values()) {
      if (
        val.orderNumber === identifier ||
        val.confirmedOrderNumber === identifier ||
        val.invoiceNumber === identifier
      ) {
        order = val;
        break;
      }
    }
  }

  // 2. Lookup in DB if configured
  if (!order && isDatabaseConfigured()) {
    try {
      const dbOrder = await prisma.order.findFirst({
        where: {
          OR: [
            { orderNumber: identifier },
            { confirmedOrderNumber: identifier },
            { invoice: { invoiceNumber: identifier } },
          ],
        },
        include: { items: true, invoice: true },
      });

      if (dbOrder) {
        const financials = calculateOrderBreakdown(
          Number(dbOrder.subtotalINR),
          dbOrder.state,
          dbOrder.district
        );

        const isConfirmed =
          dbOrder.paymentStatus === OrderStatus.CONFIRMED ||
          dbOrder.paymentStatus === OrderStatus.PAID;

        order = {
          id: dbOrder.id,
          orderNumber: dbOrder.orderNumber,
          confirmedOrderNumber: dbOrder.confirmedOrderNumber,
          isOrderConfirmed: isConfirmed,
          invoiceNumber:
            dbOrder.invoice?.invoiceNumber ||
            (isConfirmed
              ? `JK-INV-${dbOrder.orderNumber.slice(-8)}`
              : `JK-PRF-${dbOrder.orderNumber.slice(-8)}`),
          invoiceType:
            dbOrder.invoice?.invoiceType ||
            (isConfirmed ? InvoiceType.TAX_INVOICE : InvoiceType.PROFORMA_INVOICE),
          userId: dbOrder.userId,
          customerName: dbOrder.customerName,
          customerEmail: dbOrder.customerEmail,
          customerPhone: dbOrder.customerPhone,
          customerWhatsapp: dbOrder.customerWhatsapp,
          organizationName: dbOrder.organizationName,
          gstin: dbOrder.gstin,
          shippingAddressLine1: dbOrder.shippingAddressLine1,
          shippingAddressLine2: dbOrder.shippingAddressLine2,
          district: dbOrder.district,
          pinCode: dbOrder.pinCode,
          state: dbOrder.state,
          paymentMethod: dbOrder.paymentMethod,
          paymentStatus: dbOrder.paymentStatus,
          paymentReferenceUTR: dbOrder.paymentReferenceUTR,
          paymentNotes: dbOrder.paymentNotes,
          verifiedAt: dbOrder.verifiedAt,
          verifiedByUserId: dbOrder.verifiedByUserId,
          verificationNotes: dbOrder.verificationNotes,
          subtotalINR: Number(dbOrder.subtotalINR),
          deliveryFeeINR: Number(dbOrder.deliveryFeeINR),
          taxINR: Number(dbOrder.taxINR),
          totalAmountINR: Number(dbOrder.totalAmountINR),
          isDemo: dbOrder.isDemo,
          isPersisted: true,
          accessToken: dbOrder.accessToken || '',
          items: dbOrder.items.map((it) => ({
            id: it.id,
            productId: it.productId || it.productSku,
            productSku: it.productSku,
            productName: it.productName,
            brandName: it.brandName,
            unitPriceINR: Number(it.unitPriceINR),
            quantity: it.quantity,
            totalINR: Number(it.totalINR),
          })),
          financials,
          createdAt: dbOrder.createdAt,
          updatedAt: dbOrder.updatedAt,
        };

        inMemoryOrderStore.set(order.orderNumber, order);
        if (order.confirmedOrderNumber) {
          inMemoryOrderStore.set(order.confirmedOrderNumber, order);
        }
      }
    } catch {
      // Ignored
    }
  }

  if (!order) {
    return null;
  }

  // Authorization enforcement:
  // 1. Staff and Admin can inspect orders for support and verification
  if (session && (session.user.role === 'ADMIN' || session.user.role === 'STAFF')) {
    verifySupportAccess(order.userId || 'guest', session, 'ORDER_ASSISTANCE');
    return order;
  }

  // 2. Order belongs to authenticated user
  if (order.userId) {
    if (session && session.user.id === order.userId) {
      return order;
    }
  }

  // 3. Guest order: Validate secure accessToken
  if (accessToken && order.accessToken === accessToken) {
    return order;
  }

  // 4. Deny access to unauthorized callers
  throw new AuthorizationError(
    'Forbidden: You do not have permission to access this order or invoice document.',
    'FORBIDDEN',
    403
  );
}
