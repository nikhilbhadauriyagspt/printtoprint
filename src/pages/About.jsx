import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Laptop, Printer, Package, Wrench, Leaf, MapPin, Mail, Phone, ArrowUpRight, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";

export default function About() {
  return (
    <div className="bg-[#FFFEF7] min-h-screen font-snpro selection:bg-amber-500 selection:text-white pt-24 pb-20">
      <SEO
        title="About Our Journey | Authorized HP Excellence"
        description="Learn about PrintToPrint, our vision to redefine tech experience, and our commitment as an authorized HP partner."
      />

      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-[1800px] mx-auto px-6 mb-16">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb & Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">About Us</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-[#4A3728] tracking-tight">
                Redefining <span className="text-amber-500 italic font-light">Technology.</span>
              </h1>
              <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-amber-100 shadow-sm">
                <img src="/brands/hp.png" alt="HP" className="h-4 object-contain" />
                <div className="h-3 w-px bg-amber-100" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Authorized Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 space-y-24">
        
        {/* --- SECTION 1: OUR JOURNEY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-40">
                <div className="h-[1px] w-8 bg-amber-900" />
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Since 2026</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">Our Journey.</h2>
            </div>
            <div className="space-y-6">
              <p className="text-amber-900/60 text-lg lg:text-xl font-medium leading-relaxed">
                PrintToPrint was founded with a vision to redefine how customers experience technology. We saw a gap in the market — too many people struggled to find authentic, affordable, and dependable computing and printing solutions.
              </p>
              <p className="text-amber-900/40 text-base font-medium leading-relaxed border-l-2 border-amber-100 pl-8">
                That’s why we partnered with HP, to bring customers a seamless and transparent shopping experience backed by expert service. Based in New Orleans, Louisiana, we've grown into a nationwide platform serving both professionals and home users.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-[3.5rem] overflow-hidden border border-amber-100/50 shadow-2xl">
              <img src={banner1} alt="Boutique Hardware" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl">
                <h4 className="text-4xl font-bold text-amber-600 mb-1">100%</h4>
                <p className="text-[10px] font-bold text-[#4A3728] uppercase tracking-widest">Genuine Authorized Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: SPECIALIZED SERVICES (BENTO) --- */}
        <section className="space-y-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-8 bg-amber-900" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Expertise</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">Specialized Services.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Laptop, title: "Laptops & Computers", desc: "High-performance systems for home, business, and professional use." },
              { icon: Printer, title: "Printers & Scanners", desc: "Inkjet, LaserJet, and All-in-One models tailored to every need." },
              { icon: Package, title: "Printing Supplies", desc: "Genuine HP ink, toner, and compatible consumables." },
              { icon: Zap, title: "Accessories", desc: "Keyboards, cables, and tools that enhance your workspace." },
              { icon: Globe, title: "Business Solutions", desc: "Managed print and device management for all company sizes." },
            ].map((item, i) => (
              <motion.div
                key={i} whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-white border border-amber-100/50 group transition-all hover:border-amber-300 hover:shadow-xl shadow-amber-900/5 flex flex-col justify-between min-h-[280px]"
              >
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#4A3728] mb-3">{item.title}</h3>
                  <p className="text-sm font-medium text-amber-900/40 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: MISSION & VISION (MODULES) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-14 rounded-[3.5rem] bg-[#4A3728] text-white space-y-8 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-amber-500/10 transition-colors" />
            <div className="flex items-center gap-3">
              <Sparkles className="text-amber-400" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-200/40">Our Mission</span>
            </div>
            <h3 className="text-4xl font-bold leading-tight">Empowering Every <br /><span className="text-amber-400 font-light italic">Customer.</span></h3>
            <p className="text-amber-50/60 text-lg font-medium leading-relaxed max-w-md">
              To empower every customer with reliable, efficient, and sustainable technology solutions — through genuine products, expert advice, and a customer-first approach.
            </p>
          </div>
          <div className="p-14 rounded-[3.5rem] bg-white border border-amber-100 text-[#4A3728] space-y-8 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 blur-3xl rounded-full -mr-20 -mt-20" />
            <div className="flex items-center gap-3">
              <Award className="text-amber-500" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-900/20">Our Vision</span>
            </div>
            <h3 className="text-4xl font-bold leading-tight">Nationwide <br /><span className="text-amber-500 font-light italic">Tech Leader.</span></h3>
            <p className="text-amber-900/40 text-lg font-medium leading-relaxed max-w-md">
              To become a leading HP-partner e-commerce brand, known for delivering cutting-edge technology, unmatched service, and long-term value.
            </p>
          </div>
        </div>

        {/* --- SECTION 4: THE EDGE (NANO LIST) --- */}
        <div className="pb-24">
          <div className="flex flex-col gap-4 mb-16">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-8 bg-amber-900" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Advantage</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">The Expertise.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
            {[
              { title: "Authorized HP Partner", icon: ShieldCheck },
              { title: "Multi-Brand Store", icon: Globe },
              { title: "Expert Guidance", icon: Zap },
              { title: "Fast Delivery", icon: Package },
              { title: "Safe & Secure", icon: ShieldCheck },
              { title: "Dedicated Care", icon: Heart },
              { title: "Sustainability", icon: Leaf },
              { title: "Professional Support", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#4A3728] group-hover:text-white">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[13px] font-bold text-[#4A3728] uppercase tracking-wider group-hover:text-amber-600 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
