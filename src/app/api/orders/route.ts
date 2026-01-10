import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      restaurantId,
      tableId,
      items,
      paymentMode,
      customerName,
      customerPhone,
      customerEmail,
      marketingConsent,
      couponCode,
    } = body;

    // Validate required fields
    if (!restaurantId || !tableId || !items?.length || !paymentMode || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify restaurant and table exist
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const table = await prisma.table.findUnique({
      where: { id: tableId },
    });
    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const itemTotal = item.unitPrice * item.quantity;
      subtotal += itemTotal;
      return {
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: itemTotal,
      };
    });

    // Handle coupon
    let discount = 0;
    let couponId: string | undefined;
    
    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode.toUpperCase(),
          restaurantId,
          active: true,
          OR: [
            { validFrom: null },
            { validFrom: { lte: new Date() } },
          ],
        },
      });

      if (coupon) {
        if (coupon.validTo && coupon.validTo < new Date()) {
          return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
        }
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
        }
        if (coupon.minOrder && subtotal < coupon.minOrder) {
          return NextResponse.json(
            { error: `Minimum order ₹${coupon.minOrder} required` },
            { status: 400 }
          );
        }

        if (coupon.discountType === "PERCENT") {
          discount = (subtotal * coupon.value) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.value;
        }

        couponId = coupon.id;

        // Increment usage
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const total = subtotal - discount;

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        restaurantId,
        tableId,
        customerName,
        customerPhone,
        customerEmail,
        marketingConsent: marketingConsent || false,
        status: "PENDING",
        paymentMode,
        paymentStatus: paymentMode === "COUNTER" ? "PENDING" : "PENDING",
        subtotal,
        discount,
        total,
        couponId,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      total: order.total,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// Get orders (for merchant dashboard)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");
  const status = searchParams.get("status");

  if (!restaurantId) {
    return NextResponse.json({ error: "restaurantId required" }, { status: 400 });
  }

  const orders = await prisma.order.findMany({
    where: {
      restaurantId,
      ...(status && { status }),
    },
    include: {
      items: true,
      table: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(orders);
}
