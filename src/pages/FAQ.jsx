import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, Mail, MapPin, Plus, Minus, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on PrintToPrint?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on PrintToPrint secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell laptops, printers, and accessories from other trusted brands." },
      { q: "How can I choose the right hardware?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-[#FFFEF7] min-h-screen font-snpro selection:bg-amber-500 selection:text-white pt-30 pb-20">
      <SEO
        title="FAQ | Support Hub"
        description="Find answers to common questions about orders, shipping, products, and technical support at PrintToPrint."
      />

      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-[1800px] mx-auto px-6 mb-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Assistance</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#4A3728] tracking-tight">
              Knowledge <span className="text-amber-500 italic font-light">Base.</span>
            </h1>
          </div>

          <div className="w-full max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="SEARCH SYSTEM DOCUMENTATION..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-6 bg-white border border-amber-100 rounded-[2.5rem] shadow-sm focus:bg-white focus:border-amber-400 outline-none text-[11px] font-bold uppercase tracking-widest transition-all placeholder:text-amber-900/20"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white rounded-[2.5rem] p-6 border border-amber-100 shadow-sm">
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-[0.4em] mb-6 block ml-2">Categories</span>
              <div className="space-y-1">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setOpenIndex(0);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat.category
                      ? 'bg-[#4A3728] text-white shadow-lg translate-x-1'
                      : 'text-amber-900/40 hover:bg-amber-50 hover:text-amber-900'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Assistance Module */}
            <div className="p-10 rounded-[3rem] bg-[#4A3728] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-amber-500/10 transition-colors" />
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-amber-400" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-200/40">Support</span>
              </div>
              <h4 className="text-xl font-bold mb-6">Unresolved <br /><span className="text-amber-400 font-light italic">Inquiry?</span></h4>
              <div className="space-y-4">
                <a href="mailto:info@printtoprint.shop" className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-amber-50/60 hover:text-amber-400 transition-colors">
                  <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><Mail size={16} /></div>
                  Email Access
                </a>
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-amber-50/60">
                  <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><MapPin size={16} /></div>
                  <div className="flex flex-col">
                    <span>3140 Polaris Ave Ste 1</span>
                    <span className="opacity-40 text-[9px]">Las Vegas, NV 89102</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px w-8 bg-amber-500" />
                  <h3 className="text-2xl font-bold text-[#4A3728] capitalize">
                    {activeCategory}
                  </h3>
                </div>

                {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === idx ? 'border-amber-400 shadow-xl shadow-amber-900/5' : 'border-amber-100 hover:border-amber-300'
                      }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                      className="w-full px-8 py-8 flex items-center justify-between text-left"
                    >
                      <span className={`text-sm md:text-base font-bold capitalize leading-snug pr-8 ${openIndex === idx ? 'text-amber-600' : 'text-[#4A3728]'
                        }`}>
                        {faq.q}
                      </span>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all ${openIndex === idx ? 'bg-amber-500 text-white rotate-180' : 'bg-amber-50 text-amber-400 hover:bg-[#4A3728] hover:text-white'
                        }`}>
                        {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className="px-8 pb-8">
                            <div className="bg-amber-50/30 rounded-2xl p-6 border border-amber-50">
                              <p className="text-amber-900/60 text-sm md:text-base font-medium leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-amber-200">
                    <Search size={40} className="text-amber-100 mx-auto mb-6" />
                    <h4 className="text-lg font-bold text-[#4A3728]">No Records Matching.</h4>
                    <p className="text-[10px] font-bold text-amber-900/30 uppercase tracking-[0.2em] mt-2">Adjust search parameters for broader results.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
