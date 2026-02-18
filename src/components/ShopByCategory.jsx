import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Layers } from "lucide-react";
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
    <section className="py-20 bg-white font-snpro overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Editorial Header - Stylish & Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex gap-6 items-center">
            {/* Vertical Decorative Bar */}
            <div className="hidden md:block h-16 w-1.5 bg-brand rounded-full"></div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-brand"></div>
                Departments
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand uppercase tracking-tight leading-none">
                Explore <span className="text-slate-400 italic">Range.</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="cat-prev h-14 w-14 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
                <ChevronLeft size={22} className="group-active:scale-75 transition-transform" />
             </button>
             <button className="cat-next h-14 w-14 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
                <ChevronRight size={22} className="group-active:scale-75 transition-transform" />
             </button>
          </div>
        </div>

        {/* Boutique Tiles Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1440: { slidesPerView: 4.5 },
              1800: { slidesPerView: 5.5 },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {subcategories.map((item, i) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="group relative flex flex-col"
                  >
                    {/* The Boutique Tile */}
                    <div className="relative aspect-square rounded-[3rem] bg-slate-50 border border-transparent transition-all duration-700 group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                      
                      {/* Image Layer - Full Width & Rounded */}
                      <div className="absolute inset-0 p-3">
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-[2.5rem] transition-all duration-700 opacity-80 group-hover:opacity-100"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Architectural Label (Top Left) */}
                      <div className="absolute top-8 left-8 z-20">
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em] bg-white/80 backdrop-blur-md px-2 py-0.5 rounded w-fit shadow-sm">Code {i + 101}</span>
                            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tighter leading-none group-hover:text-white transition-colors drop-shadow-sm">
                              {item.name}
                            </h3>
                         </div>
                      </div>

                      {/* Corner Icon */}
                      <div className="absolute top-8 right-8 h-10 w-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                         <Plus size={20} />
                      </div>

                      {/* Footer Badge (Bottom Left) */}
                      <div className="absolute bottom-8 left-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <div className="px-4 py-2 bg-white text-slate-950 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                            Explore <ArrowRight size={10} />
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Section Footer - Standardized */}
        <div className="mt-20 flex justify-center">
           <div className="flex items-center gap-8 px-10 py-4 bg-slate-50/50 rounded-full border border-slate-100">
              <div className="flex items-center gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-brand"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Premium Authorized Inventory</span>
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-brand transition-colors">Browse Full Catalog</Link>
           </div>
        </div>
      </div>
    </section>
  );
}
