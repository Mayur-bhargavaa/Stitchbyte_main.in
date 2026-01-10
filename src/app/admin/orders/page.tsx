import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  ChefHat,
  Package,
  XCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Order, Restaurant, Table, OrderItem } from "@prisma/client";

type OrderWithRelations = Order & {
  restaurant: Restaurant;
  table: Table;
  items: OrderItem[];
};

export default async function OrdersPage() {
  const orders: OrderWithRelations[] = await prisma.order.findMany({
    include: {
      restaurant: true,
      table: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-orange-100 text-orange-800",
    READY: "bg-purple-100 text-purple-800",
    SERVED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const paymentStatusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
  };

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: OrderWithRelations) => o.status === "PENDING").length;
  const preparingOrders = orders.filter((o: OrderWithRelations) => o.status === "PREPARING").length;
  const completedOrders = orders.filter((o: OrderWithRelations) => o.status === "SERVED").length;
  const totalRevenue = orders.reduce((sum: number, o: OrderWithRelations) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-black">All Orders</h1>
              <p className="text-sm text-gray-600">{orders.length} total orders</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-black">{totalOrders}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-yellow-700">Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{pendingOrders}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-orange-700">Preparing</p>
            <p className="text-2xl font-bold text-orange-800">{preparingOrders}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700">Completed</p>
            <p className="text-2xl font-bold text-green-800">{completedOrders}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-800">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-black"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PREPARING">Preparing</option>
            <option value="READY">Ready</option>
            <option value="SERVED">Served</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Restaurants</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Payment</option>
            <option value="ONLINE">Online</option>
            <option value="COUNTER">Counter</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Order</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Restaurant</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Customer</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Items</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Total</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Payment</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-black">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">Table {order.table.number}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{order.restaurant.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{order.customerName || "Guest"}</p>
                      {order.customerPhone && (
                        <p className="text-xs text-gray-500">{order.customerPhone}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{order.items.length} items</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-black">₹{order.total}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-600">{order.paymentMode}</span>
                        <br />
                        <span className={`px-2 py-0.5 text-xs rounded-full ${paymentStatusColors[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No orders yet</h3>
              <p className="text-gray-600">Orders will appear here when customers place them</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
