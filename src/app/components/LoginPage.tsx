import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Check } from "lucide-react";
import { useNavigate, Link } from "react-router";

type Mode = "login" | "register";

export function LoginPage({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const handleClose = onClose ?? (() => navigate(-1));
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12"
      style={{ background: "#0a0a0a" }}>

      {/* Background glow blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all text-xl z-10"
      >
        ×
      </button>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md rounded-3xl overflow-hidden z-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)" }} />

          <div className="p-8">
            {/* Logo */}
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                PrintHub
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-1.5">
                {mode === "login" ? "Welcome back" : "Join PrintHub"}
              </h1>
              <p className="text-white/40 text-sm">
                {mode === "login"
                  ? "Sign in to your account to continue."
                  : "Create your free account in seconds."}
              </p>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Google", bg: "#fff", color: "#374151", border: "rgba(255,255,255,0.15)" },
                { label: "Facebook", bg: "#1877F2", color: "#fff", border: "transparent" },
              ].map((p) => (
                <button
                  key={p.label}
                  className="py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                  style={{ background: p.bg, color: p.color, border: `1px solid ${p.border}` }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="text-white/20 text-xs tracking-widest uppercase">or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {mode === "register" && (
                <Field label="Full Name" icon={<User size={14} />} type="text"
                  placeholder="Alex Johnson" value={name} onChange={setName} />
              )}

              <Field label="Email address" icon={<Mail size={14} />} type="email"
                placeholder="you@example.com" value={email} onChange={setEmail} />

              <div>
                <Field
                  label="Password"
                  icon={<Lock size={14} />}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={setPassword}
                  suffix={
                    <button type="button" onClick={() => setShowPassword((p) => !p)}
                      className="text-white/25 hover:text-white/60 transition-colors flex-shrink-0">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                />
                {mode === "login" && (
                  <div className="flex justify-end mt-2">
                    <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              {mode === "register" && (
                <Field
                  label="Confirm Password"
                  icon={<Lock size={14} />}
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={setConfirm}
                  suffix={
                    <button type="button" onClick={() => setShowConfirm((p) => !p)}
                      className="text-white/25 hover:text-white/60 transition-colors flex-shrink-0">
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                />
              )}

              {/* Password strength hint on register */}
              {mode === "register" && password.length > 0 && (
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((lvl) => {
                    const strength = Math.min(4, Math.floor(password.length / 3));
                    const colors = ["#ef4444", "#f59e0b", "#10b981", "#a855f7"];
                    return (
                      <div key={lvl} className="flex-1 h-1 rounded-full transition-all"
                        style={{ background: lvl <= strength ? colors[strength - 1] : "rgba(255,255,255,0.1)" }} />
                    );
                  })}
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  boxShadow: "0 0 40px rgba(168,85,247,0.35)",
                }}
              >
                {mode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight size={16} />
              </motion.button>
            </form>

            {/* Perks on register */}
            {mode === "register" && (
              <div className="mt-5 flex flex-col gap-2">
                {["Free account, no credit card required", "Track orders and save designs", "Exclusive member discounts"].map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(168,85,247,0.2)" }}>
                      <Check size={9} color="#a855f7" strokeWidth={3} />
                    </div>
                    <span className="text-xs text-white/35">{perk}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Toggle */}
            <p className="text-center text-white/30 text-sm mt-7">
              {mode === "login" ? "New to PrintHub?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-purple-400 hover:text-purple-300 font-bold transition-colors"
              >
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>

            {mode === "register" && (
              <p className="text-center text-white/20 text-xs mt-3 leading-relaxed">
                By signing up you agree to our{" "}
                <Link to="/terms" className="underline hover:text-white/40 transition-colors">Terms</Link>
                {" "}and{" "}
                <Link to="/privacy" className="underline hover:text-white/40 transition-colors">Privacy Policy</Link>.
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Field({
  label, icon, type, placeholder, value, onChange, suffix,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/40 tracking-wide uppercase">{label}</label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all focus-within:border-purple-500/50"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="text-white/25 flex-shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/15 min-w-0"
        />
        {suffix}
      </div>
    </div>
  );
}
