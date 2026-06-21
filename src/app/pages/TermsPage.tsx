import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ChevronRight, ArrowUp, FileText, Shield, CreditCard, Truck, AlertTriangle, Scale, RefreshCw, Mail } from "lucide-react";

const SECTIONS = [
  {
    id: "acceptance",
    icon: <FileText size={18} />,
    title: "Acceptance of Terms",
    updated: "June 1, 2026",
    content: [
      'By accessing or using the PrintHub website, mobile application, or any related services (collectively, the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, do not use the Service.',
      "These Terms apply to all visitors, users, customers, artists, and others who access or use the Service. Your continued use of the Service after any changes to these Terms constitutes your acceptance of the revised Terms.",
      'If you are using the Service on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms, in which case "you" refers to that entity.',
    ],
  },
  {
    id: "accounts",
    icon: <Shield size={18} />,
    title: "User Accounts",
    updated: "June 1, 2026",
    content: [
      "To access certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary to keep it accurate, current, and complete.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account at security@printhub.com.",
      "PrintHub reserves the right to suspend or terminate accounts that contain false information, are used in violation of these Terms, or that have been inactive for more than 24 consecutive months. We will provide reasonable notice before terminating an inactive account.",
      "You may not transfer or sell your account to any third party. Each account is for a single user only. Shared or commercial accounts require a separate business plan — contact us for details.",
    ],
  },
  {
    id: "orders",
    icon: <CreditCard size={18} />,
    title: "Orders & Payments",
    updated: "June 1, 2026",
    content: [
      "All orders placed through PrintHub are subject to acceptance and availability. We reserve the right to refuse or cancel any order at any time for reasons including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity.",
      "Prices are listed in US dollars and are subject to change without notice. Applicable taxes are calculated at checkout based on the shipping destination and are the sole responsibility of the customer.",
      "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. Payment is charged at the time of order placement. All transactions are secured with 256-bit SSL encryption.",
      "Promotional codes and coupons are subject to their individual terms, may not be combined with other offers, and may have expiration dates. PrintHub reserves the right to void promotional codes obtained through unauthorized means.",
      "If a pricing error occurs on our website, we will notify you as soon as practicable and give you the option to proceed at the correct price or cancel your order for a full refund.",
    ],
  },
  {
    id: "shipping",
    icon: <Truck size={18} />,
    title: "Shipping & Delivery",
    updated: "June 1, 2026",
    content: [
      "All products are made to order and typically require 2–3 business days of production time before shipment. Production times may be longer during peak holiday seasons — estimated dates will be shown at checkout.",
      "Shipping times and costs vary by destination, carrier, and selected shipping method. We ship to over 150 countries. International customers are responsible for any applicable import duties, customs fees, and local taxes.",
      "Risk of loss and title for products pass to you upon delivery to the carrier. PrintHub is not responsible for delays caused by carriers, customs processing, or circumstances beyond our control (force majeure events).",
      "If your order is lost in transit, please contact us within 30 days of the estimated delivery date. We will work with the carrier to investigate and, where appropriate, reship your order or provide a refund.",
    ],
  },
  {
    id: "returns",
    icon: <RefreshCw size={18} />,
    title: "Returns & Refunds",
    updated: "June 1, 2026",
    content: [
      "Because each product is custom-made to order, we cannot accept returns or exchanges based on buyer's remorse, incorrect size selection, or change of mind. We strongly encourage customers to consult our size guide before ordering.",
      "We will gladly replace or refund items that are defective, misprinted, damaged in transit, or materially different from what was described. Claims must be submitted within 30 days of delivery with photographic evidence to returns@printhub.com.",
      "Approved refunds are processed to the original payment method within 5–10 business days. Shipping charges are non-refundable unless the return is due to our error.",
      "For artist-uploaded designs, the customer assumes responsibility for ensuring they hold all necessary rights to the submitted artwork. Returns will not be accepted for designs that are later found to infringe third-party intellectual property.",
    ],
  },
  {
    id: "intellectual",
    icon: <Scale size={18} />,
    title: "Intellectual Property",
    updated: "June 1, 2026",
    content: [
      "All content on the Service — including text, graphics, logos, icons, images, audio clips, software, and the compilation thereof — is the property of PrintHub or its content suppliers and is protected by applicable copyright, trademark, and other intellectual property laws.",
      "When you upload artwork or designs to PrintHub, you grant us a non-exclusive, worldwide, royalty-free license to reproduce, modify (for production purposes only), and display your designs solely for the purpose of fulfilling your orders or, if you are an approved Artist, listing and selling your designs.",
      "You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to submit and use your designs on the Service, and that doing so does not infringe any third-party intellectual property rights.",
      "PrintHub respects intellectual property rights and responds to notices of alleged infringement in accordance with the Digital Millennium Copyright Act (DMCA). To report infringement, contact our IP team at ip@printhub.com.",
      "PrintHub trademarks, trade names, and service marks may not be used in connection with any product or service without our prior written consent.",
    ],
  },
  {
    id: "prohibited",
    icon: <AlertTriangle size={18} />,
    title: "Prohibited Content & Conduct",
    updated: "June 1, 2026",
    content: [
      "You may not submit designs or content that: (a) infringe any patent, trademark, trade secret, copyright, or other proprietary right; (b) are unlawful, harmful, threatening, abusive, harassing, defamatory, or obscene; (c) depict or promote illegal activity; (d) contain hate speech targeting individuals or groups based on protected characteristics; or (e) violate any applicable law or regulation.",
      "You may not use the Service to: engage in fraudulent transactions; transmit spam or unsolicited commercial communications; attempt to gain unauthorized access to any portion of the Service; scrape, crawl, or index the Service without our express written consent; or introduce malicious code, viruses, or other harmful software.",
      "PrintHub reserves the right — in its sole discretion — to remove any content, cancel any order, and terminate any account that violates these provisions, without prior notice and without liability.",
      "Violations may also be reported to law enforcement authorities where PrintHub believes criminal activity has occurred.",
    ],
  },
  {
    id: "liability",
    icon: <Shield size={18} />,
    title: "Limitation of Liability",
    updated: "June 1, 2026",
    content: [
      'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.',
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PRINTHUB AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES.",
      "In no event shall PrintHub's total liability to you for all claims arising out of or related to the Service exceed the greater of (a) the amount you paid PrintHub in the 12 months preceding the claim, or (b) one hundred US dollars ($100).",
      "Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. In such jurisdictions, our liability is limited to the greatest extent permitted by law.",
    ],
  },
  {
    id: "governing",
    icon: <Scale size={18} />,
    title: "Governing Law & Disputes",
    updated: "June 1, 2026",
    content: [
      "These Terms are governed by and construed in accordance with the laws of the State of California, USA, without regard to its conflict of law provisions.",
      "Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules.",
      "You agree that any arbitration shall be conducted on an individual basis and not as a class action. You waive any right to participate in a class-action lawsuit or class-wide arbitration.",
      "Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in a court of competent jurisdiction to prevent irreparable harm.",
    ],
  },
  {
    id: "changes",
    icon: <RefreshCw size={18} />,
    title: "Changes to Terms",
    updated: "June 1, 2026",
    content: [
      "PrintHub reserves the right to modify these Terms at any time. We will notify registered users of material changes via email or a prominent notice on the Service at least 14 days before the changes take effect.",
      "Your continued use of the Service after the effective date of any changes constitutes your acceptance of the new Terms. If you do not agree to the updated Terms, you must stop using the Service and may close your account.",
      "We encourage you to review these Terms periodically. The date at the top of each section indicates when it was last updated.",
    ],
  },
  {
    id: "contact",
    icon: <Mail size={18} />,
    title: "Contact Information",
    updated: "June 1, 2026",
    content: [
      "If you have any questions, concerns, or feedback regarding these Terms, please contact us:",
      "PrintHub Legal Team\n2340 Melrose Ave, Los Angeles, CA 90046\nEmail: legal@printhub.com\nPhone: +1 (800) 746-8482",
      "For privacy-related inquiries, please contact privacy@printhub.com. For intellectual property claims, contact ip@printhub.com. Our legal team will respond within 5 business days.",
    ],
  },
];

