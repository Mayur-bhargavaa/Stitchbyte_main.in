"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  QrCode,
  UtensilsCrossed,
  ShoppingCart,
  DollarSign,
  Download,
  Plus,
  Minus,
  Eye,
  Clock,
  CheckCircle,
  ChefHat,
  Bell,
  Package,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Edit,
  Save,
  X,
  ImagePlus,
  Loader2,
  User,
  FileDown,
  ExternalLink,
  Volume2,
} from "lucide-react";
import QRCode from "qrcode";

type Restaurant = {
  id: string;
  name: string;
  slug: string;
  tables: { id: string; number: number; token: string; active: boolean }[];
  categories: { id: string; name: string; position: number }[];
  items: {
    id: string;
    name: string;
    price: number;
    categoryId: string | null;
    available: boolean;
    veg: boolean;
    imageUrl?: string | null;
  }[];
};

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  paymentMode: string;
  paymentStatus: string;
  total: number;
  customerName: string | null;
  customerPhone: string | null;
  createdAt: string;
  table: { number: number };
  items: { name: string; quantity: number; unitPrice: number }[];
};

type Props = {
  restaurant: Restaurant;
  orders: Order[];
  todayOrderCount: number;
  todayRevenue: number;
};

type Tab = "orders" | "menu" | "qr" | "revenue";

