import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Zap, ShieldCheck, Headphones, Globe, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";
import banner5 from "@/assets/bannerr/banner5.jpg";
import banner6 from "@/assets/bannerr/banner6.jpg";
import banner7 from "@/assets/bannerr/banner7.jpg";

const slides = [
  {
    id: 1,
    tag: "PRO-SERIES PRINTERS",
    title: "LaserJet Pro",
    highlight: "Performance.",
    desc: "Unleash professional-grade performance with HP LaserJets. Engineered for high-volume output with crisp, permanent detail and seamless wireless integration.",
    image: banner7,
    cta: "Shop Printers",
    link: "/category/printers",
    accent: "text-brand"
  },
  {
    id: 2,
    tag: "AUTHORIZED HP INVENTORY",
    title: "Master Print",
    highlight: "Solutions.",
    desc: "Genuine HP ink and toner solutions designed to protect your investment and deliver consistent, vibrant results for every project, every time.",
    image: banner4,
    cta: "Shop Essentials",
    link: "/shop",
    accent: "text-brand"
  }
];

export default function Hero({ products = [] }) {
  const { openSearch, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400?text=Printiply";
    } catch (e) {
      return "https://via.placeholder.com/400x400?text=Printiply";
    }
  };

  return (
    <div className="bg-white font-snpro pt-4 pb-10 lg:pt-2 lg:pb-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-10">
        <section className="relative h-[75vh] md:h-[70vh] w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] bg-[#050505] group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
          
          {/* --- IMMERSIVE BACKGROUND LAYER --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Overlay Gradients - Complex Multi-layer */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent"></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30"></div>
              <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>
              
              <motion.img 
                src={slides[current].image} 
                alt="" 
                className="w-full h-full object-cover opacity-80"
                initial={{ scale: 1.1, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              />

              {/* Decorative Lines/Grid */}
              <div className="absolute inset-0 z-10 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- CONTENT LAYER --- */}
          <div className="relative z-20 h-full w-full px-8 md:px-16 lg:px-24 flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 relative z-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Premium Badge Cluster */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="h-9 px-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center gap-2.5 shadow-xl"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"></div>
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.5em]">{slides[current].tag}</span>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="h-9 px-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center gap-3"
                      >
                        <img src="/brands/hp.jpg" alt="HP" className="h-5 w-5 rounded-full object-contain brightness-110" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">HP Authorized Partner</span>
                      </motion.div>
                    </div>

                    {/* Main Headline - Ultra Premium Typography (Expansive but Stable) */}
                    <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-black text-white leading-[0.85] tracking-[-0.05em] mb-10 uppercase">
                      <span className="block overflow-hidden">
                        <motion.span 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                          className="block"
                        >
                          {slides[current].title}
                        </motion.span>
                      </span>
                      <div className="flex items-center gap-6 mt-4">
                         <motion.span 
                           initial={{ width: 0 }}
                           animate={{ width: "80px" }}
                           transition={{ duration: 1, delay: 0.4 }}
                           className="h-[2px] bg-brand/50 hidden md:block"
                         />
                         <span className={`italic font-light tracking-tighter normal-case ${slides[current].accent}`}>
                           {slides[current].highlight}
                         </span>
                      </div>
                    </h1>

                    {/* Description - Refined Weight */}
                    <div className="relative mb-6 max-w-lg">
                      <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed opacity-80">
                        {slides[current].desc}
                      </p>
                    </div>
                    {/* Action Group - Lighter & More Elegant */}
                    <div className="flex flex-wrap items-center gap-4 relative z-50">
                      <Link 
                        to={slides[current].link}
                        className="relative h-11 px-6 bg-white text-slate-950 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] overflow-hidden group/btn transition-all hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center"
                      >
                        <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors duration-500">
                          {slides[current].cta} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-500" />
                        </span>
                        <div className="absolute inset-0 bg-brand translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1]"></div>
                      </Link>

                      <button
                        onClick={openSearch}
                        className="h-11 px-5 rounded-lg bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center gap-3 text-white hover:bg-white/10 transition-all duration-500 group relative z-50"
                      >
                        <Search size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Search Catalog</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side Carousel - Glass Look */}
              <div className="lg:col-span-5 hidden lg:block relative group/carousel overflow-hidden rounded-[2.5rem] z-10">
                <div className="absolute -inset-10 bg-brand/10 blur-[100px] rounded-full opacity-30 animate-pulse"></div>
                <Swiper
                  modules={[Autoplay, FreeMode, Navigation]}
                  spaceBetween={12}
                  slidesPerView={2.2}
                  freeMode={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  className="h-full"
                >
                  {products.slice(0, 8).map((product) => (
                    <SwiperSlide key={product.id}>
                      <Link
                        to={`/product/${product.slug}`}
                        className="relative group/card aspect-[3/4] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-4 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] block"
                      >
                        <div className="absolute top-3 right-3 z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product);
                            }}
                            className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white/40 hover:text-white hover:bg-white/20'}`}
                          >
                            <Heart size={12} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                          </button>
                        </div>

                        <div className="h-[55%] flex items-center justify-center p-1">
                          <img
                            src={getImagePath(product.images)}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain group-hover/card:scale-110 transition-transform duration-700"
                          />
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-[6px] font-black text-brand uppercase tracking-[0.2em]">{product.brand_name || 'PREMIUM'}</span>
                            <h3 className="text-[10px] font-bold text-white uppercase tracking-tight line-clamp-1 mt-0.5">{product.name}</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white">${product.price}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="h-7 w-7 bg-brand rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand/20 hover:scale-110 active:scale-95 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Soft Glass Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none"></div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>              </div>

            </div>
          </div>

          {/* --- HERO STATUS BAR (Bottom) --- */}
          <div className="absolute bottom-0 left-0 right-0 z-30 hidden lg:block">
            <div className="px-24 py-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent flex items-center justify-between">

              {/* Progress Pagination - Redesigned */}
              <div className="flex items-center gap-12">
                <div className="flex gap-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrent(index);
                        setIsAutoPlaying(false);
                      }}
                      className="group flex flex-col gap-3 py-2"
                    >
                      <div className="relative h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                        {index === current ? (
                          <motion.div
                            layoutId="activeProgress"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="absolute inset-0 bg-brand"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-white/20 transition-transform duration-500 ${index < current ? 'translate-x-0' : '-translate-x-full'}`} />
                        )}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${index === current ? 'text-brand' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        0{index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="h-14 w-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all group active:scale-90"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="h-14 w-14 rounded-2xl bg-slate-900 hover:bg-brand border border-white/10 flex items-center justify-center text-white transition-all group active:scale-90 shadow-2xl"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden absolute bottom-10 left-0 right-0 px-8 flex justify-between items-center z-30">
            <div className="flex gap-3">
              {slides.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === current ? 'w-10 bg-brand' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white"><ChevronLeft size={20} /></button>
              <button onClick={nextSlide} className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white"><ChevronRight size={20} /></button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}