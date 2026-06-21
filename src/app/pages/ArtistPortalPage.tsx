import React, { useState } from "react";
import { motion } from "motion/react";
import { Upload, DollarSign, TrendingUp, Users, Palette, CheckCircle, ArrowRight, Star } from "lucide-react";

type Step = "overview" | "apply";

const PERKS = [
  { icon: <DollarSign size={22} />, title: "Earn up to 20%", desc: "Commission on every sale of your designs across all product types." },
  { icon: <TrendingUp size={22} />, title: "Real-time analytics", desc: "Track impressions, conversions, and earnings in your artist dashboard." },
  { icon: <Users size={22} />, title: "50,000+ customers", desc: "Instant access to our growing community of print-product shoppers." },
  { icon: <Palette size={22} />, title: "6 product types", desc: "Your art on T-shirts, mugs, pillows, phone cases, tote bags, and stickers." },
];

const TESTIMONIALS = [
  { name: "Maria G.", handle: "@mariag_art", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format", text: "I made my first sale within 48 hours of uploading. PrintHub's reach is incredible.", earning: "$2,340 / mo" },
  { name: "James K.", handle: "@jkillustrates", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format", text: "The analytics dashboard helps me understand exactly which designs resonate.", earning: "$1,180 / mo" },
  { name: "Priya S.", handle: "@priyavisuals", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format", text: "Passive income from my art library while I focus on creating new work.", earning: "$890 / mo" },
];

export function ArtistPortalPage() {
  const [step, setStep] = useState<Step>("overview");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-black overflow-hidden py-24 px-4">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 30% 50%, #a855f7 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #ec4899 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
              Artist Portal
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Turn your art into{" "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                passive income
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
              Upload your designs once. Earn commissions every time they sell — on any of our 6 premium product types.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => setStep("apply")}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", boxShadow: "0 0 40px rgba(168,85,247,0.3)" }}
              >
                Apply Now <ArrowRight size={16} />
              </motion.button>
              <button
                onClick={() => setStep("overview")}
                className="px-8 py-3.5 rounded-xl font-bold text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {step === "overview" && (
        <>
          {/* Perks */}
          <div className="max-w-5xl mx-auto px-4 py-20">
            <h2 className="text-3xl font-black text-gray-900 text-center mb-12">Why sell on PrintHub?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 border border-gray-100 hover:border-purple-200 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-purple-500"
                    style={{ background: "rgba(168,85,247,0.08)" }}>
                    {perk.icon}
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">{perk.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-gray-900 text-center mb-12">Artists love PrintHub</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#FBBF24" stroke="none" />)}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover bg-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.handle}</p>
                      </div>
                      <span className="ml-auto text-xs font-black text-green-600">{t.earning}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="py-20 px-4 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start earning?</h2>
            <p className="text-gray-400 mb-8">Applications take less than 5 minutes. We review within 48 hours.</p>
            <motion.button
              onClick={() => setStep("apply")}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-xl font-black text-base text-white"
              style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
            >
              Apply to Become an Artist
            </motion.button>
          </div>
        </>
      )}

      {step === "apply" && (
        <div className="max-w-xl mx-auto px-4 py-20">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
                <CheckCircle size={36} color="white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-400 mb-6">We'll review your portfolio and get back to you within 48 hours.</p>
              <button onClick={() => { setStep("overview"); setSubmitted(false); }}
                className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors">
                ← Back to Artist Portal
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setStep("overview")} className="text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors">
                ← Back
              </button>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Artist Application</h2>
              <p className="text-gray-400 text-sm mb-8">Tell us about yourself and your work.</p>

              <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                {[
                  { label: "Full Name", placeholder: "Your name", type: "text" },
                  { label: "Email", placeholder: "you@example.com", type: "email" },
                  { label: "Portfolio URL", placeholder: "https://your-portfolio.com", type: "url" },
                  { label: "Instagram / Social Handle", placeholder: "@yourhandle", type: "text" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tell us about your art style</label>
                  <textarea
                    placeholder="Describe your style, influences, and what kind of designs you'd create..."
                    rows={4}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-400 resize-none"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-400">Upload sample artwork <span className="text-purple-500 font-semibold">or browse</span></p>
                  <p className="text-xs text-gray-300 mt-1">PNG, JPG, SVG up to 10MB</p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="py-4 rounded-xl font-black text-white flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}
                >
                  Submit Application <ArrowRight size={16} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
