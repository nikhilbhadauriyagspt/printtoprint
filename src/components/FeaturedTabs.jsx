import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Heart, Check, ArrowRight, Sparkles, Laptop, Printer, MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeaturedTabs({ printers = [], accessories = [] }) {
  const [activeTab, setActiveTab] = useState("printers");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const tabs = [
    { id: "printers", label: "Printers", icon: Printer, count: printers.length, data: printers },
    { id: "accessories", label: "Essentials", icon: MousePointer2, count: accessories.length, data: accessories },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400?text=Printiply";
    } catch (e) {
      return "https://via.placeholder.com/400x400?text=Printiply";
    }
  };

  const activeData = tabs.find(t => t.id === activeTab)?.data.slice(0, 24) || [];

  return (
    <section className="py-20 bg-white font-snpro">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* --- Header & Tabs - Stylish & Compact --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-10">
          <div className="flex gap-6 items-center">
            {/* Vertical Decorative Bar */}
            <div className="hidden md:block h-16 w-1.5 bg-brand rounded-full"></div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-brand"></div>
                New Arrivals
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand uppercase tracking-tight leading-none">
                Latest <span className="text-slate-400 italic">Drop.</span>
              </h2>
            </div>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-[1.2rem] md:rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-brand rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl shadow-brand/20"
                    transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon size={14} />
                  {tab.label}
                </span>
                <span className={`relative z-10 text-[8px] px-1.5 py-0.5 rounded-md border ${activeTab === tab.id ? 'border-white/20 bg-white/10' : 'border-slate-200 bg-slate-100'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Product Grid --- */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12"
            >
              {activeData.map((p, i) => (
                <div key={p.id} className="group">
                  <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-brand/20">
                    
                    <div className="absolute top-5 left-5 z-10">
                       <span className="px-2.5 py-1 bg-white/80 backdrop-blur-md border border-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-400">
                         {p.brand_name || 'Strategic'}
                       </span>
                    </div>

                    <button 
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-5 right-5 h-9 w-9 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all shadow-sm z-10 ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                    >
                      <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                      />
                    </Link>

                    <button 
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={`absolute bottom-5 right-5 h-10 w-10 rounded-2xl flex items-center justify-center transition-all shadow-xl z-10 ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-brand scale-0 translate-y-4 group-hover:scale-100 group-hover:translate-y-0'}`}
                    >
                      {addedItems[p.id] ? <Check size={18} /> : <Plus size={20} />}
                    </button>
                  </div>

                  <div className="mt-5 px-1">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-tight line-clamp-1 group-hover:text-brand transition-colors mb-1">{p.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-950">${p.price}</span>
                      <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-brand transition-colors"></div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
           <Link to="/shop" className="group flex items-center gap-4 px-10 py-4 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-full transition-all duration-500 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">View full department</span>
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center group-hover:bg-brand transition-all">
                 <ArrowRight size={14} className="text-slate-900 group-hover:text-white transition-all" />
              </div>
           </Link>
        </div>
      </div>
    </section>
  );
}
