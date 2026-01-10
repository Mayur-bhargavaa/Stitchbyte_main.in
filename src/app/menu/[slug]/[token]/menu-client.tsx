"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Leaf,
  Drumstick,
  Star,
  ThumbsUp,
  CreditCard,
  Banknote,
  User,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

type Restaurant = {
  id: string;
  name: string;
  slug: string;
  logo?: string;
};

type Table = {
  id: string;
  number: number;
  token: string;
};

type Category = {
  id: string;
  name: string;
};

type MenuItem = {
  id: string;
  categoryId: string | null;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  veg: boolean;
  popular: boolean;
  recommended: boolean;
};

type CartItem = MenuItem & { quantity: number };

type Props = {
  restaurant: Restaurant;
  table: Table;
  categories: Category[];
  items: MenuItem[];
};

export default function MenuClient({ restaurant, table, categories, items }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"ONLINE" | "COUNTER">("COUNTER");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    marketingConsent: false,
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!customerInfo.phone) {
      alert("Please enter your phone number");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          tableId: table.id,
          items: cart.map((item) => ({
            menuItemId: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
          paymentMode,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerEmail: customerInfo.email,
          marketingConsent: customerInfo.marketingConsent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderNumber(data.orderNumber);
        setOrderPlaced(true);
        setCart([]);
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      alert("Failed to place order");
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
          <p className="text-black">Order #{orderNumber}</p>
          <p className="text-sm text-black">
            Your order has been sent to the kitchen.
            {paymentMode === "COUNTER" && " Please pay at the counter."}
          </p>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setShowCheckout(false);
              setShowCart(false);
            }}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full"
          >
            Order More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-black">{restaurant.name}</h1>
              <p className="text-xs text-black">Table {table.number}</p>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 bg-black text-white rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="border-t">
          <div className="max-w-lg mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                !activeCategory
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Menu Items */}
      <main className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {filteredItems.length === 0 ? (
          <p className="text-center text-black py-8">No items found</p>
        ) : (
          filteredItems.map((item) => {
            const inCart = cart.find((i) => i.id === item.id);
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl p-3 shadow-sm flex gap-3"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl text-gray-300">🍽️</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    {item.veg ? (
                      <Leaf className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Drumstick className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <h3 className="font-semibold text-black text-sm leading-tight">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {item.popular && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                        <Star className="w-3 h-3" /> Popular
                      </span>
                    )}
                    {item.recommended && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                        <ThumbsUp className="w-3 h-3" /> Chef's Pick
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-black mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-black">₹{item.price}</span>
                    {inCart ? (
                      <div className="flex items-center gap-2 bg-black rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white text-sm w-4 text-center">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-1.5 bg-black text-white text-sm rounded-full flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </main>

      {/* Cart Bottom Bar */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div>
              <span className="text-sm">{cartCount} items</span>
              <span className="mx-2">•</span>
              <span className="font-bold">₹{cartTotal}</span>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="px-4 py-2 bg-white text-black rounded-full font-medium text-sm"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowCart(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center text-black">Cart is empty</div>
            ) : (
              <>
                <div className="p-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          {item.veg ? (
                            <Leaf className="w-3 h-3 text-green-600" />
                          ) : (
                            <Drumstick className="w-3 h-3 text-red-600" />
                          )}
                          <span className="font-medium text-sm text-black">{item.name}</span>
                        </div>
                        <span className="text-sm text-black">
                          ₹{item.price} × {item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5"
                        >
                          <Minus className="w-4 h-4 text-black" />
                        </button>
                        <span className="text-sm w-4 text-center text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5"
                        >
                          <Plus className="w-4 h-4 text-black" />
                        </button>
                      </div>
                      <span className="font-bold w-16 text-right text-black">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4">
                  <div className="flex justify-between text-lg font-bold text-black">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full mt-4 py-3 bg-black text-white rounded-full font-medium"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Checkout</h2>
              <button onClick={() => setShowCheckout(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black">Your Details</h3>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-black placeholder:text-gray-400"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    required
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-black placeholder:text-gray-400"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-black placeholder:text-gray-400"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-black">
                  <input
                    type="checkbox"
                    checked={customerInfo.marketingConsent}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        marketingConsent: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  I agree to receive offers and updates
                </label>
              </div>

              {/* Payment Mode */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMode("ONLINE")}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${
                      paymentMode === "ONLINE"
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-black" />
                    <span className="text-sm font-medium text-black">Pay Online</span>
                  </button>
                  <button
                    onClick={() => setPaymentMode("COUNTER")}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition ${
                      paymentMode === "COUNTER"
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Banknote className="w-6 h-6 text-black" />
                    <span className="text-sm font-medium text-black">Pay at Counter</span>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-black">Order Summary</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-black">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t text-black">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-black text-white rounded-full font-medium"
              >
                Place Order — ₹{cartTotal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
