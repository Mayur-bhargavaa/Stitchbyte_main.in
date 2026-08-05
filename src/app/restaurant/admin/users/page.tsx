export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Users,
  Shield,
  Store,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { User } from "@prisma/client";

type UserWithCounts = User & {
  _count: {
    restaurants: number;
    orders: number;
  };
};

export default async function UsersPage() {
  const users: UserWithCounts[] = await prisma.user.findMany({
    include: {
      _count: {
        select: { restaurants: true, orders: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const roleColors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800",
    MERCHANT: "bg-blue-100 text-blue-800",
    CUSTOMER: "bg-gray-100 text-gray-800",
  };

  const roleIcons: Record<string, any> = {
    ADMIN: Shield,
    MERCHANT: Store,
    CUSTOMER: UserIcon,
  };

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u: UserWithCounts) => u.role === "ADMIN").length;
  const merchantCount = users.filter((u: UserWithCounts) => u.role === "MERCHANT").length;
  const customerCount = users.filter((u: UserWithCounts) => u.role === "CUSTOMER").length;

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
              <h1 className="text-xl font-bold text-black">Users</h1>
              <p className="text-sm text-gray-600">{users.length} total users</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-black">{totalUsers}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-700">Admins</p>
            <p className="text-2xl font-bold text-purple-800">{adminCount}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700">Merchants</p>
            <p className="text-2xl font-bold text-blue-800">{merchantCount}</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700">Customers</p>
            <p className="text-2xl font-bold text-gray-800">{customerCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-black"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MERCHANT">Merchant</option>
            <option value="CUSTOMER">Customer</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-black bg-white">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">User</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Contact</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Role</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Restaurants</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Orders</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Joined</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => {
                  const RoleIcon = roleIcons[user.role] || UserIcon;
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <RoleIcon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-black">{user.name || "No name"}</p>
                            <p className="text-xs text-gray-500">{user.id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-black">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.active ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600 text-sm">
                            <XCircle className="w-4 h-4" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-black">{user._count.restaurants}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-black">{user._count.orders}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-black">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No users yet</h3>
              <p className="text-gray-600">Users will appear here when they register</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
