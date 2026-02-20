import { motion } from "framer-motion";
import { Plus, Heart, Check, ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
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
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400?text=PrintToPrint";
    } catch (e) {
      return "https://via.placeholder.com/400x400?text=PrintToPrint";
    }
  };

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-[#FFFEF7] font-snpro overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* --- STANDARDIZED SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-8 bg-amber-900" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Strategic Drops</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">
              Hardware <span className="text-amber-500 italic font-light">Spotlight.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button className="spotlight-prev h-11 w-11 rounded-xl border border-amber-100 bg-white flex items-center justify-center text-amber-900/40 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm active:scale-90">
              <ChevronLeft size={18} />
            </button>
            <button className="spotlight-next h-11 w-11 rounded-xl bg-[#4A3728] flex items-center justify-center text-white hover:bg-amber-800 transition-all shadow-md active:scale-90">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- PRODUCT SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.4}
            navigation={{
              prevEl: '.spotlight-prev',
              nextEl: '.spotlight-next',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
              1800: { slidesPerView: 5.2 },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {displayProducts.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  {/* The Product Card */}
                  <div className="relative aspect-square rounded-[2.5rem] bg-white border border-amber-100/50 overflow-hidden p-6 transition-all duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(180,83,9,0.1)]">
                    
                    {/* Badge & Heart Group */}
                    <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
                      <span className="px-3 py-1 bg-amber-50/80 backdrop-blur-md border border-amber-100 rounded-full text-[8px] font-bold uppercase tracking-widest text-amber-600">
                        {p.brand_name || 'PREMIUM'}
                      </span>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'bg-red-500 text-white shadow-md' : 'bg-amber-50 text-amber-300 hover:text-red-500 hover:bg-white shadow-sm'}`}
                      >
                        <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Image Context */}
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-amber-50/20 p-4">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                      />
                    </Link>

                    {/* Quick Add Action */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className={`absolute bottom-6 right-6 h-10 w-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-[#4A3728] text-white hover:bg-amber-600 scale-0 translate-y-4 group-hover:scale-100 group-hover:translate-y-0'}`}
                    >
                      {addedItems[p.id] ? <Check size={18} /> : <Plus size={20} />}
                    </button>
                  </div>

                  {/* Info Module */}
                  <div className="mt-6 px-2 space-y-1">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] font-bold text-[#4A3728] line-clamp-1 group-hover:text-amber-600 transition-colors capitalize">{p.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#4A3728]">${p.price}</span>
                      <div className="flex items-center gap-1.5 opacity-40">
                        <TrendingUp size={10} className="text-amber-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-900">Certified</span>
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
