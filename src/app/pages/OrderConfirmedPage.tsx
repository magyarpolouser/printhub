import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Check, Package, Truck, MapPin, ArrowRight,
  Download, Share2, ShoppingBag, Star,
} from "lucide-react";

const ORDER = {
  number: "PH-10583",
  date: "June 21, 2026",
  email: "alex.johnson@email.com",
  total: "$74.97",
  subtotal: "$64.97",
  shipping: "$5.99",
  tax: "$4.01",
  method: "Standard Shipping (5–7 business days)",
  estimatedDelivery: "June 26 – June 28, 2026",
  address: "123 Creative Lane, Los Angeles, CA 90001, United States",
  paymentLast4: "4242",
  items: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1657364890921-dbd85cf0398b?w=120&h=120&fit=crop&auto=format",
      title: "Premium Cotton T-Shirt",
      variant: "Jet Black · Size L",
      qty: 2,
      price: "$24.99",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1593034528208-08d7a9eef742?w=120&h=120&fit=crop&auto=format",
      title: "Ceramic Coffee Mug",
      variant: "Chalk White",
      qty: 1,
      price: "$14.99",
    },
  ],
};

const STEPS = [
  { icon: <Check size={16} />, label: "Order placed", done: true, active: false },
  { icon: <Package size={16} />, label: "Being printed", done: false, active: true },
  { icon: <Truck size={16} />, label: "Shipped", done: false, active: false },
  { icon: <MapPin size={16} />, label: "Delivered", done: false, active: false },
];

function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      r: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: 2 + Math.random() * 3,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let frame: number;
    let elapsed = 0;

    const draw = () => {
      elapsed++;
      if (elapsed > 180) { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 160);
        if (p.shape === "rect") {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConfettiCanvas />

      {/* Hero banner */}
      <div className="relative bg-black overflow-hidden py-20 px-4 text-center">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #a855f7 0%, transparent 60%)" }} />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
        >
          <Check size={36} color="white" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">Order Confirmed</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Thank you, Alex! 🎉
          </h1>
          <p className="text-white/50 max-w-md mx-auto">
            Your order <span className="text-white font-bold">#{ORDER.number}</span> has been placed and our team is already getting it ready.
          </p>
          <p className="text-white/30 text-sm mt-2">
            Confirmation sent to <span className="text-white/60">{ORDER.email}</span>
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">

        {/* Progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="font-black text-gray-900 mb-6">Order Status</h2>
          <div className="flex items-center">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={
                      step.done
                        ? { background: "linear-gradient(135deg,#a855f7,#ec4899)", color: "#fff" }
                        : step.active
                        ? { background: "rgba(168,85,247,0.12)", color: "#a855f7", border: "2px solid #a855f7" }
                        : { background: "#f3f4f6", color: "#9ca3af" }
                    }
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-xs font-semibold text-center max-w-[64px] leading-tight"
                    style={{ color: step.done || step.active ? "#a855f7" : "#9ca3af" }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 mb-5 rounded-full"
                    style={{ background: step.done ? "linear-gradient(90deg,#a855f7,#ec4899)" : "#e5e7eb" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
            <Truck size={15} className="text-purple-400" />
            <span>Estimated delivery: <span className="font-bold text-gray-900">{ORDER.estimatedDelivery}</span></span>
          </div>
        </motion.div>

        {/* Order items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-black text-gray-900">Items Ordered</h2>
            <span className="text-xs text-gray-400">{ORDER.items.reduce((s, i) => s + i.qty, 0)} items</span>
          </div>
          <div className="divide-y divide-gray-50">
            {ORDER.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="relative flex-shrink-0">
                  <img src={item.image} alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>
                </div>
                <p className="font-bold text-gray-900 text-sm flex-shrink-0">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-6 py-4 bg-gray-50 flex flex-col gap-2 text-sm border-t border-gray-100">
            {[
              { label: "Subtotal", value: ORDER.subtotal },
              { label: "Shipping", value: ORDER.shipping },
              { label: "Tax", value: ORDER.tax },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-gray-500">
                <span>{label}</span>
                <span className="font-semibold text-gray-700">{value}</span>
              </div>
            ))}
            <div className="flex justify-between font-black text-base text-gray-900 border-t border-gray-200 pt-2 mt-1">
              <span>Total</span>
              <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {ORDER.total}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Delivery & payment details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {[
            {
              title: "Shipping To",
              icon: <MapPin size={16} />,
              lines: [ORDER.address, ORDER.method],
            },
            {
              title: "Payment",
              icon: <Check size={16} />,
              lines: [`Visa ending in ${ORDER.paymentLast4}`, `Charged ${ORDER.total} on ${ORDER.date}`],
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-500">{card.icon}</span>
                <h3 className="font-black text-gray-900 text-sm">{card.title}</h3>
              </div>
              {card.lines.map((line, i) => (
                <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "text-gray-700 font-semibold" : "text-gray-400"}`}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Rating prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl p-6 text-center"
          style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.12)" }}
        >
          <p className="font-bold text-gray-900 mb-1">Loving PrintHub so far?</p>
          <p className="text-sm text-gray-400 mb-4">Leave us a quick rating — it helps other shoppers discover us.</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-200 hover:text-yellow-400 transition-colors"
              >
                <Star size={28} fill="currentColor" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/account"
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
          >
            <Package size={16} /> Track My Order
          </Link>
          <Link
            to="/shop"
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} /> Continue Shopping
          </Link>
          <button
            className="sm:w-12 py-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-700"
            title="Download receipt"
          >
            <Download size={16} />
          </button>
          <button
            className="sm:w-12 py-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-700"
            title="Share order"
          >
            <Share2 size={16} />
          </button>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="font-black text-gray-900 mb-4">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "3", image: "https://images.unsplash.com/photo-1646679639653-3f26c67dfbae?w=200&h=200&fit=crop&auto=format", title: "Throw Pillow", price: "$29.99" },
              { id: "5", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=200&h=200&fit=crop&auto=format", title: "Canvas Tote", price: "$18.99" },
              { id: "7", image: "https://images.unsplash.com/photo-1577655197620-704858b270ac?w=200&h=200&fit=crop&auto=format", title: "Sticker Pack", price: "$9.99" },
              { id: "6", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&h=200&fit=crop&auto=format", title: "Oversized Hoodie", price: "$49.99" },
            ].map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.07 }}
              >
                <Link to={`/product/${p.id}`} className="block group">
                  <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square mb-2">
                    <img src={p.image} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm truncate">{p.title}</p>
                  <p className="text-sm font-semibold" style={{ color: "#a855f7" }}>{p.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
