import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Star, ShoppingCart, Heart, Share2, ChevronLeft,
  ChevronRight, Shield, Truck, RotateCcw, Check, Plus, Minus
} from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";
import { useCart } from "../Root";

const REVIEWS = [
  { name: "Jordan M.", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop&auto=format", rating: 5, date: "Jun 12, 2026", text: "Absolutely love it. Quality is exactly as described and shipping was super fast. Will definitely order again." },
  { name: "Sophie L.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&auto=format", rating: 5, date: "May 29, 2026", text: "The print is crisp and vivid. Fits true to size. I get compliments every time I wear it." },
  { name: "Chris B.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format", rating: 4, date: "May 14, 2026", text: "Really solid product. The design looks even better in person than in the photo." },
];

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = ALL_PRODUCTS.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-2xl font-black text-gray-900 mb-2">Product not found</p>
        <Link to="/shop" className="text-purple-500 hover:underline text-sm">Back to Shop</Link>
      </div>
    );
  }

  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const numericPrice = parseFloat(product.price.replace("$", ""));

  const handleAddToCart = () => {
    addItem({ id: product.id, title: product.title, price: product.price, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const prevImage = () => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % product.images.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="hover:text-gray-700 transition-colors cursor-pointer" onClick={() => navigate("/shop")}>{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* ── Image gallery ── */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                  style={{ borderColor: activeImage === i ? "#a855f7" : "transparent" }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white"
                  style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
                  {product.badge}
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {product.images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ background: activeImage === i ? "#a855f7" : "rgba(255,255,255,0.6)", width: activeImage === i ? 20 : 6 }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Product info ── */}
          <div className="flex flex-col">
            {/* Category + share */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-purple-500">{product.category}</span>
              <button className="text-gray-400 hover:text-gray-700 transition-colors"><Share2 size={18} /></button>
            </div>

            <h1 className="text-3xl font-black text-gray-900 mb-3">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? "#FBBF24" : "none"} stroke={i < Math.round(product.rating) ? "#FBBF24" : "#D1D5DB"} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {Math.round((1 - numericPrice / parseFloat(product.originalPrice.replace("$", ""))) * 100)}%
                </span>
              )}
            </div>

            {/* Color picker */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Color: <span className="font-normal text-gray-500">{product.colorNames[selectedColor]}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={product.colorNames[i]}
                    className="w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: color,
                      borderColor: selectedColor === i ? "#a855f7" : "transparent",
                      boxShadow: selectedColor === i ? "0 0 0 2px white, 0 0 0 4px #a855f7" : "0 0 0 1px rgba(0,0,0,0.15)",
                    }}
                  >
                    {selectedColor === i && <Check size={12} color={color === "#FFFFFF" || color === "#F5F5DC" ? "#000" : "#fff"} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size picker */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">Size: <span className="font-normal text-gray-500">{selectedSize ?? "Select a size"}</span></p>
                  <button className="text-xs text-purple-500 hover:underline">Size guide</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
                      style={
                        selectedSize === size
                          ? { background: "#a855f7", color: "#fff", borderColor: "#a855f7" }
                          : { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-3 hover:bg-gray-50 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 font-bold text-sm min-w-[2.5rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-3 hover:bg-gray-50 transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                style={{ background: added ? "#10B981" : "linear-gradient(90deg,#a855f7,#ec4899)" }}
              >
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </motion.button>

              <button
                onClick={() => setWishlisted((w) => !w)}
                className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center transition-all hover:border-pink-300"
              >
                <Heart size={18} fill={wishlisted ? "#EC4899" : "none"} stroke={wishlisted ? "#EC4899" : "#9CA3AF"} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: <Truck size={16} />, label: "Free shipping over $50" },
                { icon: <Shield size={16} />, label: "Secure checkout" },
                { icon: <RotateCcw size={16} />, label: "30-day returns" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center">
                  <span className="text-purple-500">{b.icon}</span>
                  <span className="text-xs text-gray-500 leading-tight">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Artist */}
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.1)" }}>
              <img src={product.artistAvatar} alt={product.artist} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
              <div>
                <p className="text-xs text-gray-400">Design by</p>
                <p className="text-sm font-bold text-gray-900">{product.artist}</p>
              </div>
              <Link to="/artist-portal" className="ml-auto text-xs font-semibold text-purple-500 hover:text-purple-700 transition-colors">View artist →</Link>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Features / Reviews ── */}
        <div className="mb-20">
          <div className="flex border-b border-gray-100 mb-8 gap-8">
            {(["description", "features", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-3 text-sm font-bold capitalize transition-colors"
                style={{
                  color: activeTab === tab ? "#a855f7" : "#9CA3AF",
                  borderBottom: activeTab === tab ? "2px solid #a855f7" : "2px solid transparent",
                }}
              >
                {tab}{tab === "reviews" ? ` (${product.reviewCount})` : ""}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === "description" && (
                <p className="text-gray-600 leading-relaxed max-w-2xl">{product.description}</p>
              )}
              {activeTab === "features" && (
                <ul className="flex flex-col gap-3 max-w-lg">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.1)" }}>
                        <Check size={11} color="#a855f7" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "reviews" && (
                <div className="flex flex-col gap-6 max-w-2xl">
                  {/* Rating summary */}
                  <div className="flex items-center gap-6 p-5 rounded-2xl bg-gray-50">
                    <div className="text-center">
                      <p className="text-5xl font-black text-gray-900">{product.rating}</p>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#FBBF24" stroke="none" />)}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{product.reviewCount} reviews</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 6 : star === 2 ? 1 : 1;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-3">{star}</span>
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#a855f7,#ec4899)" }} />
                            </div>
                            <span className="w-7 text-right">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review cards */}
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover bg-gray-200" />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="#FBBF24" stroke="none" />)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/product/${p.id}`} className="block group">
                    <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square mb-3 relative">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {p.badge && (
                        <span className="absolute top-3 left-3 text-xs font-black text-white px-2 py-1 rounded-full" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 text-sm truncate">{p.title}</p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: "#a855f7" }}>{p.price}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
