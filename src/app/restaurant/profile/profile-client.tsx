"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Shield,
  LogOut,
  ArrowLeft,
  Edit,
  Save,
  X,
  Store,
  UtensilsCrossed,
  ShoppingCart,
  QrCode,
} from "lucide-react";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
};

type RestaurantData = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  address: string | null;
  phone: string | null;
  plan: string | null;
  _count: {
    tables: number;
    items: number;
    orders: number;
  };
} | null;

type Props = {
  user: UserData;
  restaurant: RestaurantData;
};

export default function ProfileClient({ user, restaurant }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });
  const [restaurantForm, setRestaurantForm] = useState({
    name: restaurant?.name || "",
    address: restaurant?.address || "",
    phone: restaurant?.phone || "",
  });

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (res.ok) {
        // Clear any cached data
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        router.push("/restaurant/signin");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRestaurant = async () => {
    if (!restaurant) return;
    setLoadingRestaurant(true);
    try {
      const res = await fetch(`/api/restaurant/${restaurant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurantForm),
      });
      if (res.ok) {
        setIsEditingRestaurant(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoadingRestaurant(false);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return { label: "Administrator", color: "bg-purple-100 text-purple-800" };
      case "MERCHANT":
        return { label: "Restaurant Owner", color: "bg-blue-100 text-blue-800" };
      default:
        return { label: "Customer", color: "bg-gray-100 text-gray-800" };
    }
  };

  const roleInfo = getRoleLabel(user.role);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
            <h1 className="text-xl font-bold text-black">Profile</h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <User className="w-10 h-10 text-gray-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.name || "User"}
                </h2>
                <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${roleInfo.color}`}>
                  {roleInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name || "", phone: user.phone || "" });
                    }}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-1 text-sm text-white bg-black px-3 py-1 rounded-lg"
                  >
                    <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-black"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="font-medium text-black">{user.name || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-black">{user.email}</p>
                </div>
                <span title="Verified">
                  <Shield className="w-4 h-4 text-green-500" />
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-black"
                      placeholder="Enter your phone"
                    />
                  ) : (
                    <p className="font-medium text-black">{user.phone || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-black">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info (for Merchants) */}
        {restaurant && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Store className="w-6 h-6 text-black" />
                <h3 className="text-lg font-semibold text-black">Restaurant Details</h3>
              </div>
              {!isEditingRestaurant ? (
                <button
                  onClick={() => setIsEditingRestaurant(true)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditingRestaurant(false);
                      setRestaurantForm({
                        name: restaurant.name,
                        address: restaurant.address || "",
                        phone: restaurant.phone || "",
                      });
                    }}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveRestaurant}
                    disabled={loadingRestaurant}
                    className="flex items-center gap-1 text-sm text-white bg-black px-3 py-1 rounded-lg"
                  >
                    <Save className="w-4 h-4" /> {loadingRestaurant ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              {/* Restaurant Name */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Restaurant Name</p>
                  {isEditingRestaurant ? (
                    <input
                      type="text"
                      value={restaurantForm.name}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-black"
                      placeholder="Enter restaurant name"
                    />
                  ) : (
                    <p className="font-medium text-black">{restaurant.name}</p>
                  )}
                </div>
                {!isEditingRestaurant && restaurant.plan && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    {restaurant.plan}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Address</p>
                  {isEditingRestaurant ? (
                    <input
                      type="text"
                      value={restaurantForm.address}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-black"
                      placeholder="Enter restaurant address"
                    />
                  ) : (
                    <p className="font-medium text-black">{restaurant.address || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Restaurant Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Restaurant Phone</p>
                  {isEditingRestaurant ? (
                    <input
                      type="tel"
                      value={restaurantForm.phone}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-black"
                      placeholder="Enter restaurant phone"
                    />
                  ) : (
                    <p className="font-medium text-black">{restaurant.phone || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <QrCode className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black">{restaurant._count.tables}</p>
                  <p className="text-sm text-gray-600">Tables</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <UtensilsCrossed className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black">{restaurant._count.items}</p>
                  <p className="text-sm text-gray-600">Menu Items</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black">{restaurant._count.orders}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {user.role === "ADMIN" && (
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Shield className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-black">Admin Dashboard</span>
              </button>
            )}
            {user.role === "MERCHANT" && (
              <button
                onClick={() => router.push("/merchant")}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Store className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-black">Merchant Dashboard</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-6 h-6 text-red-600" />
              <span className="font-medium text-red-600">
                {loggingOut ? "Logging out..." : "Sign Out"}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
