import { prisma } from "@/lib/prisma";
import {
  Building2,
  ShoppingCart,
  QrCode,
  DollarSign,
  TrendingUp,
  Users,
  Package,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { Order, Restaurant, Table } from "@prisma/client";

type OrderWithRelations = Order & {
  restaurant: Restaurant;
  table: Table;
};

export default async function AdminDashboard() {
  const [
    restaurantCount,
    orderCount,
    totalRevenue,
    userCount,
    recentOrders,
  ] = await Promise.all([
    prisma.restaurant.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.user.count(),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { restaurant: true, table: true },
    }),
  ]) as [number, number, { _sum: { total: number | null } }, number, OrderWithRelations[]];

  const stats = [
    {
      label: "Restaurants",
      value: restaurantCount,
      icon: Building2,
      color: "bg-blue-500",
      href: "/restaurant/admin/restaurants",
    },
    {
      label: "Total Orders",
      value: orderCount,
      icon: ShoppingCart,
      color: "bg-green-500",
      href: "/restaurant/admin/orders",
    },
    {
      label: "Total Revenue",
      value: `₹${(totalRevenue._sum.total || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      href: "/restaurant/admin/revenue",
    },
    {
      label: "Users",
      value: userCount,
      icon: Users,
      color: "bg-purple-500",
      href: "/restaurant/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-black">Admin Dashboard</span>
          <nav className="flex items-center gap-4">
            <Link href="/restaurant/admin/restaurants" className="text-sm text-black hover:text-gray-600">
              Restaurants
            </Link>
            <Link href="/restaurant/admin/orders" className="text-sm text-black hover:text-gray-600">
              Orders
            </Link>
            <Link href="/restaurant/admin/settings" className="text-sm text-black hover:text-gray-600">
              Settings
            </Link>
            <Link 
              href="/restaurant/profile" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Profile"
            >
              <User className="w-5 h-5 text-black" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-black">{stat.label}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-black">Recent Orders</h2>
              <Link href="/restaurant/admin/orders" className="text-sm text-blue-600">
                View All
              </Link>
            </div>
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">{order.orderNumber}</p>
                    <p className="text-sm text-black">
                      {order.restaurant.name} • Table {order.table.number}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-black">₹{order.total}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === "SERVED"
                          ? "bg-green-100 text-green-800"
                          : order.status === "PREPARING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="p-4 text-center text-black">No orders yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-black">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-3">
              <Link
                href="/restaurant/admin/restaurants/new"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-black">Add Restaurant</span>
              </Link>
              <Link
                href="/restaurant/admin/analytics"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-black">View Analytics</span>
              </Link>
              <Link
                href="/restaurant/admin/qr"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <QrCode className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-black">QR Management</span>
              </Link>
              <Link
                href="/restaurant/admin/settings"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-black">Platform Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