export function TermsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Highlight active section in sidebar
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-black overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 15% 50%, #a855f7 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, #3b82f6 0%, transparent 50%)" }} />
        <div className="max-w-4xl mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/30 mb-6">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/60">Terms & Conditions</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <Scale size={18} color="#c084fc" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-purple-400">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Terms &{" "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Conditions
              </span>
            </h1>
            <p className="text-white/40 max-w-xl text-base leading-relaxed">
              Please read these terms carefully before using PrintHub. They govern your use of our platform and set out our mutual rights and responsibilities.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/30">
              <span>Effective: <span className="text-white/60 font-semibold">June 1, 2026</span></span>
              <span>·</span>
              <span>Last updated: <span className="text-white/60 font-semibold">June 21, 2026</span></span>
              <span>·</span>
              <span>Version: <span className="text-white/60 font-semibold">3.2</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* ── Sticky sidebar TOC ── */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contents</p>
              <nav className="flex flex-col gap-0.5">
                {SECTIONS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group text-sm"
                    style={{
                      background: activeSection === s.id ? "rgba(168,85,247,0.08)" : "transparent",
                      color: activeSection === s.id ? "#a855f7" : "#6b7280",
                    }}
                  >
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-black transition-all"
                      style={{
                        background: activeSection === s.id ? "rgba(168,85,247,0.15)" : "#f3f4f6",
                        color: activeSection === s.id ? "#a855f7" : "#9ca3af",
                      }}>
                      {i + 1}
                    </span>
                    <span className="leading-tight font-medium">{s.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-2xl" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.12)" }}>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Need help understanding these terms?</p>
                <Link to="/contact" className="text-xs font-bold text-purple-500 hover:text-purple-700 transition-colors">
                  Contact our legal team →
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="lg:col-span-3 flex flex-col gap-2">
            {/* Quick summary banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-5 mb-6 flex gap-4"
              style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.15)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(168,85,247,0.15)" }}>
                <FileText size={18} color="#a855f7" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">Plain-English Summary</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  By using PrintHub you agree to our rules. Custom products are made to order — returns accepted only for our errors. You must own any artwork you upload. We protect your data. Disputes are resolved by arbitration in California.
                </p>
              </div>
            </motion.div>

            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="rounded-2xl border border-gray-100 overflow-hidden mb-4 scroll-mt-28"
                id={section.id}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
                  style={{ background: "#fafafa" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-black text-gray-900 text-base">
                      {i + 1}. {section.title}
                    </h2>
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">Updated {section.updated}</span>
                </div>

                {/* Section body */}
                <div className="px-6 py-5 flex flex-col gap-4">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Footer note */}
            <div className="rounded-2xl p-6 text-center mt-4"
              style={{ background: "#0d0d0d" }}>
              <p className="text-white/60 text-sm mb-1">Questions about these terms?</p>
              <p className="text-white font-bold text-sm mb-4">Our legal team is happy to help clarify anything.</p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>
                <Mail size={14} /> Contact Legal Team
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-50"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}
          >
            <ArrowUp size={18} color="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
