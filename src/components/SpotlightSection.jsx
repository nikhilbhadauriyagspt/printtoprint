import { motion } from "framer-motion";
import { Plus, Heart, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function SpotlightSection({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  
  // Show more products in the slider
  const displayProducts = products.length > 0 ? products.slice(0, 15) : [];

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

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-20 bg-white font-snpro overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Header - Stylish & Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex gap-6 items-center">
            {/* Vertical Decorative Bar */}
            <div className="hidden md:block h-16 w-1.5 bg-brand rounded-full"></div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-brand"></div>
                Official Drops
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand uppercase tracking-tight leading-none">
                The <span className="text-slate-400 italic">Spotlight.</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="spotlight-prev h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
                <ChevronLeft size={20} className="group-active:scale-75 transition-transform" />
             </button>
             <button className="spotlight-next h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
                <ChevronRight size={20} className="group-active:scale-75 transition-transform" />
             </button>
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.spotlight-prev',
              nextEl: '.spotlight-next',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4.5 },
              1440: { slidesPerView: 5.5 },
              1800: { slidesPerView: 6.5 },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {displayProducts.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {/* Compact Light Card */}
                  <div className="relative aspect-square rounded-[2rem] bg-slate-50/50 border border-slate-100 overflow-hidden p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-brand/20">
                    
                    {/* Badge */}
                    <div className="absolute top-5 left-5 z-10">
                       <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand transition-colors">
                         {p.brand_name || 'Strategic'}
                       </span>
                    </div>

                    {/* Wishlist */}
                    <button 
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-5 right-5 h-9 w-9 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all shadow-sm ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                    >
                      <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Image */}
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Quick Add */}
                    <button 
                      onClick={() => handleAddToCart(p)}
                      className={`absolute bottom-5 right-5 h-11 w-11 rounded-2xl flex items-center justify-center transition-all shadow-xl ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-brand scale-0 translate-y-4 group-hover:scale-100 group-hover:translate-y-0'}`}
                    >
                      {addedItems[p.id] ? <Check size={20} /> : <Plus size={22} />}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-5 px-2">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-brand transition-colors uppercase tracking-tight mb-1">{p.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-slate-950">${p.price}</span>
                      <div className="flex items-center gap-1">
                         <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">In Stock</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
