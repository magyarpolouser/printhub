import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, X, SlidersHorizontal, ChevronDown, Star,
  ShoppingCart, Heart, ArrowUpDown, Sparkles,
} from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";
import { useCart } from "../Root";

const CATEGORIES = ["All", "T-Shirts", "Mugs", "Pillows", "Accessories", "Stickers"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $15", min: 0, max: 15 },
  { label: "$15 – $25", min: 15, max: 25 },
  { label: "$25 – $40", min: 25, max: 40 },
  { label: "Over $40", min: 40, max: Infinity },
];

const SUGGESTIONS = ["T-Shirt", "Mug", "Pillow", "Tote Bag", "Sticker", "Hoodie", "Phone Case", "Poster"];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="bg-purple-100 text-purple-700 rounded px-0.5 not-italic">{part}</mark>
          : part
      )}
    </>
  );
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [committed, setCommitted] = useState(initialQ);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [focused, setFocused] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (q: string) => {
    setCommitted(q.trim());
    setSearchParams(q.trim() ? { q: q.trim() } : {});
    setFocused(false);
  };

  const results = useMemo(() => {
    let items = [...ALL_PRODUCTS];

    if (committed) {
      const q = committed.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.colorNames.some((c) => c.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category !== "All") items = items.filter((p) => p.category === category);

    const range = PRICE_RANGES[priceRange];
    items = items.filter((p) => {
      const price = parseFloat(p.price.replace("$", ""));
      return price >= range.min && price <= range.max;
    });

    if (sort === "price-asc") items.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    else if (sort === "price-desc") items.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
    else if (sort === "rating") items.sort((a, b) => b.rating - a.rating);

    return items;
  }, [committed, category, priceRange, sort]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const hasFilters = category !== "All" || priceRange !== 0;
  const clearAll = () => { setCategory("All"); setPriceRange(0); setSort("relevance"); };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search hero */}
      <div className="bg-black px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/30 text-xs font-bold tracking-widest uppercase text-center mb-4"
          >
            Search PrintHub
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: focused ? "1.5px solid rgba(168,85,247,0.7)" : "1.5px solid rgba(255,255,255,0.1)",
                boxShadow: focused ? "0 0 0 4px rgba(168,85,247,0.15)" : "none",
              }}
            >
              <Search size={18} className="text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(query); }}
                placeholder="Search products, categories, colors…"
                className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-white/25"
              />
              {query && (
                <button onClick={() => { setQuery(""); submit(""); }} className="text-white/30 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {focused && query.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 shadow-2xl"
                  style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {ALL_PRODUCTS
                    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 5)
                    .map((p) => (
                      <button
                        key={p.id}
                        onMouseDown={() => { setQuery(p.title); submit(p.title); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      >
                        <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-gray-800 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate">{highlight(p.title, query)}</p>
                          <p className="text-xs text-white/30">{p.category}</p>
                        </div>
                        <span className="text-xs font-bold text-purple-400">{p.price}</span>
                      </button>
                    ))}
                  {ALL_PRODUCTS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-sm text-white/30">No suggestions found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Suggestion pills */}
          {!committed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mt-4 justify-center"
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); submit(s); }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/50 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Results header + controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            {committed ? (
              <p className="text-gray-900 font-bold">
                {results.length > 0
                  ? <>{results.length} result{results.length !== 1 ? "s" : ""} for <span style={{ color: "#a855f7" }}>"{committed}"</span></>
                  : <>No results for <span style={{ color: "#a855f7" }}>"{committed}"</span></>
                }
              </p>
            ) : (
              <p className="text-gray-500 text-sm">Browse all products or start searching above.</p>
            )}
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-purple-500 hover:text-purple-700 mt-1 transition-colors">
                Clear all filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors md:hidden"
              style={{
                borderColor: hasFilters ? "#a855f7" : "#e5e7eb",
                color: hasFilters ? "#a855f7" : "#374151",
                background: hasFilters ? "rgba(168,85,247,0.06)" : "#fff",
              }}
            >
              <SlidersHorizontal size={14} />
              Filters {hasFilters && `(${(category !== "All" ? 1 : 0) + (priceRange !== 0 ? 1 : 0)})`}
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 bg-white hover:border-gray-400 transition-colors"
              >
                <ArrowUpDown size={14} />
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <ChevronDown size={13} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[180px]"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); setShowSort(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                        style={{ color: sort === o.value ? "#a855f7" : "#374151", fontWeight: sort === o.value ? 700 : 400 }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex gap-8">

          {/* Sidebar filters — desktop */}
          <aside className="hidden md:flex flex-col gap-6 w-52 flex-shrink-0">
            {/* Category */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left"
                    style={
                      category === cat
                        ? { background: "rgba(168,85,247,0.1)", color: "#a855f7" }
                        : { color: "#6b7280" }
                    }
                  >
                    <span>{cat}</span>
                    <span className="text-xs opacity-50">
                      {cat === "All" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Price</p>
              <div className="flex flex-col gap-1">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(i)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left"
                    style={priceRange === i ? { background: "rgba(168,85,247,0.1)", color: "#a855f7" } : { color: "#6b7280" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: priceRange === i ? "#a855f7" : "#d1d5db" }}>
                      {priceRange === i && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating filter */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Min Rating</p>
              <div className="flex gap-1">
                {[4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSort("rating")}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all"
                    style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                  >
                    <Star size={10} fill="#fbbf24" stroke="none" />
                    {r}+
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full overflow-hidden mb-4"
              >
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-wrap gap-6">
                  <div className="flex-1 min-w-[140px]">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button key={cat} onClick={() => setCategory(cat)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                          style={category === cat
                            ? { background: "linear-gradient(90deg,#a855f7,#ec4899)", color: "#fff" }
                            : { background: "#f3f4f6", color: "#374151" }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((range, i) => (
                        <button key={range.label} onClick={() => setPriceRange(i)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                          style={priceRange === i
                            ? { background: "linear-gradient(90deg,#a855f7,#ec4899)", color: "#fff" }
                            : { background: "#f3f4f6", color: "#374151" }}>
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results grid */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {results.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24"
                >
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.08)" }}>
                    <Search size={28} className="text-purple-300" />
                  </div>
                  <p className="font-black text-gray-900 text-xl mb-2">No results found</p>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                    Try different keywords, or browse by category using the filters.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.slice(0, 4).map((s) => (
                      <button key={s} onClick={() => { setQuery(s); submit(s); }}
                        className="px-4 py-2 rounded-full text-sm font-bold text-purple-600 transition-all"
                        style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <Link to={`/product/${product.id}`} className="block relative">
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Badge */}
                        {product.badge && (
                          <span className="absolute top-3 left-3 text-xs font-black text-white px-2.5 py-1 rounded-full"
                            style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist */}
                        <button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow transition-all hover:scale-110"
                        >
                          <Heart size={14}
                            fill={wishlist.has(product.id) ? "#ec4899" : "none"}
                            stroke={wishlist.has(product.id) ? "#ec4899" : "#9ca3af"}
                          />
                        </button>
                      </Link>

                      <div className="p-4">
                        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                        <Link to={`/product/${product.id}`}>
                          <p className="font-bold text-gray-900 text-sm leading-snug mb-1 hover:text-purple-600 transition-colors">
                            {highlight(product.title, committed)}
                          </p>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} size={10}
                                fill={j < Math.round(product.rating) ? "#fbbf24" : "none"}
                                stroke={j < Math.round(product.rating) ? "#fbbf24" : "#d1d5db"} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">({product.reviewCount})</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-black text-base"
                              style={{ color: "#a855f7" }}>{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                          <button
                            onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image: product.image })}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95"
                            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}
                          >
                            <ShoppingCart size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state when no query at all */}
            {!committed && results.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-purple-400" />
                  <p className="font-black text-gray-900 text-sm">All Products</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
