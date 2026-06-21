import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  ChevronRight, ArrowUp, Shield, Eye, Database, Lock,
  Share2, UserCheck, Globe, Bell, Trash2, Mail
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'overview',
    icon: <Shield size={18} />,
    title: 'Overview',
    color: '#a855f7',
    content: [
      'PrintHub Inc. ("PrintHub", "we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website, use our mobile application, or purchase our products.',
      'This policy applies to all users worldwide. Depending on your location, additional rights and protections may apply to you — see the regional sections below for details specific to residents of the European Economic Area, California, and other jurisdictions.',
      'By using our Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our Service.',
    ],
  },
  {
    id: 'collect',
    icon: <Database size={18} />,
    title: 'Information We Collect',
    color: '#ec4899',
    content: [
      'Account & Identity Data: When you create an account or place an order, we collect your name, email address, phone number, billing address, and shipping address.',
      'Payment Data: We collect payment card details necessary to process your transactions. Full card numbers are transmitted directly to our payment processor (Stripe) and are never stored on our servers. We retain only the last four digits, card type, and expiry date for reference.',
      'Design & Content Data: Artwork, images, and files you upload to create custom products. We store these to fulfill your orders and, if you are a registered artist, to list your designs for sale.',
      'Usage Data: We automatically collect information about how you interact with our Service, including pages visited, time spent, clicks, search queries, referral URLs, browser type, operating system, IP address, and device identifiers.',
      'Communications: Records of your correspondence with us via email, chat, or support tickets, including the content of those messages.',
      'Cookies & Tracking: We use cookies, web beacons, and similar technologies. See our Cookie Policy section below for full details.',
    ],
  },
  {
    id: 'use',
    icon: <Eye size={18} />,
    title: 'How We Use Your Information',
    color: '#3b82f6',
    content: [
      'Order Fulfillment: To process and ship your orders, send order confirmations and tracking updates, and handle returns or refunds.',
      'Account Management: To create and maintain your account, authenticate your identity, and provide customer support.',
      'Personalization: To tailor product recommendations, marketing communications, and on-site content to your interests and browsing history.',
      'Service Improvement: To analyze usage patterns, diagnose technical issues, conduct A/B testing, and develop new features.',
      'Legal Compliance: To comply with applicable laws, respond to lawful requests from public authorities, enforce our Terms of Service, and protect the rights and safety of PrintHub and its users.',
      'Marketing: To send you promotional emails, newsletters, and special offers — but only if you have opted in or we have a legitimate interest, and always with an easy opt-out mechanism.',
    ],
  },
  {
    id: 'sharing',
    icon: <Share2 size={18} />,
    title: 'Sharing Your Information',
    color: '#10b981',
    content: [
      'We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.',
      'Service Providers: We share data with trusted vendors who help us operate our business — including payment processors (Stripe), shipping carriers (UPS, FedEx, USPS), cloud infrastructure (AWS), email platforms (SendGrid), and analytics tools (Google Analytics). All providers are bound by data processing agreements.',
      'Artists: If you purchase a design created by a registered artist, we share your order details (product type, quantity) with that artist for royalty calculation purposes only. We never share your personal contact or payment information with artists.',
      'Business Transfers: In the event of a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your data is subject to a different privacy policy.',
      'Legal Requirements: We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of PrintHub, our users, or the public.',
    ],
  },
  {
    id: 'cookies',
    icon: <Globe size={18} />,
    title: 'Cookies & Tracking',
    color: '#f59e0b',
    content: [
      'We use the following categories of cookies: (1) Strictly Necessary — required for the Service to function, such as session authentication and shopping cart persistence. (2) Performance — analytics cookies that help us understand how visitors interact with our site. (3) Functional — cookies that remember your preferences, such as language or region. (4) Marketing — used to deliver relevant advertisements and track campaign effectiveness.',
      'You can control cookie preferences through our Cookie Consent banner (shown on first visit) or through your browser settings. Disabling certain cookies may affect the functionality of our Service.',
      'We use Google Analytics with IP anonymization enabled. You may opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.',
      'We participate in interest-based advertising programs. You can opt out via the Digital Advertising Alliance (optout.aboutads.info) or the Network Advertising Initiative (optout.networkadvertising.org).',
    ],
  },
  {
    id: 'security',
    icon: <Lock size={18} />,
    title: 'Data Security',
    color: '#8b5cf6',
    content: [
      'We implement industry-standard security measures to protect your personal information, including 256-bit SSL/TLS encryption for data in transit, AES-256 encryption for sensitive data at rest, role-based access controls, regular security audits and penetration testing, and multi-factor authentication for all internal systems.',
      'Our payment processing is handled entirely by Stripe, a PCI DSS Level 1 certified provider. We never handle raw card data on our own servers.',
      'Despite our best efforts, no security system is impenetrable. In the event of a data breach that is likely to result in risk to your rights and freedoms, we will notify you and relevant authorities within 72 hours of becoming aware, as required by applicable law.',
      'You are responsible for maintaining the confidentiality of your account password. We recommend using a strong, unique password and enabling two-factor authentication.',
    ],
  },
  {
    id: 'retention',
    icon: <Database size={18} />,
    title: 'Data Retention',
    color: '#06b6d4',
    content: [
      'We retain your personal information for as long as your account is active or as needed to provide our services. Specifically: account data is retained for the lifetime of your account plus 2 years; order records are retained for 7 years to comply with tax and accounting regulations; uploaded design files are retained until you delete them or close your account; usage and analytics data is retained for 26 months.',
      'When you close your account, we will delete or anonymize your personal data within 90 days, except where retention is required for legal, regulatory, or legitimate business purposes.',
      'Backup copies of deleted data may persist in encrypted form for up to 90 additional days before being permanently purged from our systems.',
    ],
  },
  {
    id: 'rights',
    icon: <UserCheck size={18} />,
    title: 'Your Rights & Choices',
    color: '#ec4899',
    content: [
      'Depending on your location, you may have the following rights regarding your personal data: Access — request a copy of the personal data we hold about you. Correction — request correction of inaccurate or incomplete data. Deletion — request deletion of your personal data ("right to be forgotten"). Portability — receive your data in a structured, machine-readable format. Objection — object to processing of your data for direct marketing or based on legitimate interests. Restriction — request that we limit how we use your data.',
      'To exercise any of these rights, contact us at privacy@printhub.com or through your Account Settings page. We will respond within 30 days (or 45 days where permitted by law for complex requests). We may need to verify your identity before processing your request.',
      'You may unsubscribe from marketing emails at any time using the unsubscribe link in any email we send, or by updating your notification preferences in Account Settings. Transactional emails (order confirmations, shipping updates) cannot be opted out of while your account is active.',
    ],
  },
  {
    id: 'regional',
    icon: <Globe size={18} />,
    title: 'Regional Provisions',
    color: '#a855f7',
    content: [
      'European Economic Area (GDPR): Our legal bases for processing personal data include contract performance (to fulfill orders), legitimate interests (to improve our Service and prevent fraud), consent (for marketing emails and non-essential cookies), and legal obligation. You have the right to lodge a complaint with your local data protection authority. Our EU representative is PrintHub EU Ltd., Dublin, Ireland.',
      'California (CCPA/CPRA): California residents have the right to know what personal information we collect and how it is used; the right to delete personal information; the right to opt out of the "sale" or "sharing" of personal information (we do not sell personal information); and the right to non-discrimination for exercising these rights. To submit a CCPA request, email privacy@printhub.com or call +1 (800) 746-8482.',
      'Other Jurisdictions: We comply with applicable privacy laws in all jurisdictions where we operate, including but not limited to PIPEDA (Canada), LGPD (Brazil), POPIA (South Africa), and PDPA (Thailand). Contact us for jurisdiction-specific information.',
    ],
  },
  {
    id: 'children',
    icon: <Shield size={18} />,
    title: "Children's Privacy",
    color: '#f59e0b',
    content: [
      'Our Service is not directed to children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children under these ages.',
      'If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us at privacy@printhub.com. We will take prompt steps to delete such information from our systems.',
    ],
  },
  {
    id: 'changes',
    icon: <Bell size={18} />,
    title: 'Changes to This Policy',
    color: '#10b981',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by email (to the address associated with your account) or by posting a prominent notice on our website at least 30 days before the change takes effect.',
      'The date at the top of this policy indicates when it was last revised. We encourage you to review this policy periodically to stay informed about how we protect your information.',
    ],
  },
  {
    id: 'contact',
    icon: <Mail size={18} />,
    title: 'Contact Us',
    color: '#3b82f6',
    content: [
      'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team:',
      'PrintHub Privacy Team\n2340 Melrose Ave, Los Angeles, CA 90046, USA\nEmail: privacy@printhub.com\nPhone: +1 (800) 746-8482\nResponse time: within 5 business days',
      'For EU/EEA inquiries, you may also contact our EU representative at eu-privacy@printhub.com.',
    ],
  },
];

