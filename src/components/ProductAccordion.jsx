import { motion } from "framer-motion";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function ProductAccordion({ products = [] }) {
  const { addToCart } = useCart();
  const displayProducts = products.slice(0, 12);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-[#FFFEF7] font-snpro">
      <div className="max-w-[1800px] mx-auto px-6">
        
        {/* --- STANDARDIZED SECTION HEADER --- */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3 opacity-40">
            <div className="h-[1px] w-8 bg-amber-900" />
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Curated</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">
              Elite <span className="text-amber-500 italic font-light">Archive.</span>
            </h2>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-600 transition-all flex items-center gap-2">
              View Complete Index <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* --- NANO CAROUSEL --- */}
        <div className="relative group">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1.5}
            freeMode={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4.5 },
              1440: { slidesPerView: 5.5 },
            }}
            className="!overflow-visible"
          >
            {displayProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group/card relative bg-white rounded-[2rem] border border-amber-100/50 p-6 transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(180,83,9,0.1)] hover:border-amber-300"
                >
                  <div className="aspect-square rounded-2xl bg-amber-50/20 flex items-center justify-center p-4 mb-6 relative overflow-hidden">
                    <img 
                      src={p.images ? JSON.parse(p.images)[0] : ''} 
                      alt="" 
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <button 
                      onClick={() => addToCart(p)}
                      className="absolute bottom-3 right-3 h-9 w-9 rounded-xl bg-[#4A3728] text-white flex items-center justify-center shadow-lg translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 hover:bg-amber-600"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] font-bold text-[#4A3728] line-clamp-1 group-hover/card:text-amber-600 transition-colors capitalize leading-tight">{p.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm font-bold text-[#4A3728]">${parseFloat(p.price).toLocaleString()}</p>
                      <div className="flex items-center gap-1 opacity-20 group-hover/card:opacity-100 transition-opacity">
                        <div className="h-1 w-1 rounded-full bg-emerald-500" />
                        <span className="text-[8px] font-bold text-amber-900 uppercase">In Stock</span>
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
