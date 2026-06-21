import React, { useState } from "react";
import { motion } from "motion/react";
import { Package, Heart, Settings, CreditCard, MapPin, Bell, ChevronRight, LogOut } from "lucide-react";

type Tab = "orders" | "wishlist" | "addresses" | "payment" | "settings";

const MOCK_ORDERS = [
  { id: "#PH-10482", date: "Jun 15, 2026", status: "Delivered", total: "$74.97", items: 3, image: "https://images.unsplash.com/photo-1657364890921-dbd85cf0398b?w=80&h=80&fit=crop&auto=format" },
  { id: "#PH-10391", date: "Jun 3, 2026", status: "Shipped", total: "$49.99", items: 1, image: "https://images.unsplash.com/photo-1593034528208-08d7a9eef742?w=80&h=80&fit=crop&auto=format" },
  { id: "#PH-10205", date: "May 22, 2026", status: "Delivered", total: "$34.98", items: 2, image: "https://images.unsplash.com/photo-1577655197620-704858b270ac?w=80&h=80&fit=crop&auto=format" },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "#10B981",
  Shipped: "#3B82F6",
  Processing: "#F59E0B",
  Cancelled: "#EF4444",
};

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "orders", label: "My Orders", icon: <Package size={16} /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart size={16} /> },
  { id: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
  { id: "payment", label: "Payment Methods", icon: <CreditCard size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

export function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
            A
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Alex Johnson</h1>
            <p className="text-white/40 text-sm">alex.johnson@email.com · Member since Jan 2025</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                  style={{
                    color: activeTab === item.id ? "#a855f7" : "#374151",
                    borderLeft: activeTab === item.id ? "3px solid #a855f7" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  <ChevronRight size={14} className="opacity-30" />
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-5">My Orders</h2>
                  <div className="flex flex-col gap-4">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-center">
                        <img src={order.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">{order.id}</p>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status] }}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-0.5">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                        </div>
                        <p className="font-black text-gray-900 text-sm">{order.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="text-center py-16 text-gray-400">
                  <Heart size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="font-semibold">Your wishlist is empty</p>
                  <p className="text-sm mt-1">Save products you love to find them later.</p>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-5">Saved Addresses</h2>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-purple-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900">Alex Johnson</p>
                        <p className="text-sm text-gray-500 mt-1">123 Creative Lane<br />Los Angeles, CA 90001<br />United States</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600">Default</span>
                    </div>
                  </div>
                  <button className="mt-4 text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors">+ Add new address</button>
                </div>
              )}

              {activeTab === "payment" && (
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-5">Payment Methods</h2>
                  <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-black">VISA</div>
                    <div>
                      <p className="font-bold text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-400">Expires 09/28</p>
                    </div>
                    <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600">Default</span>
                  </div>
                  <button className="mt-4 text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors">+ Add payment method</button>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-5">Account Settings</h2>
                  <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                    {[
                      { label: "Full Name", value: "Alex Johnson" },
                      { label: "Email", value: "alex.johnson@email.com" },
                      { label: "Phone", value: "+1 (555) 012-3456" },
                    ].map((field) => (
                      <div key={field.label} className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{field.label}</label>
                        <input
                          defaultValue={field.value}
                          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Bell size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-700 font-semibold">Email notifications</span>
                      </div>
                      <div className="w-10 h-6 rounded-full bg-purple-500 relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow" />
                      </div>
                    </div>
                    <button className="mt-2 py-3 rounded-xl font-bold text-sm text-white" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
