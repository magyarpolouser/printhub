import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4" style={{ background: "#0d0d0d" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-8xl font-black mb-4" style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          404
        </p>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-white/40 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}>
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
