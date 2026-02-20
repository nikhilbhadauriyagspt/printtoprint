import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Heart, Check, ArrowRight, Printer, MousePointer2, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeaturedTabs({ printers = [], accessories = [] }) {
  const [activeTab, setActiveTab] = useState("printers");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const tabs = [
    { id: "printers", label: "Hardware", icon: Printer, count: printers.length, data: printers },
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
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400";
    } catch (e) { return "https://via.placeholder.com/400x400"; }
  };

  const activeData = tabs.find(t => t.id === activeTab)?.data.slice(0, 24) || [];

  return (
    <section className="py-24 bg-[#FFFEF7] font-snpro">
      <div className="max-w-[1920px] mx-auto px-6">

        {/* --- STANDARDIZED SECTION HEADER WITH TABS --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-8 bg-amber-900" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Inventory Stream</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">
              Latest <span className="text-amber-500 italic font-light">Hardware.</span>
            </h2>
          </div>

          {/* Minimalist Tab Controller */}
          <div className="flex p-1 bg-amber-50 rounded-2xl border border-amber-100 self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === tab.id ? 'text-[#4A3728]' : 'text-amber-900/40 hover:text-amber-900'}`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabNano"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon size={14} />
                  {tab.label}
                </span>
                <span className={`relative z-10 text-[8px] opacity-30`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- HIGH-DENSITY NANO GRID --- */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10"
            >
              {activeData.map((p, i) => (
                <div key={p.id} className="group flex flex-col">
                  {/* Nano Visual Card */}
                  <div className="relative aspect-square rounded-[2rem] bg-white border border-amber-100/50 overflow-hidden p-5 transition-all duration-500 hover:border-amber-300 hover:shadow-[0_20px_40px_-15px_rgba(180,83,9,0.1)]">
                    
                    {/* Tiny Actions */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 backdrop-blur-md border border-amber-100 text-amber-300 hover:text-red-500 shadow-sm'}`}
                      >
                        <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Image Area */}
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center bg-amber-50/10 rounded-2xl p-2 group-hover:bg-amber-50/20 transition-all duration-500">
                      <img
                        src={getImagePath(p.images)}
                        alt=""
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      />
                    </Link>

                    {/* Quick Add (Always Visible on Nano Card) */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={`absolute bottom-3 right-3 h-8 w-8 rounded-xl flex items-center justify-center transition-all shadow-md ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-[#4A3728] text-white hover:bg-amber-600'}`}
                    >
                      {addedItems[p.id] ? <Check size={14} /> : <Plus size={16} />}
                    </button>
                  </div>

                  {/* Nano Meta Data */}
                  <div className="mt-4 px-1 space-y-1">
                    <span className="text-[7px] font-bold text-amber-500 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[12px] font-bold text-[#4A3728] line-clamp-1 group-hover:text-amber-600 transition-colors capitalize leading-tight">{p.name}</h3>
                    </Link>
                    <p className="text-[13px] font-bold text-[#4A3728] pt-1">${parseFloat(p.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- COMPACT FOOTER --- */}
        <div className="mt-20 pt-10 border-t border-amber-100/50 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 opacity-30">
            <Zap size={12} className="text-amber-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-900">Total System Ready: {activeData.length} Units</span>
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 px-8 py-3.5 bg-white rounded-full border border-amber-100 hover:border-amber-300 text-[10px] font-bold uppercase tracking-widest text-[#4A3728] hover:text-amber-600 transition-all shadow-sm active:scale-95"
          >
            Explore Complete Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
