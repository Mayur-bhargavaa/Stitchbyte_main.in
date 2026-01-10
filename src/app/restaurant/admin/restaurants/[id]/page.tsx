import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  QrCode,
  UtensilsCrossed,
  ShoppingCart,
  DollarSign,
  Edit,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Order, Table, MenuItem, Category } from "@prisma/client";

type OrderWithTable = Order & { table: Table };

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: {
      owner: {
        select: { id: true, name: true, email: true, phone: true, createdAt: true },
      },
      tables: {
        orderBy: { number: "asc" },
      },
      categories: {
        orderBy: { position: "asc" },
      },
      items: {
        include: { category: true },
        orderBy: { name: "asc" },
      },
      orders: {
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { table: true },
      },
      _count: {
        select: { tables: true, items: true, orders: true },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }

  // Calculate stats
  const totalRevenue = restaurant.orders.reduce((sum: number, o: OrderWithTable) => sum + o.total, 0);
  const completedOrders = restaurant.orders.filter((o: OrderWithTable) => o.status === "SERVED").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/restaurant/admin/restaurants" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">{restaurant.name}</h1>
                <p className="text-sm text-gray-500">/{restaurant.slug}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                restaurant.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {restaurant.active ? "Active" : "Inactive"}
            </span>
            {restaurant.plan && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {restaurant.plan}
              </span>
            )}
            <Link
              href={`/restaurant/admin/restaurants/${id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Tables</span>
            </div>
            <p className="text-3xl font-bold text-black">{restaurant._count.tables}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <UtensilsCrossed className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Menu Items</span>
            </div>
            <p className="text-3xl font-bold text-black">{restaurant._count.items}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Total Orders</span>
            </div>
            <p className="text-3xl font-bold text-black">{restaurant._count.orders}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <p className="text-3xl font-bold text-black">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Restaurant Info */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-black">Restaurant Details</h3>
            </div>
            <div className="p-4 space-y-4">
              {restaurant.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-black">{restaurant.address}</p>
                  </div>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-black">{restaurant.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-black">
                    {new Date(restaurant.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-black">Owner Information</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-black">{restaurant.owner.name || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-black">{restaurant.owner.email}</p>
                </div>
              </div>
              {restaurant.owner.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-black">{restaurant.owner.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-black">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <a
                href={`/restaurant/menu/${restaurant.slug}/${restaurant.tables[0]?.token || ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-black">View Customer Menu</span>
              </a>
              <Link
                href={`/restaurant/admin/restaurants/${id}/edit`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <Edit className="w-5 h-5 text-green-600" />
                <span className="text-sm text-black">Edit Restaurant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-black">Tables ({restaurant.tables.length})</h3>
          </div>
          {restaurant.tables.length > 0 ? (
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {restaurant.tables.map((table: Table) => (
                <div
                  key={table.id}
                  className={`p-4 rounded-xl border-2 text-center ${
                    table.active
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <QrCode className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <p className="font-bold text-black">Table {table.number}</p>
                  <span className={`text-xs ${table.active ? "text-green-600" : "text-gray-500"}`}>
                    {table.active ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tables created yet</p>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-black">Recent Orders</h3>
          </div>
          {restaurant.orders.length > 0 ? (
            <div className="divide-y">
              {restaurant.orders.map((order: OrderWithTable) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      Table {order.table.number} • {new Date(order.createdAt).toLocaleString()}
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
            </div>
          ) : (
            <div className="p-8 text-center">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
