import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
      return NextResponse.json({ error: "Restaurant ID required" }, { status: 400 });
    }

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch orders
    const orders = await prisma.order.findMany({
      where: { restaurantId },
      include: {
        table: { select: { number: true } },
        items: { select: { name: true, quantity: true, unitPrice: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    // Calculate today's stats
    const todayOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= today && orderDate < tomorrow;
    });

    const todayOrderCount = todayOrders.length;
    const todayRevenue = todayOrders
      .filter(o => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + o.total, 0);

    return NextResponse.json({
      orders,
      todayOrderCount,
      todayRevenue,
    });
  } catch (error) {
    console.error("Error fetching merchant orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
