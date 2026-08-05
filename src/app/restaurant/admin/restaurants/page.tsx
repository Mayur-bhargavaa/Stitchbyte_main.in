export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Calendar,
  ShoppingCart,
  UtensilsCrossed,
  QrCode,
} from "lucide-react";
import { Restaurant } from "@prisma/client";

type RestaurantWithRelations = Restaurant & {
  owner: { id: string; name: string | null; email: string };
  _count: { tables: number; items: number; orders: number };
};

export default async function RestaurantsPage() {
  const restaurants: RestaurantWithRelations[] = await prisma.restaurant.findMany({
    include: {
      owner: {
        select: { id: true, name: true, email: true },
      },
      _count: {
        select: { tables: true, items: true, orders: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/restaurant/admin" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-black">Restaurants</h1>
              <p className="text-sm text-gray-600">{restaurants.length} total restaurants</p>
            </div>
          </div>
          <Link
            href="/restaurant/admin/restaurants/new"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Plus className="w-4 h-4" />
            Add Restaurant
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-black"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Plans</option>
            <option value="FREE">Free</option>
            <option value="BASIC">Basic</option>
            <option value="PREMIUM">Premium</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Restaurant Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">/{restaurant.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        restaurant.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {restaurant.active ? "Active" : "Inactive"}
                    </span>
                    {restaurant.plan && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {restaurant.plan}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x">
                <div className="p-4 text-center">
                  <QrCode className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-black">{restaurant._count.tables}</p>
                  <p className="text-xs text-gray-500">Tables</p>
                </div>
                <div className="p-4 text-center">
                  <UtensilsCrossed className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-black">{restaurant._count.items}</p>
                  <p className="text-xs text-gray-500">Menu Items</p>
                </div>
                <div className="p-4 text-center">
                  <ShoppingCart className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-black">{restaurant._count.orders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
              </div>

              {/* Owner Info */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <User className="w-4 h-4" />
                  <span>{restaurant.owner.name || restaurant.owner.email}</span>
                </div>
                {restaurant.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                )}
                {restaurant.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t flex gap-2">
                <Link
                  href={`/restaurant/admin/restaurants/${restaurant.id}`}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-sm bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye className="w-4 h-4" /> View
                </Link>
                <Link
                  href={`/restaurant/admin/restaurants/${restaurant.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Link>
              </div>
            </div>
          ))}

          {restaurants.length === 0 && (
            <div className="col-span-full bg-white rounded-xl p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No restaurants yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first restaurant</p>
              <Link
                href="/restaurant/admin/restaurants/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Restaurant
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
