import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-snpro bg-[#FFFEF7]">
        <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center mb-8 shadow-sm">
          <Heart size={32} className="text-amber-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-[#4A3728] mb-4">Wishlist is empty.</h2>
        <p className="text-amber-900/40 font-bold uppercase tracking-widest text-[10px] mb-10 text-center max-w-xs">Secure your favorite hardware units for future acquisition.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#4A3728] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-amber-800 transition-all shadow-lg">
          Explore Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] pt-24 pb-20 font-snpro selection:bg-amber-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* --- DASHBOARD HEADER --- */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Saved Inventory</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-[#4A3728] tracking-tight">
                Your <span className="text-amber-500 italic font-light">Favorites.</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 pb-1">{wishlistCount} Units Reserved</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-square bg-white rounded-[2.5rem] border border-amber-100/50 group-hover:border-amber-300 transition-all duration-500 flex items-center justify-center p-8 overflow-hidden mb-4 shadow-sm group-hover:shadow-xl">
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 h-9 w-9 bg-white text-amber-200 border border-amber-50 rounded-full shadow-sm flex items-center justify-center z-10 hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center bg-amber-50/10 rounded-3xl p-4 transition-all duration-500 group-hover:bg-amber-50/20">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full h-11 bg-[#4A3728] text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-colors shadow-lg"
                    >
                      <ShoppingBag size={14} /> Acquire Now
                    </button>
                  </div>
                </div>

                <div className="px-1 flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-bold text-amber-500 uppercase tracking-widest">{p.brand_name}</span>
                    <div className="h-1 w-1 rounded-full bg-emerald-500" title="Available" />
                  </div>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-bold text-[#4A3728] group-hover:text-amber-600 transition-colors capitalize leading-tight line-clamp-1 mb-1">{p.name}</h3>
                  </Link>
                  <span className="text-sm font-bold text-[#4A3728]">${parseFloat(p.price).toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 pt-10 border-t border-amber-100">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-600 transition-colors group">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Acquisition
          </Link>
        </div>
      </div>
    </div>
  );
}
