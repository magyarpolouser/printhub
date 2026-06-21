import React, { useState } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { ALL_PRODUCTS } from "../data/products";

const CATEGORIES = ["All", "T-Shirts", "Mugs", "Pillows", "Accessories", "Stickers"];
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSort, setShowSort] = useState(false);

  const filtered = ALL_PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    if (sortBy === "Price: High to Low") return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-2"
          >
            Shop All <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Products</span>
          </motion.h1>
          <p className="text-white/40">{filtered.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat
                    ? { background: "linear-gradient(90deg,#a855f7,#ec4899)", color: "#fff" }
                    : { background: "#f3f4f6", color: "#374151" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <SlidersHorizontal size={14} />
              {sortBy}
              <ChevronDown size={14} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10 min-w-[180px]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: sortBy === opt ? "#a855f7" : "#374151", fontWeight: sortBy === opt ? 700 : 400 }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sorted.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20 text-gray-400">No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
