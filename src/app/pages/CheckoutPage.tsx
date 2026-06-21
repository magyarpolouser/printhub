import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight, Lock, CreditCard, Truck, Check,
  MapPin, User, Mail, Phone, ChevronDown, ShoppingBag
} from "lucide-react";
import { useCart } from "../Root";

type Step = "information" | "shipping" | "payment" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Shipping", desc: "5–7 business days", price: 5.99, free_over: 50 },
  { id: "express", label: "Express Shipping", desc: "2–3 business days", price: 12.99 },
  { id: "overnight", label: "Overnight Delivery", desc: "Next business day", price: 24.99 },
];

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  saveInfo: boolean;
  shippingOption: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingMatch: boolean;
}

const INITIAL: FormData = {
  email: "", firstName: "", lastName: "", phone: "",
  address: "", apt: "", city: "", state: "", zip: "", country: "United States",
  saveInfo: true, shippingOption: "standard",
  cardName: "", cardNumber: "", expiry: "", cvv: "", billingMatch: true,
};

function StepIndicator({ current }: { current: Step }) {
  const order: Step[] = ["information", "shipping", "payment"];
  const currentIdx = order.indexOf(current);
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all"
                style={
                  done
                    ? { background: "#10B981", color: "#fff" }
                    : active
                    ? { background: "linear-gradient(135deg,#a855f7,#ec4899)", color: "#fff" }
                    : { background: "#f3f4f6", color: "#9ca3af" }
                }
              >
                {done ? <Check size={12} strokeWidth={3} /> : i + 1}
              </div>
              <span className="text-sm font-semibold hidden sm:block"
                style={{ color: active ? "#a855f7" : done ? "#374151" : "#9ca3af" }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px min-w-[24px]" style={{ background: done ? "#10B981" : "#e5e7eb" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder = "", half = false, icon
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; half?: boolean; icon?: React.ReactNode;
}) {
  return (
    <div className={half ? "flex-1 min-w-[140px]" : "w-full"}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 transition-colors"
          style={{ paddingLeft: icon ? "2.5rem" : "1rem", paddingRight: "1rem" }}
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 bg-white transition-colors pr-10"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function CheckoutPage() {
  const { items, total, removeItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("information");
  const [form, setForm] = useState<FormData>(INITIAL);
  const [orderNum] = useState(() => `PH-${Math.floor(10000 + Math.random() * 90000)}`);
  const [showSummary, setShowSummary] = useState(false);

  const set = (k: keyof FormData) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === form.shippingOption)!;
  const shippingCost = selectedShipping.free_over && total >= selectedShipping.free_over ? 0 : selectedShipping.price;
  const tax = total * 0.08;
  const grandTotal = total + shippingCost + tax;

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={40} className="text-gray-300 mb-4" />
        <p className="text-xl font-black text-gray-900 mb-2">Your cart is empty</p>
        <Link to="/shop" className="text-purple-500 hover:underline text-sm">Back to Shop</Link>
      </div>
    );
  }

  const OrderSummary = () => (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="font-black text-gray-900 mb-4">Order Summary</h3>
      <div className="flex flex-col gap-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover bg-gray-200" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center font-bold">{item.quantity}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
            </div>
            <p className="text-sm font-bold text-gray-900">${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="flex gap-2 mb-4">
        <input placeholder="Coupon code" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-400" />
        <button className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>Apply</button>
      </div>

      <div className="flex flex-col gap-2 text-sm border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-900 font-semibold">${total.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={shippingCost === 0 ? "text-green-600 font-semibold" : "text-gray-900 font-semibold"}>
            {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-500"><span>Tax (8%)</span><span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-black text-base text-gray-900 border-t border-gray-200 pt-3 mt-1">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl p-10 text-center shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}
          >
            <Check size={36} color="white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-400 mb-1">Thank you, {form.firstName}!</p>
          <p className="text-gray-500 text-sm mb-6">
            A confirmation email was sent to <span className="font-semibold text-gray-700">{form.email}</span>
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Order number</span>
              <span className="font-black text-gray-900">#{orderNum}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Estimated delivery</span>
              <span className="font-semibold text-gray-900">{selectedShipping.desc}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total paid</span>
              <span className="font-black" style={{ color: "#a855f7" }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/account" className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
              Track My Order
            </Link>
            <Link to="/shop" className="w-full py-3 rounded-xl font-bold text-sm text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            PrintHub
          </Link>
          <div className="flex-1 max-w-xs mx-6">
            <StepIndicator current={step} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={12} />
            <span>Secure checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-3">
            {/* Mobile summary toggle */}
            <button
              onClick={() => setShowSummary((s) => !s)}
              className="lg:hidden w-full flex items-center justify-between bg-white rounded-2xl px-4 py-3 mb-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                <ShoppingBag size={16} />
                {showSummary ? "Hide" : "Show"} order summary
              </div>
              <span className="font-black text-gray-900">${grandTotal.toFixed(2)}</span>
            </button>
            {showSummary && <div className="lg:hidden mb-4"><OrderSummary /></div>}

            <AnimatePresence mode="wait">
              {/* ── INFORMATION ── */}
              {step === "information" && (
                <motion.div key="information" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-6">Contact Information</h2>
                  <div className="flex flex-col gap-4">
                    <Field label="Email" value={form.email} onChange={set("email")} type="email" placeholder="you@example.com" icon={<Mail size={14} />} />
                    <div className="flex gap-3 flex-wrap">
                      <Field label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="Alex" half icon={<User size={14} />} />
                      <Field label="Last Name" value={form.lastName} onChange={set("lastName")} placeholder="Johnson" half />
                    </div>
                    <Field label="Phone" value={form.phone} onChange={set("phone")} type="tel" placeholder="+1 (555) 000-0000" icon={<Phone size={14} />} />

                    <h3 className="font-black text-gray-900 mt-2">Shipping Address</h3>
                    <SelectField label="Country" value={form.country} onChange={set("country")} options={["United States", "Canada", "United Kingdom", "Australia", "Germany", "France"]} />
                    <Field label="Address" value={form.address} onChange={set("address")} placeholder="123 Main St" icon={<MapPin size={14} />} />
                    <Field label="Apartment, suite, etc. (optional)" value={form.apt} onChange={set("apt")} placeholder="Apt 4B" />
                    <div className="flex gap-3 flex-wrap">
                      <Field label="City" value={form.city} onChange={set("city")} placeholder="Los Angeles" half />
                      <Field label="State" value={form.state} onChange={set("state")} placeholder="CA" half />
                      <Field label="ZIP Code" value={form.zip} onChange={set("zip")} placeholder="90001" half />
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() => set("saveInfo")(!form.saveInfo)}
                        className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
                        style={{ borderColor: form.saveInfo ? "#a855f7" : "#d1d5db", background: form.saveInfo ? "#a855f7" : "white" }}
                      >
                        {form.saveInfo && <Check size={11} color="white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm text-gray-600">Save this information for next time</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                    <Link to="/cart" className="text-sm text-purple-500 hover:text-purple-700 font-semibold flex items-center gap-1 transition-colors">
                      ← Return to cart
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStep("shipping")}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
                    >
                      Continue to Shipping <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── SHIPPING ── */}
              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-2">Shipping Method</h2>
                  <p className="text-sm text-gray-400 mb-6">Delivering to {form.address || "your address"}, {form.city || "—"}</p>

                  <div className="flex flex-col gap-3 mb-6">
                    {SHIPPING_OPTIONS.map((opt) => {
                      const isFree = opt.free_over && total >= opt.free_over;
                      const selected = form.shippingOption === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => set("shippingOption")(opt.id)}
                          className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
                          style={{ borderColor: selected ? "#a855f7" : "#e5e7eb", background: selected ? "rgba(168,85,247,0.04)" : "white" }}
                        >
                          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: selected ? "#a855f7" : "#d1d5db" }}>
                            {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#a855f7" }} />}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                          </div>
                          <div className="text-right">
                            {isFree
                              ? <span className="text-sm font-black text-green-600">Free</span>
                              : <span className="text-sm font-bold text-gray-900">${opt.price.toFixed(2)}</span>
                            }
                            {isFree && <p className="text-xs text-gray-400 line-through">${opt.price.toFixed(2)}</p>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {total < 50 && (
                    <p className="text-xs text-purple-500 mb-4 bg-purple-50 px-4 py-2.5 rounded-xl">
                      Add ${(50 - total).toFixed(2)} more to qualify for free standard shipping!
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <button onClick={() => setStep("information")} className="text-sm text-purple-500 hover:text-purple-700 font-semibold flex items-center gap-1 transition-colors">
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStep("payment")}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
                    >
                      Continue to Payment <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── PAYMENT ── */}
              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-6">Payment</h2>

                  {/* Card type icons */}
                  <div className="flex gap-2 mb-5">
                    {[
                      { label: "VISA", bg: "#1A1F71", color: "#fff" },
                      { label: "MC", bg: "#EB001B", color: "#fff" },
                      { label: "AMEX", bg: "#007BC1", color: "#fff" },
                      { label: "PP", bg: "#003087", color: "#fff" },
                    ].map((card) => (
                      <div key={card.label} className="px-2.5 py-1 rounded text-xs font-black" style={{ background: card.bg, color: card.color }}>
                        {card.label}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <Field label="Name on Card" value={form.cardName} onChange={set("cardName")} placeholder="Alex Johnson" icon={<User size={14} />} />

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Card Number</label>
                      <div className="relative">
                        <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={form.cardNumber}
                          onChange={(e) => set("cardNumber")(formatCard(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 font-mono tracking-wider"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expiry</label>
                        <input
                          value={form.expiry}
                          onChange={(e) => set("expiry")(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 font-mono"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">CVV</label>
                        <div className="relative">
                          <input
                            value={form.cvv}
                            onChange={(e) => set("cvv")(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="•••"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() => set("billingMatch")(!form.billingMatch)}
                        className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
                        style={{ borderColor: form.billingMatch ? "#a855f7" : "#d1d5db", background: form.billingMatch ? "#a855f7" : "white" }}
                      >
                        {form.billingMatch && <Check size={11} color="white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm text-gray-600">Billing address matches shipping address</span>
                    </label>
                  </div>

                  {/* Security note */}
                  <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
                    <Lock size={12} />
                    <span>Your payment info is encrypted and never stored on our servers.</span>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                    <button onClick={() => setStep("shipping")} className="text-sm text-purple-500 hover:text-purple-700 font-semibold transition-colors">
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStep("confirmation")}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
                    >
                      <Lock size={14} /> Pay ${grandTotal.toFixed(2)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-xs text-gray-400">
              {[
                { icon: <Lock size={12} />, label: "SSL Encrypted" },
                { icon: <Truck size={12} />, label: "Fast Shipping" },
                { icon: <Check size={12} />, label: "30-Day Returns" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5">
                  <span className="text-gray-400">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
