import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Building2,
  Calendar,
  Clock,
  BarChart3,
} from "lucide-react";
import { Order, Restaurant, User } from "@prisma/client";

type OrderWithRestaurant = Order & { restaurant: Restaurant };
type RestaurantWithCounts = Restaurant & { _count: { orders: number; items: number } };

export default async function AnalyticsPage() {
  // Fetch all data for analytics
  const [orders, users, restaurants] = await Promise.all([
    prisma.order.findMany({
      include: { restaurant: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany(),
    prisma.restaurant.findMany({
      include: { _count: { select: { orders: true, items: true } } },
    }),
  ]) as [OrderWithRestaurant[], User[], RestaurantWithCounts[]];

  // Calculate metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);
  const totalUsers = users.length;
  const totalRestaurants = restaurants.length;

  // Orders by status
  const ordersByStatus = orders.reduce((acc: Record<string, number>, o: OrderWithRestaurant) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Orders by day (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    return date;
  }).reverse();

  const ordersByDay = last7Days.map((date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const dayOrders = orders.filter((o: OrderWithRestaurant) => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= date && orderDate < nextDay;
    });
    return {
      date: date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
      orders: dayOrders.length,
      revenue: dayOrders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0),
    };
  });

  // Top performing restaurants
  const restaurantPerformance = restaurants
    .map((r: RestaurantWithCounts) => ({
      name: r.name,
      orders: r._count.orders,
      items: r._count.items,
    }))
    .sort((a: { name: string; orders: number; items: number }, b: { name: string; orders: number; items: number }) => b.orders - a.orders);

  // Peak hours
  const ordersByHour = orders.reduce((acc: Record<number, number>, o: OrderWithRestaurant) => {
    const hour = new Date(o.createdAt).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const peakHour = Object.entries(ordersByHour).sort(([, a], [, b]) => b - a)[0];

  // Average order value
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/restaurant/admin" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-black">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600">Platform performance overview</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Orders</span>
            </div>
            <p className="text-3xl font-bold text-black">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Total Revenue</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Total Users</span>
            </div>
            <p className="text-3xl font-bold text-black">{totalUsers}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building2 className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Restaurants</span>
            </div>
            <p className="text-3xl font-bold text-black">{totalRestaurants}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Day Chart (Simple representation) */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Orders (Last 7 Days)
            </h3>
            <div className="space-y-3">
              {ordersByDay.map((day, i) => {
                const maxOrders = Math.max(...ordersByDay.map((d) => d.orders), 1);
                const width = (day.orders / maxOrders) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-gray-600">{day.date}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                      <div
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(width, 10)}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.orders}</span>
                      </div>
                    </div>
                    <span className="w-24 text-right text-sm text-gray-600">
                      ₹{day.revenue.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4">Order Status Distribution</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(ordersByStatus).map(([status, count]) => {
                const statusColors: Record<string, string> = {
                  PENDING: "bg-yellow-100 text-yellow-800",
                  CONFIRMED: "bg-blue-100 text-blue-800",
                  PREPARING: "bg-orange-100 text-orange-800",
                  READY: "bg-purple-100 text-purple-800",
                  SERVED: "bg-green-100 text-green-800",
                  CANCELLED: "bg-red-100 text-red-800",
                };
                return (
                  <div key={status} className={`p-4 rounded-lg ${statusColors[status] || "bg-gray-100"}`}>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm">{status}</p>
                  </div>
                );
              })}
              {Object.keys(ordersByStatus).length === 0 && (
                <p className="col-span-2 text-center text-gray-500 py-4">No orders yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Restaurants */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4">Top Restaurants</h3>
            <div className="space-y-3">
              {restaurantPerformance.slice(0, 5).map((r, i) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </span>
                    <span className="text-black">{r.name}</span>
                  </div>
                  <span className="text-gray-600">{r.orders} orders</span>
                </div>
              ))}
              {restaurantPerformance.length === 0 && (
                <p className="text-center text-gray-500 py-4">No data yet</p>
              )}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Avg Order Value</p>
                  <p className="font-bold text-blue-800">₹{avgOrderValue}</p>
                </div>
              </div>
              {peakHour && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600">Peak Hour</p>
                    <p className="font-bold text-purple-800">
                      {parseInt(peakHour[0])}:00 - {parseInt(peakHour[0]) + 1}:00
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">Completion Rate</p>
                  <p className="font-bold text-green-800">
                    {totalOrders > 0
                      ? Math.round(((ordersByStatus["SERVED"] || 0) / totalOrders) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Active Restaurants</span>
                <span className="font-bold text-black">
                  {restaurants.filter((r) => r.active).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Merchants</span>
                <span className="font-bold text-black">
                  {users.filter((u) => u.role === "MERCHANT").length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-bold text-black">{ordersByStatus["PENDING"] || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Today's Orders</span>
                <span className="font-bold text-black">
                  {ordersByDay[ordersByDay.length - 1]?.orders || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
