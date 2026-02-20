import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function ShopByCategory({ categories = [] }) {
  // Flatten categories
  const subcategories = categories.flatMap(parent => parent.children || []);

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  if (subcategories.length === 0) return null;

  return (
    <section className="py-24 bg-[#FFFEF7] font-snpro overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* --- STANDARDIZED SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-8 bg-amber-900" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Browse Tech</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">
              Hardware <span className="text-amber-500 italic font-light">Departments.</span>
            </h2>
          </div>

          {/* Compact Navigation */}
          <div className="flex items-center gap-2">
            <button className="cat-prev h-11 w-11 rounded-xl border border-amber-100 bg-white flex items-center justify-center text-amber-900/40 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm active:scale-90">
              <ChevronLeft size={18} />
            </button>
            <button className="cat-next h-11 w-11 rounded-xl bg-[#4A3728] flex items-center justify-center text-white hover:bg-amber-800 transition-all shadow-md active:scale-90">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- MODULAR CATEGORY TILES --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.4}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
              1800: { slidesPerView: 5.2 },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {subcategories.map((item, i) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative"
                  >
                    {/* The Card */}
                    <div className="relative aspect-[4/5] rounded-[2.5rem] bg-white border border-amber-100/50 transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(180,83,9,0.1)] overflow-hidden">
                      
                      {/* Image Context */}
                      <div className="absolute inset-0 p-4">
                        <div className="w-full h-full rounded-[2rem] bg-amber-50/30 overflow-hidden relative">
                          <img
                            src={getImagePath(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:scale-110 group-hover:rotate-2"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=" + item.name; }}
                          />
                          {/* Permanent Gradient for text clarity */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/80 via-[#4A3728]/20 to-transparent transition-opacity duration-500" />
                        </div>
                      </div>

                      {/* Content Overlay - ALWAYS VISIBLE */}
                      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8">
                        {/* Top: Tag */}
                        <div className="flex justify-between items-start">
                          <div className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-md border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm transition-all duration-500">
                            <Sparkles size={14} />
                          </div>
                        </div>

                        {/* Bottom: Title & Action - ALWAYS VISIBLE */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-white leading-tight transition-colors drop-shadow-md">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 transition-all duration-500">
                            <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-amber-500 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                              Shop Series
                            </span>
                            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-amber-600 shadow-sm">
                              <ArrowRight size={12} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- SECTION FOOTER --- */}
        <div className="mt-20 flex justify-center">
          <Link 
            to="/shop" 
            className="group flex items-center gap-8 px-10 py-4 bg-white rounded-full border border-amber-100 hover:border-amber-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40">Full Hardware Catalog</span>
            </div>
            <div className="h-4 w-[1px] bg-amber-100"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A3728] group-hover:text-amber-600 flex items-center gap-2">
              Browse Everything <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
