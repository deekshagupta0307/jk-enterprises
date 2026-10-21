import { NextResponse } from 'next/server';
import { getOrderSecurely } from '@/lib/orders/orderService';
import { getServerSession } from '@/lib/auth/session';
import { AuthorizationError } from '@/lib/auth/authorization';

interface RouteContext {
  params: Promise<{ invoiceNumber: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { invoiceNumber } = await context.params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  try {
    const session = await getServerSession();

    // In our architecture, the invoice number is linked to the order
    // Order number or invoice number can be used
    const order = await getOrderSecurely(invoiceNumber, token, session);

    if (!order) {
      return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      invoice: {
        invoiceNumber: order.invoiceNumber,
        invoiceType: order.invoiceType,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        organizationName: order.organizationName,
        gstin: order.gstin,
        shippingAddress: {
          addressLine1: order.shippingAddressLine1,
          addressLine2: order.shippingAddressLine2,
          district: order.district,
          pinCode: order.pinCode,
          state: order.state,
        },
        financials: order.financials,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        paymentReferenceUTR: order.paymentReferenceUTR,
        items: order.items,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    if (err instanceof AuthorizationError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode });
    }
    return NextResponse.json({ error: 'Failed to retrieve invoice document.' }, { status: 500 });
  }
}