function Accordion({ section }: { section: typeof SECTIONS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-4 text-left"
      >
        <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: section.color + '15', color: section.color }}>
          {section.icon}
        </span>
        <span className="flex-1 font-semibold text-gray-900 text-sm">{section.title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 flex-shrink-0"
        >
          <ChevronRight size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-10 flex flex-col gap-3">
              {section.content.map((para, i) => (
                <p key={i} className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-black overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 10% 50%, #a855f7 0%, transparent 55%), radial-gradient(ellipse at 90% 50%, #ec4899 0%, transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 text-sm text-white/30 mb-6">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/60">Privacy Policy</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)' }}>
                <Shield size={18} color="#c084fc" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-purple-400">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Privacy{' '}
              <span style={{ background: 'linear-gradient(90deg,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Policy
              </span>
            </h1>
            <p className="text-white/40 max-w-xl text-base leading-relaxed">
              We believe privacy is a right, not a feature. Here is exactly what data we collect, why we collect it, and how you can control it.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/30">
              <span>Effective: <span className="text-white/60 font-semibold">June 1, 2026</span></span>
              <span>·</span>
              <span>Last updated: <span className="text-white/60 font-semibold">June 21, 2026</span></span>
              <span>·</span>
              <span>Version: <span className="text-white/60 font-semibold">2.4</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* At-a-glance cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Lock size={18} />, label: 'We never sell your data', color: '#a855f7' },
            { icon: <Shield size={18} />, label: '256-bit SSL encryption', color: '#ec4899' },
            { icon: <Trash2 size={18} />, label: 'Delete your data anytime', color: '#3b82f6' },
            { icon: <UserCheck size={18} />, label: 'Full GDPR & CCPA compliant', color: '#10b981' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: card.color + '15', color: card.color }}>
                {card.icon}
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-snug">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contents</p>
              <nav className="flex flex-col gap-0.5">
                {SECTIONS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm"
                    style={{
                      background: activeSection === s.id ? s.color + '12' : 'transparent',
                      color: activeSection === s.id ? s.color : '#6b7280',
                      borderLeft: activeSection === s.id ? `3px solid ${s.color}` : '3px solid transparent',
                    }}
                  >
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-black"
                      style={{
                        background: activeSection === s.id ? s.color + '20' : '#f3f4f6',
                        color: activeSection === s.id ? s.color : '#9ca3af',
                      }}>
                      {i + 1}
                    </span>
                    <span className="leading-tight font-medium">{s.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-2xl" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.12)' }}>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Questions about your data?</p>
                <Link to="/contact" className="text-xs font-bold text-purple-500 hover:text-purple-700 transition-colors">
                  Contact privacy team →
                </Link>
              </div>

              <div className="mt-4 p-4 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Related policies</p>
                <Link to="/terms" className="block text-xs font-semibold text-gray-600 hover:text-purple-500 py-1 transition-colors">Terms & Conditions →</Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 flex flex-col gap-3">

            {/* Plain-English summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-5 mb-4 flex gap-4"
              style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(168,85,247,0.15)' }}>
                <Shield size={18} color="#a855f7" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">Plain-English Summary</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We collect only what we need to run our service. We never sell your data. You can access, correct, or delete your information at any time. We use encryption and follow GDPR and CCPA regulations. Marketing emails always have a one-click unsubscribe.
                </p>
              </div>
            </motion.div>

            {/* Mobile accordion view */}
            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 px-5 divide-y divide-gray-100 mb-6 shadow-sm">
              {SECTIONS.map((s) => <Accordion key={s.id} section={s} />)}
            </div>

            {/* Desktop full sections */}
            <div className="hidden lg:flex flex-col gap-3">
              {SECTIONS.map((section, i) => (
                <motion.section
                  key={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                  className="rounded-2xl border border-gray-100 overflow-hidden scroll-mt-28"
                  id={section.id}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
                    style={{ background: section.color + '06' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: section.color + '18', color: section.color }}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-black text-gray-900 text-base">
                        {i + 1}. {section.title}
                      </h2>
                    </div>
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: section.color }} />
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 flex flex-col gap-4">
                    {section.content.map((para, j) => (
                      <p key={j} className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="rounded-2xl p-6 text-center mt-2"
              style={{ background: '#0d0d0d' }}>
              <p className="text-white/60 text-sm mb-1">Have a privacy concern?</p>
              <p className="text-white font-bold text-sm mb-4">We take every request seriously and respond within 5 business days.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(90deg,#a855f7,#ec4899)' }}>
                  <Mail size={14} /> Contact Privacy Team
                </Link>
                <Link to="/terms"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors">
                  View Terms of Service
                </Link>
              </div>
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-50"
            style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}
          >
            <ArrowUp size={18} color="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
