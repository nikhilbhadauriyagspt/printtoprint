import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, MessageCircle, ArrowRight, Loader2, CheckCircle2, ChevronRight, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFEF7] min-h-screen font-snpro selection:bg-amber-500 selection:text-white pt-24 pb-20">
      <SEO
        title="Contact Us | Expert Tech Support"
        description="Get in touch with PrintToPrint for technical support, bulk orders, or product inquiries. Our experts are here to help."
      />

      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-[1800px] mx-auto px-6 mb-16">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb & Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Contact</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-[#4A3728] tracking-tight">
                Connect with <span className="text-amber-500 italic font-light">Experts.</span>
              </h1>
              <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-amber-100 shadow-sm">
                <Headphones size={16} className="text-amber-500" />
                <div className="h-3 w-px bg-amber-100" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Live Support Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-8 rounded-[2.5rem] bg-white border border-amber-100 group transition-all hover:shadow-xl shadow-amber-900/5">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.3em] mb-2">Direct Channel</h4>
              <p className="text-sm font-bold text-[#4A3728]">support@printtoprint.shop</p>
              <p className="text-[10px] font-bold text-amber-900/30 uppercase mt-1">24 Hour Response Target</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-amber-100 group transition-all hover:shadow-xl shadow-amber-900/5">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 text-[#4A3728] group-hover:scale-110 transition-transform">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.3em] mb-2">Operations</h4>
              <p className="text-sm font-bold text-[#4A3728]">9412 S Roberts Rd</p>
              <p className="text-[10px] font-bold text-amber-900/30 uppercase mt-1">Hickory Hills, IL 60457, USA</p>
            </div>

            {/* HP Trust Module */}
            <div className="p-10 rounded-[3rem] bg-[#4A3728] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-amber-500/10 transition-colors" />
              <img src="/brands/hp.png" alt="HP" className="h-8 w-auto object-contain mb-6 brightness-0 invert" />
              <h4 className="text-lg font-bold mb-2">Authorized Solutions.</h4>
              <p className="text-[11px] font-medium text-amber-50/40 uppercase tracking-widest leading-relaxed">Certified support and genuine manufacturer hardware guaranteed.</p>
            </div>
          </div>

          {/* Contact Form Stage */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3.5rem] border border-amber-100 p-8 md:p-16 shadow-sm">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#4A3728] capitalize mb-4">Inquiry Received.</h2>
                  <p className="text-amber-900/40 font-bold uppercase tracking-widest text-[10px] mb-10">Your message is in our secure queue. An expert will reach out shortly.</p>
                  <button onClick={() => setStatus(null)} className="px-10 py-4 bg-[#4A3728] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-amber-800 transition-all shadow-lg">Submit Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Full Identity</label>
                      <input
                        required
                        type="text"
                        placeholder="EX. ALEXANDER PIERCE"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Email Access</label>
                      <input
                        required
                        type="email"
                        placeholder="NAME@ORGANIZATION.COM"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Mobile Contact</label>
                      <input
                        type="tel"
                        placeholder="+1 (000) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Subject Category</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Order Status</option>
                        <option>Bulk Hardware Orders</option>
                        <option>Warranty Claim</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Your Intelligence</label>
                    <textarea
                      required
                      rows="5"
                      placeholder="DESCRIBE YOUR REQUEST IN DETAIL..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-6 bg-amber-50/30 border border-amber-100 rounded-[2rem] focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all resize-none placeholder:text-amber-900/20"
                    ></textarea>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full h-16 bg-[#4A3728] text-white rounded-2xl flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all shadow-xl"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Disseminate Message</>}
                  </button>
                  {status === 'error' && <p className="text-center text-red-500 text-[10px] font-bold uppercase tracking-widest">Transmission Failed. Please re-initiate.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
