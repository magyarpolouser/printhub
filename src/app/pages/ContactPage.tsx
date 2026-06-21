import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, Phone, MapPin, Clock, Send, Check,
  MessageCircle, ChevronDown, Instagram, Twitter, Facebook
} from "lucide-react";

const FAQS = [
  { q: "How long does printing and shipping take?", a: "Most orders are printed within 2–3 business days. Standard shipping adds 5–7 days; express options are available at checkout." },
  { q: "Can I return or exchange a custom-printed item?", a: "We accept returns on defective or misprinted items within 30 days. Because each product is made to order, we cannot accept returns for size or preference reasons." },
  { q: "Do you offer bulk or wholesale pricing?", a: "Yes! Orders of 20+ units qualify for volume discounts. Reach out via the form and select 'Bulk Order' as the subject." },
  { q: "How do I upload my own design?", a: "Head to the Shop page, choose a product, and use the 'Custom Design' option to upload a PNG or SVG file at 300 DPI or higher." },
  { q: "Which file formats do you accept for custom designs?", a: "We accept PNG, JPG, SVG, and PDF. For best print quality, use PNG or SVG at 300 DPI and at least 2000 × 2000 px." },
];

const SUBJECTS = ["General Inquiry", "Order Support", "Bulk Order", "Artist Partnership", "Press & Media", "Other"];

const CONTACT_CARDS = [
  {
    icon: <Mail size={22} />,
    label: "Email Us",
    value: "hello@printhub.com",
    sub: "We reply within 24 hours",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
  },
  {
    icon: <Phone size={22} />,
    label: "Call Us",
    value: "+1 (800) 746-8482",
    sub: "Mon–Fri, 9 AM – 6 PM PT",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
  },
  {
    icon: <MessageCircle size={22} />,
    label: "Live Chat",
    value: "Start a conversation",
    sub: "Available during business hours",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
  {
    icon: <MapPin size={22} />,
    label: "Our Studio",
    value: "2340 Melrose Ave, LA",
    sub: "California 90046, USA",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
];

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-gray-900 text-sm">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 text-gray-400">
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-black overflow-hidden py-24 px-4">
        <div className="absolute inset-0 opacity-25"
          style={{ background: "radial-gradient(ellipse at 20% 60%, #a855f7 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, #3b82f6 0%, transparent 55%)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              We'd love to{" "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                hear from you
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Questions, feedback, bulk orders, or just want to say hi — we're here for all of it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex flex-col gap-3"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{card.label}</p>
                <p className="font-bold text-gray-900 text-sm leading-snug">{card.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Contact form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-2">Send us a message</h2>
            <p className="text-gray-400 text-sm mb-8">Fill out the form and we'll get back to you within one business day.</p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 px-8 rounded-2xl"
                  style={{ background: "rgba(168,85,247,0.04)", border: "2px solid rgba(168,85,247,0.15)" }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
                    <Check size={28} color="white" strokeWidth={3} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-400 text-sm mb-6">Thanks for reaching out. We'll reply to <span className="font-semibold text-gray-700">{form.email}</span> within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" }); }}
                    className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { label: "Your Name", key: "name" as const, placeholder: "Alex Johnson", type: "text" },
                      { label: "Email Address", key: "email" as const, placeholder: "you@example.com", type: "email" },
                    ].map((f) => (
                      <div key={f.key} className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.key]}
                          onChange={(e) => set(f.key)(e.target.value)}
                          placeholder={f.placeholder}
                          required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                    <div className="relative">
                      <select
                        value={form.subject}
                        onChange={(e) => set("subject")(e.target.value)}
                        className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 bg-white transition-colors pr-10"
                      >
                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    />
                    <p className="text-right text-xs text-gray-300 mt-1">{form.message.length} / 1000</p>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={sending}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white transition-opacity disabled:opacity-70"
                    style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.25)" }}
                  >
                    {sending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right sidebar ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Hours */}
            <div className="rounded-2xl p-6" style={{ background: "#0d0d0d" }}>
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} color="#a855f7" />
                <h3 className="font-black text-white">Business Hours</h3>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM PT" },
                  { day: "Saturday", hours: "10:00 AM – 4:00 PM PT" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-white/50">{day}</span>
                    <span className={hours === "Closed" ? "text-red-400 font-semibold" : "text-white font-semibold"}>{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs text-white/30">Response time: typically under 4 hours during business hours.</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-black text-gray-900 mb-4">Follow Us</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Instagram size={18} />, label: "@printhub", platform: "Instagram", color: "#E1306C" },
                  { icon: <Twitter size={18} />, label: "@printhub", platform: "X / Twitter", color: "#1DA1F2" },
                  { icon: <Facebook size={18} />, label: "PrintHub Official", platform: "Facebook", color: "#1877F2" },
                ].map((s) => (
                  <a
                    key={s.platform}
                    href="#"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.color + "15", color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.platform}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 relative bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop&auto=format"
                alt="Los Angeles cityscape"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
                  <MapPin size={18} color="white" />
                </div>
                <p className="text-white font-bold text-sm">2340 Melrose Ave</p>
                <p className="text-white/70 text-xs">Los Angeles, CA 90046</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">Can't find the answer you're looking for? Send us a message above.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 px-6 divide-y divide-gray-100 shadow-sm">
            {FAQS.map((faq) => <Accordion key={faq.q} {...faq} />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