export default function MerchantClient({
  restaurant: initialRestaurant,
  orders: initialOrders,
  todayOrderCount: initialOrderCount,
  todayRevenue: initialRevenue,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [menuItems, setMenuItems] = useState(initialRestaurant.items);
  const [tableNumbers, setTableNumbers] = useState("");
  const [generating, setGenerating] = useState(false);
  const [qrCodes, setQrCodes] = useState<{ tableNumber: number; token: string; dataUrl: string }[]>([]);
  const [todayOrderCount, setTodayOrderCount] = useState(initialOrderCount);
  const [todayRevenue, setTodayRevenue] = useState(initialRevenue);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  
  // Audio ref for notification sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastOrderCountRef = useRef(initialOrders.length);
  
  // Add/Edit item state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Restaurant["items"][0] | null>(null);
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    veg: true,
    imageUrl: "" as string | null,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Payment collection state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payingOrder, setPayingOrder] = useState<Order | null>(null);
  const [cashReceived, setCashReceived] = useState("");

  const tabs = [
    { id: "orders" as Tab, label: "Orders", icon: ShoppingCart },
    { id: "menu" as Tab, label: "Menu", icon: UtensilsCrossed },
    { id: "qr" as Tab, label: "QR Codes", icon: QrCode },
    { id: "revenue" as Tab, label: "Revenue", icon: DollarSign },
  ];

  // Show toast notification
  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed - user hasn't interacted with page yet
      });
    }
  }, []);

  // Fetch latest orders - for real-time updates
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`/api/merchant/orders?restaurantId=${restaurant.id}`);
      if (res.ok) {
        const data = await res.json();
        
        // Check for new orders
        if (data.orders.length > lastOrderCountRef.current) {
          const newOrderCount = data.orders.length - lastOrderCountRef.current;
          playNotificationSound();
          showToast(`🔔 ${newOrderCount} new order${newOrderCount > 1 ? 's' : ''} received!`, "success");
        }
        
        lastOrderCountRef.current = data.orders.length;
        setOrders(data.orders);
        setTodayOrderCount(data.todayOrderCount);
        setTodayRevenue(data.todayRevenue);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }, [restaurant.id, playNotificationSound, showToast]);

  // Fetch restaurant data (for tables update)
  const fetchRestaurant = useCallback(async () => {
    try {
      const res = await fetch(`/api/merchant/restaurant?restaurantId=${restaurant.id}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurant(data);
      }
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
    }
  }, [restaurant.id]);

  // Poll for new orders every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Generate QR codes for existing tables
  useEffect(() => {
    const generateQrImages = async () => {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const codes = await Promise.all(
        restaurant.tables.map(async (table) => {
          const url = `${baseUrl}/menu/${restaurant.slug}/${table.token}`;
          const dataUrl = await QRCode.toDataURL(url, {
            width: 200,
            margin: 2,
            color: { dark: "#000000", light: "#ffffff" },
          });
          return { tableNumber: table.number, token: table.token, dataUrl };
        })
      );
      setQrCodes(codes);
    };
    
    if (restaurant.tables.length > 0) {
      generateQrImages();
    }
  }, [restaurant.tables, restaurant.slug]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } catch (error) {
      console.error("Failed to update order status");
    }
  };

  const generateQRPdf = async () => {
    if (!tableNumbers.trim()) {
      showToast("Please enter table numbers", "error");
      return;
    }

    setGenerating(true);
    try {
      const numbers = tableNumbers
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n) && n > 0);

      if (numbers.length === 0) {
        showToast("Please enter valid table numbers (e.g., 1, 2, 3)", "error");
        return;
      }

      // Check for existing tables
      const existingTableNumbers = restaurant.tables.map(t => t.number);
      const duplicates = numbers.filter(n => existingTableNumbers.includes(n));
      
      if (duplicates.length === numbers.length) {
        // All tables already exist
        showToast(`Table${duplicates.length > 1 ? 's' : ''} ${duplicates.join(', ')} already exist${duplicates.length === 1 ? 's' : ''}! QR codes will be downloaded.`, "info");
      } else if (duplicates.length > 0) {
        // Some tables exist
        showToast(`Table${duplicates.length > 1 ? 's' : ''} ${duplicates.join(', ')} already exist${duplicates.length === 1 ? 's' : ''}. New tables will be created for the rest.`, "info");
      }

      const res = await fetch("/api/qr/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          tableNumbers: numbers,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${restaurant.slug}-qr-codes.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      setTableNumbers("");
      
      // Refresh restaurant data to show new tables
      await fetchRestaurant();
      
      const newTables = numbers.filter(n => !existingTableNumbers.includes(n));
      if (newTables.length > 0) {
        showToast(`✅ ${newTables.length} new table${newTables.length > 1 ? 's' : ''} created successfully!`, "success");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to generate QR codes", "error");
    } finally {
      setGenerating(false);
    }
  };

  const toggleItemAvailability = async (itemId: string, available: boolean) => {
    // Optimistically update UI
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, available } : item
      )
    );
    
    try {
      await fetch(`/api/menu/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available }),
      });
    } catch (error) {
      // Revert on error
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, available: !available } : item
        )
      );
      console.error("Failed to update item");
    }
  };

  const openAddItem = () => {
    setEditingItem(null);
    setItemForm({ name: "", price: "", categoryId: "", veg: true, imageUrl: "" });
    setShowItemModal(true);
  };

  const openEditItem = (item: Restaurant["items"][0]) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      price: item.price.toString(),
      categoryId: item.categoryId || "",
      veg: item.veg,
      imageUrl: item.imageUrl || "",
    });
    setShowItemModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setItemForm((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const saveItem = async () => {
    if (!itemForm.name || !itemForm.price) {
      alert("Please fill in name and price");
      return;
    }

    try {
      if (editingItem) {
        // Update existing item
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: itemForm.name,
            price: parseFloat(itemForm.price),
            categoryId: itemForm.categoryId || null,
            veg: itemForm.veg,
            imageUrl: itemForm.imageUrl || null,
          }),
        });
        
        if (res.ok) {
          setMenuItems((prev) =>
            prev.map((item) =>
              item.id === editingItem.id
                ? {
                    ...item,
                    name: itemForm.name,
                    price: parseFloat(itemForm.price),
                    categoryId: itemForm.categoryId || null,
                    veg: itemForm.veg,
                    imageUrl: itemForm.imageUrl || null,
                  }
                : item
            )
          );
        }
      } else {
        // Create new item
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            restaurantId: restaurant.id,
            name: itemForm.name,
            price: parseFloat(itemForm.price),
            categoryId: itemForm.categoryId || null,
            veg: itemForm.veg,
            imageUrl: itemForm.imageUrl || null,
          }),
        });
        
        if (res.ok) {
          const newItem = await res.json();
          setMenuItems((prev) => [...prev, newItem]);
        }
      }
      
      setShowItemModal(false);
    } catch (error) {
      alert("Failed to save item");
    }
  };

  const openPaymentModal = (order: Order) => {
    setPayingOrder(order);
    setCashReceived("");
    setShowPaymentModal(true);
  };

  const collectPayment = async () => {
    if (!payingOrder) return;
    
    const received = parseFloat(cashReceived);
    if (isNaN(received) || received < payingOrder.total) {
      alert(`Amount must be at least ₹${payingOrder.total}`);
      return;
    }

    try {
      await fetch(`/api/orders/${payingOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "PAID" }),
      });
      
      setOrders((prev) =>
        prev.map((o) =>
          o.id === payingOrder.id ? { ...o, paymentStatus: "PAID" } : o
        )
      );
      
      setShowPaymentModal(false);
      setPayingOrder(null);
      setCashReceived("");
    } catch (error) {
      alert("Failed to update payment status");
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-orange-100 text-orange-800",
    READY: "bg-green-100 text-green-800",
    SERVED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Sound */}
      <audio ref={audioRef} preload="auto" suppressHydrationWarning>
        <source src="/notification.mp3" type="audio/mpeg" />
        <source src="/notification.wav" type="audio/wav" />
      </audio>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <div className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-sm ${
            toast.type === "success" ? "bg-green-600 text-white" :
            toast.type === "error" ? "bg-red-600 text-white" :
            "bg-black text-white"
          }`}>
            {toast.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {toast.type === "error" && <X className="w-5 h-5 flex-shrink-0" />}
            {toast.type === "info" && <Bell className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-black">{restaurant.name}</h1>
            <p className="text-sm text-black">Merchant Dashboard</p>
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Profile"
          >
            <User className="w-6 h-6 text-black" />
          </button>
        </div>
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-black">Today's Orders</p>
            <p className="text-2xl font-bold text-black">{todayOrderCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-black">Today's Revenue</p>
            <p className="text-2xl font-bold text-black">₹{todayRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-black">Tables</p>
            <p className="text-2xl font-bold text-black">{restaurant.tables.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-black">Menu Items</p>
            <p className="text-2xl font-bold text-black">{restaurant.items.length}</p>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black">Live Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-black">
                No orders yet
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-black">{order.orderNumber}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-black">
                          Table {order.table.number} • {order.customerPhone}
                        </p>
                        <p className="text-xs text-black">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-black">₹{order.total}</p>
                        <span
                          className={`text-xs ${
                            order.paymentStatus === "PAID"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {order.paymentMode} • {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t pt-3 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm py-1 text-black">
                          <span>
                            {item.quantity}× {item.name}
                          </span>
                          <span>₹{item.unitPrice * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    {order.status !== "SERVED" && order.status !== "CANCELLED" && (
                      <div className="flex gap-2 border-t pt-3">
                        {order.status === "PENDING" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                            className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === "CONFIRMED" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "PREPARING")}
                            className="flex-1 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                          >
                            <ChefHat className="w-4 h-4" /> Start Preparing
                          </button>
                        )}
                        {order.status === "PREPARING" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "READY")}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                          >
                            <Bell className="w-4 h-4" /> Mark Ready
                          </button>
                        )}
                        {order.status === "READY" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "SERVED")}
                            className="flex-1 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" /> Mark Served
                          </button>
                        )}
                      </div>
                    )}

                    {/* Collect Payment - show for served orders with pending payment */}
                    {order.status === "SERVED" && order.paymentStatus === "PENDING" && order.paymentMode === "COUNTER" && (
                      <div className="border-t pt-3">
                        <button
                          onClick={() => openPaymentModal(order)}
                          className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <DollarSign className="w-4 h-4" /> Collect Payment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">Menu Items</h2>
              <button 
                onClick={openAddItem}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm divide-y">
              {menuItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Item Thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className={`w-6 h-6 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            item.veg ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium text-black">{item.name}</span>
                      </div>
                      <p className="text-sm text-black">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleItemAvailability(item.id, !item.available)}
                      className={`flex items-center gap-1 text-sm ${
                        item.available ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {item.available ? (
                        <>
                          <ToggleRight className="w-6 h-6" /> In Stock
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-6 h-6" /> Out
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => openEditItem(item)}
                      className="p-2 text-black hover:text-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {menuItems.length === 0 && (
                <p className="p-8 text-center text-black">
                  No menu items yet. Add your first item!
                </p>
              )}
            </div>
          </div>
        )}

        {/* QR Tab */}
        {activeTab === "qr" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-black">Generate QR Codes</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Table Numbers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1, 2, 3, 4, 5"
                    value={tableNumbers}
                    onChange={(e) => setTableNumbers(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-black placeholder:text-gray-400"
                  />
                  <p className="text-xs text-black mt-1">
                    Enter comma-separated table numbers
                  </p>
                </div>
                <button
                  onClick={generateQRPdf}
                  disabled={generating}
                  className="w-full py-3 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  {generating ? "Generating..." : "Download QR PDF"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold text-black">Existing Tables & QR Codes</h2>
                <span className="text-sm text-gray-500">{restaurant.tables.length} tables</span>
              </div>
              {restaurant.tables.length === 0 ? (
                <p className="p-8 text-center text-black">
                  No tables created yet. Generate QR codes to create tables.
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {restaurant.tables.map((table) => {
                    const qrCode = qrCodes.find((qr) => qr.tableNumber === table.number);
                    return (
                      <div
                        key={table.id}
                        className="bg-gray-50 rounded-xl p-4 flex flex-col items-center"
                      >
                        {/* QR Code Image */}
                        <div className="bg-white p-2 rounded-lg shadow-sm mb-3">
                          {qrCode ? (
                            <img
                              src={qrCode.dataUrl}
                              alt={`Table ${table.number} QR`}
                              className="w-32 h-32"
                            />
                          ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded">
                              <QrCode className="w-12 h-12 text-gray-300" />
                            </div>
                          )}
                        </div>
                        
                        {/* Table Info */}
                        <h3 className="font-bold text-lg text-black">Table {table.number}</h3>
                        <span
                          className={`mt-1 px-2 py-0.5 text-xs rounded-full ${
                            table.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {table.active ? "Active" : "Inactive"}
                        </span>
                        
                        {/* Actions */}
                        <div className="flex gap-2 mt-3 w-full">
                          <a
                            href={`/menu/${restaurant.slug}/${table.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-white border rounded-lg text-black hover:bg-gray-100"
                          >
                            <ExternalLink className="w-3 h-3" /> View
                          </a>
                          {qrCode && (
                            <a
                              href={qrCode.dataUrl}
                              download={`table-${table.number}-qr.png`}
                              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-black text-white rounded-lg hover:bg-gray-800"
                            >
                              <FileDown className="w-3 h-3" /> Save
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-black mb-1">Today</p>
                <p className="text-3xl font-bold text-black">₹{todayRevenue.toLocaleString()}</p>
                <p className="text-sm text-black">{todayOrderCount} orders</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-black mb-1">Payment Breakdown</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm text-black">
                    <span>Online</span>
                    <span className="font-medium">
                      {orders.filter((o) => o.paymentMode === "ONLINE").length} orders
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-black">
                    <span>Counter</span>
                    <span className="font-medium">
                      {orders.filter((o) => o.paymentMode === "COUNTER").length} orders
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-black mb-1">Avg Order Value</p>
                <p className="text-3xl font-bold text-black">
                  ₹
                  {orders.length > 0
                    ? Math.round(
                        orders.reduce((s, o) => s + o.total, 0) / orders.length
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h2>
              <button onClick={() => setShowItemModal(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Name *</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-black placeholder:text-gray-400"
                  placeholder="e.g., Paneer Butter Masala"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Price (₹) *</label>
                <input
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-black placeholder:text-gray-400"
                  placeholder="299"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Category</label>
                <select
                  value={itemForm.categoryId}
                  onChange={(e) => setItemForm({ ...itemForm, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-black"
                >
                  <option value="">No Category</option>
                  {restaurant.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-black">Type:</label>
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    checked={itemForm.veg}
                    onChange={() => setItemForm({ ...itemForm, veg: true })}
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500" /> Veg
                  </span>
                </label>
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    checked={!itemForm.veg}
                    onChange={() => setItemForm({ ...itemForm, veg: false })}
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500" /> Non-Veg
                  </span>
                </label>
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Item Image</label>
                <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50">
                    {itemForm.imageUrl ? (
                      <img 
                        src={itemForm.imageUrl} 
                        alt="Item preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <span className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        uploadingImage 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-black hover:bg-gray-50'
                      }`}>
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <ImagePlus className="w-4 h-4" />
                            {itemForm.imageUrl ? 'Change Image' : 'Upload Image'}
                          </>
                        )}
                      </span>
                    </label>
                    {itemForm.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setItemForm({ ...itemForm, imageUrl: "" })}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => setShowItemModal(false)}
                className="flex-1 py-2 border rounded-lg text-black font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                className="flex-1 py-2 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-1"
              >
                <Save className="w-4 h-4" />
                {editingItem ? "Update" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Collection Modal */}
      {showPaymentModal && payingOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Collect Payment</h2>
              <button onClick={() => setShowPaymentModal(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-black">{payingOrder.orderNumber}</span>
                  <span className="text-sm text-black">Table {payingOrder.table.number}</span>
                </div>
                <div className="border-t pt-2 space-y-1">
                  {payingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-black">
                      <span>{item.quantity}× {item.name}</span>
                      <span>₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-bold text-black text-lg">
                  <span>Order Total</span>
                  <span>₹{payingOrder.total}</span>
                </div>
              </div>

              {/* Cash Received Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">
                  Cash Received (₹)
                </label>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg text-2xl font-bold text-black text-center placeholder:text-gray-400"
                  placeholder="0"
                  autoFocus
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[payingOrder.total, Math.ceil(payingOrder.total / 10) * 10, Math.ceil(payingOrder.total / 50) * 50, Math.ceil(payingOrder.total / 100) * 100].filter((v, i, a) => a.indexOf(v) === i).map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCashReceived(amount.toString())}
                    className="py-2 bg-gray-100 rounded-lg text-sm font-medium text-black hover:bg-gray-200"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Change Calculation */}
              {cashReceived && parseFloat(cashReceived) >= payingOrder.total && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">Change to Return</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{(parseFloat(cashReceived) - payingOrder.total).toFixed(0)}
                    </span>
                  </div>
                </div>
              )}

              {cashReceived && parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < payingOrder.total && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-red-800 font-medium">Amount Short</span>
                    <span className="text-2xl font-bold text-red-600">
                      ₹{(payingOrder.total - parseFloat(cashReceived)).toFixed(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 border rounded-lg text-black font-medium"
              >
                Cancel
              </button>
              <button
                onClick={collectPayment}
                disabled={!cashReceived || parseFloat(cashReceived) < payingOrder.total}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
