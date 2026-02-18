import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedTabs from "@/components/FeaturedTabs";
import { Shield, Wrench, ArrowUpRight, Headphones, Globe, ChevronRight, Zap, Target, PieChart, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    printers: [],
    accessories: [],
    all: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data.filter(p => !p.name.toLowerCase().includes('laptop') && !p.name.toLowerCase().includes('macbook') && !p.name.toLowerCase().includes('notebook'));
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          setData({
            all,
            printers,
            accessories,
            categories: catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')),
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Authorized HP Partner | Premium Printers & Solutions" 
        description="Premium destination for authorized HP printers, genuine ink, toner and tech accessories. Delivering excellence in tech solutions across the USA."
      />
      
      {/* 1. HERO */}
      <Hero products={data.all} />

      {/* 2. FEATURES */}
      <Features />

      {/* 3. NEW ARRIVALS */}
      <SpotlightSection products={data.all} />

      {/* 4. DEPARTMENT GALLERY */}
      <ShopByCategory categories={data.categories} />

      {/* 5. FEATURED PRODUCTS (TABS) */}
      <FeaturedTabs 
        printers={data.printers} 
        accessories={data.accessories} 
      />

      {/* 6. BRAND SHOWCASE */}
      <BrandShowcase brands={data.brands} />

      {/* 7. SOLUTIONS ECOSYSTEM */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.015]">
           <span className="text-[25rem] font-black text-slate-950 uppercase tracking-tighter whitespace-nowrap block leading-none">ECOSYSTEM</span>
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Expert Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 group relative rounded-[3.5rem] bg-slate-950 p-12 lg:p-20 overflow-hidden flex flex-col justify-between min-h-[600px]"
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              </div>

              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand text-white text-[10px] font-black uppercase tracking-[0.4em]">
                  <Headphones size={14} /> Expert Advisory
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                  Architect your <br />
                  <span className="text-brand italic">Workflow.</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl font-bold max-w-md leading-relaxed">
                  Tailored hardware configurations for creative studios, enterprise data centers, and modern hybrid offices.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-8 pt-12 border-t border-white/10">
                 <Link to="/contact" className="h-16 px-10 bg-white text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand hover:text-white transition-all flex items-center gap-4">
                   Consult Specialist <ArrowUpRight size={18} />
                 </Link>
                 <div className="flex items-center gap-4 text-white/40">
                    <div className="flex -space-x-3">
                       {[1,2,3].map(i => <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800" />)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Available Now</span>
                 </div>
              </div>
            </motion.div>

            {/* Side Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
              
              {/* Enterprise Solutions */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative rounded-[3rem] bg-slate-50 border border-slate-100 p-12 overflow-hidden flex flex-col justify-between hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
              >
                <div className="flex items-center justify-between mb-8">
                   <div className="h-14 w-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                      <Globe size={28} strokeWidth={1.5} />
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">B2B Global</span>
                </div>
                <div>
                   <h3 className="text-3xl font-black text-brand uppercase tracking-tighter mb-4">Enterprise <span className="text-slate-400">Bulk.</span></h3>
                   <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">Scalable procurement and device lifecycle management for growing organizations.</p>
                   <Link to="/contact" className="group/btn flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-950">
                      Get Volume Quote <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </motion.div>

              {/* Protection & Logistics */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative rounded-[3rem] bg-slate-50 border border-slate-100 p-12 overflow-hidden flex flex-col justify-between hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
              >
                <div className="flex items-center justify-between mb-8">
                   <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center text-brand">
                      <Shield size={28} strokeWidth={1.5} />
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Security</span>
                </div>
                <div>
                   <h3 className="text-3xl font-black text-brand uppercase tracking-tighter mb-4">Pro <span className="text-slate-400">Logistics.</span></h3>
                   <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">Insured priority shipping and comprehensive official warranty on all major assets.</p>
                   <div className="flex items-center gap-4">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active Protection</span>
                   </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. QUICK STATS STRIP */}
      <section className="py-12 bg-slate-50/50 border-y border-slate-100 mb-12">
         <div className="max-w-[1920px] mx-auto px-12 flex flex-wrap justify-between items-center gap-8">
            {[
              { icon: Target, label: "500+", sub: "Corporate Partners" },
              { icon: PieChart, label: "24h", sub: "Response Time" },
              { icon: Zap, label: "100%", sub: "Genuine Inventory" },
              { icon: Globe, label: "Global", sub: "Strategic Reach" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand shadow-sm border border-slate-100">
                    <stat.icon size={18} />
                 </div>
                 <div>
                    <p className="text-lg font-black text-brand leading-none">{stat.label}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.sub}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
