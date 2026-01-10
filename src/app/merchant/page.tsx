import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MerchantClient from "./merchant-client";

export default async function MerchantDashboard() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/signin");
  }

  // Get merchant's restaurant
  const restaurant = await prisma.restaurant.findFirst({
    where: { ownerId: session.user.id },
    include: {
      tables: { orderBy: { number: "asc" } },
      categories: { orderBy: { position: "asc" } },
      items: { orderBy: { name: "asc" } },
    },
  });

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-black">No Restaurant Found</h1>
          <p className="text-black">Please contact admin to set up your restaurant.</p>
        </div>
      </div>
    );
  }

  // Get today's orders
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [orders, todayOrders, revenue] = await Promise.all([
    prisma.order.findMany({
      where: { restaurantId: restaurant.id },
      include: { items: true, table: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.order.count({
      where: {
        restaurantId: restaurant.id,
        createdAt: { gte: today },
      },
    }),
    prisma.order.aggregate({
      where: {
        restaurantId: restaurant.id,
        createdAt: { gte: today },
        paymentStatus: "PAID",
      },
      _sum: { total: true },
    }),
  ]);

  return (
    <MerchantClient
      restaurant={JSON.parse(JSON.stringify(restaurant))}
      orders={JSON.parse(JSON.stringify(orders))}
      todayOrderCount={todayOrders}
      todayRevenue={revenue._sum.total || 0}
    />
  );
}
