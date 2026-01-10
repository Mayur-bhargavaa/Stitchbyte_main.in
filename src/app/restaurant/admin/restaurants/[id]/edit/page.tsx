"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
  Trash2,
  Loader2,
  AlertTriangle,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  MapPin,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  address: string | null;
  plan: string | null;
  active: boolean;
  owner: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
  };
  _count: {
    tables: number;
    items: number;
    orders: number;
  };
}

export default function EditRestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("BASIC");
  const [active, setActive] = useState(true);
  const [tableCount, setTableCount] = useState(0);

  // Owner form state
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const res = await fetch(`/api/admin/restaurants/${id}`);
      if (!res.ok) throw new Error("Restaurant not found");
      const data = await res.json();
      setRestaurant(data);
      setName(data.name);
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setPlan(data.plan || "BASIC");
      setActive(data.active);
      setTableCount(data._count.tables);
      setOwnerName(data.owner.name || "");
      setOwnerEmail(data.owner.email);
      setOwnerPhone(data.owner.phone || "");
    } catch (err) {
      setError("Failed to load restaurant");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Restaurant name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/restaurants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          plan,
          active,
          tableCount,
          owner: {
            name: ownerName,
            email: ownerEmail,
            phone: ownerPhone,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push(`/admin/restaurants/${id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/restaurants/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      router.push("/admin/restaurants");
    } catch (err: any) {
      setError(err.message);
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Restaurant not found</p>
          <Link href="/restaurant/admin/restaurants" className="text-blue-600 mt-4 inline-block">
            ← Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/admin/restaurants/${id}`} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Edit Restaurant</h1>
                <p className="text-sm text-gray-500">{restaurant.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Restaurant Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-black">Restaurant Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter restaurant name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full p-3 border rounded-xl text-black"
                >
                  <option value="BASIC">Basic</option>
                  <option value="STANDARD">Standard</option>
                  <option value="PREMIUM">Premium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border rounded-xl text-black"
                rows={2}
                placeholder="Enter full address"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-black">Restaurant Status</p>
                <p className="text-sm text-gray-500">
                  {active ? "Restaurant is visible to customers" : "Restaurant is hidden"}
                </p>
              </div>
              <button
                onClick={() => setActive(!active)}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
              >
                {active ? (
                  <ToggleRight className="w-10 h-10 text-green-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-black">Tables</h3>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Tables
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTableCount(Math.max(0, tableCount - 1))}
                disabled={tableCount <= restaurant._count.tables}
                className="w-12 h-12 flex items-center justify-center border-2 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-5 h-5 text-black" />
              </button>
              <div className="w-24 text-center">
                <span className="text-4xl font-bold text-black">{tableCount}</span>
              </div>
              <button
                onClick={() => setTableCount(tableCount + 1)}
                className="w-12 h-12 flex items-center justify-center border-2 rounded-xl hover:bg-gray-50"
              >
                <Plus className="w-5 h-5 text-black" />
              </button>
            </div>
            {tableCount > restaurant._count.tables && (
              <p className="text-sm text-green-600 mt-2">
                +{tableCount - restaurant._count.tables} new tables will be created
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Current tables cannot be removed if they have orders
            </p>
          </div>
        </div>

        {/* Owner Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-black">Owner Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-2" />
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-3 border rounded-xl text-black"
                placeholder="Enter owner name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="Enter phone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Stats:</strong> This restaurant has {restaurant._count.items} menu items and{" "}
            {restaurant._count.orders} orders.
          </p>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-black text-center mb-2">Delete Restaurant?</h3>
            <p className="text-gray-600 text-center mb-6">
              This will permanently delete <strong>{restaurant.name}</strong> and all associated
              data including tables, menu items, and orders. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 border rounded-xl text-black hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
