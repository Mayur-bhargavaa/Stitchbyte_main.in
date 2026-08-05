export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  QrCode,
  Download,
  Eye,
  Building2,
  Table2,
  ExternalLink,
} from "lucide-react";
import { Restaurant, Table } from "@prisma/client";

type RestaurantWithTables = Restaurant & {
  tables: Table[];
  _count: { tables: number };
};

export default async function QRManagementPage() {
  const restaurants: RestaurantWithTables[] = await prisma.restaurant.findMany({
    include: {
      tables: {
        orderBy: { number: "asc" },
      },
      _count: {
        select: { tables: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const totalTables = restaurants.reduce((sum: number, r: RestaurantWithTables) => sum + r._count.tables, 0);
  const activeTables = restaurants.reduce(
    (sum: number, r: RestaurantWithTables) => sum + r.tables.filter((t: Table) => t.active).length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/restaurant/admin" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-black">QR Code Management</h1>
            <p className="text-sm text-gray-600">Manage QR codes for all restaurants</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Restaurants</p>
            <p className="text-2xl font-bold text-black">{restaurants.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Tables</p>
            <p className="text-2xl font-bold text-black">{totalTables}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700">Active Tables</p>
            <p className="text-2xl font-bold text-green-800">{activeTables}</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700">Inactive Tables</p>
            <p className="text-2xl font-bold text-gray-800">{totalTables - activeTables}</p>
          </div>
        </div>

        {/* Restaurants with Tables */}
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Restaurant Header */}
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">/{restaurant.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {restaurant._count.tables} tables
                  </span>
                </div>
              </div>

              {/* Tables Grid */}
              {restaurant.tables.length > 0 ? (
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {restaurant.tables.map((table: Table) => (
                      <div
                        key={table.id}
                        className={`p-4 rounded-xl border-2 text-center ${
                          table.active
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-2">
                          <QrCode className="w-6 h-6 text-gray-600" />
                        </div>
                        <p className="font-bold text-black">Table {table.number}</p>
                        <span
                          className={`text-xs ${
                            table.active ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {table.active ? "Active" : "Inactive"}
                        </span>
                        <div className="mt-3 flex gap-1">
                          <a
                            href={`/restaurant/menu/${restaurant.slug}/${table.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 p-1.5 bg-white border rounded text-xs flex items-center justify-center gap-1 hover:bg-gray-50"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Table2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tables created yet</p>
                  <p className="text-sm text-gray-400">
                    Tables will appear when the merchant generates QR codes
                  </p>
                </div>
              )}
            </div>
          ))}

          {restaurants.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No restaurants yet</h3>
              <p className="text-gray-600 mb-4">
                QR codes will appear when restaurants are created
              </p>
              <Link
                href="/restaurant/admin/restaurants/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
              >
                <Building2 className="w-4 h-4" />
                Add Restaurant
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
