import React from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../Root";

export function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQty, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some products to get started.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
            style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
          >
            Browse Shop <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-black text-white">
            Your <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cart</span>
          </h1>
          <p className="text-white/40 mt-1">{items.reduce((s, i) => s + i.quantity, 0)} items</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-purple-600 font-semibold text-sm mt-0.5">{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-black text-lg text-gray-900 mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 text-sm mb-5">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">{total >= 50 ? "Free" : "$5.99"}</span>
                </div>
                {total < 50 && (
                  <p className="text-xs text-purple-500">Add ${(50 - total).toFixed(2)} more for free shipping!</p>
                )}
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex justify-between font-black text-base text-gray-900">
                  <span>Total</span>
                  <span>${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
              >
                Checkout <ArrowRight size={16} />
              </button>

              <Link to="/shop" className="block text-center text-xs text-gray-400 hover:text-gray-600 mt-4 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
