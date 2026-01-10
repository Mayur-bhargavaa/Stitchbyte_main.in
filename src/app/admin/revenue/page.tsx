import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Order, Restaurant } from "@prisma/client";

type OrderWithRestaurant = Order & { restaurant: Restaurant };

export default async function RevenuePage() {
  // Get all orders with payment info
  const orders: OrderWithRestaurant[] = await prisma.order.findMany({
    where: { paymentStatus: "PAID" },
    include: { restaurant: true },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);
  const onlinePayments = orders.filter((o: OrderWithRestaurant) => o.paymentMode === "ONLINE");
  const counterPayments = orders.filter((o: OrderWithRestaurant) => o.paymentMode === "COUNTER");
  const onlineRevenue = onlinePayments.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);
  const counterRevenue = counterPayments.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);

  // Today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter((o: OrderWithRestaurant) => new Date(o.createdAt) >= today);
  const todayRevenue = todayOrders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);

  // This week's stats
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekOrders = orders.filter((o: OrderWithRestaurant) => new Date(o.createdAt) >= weekStart);
  const weekRevenue = weekOrders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);

  // This month's stats
  const monthStart = new Date();
  monthStart.setDate(1);
  const monthOrders = orders.filter((o: OrderWithRestaurant) => new Date(o.createdAt) >= monthStart);
  const monthRevenue = monthOrders.reduce((sum: number, o: OrderWithRestaurant) => sum + o.total, 0);

  // Revenue by restaurant
  const revenueByRestaurant = orders.reduce((acc: Record<string, { name: string; revenue: number; orders: number }>, order: OrderWithRestaurant) => {
    const name = order.restaurant.name;
    if (!acc[name]) {
      acc[name] = { name, revenue: 0, orders: 0 };
    }
    acc[name].revenue += order.total;
    acc[name].orders += 1;
    return acc;
  }, {} as Record<string, { name: string; revenue: number; orders: number }>);

  type RestaurantRevenueType = { name: string; revenue: number; orders: number };
  const restaurantRevenue: RestaurantRevenueType[] = Object.values(revenueByRestaurant).sort(
    (a: RestaurantRevenueType, b: RestaurantRevenueType) => b.revenue - a.revenue
  );

  // Average order value
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-black">Revenue Analytics</h1>
            <p className="text-sm text-gray-600">Financial overview and reports</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Total Revenue</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{orders.length} paid orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Today</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{todayRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{todayOrders.length} orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">This Week</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{weekRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{weekOrders.length} orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">This Month</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{monthRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{monthOrders.length} orders</p>
          </div>
        </div>

        {/* Payment Mode Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black mb-4">Payment Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-black">Online Payments</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">₹{onlineRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{onlinePayments.length} orders</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-green-600" />
                  <span className="text-black">Counter Payments</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">₹{counterRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{counterPayments.length} orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Order Value</span>
                <span className="font-bold text-black">₹{avgOrderValue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-bold text-black">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Online %</span>
                <span className="font-bold text-black">
                  {orders.length > 0 ? Math.round((onlinePayments.length / orders.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Counter %</span>
                <span className="font-bold text-black">
                  {orders.length > 0 ? Math.round((counterPayments.length / orders.length) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black mb-4">Revenue by Restaurant</h3>
            <div className="space-y-3">
              {restaurantRevenue.slice(0, 5).map((r, i) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-black truncate max-w-[120px]">{r.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">₹{r.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{r.orders} orders</p>
                  </div>
                </div>
              ))}
              {restaurantRevenue.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-black">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Order</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Restaurant</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Amount</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Mode</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-black">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-sm text-black">{order.restaurant.name}</td>
                    <td className="px-4 py-3 font-semibold text-black">₹{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.paymentMode === "ONLINE" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {order.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="p-12 text-center">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No transactions yet</h3>
              <p className="text-gray-600">Revenue data will appear when orders are paid</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
