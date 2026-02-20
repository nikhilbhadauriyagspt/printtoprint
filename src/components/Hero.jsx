import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Zap, ShieldCheck, Headphones, Globe, Plus, Heart, Sparkles, TrendingUp } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

// Import corrected local banner assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: 1,
    tag: "Pro-Series 2026",
    title: "Revolutionary",
    highlight: "Print Mastery.",
    desc: "Experience high-fidelity LaserJet performance. Engineered for creators who demand absolute clarity and seamless connectivity.",
    image: banner1,
    cta: "Explore Series",
    link: "/shop"
  },
  {
    id: 2,
    tag: "Authorized Premium Hub",
    title: "Master Every",
    highlight: "Pixel & Page.",
    desc: "Genuine HP solutions designed to optimize your workflow and deliver vibrant, professional results with every single pass.",
    image: banner2,
    cta: "Shop Catalog",
    link: "/shop"
  },
  {
    id: 3,
    tag: "Precision Hardware",
    title: "Excellence in",
    highlight: "Every Detail.",
    desc: "Your dedicated source for authentic HP hardware and precision consumables. Elevate your professional output with our curated inventory.",
    image: banner3,
    cta: "View Collection",
    link: "/shop"
  },
  {
    id: 4,
    tag: "Digital Ecosystem",
    title: "The Future of",
    highlight: "Productivity.",
    desc: "Discover the new standard in professional printing. High-volume performance meets sustainable design for the modern workspace.",
    image: banner4,
    cta: "Explore Tech",
    link: "/shop"
  }
];

export default function Hero({ products = [] }) {
  const { openSearch, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400";
    } catch (e) { return "https://via.placeholder.com/400x400"; }
  };

  return (
    <div className="relative w-full h-screen min-h-[900px] bg-[#FFFEF7] overflow-hidden mt-[-80px] lg:mt-[-110px]">

      {/* Background Layer: Immersive Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover mix-blend-multiply opacity-50 lg:opacity-70"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Stage */}
      <div className="relative z-10 h-full max-w-[1920px] mx-auto px-6 lg:px-16 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full pt-32 lg:pt-48">

          {/* Left Side: Content (Within the solid gradient zone) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-8">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-amber-100 shadow-sm mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.3em]">{slides[current].tag}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3728] leading-[1.1] tracking-tight mb-6">
                {slides[current].title} <br />
                <span className="text-amber-500 font-light italic">{slides[current].highlight}</span>
              </h1>

              <p className="text-amber-900/60 text-base lg:text-lg font-medium leading-relaxed max-w-md mb-10">
                {slides[current].desc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={slides[current].link}
                  className="h-12 px-8 bg-[#4A3728] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-amber-800 transition-all shadow-md active:scale-95 group"
                >
                  {slides[current].cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={openSearch}
                  className="h-12 px-6 bg-white/80 backdrop-blur-md text-amber-900 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-amber-50 transition-all border border-amber-100 shadow-sm"
                >
                  <Search size={14} className="text-amber-400" /> Search Catalog
                </button>
              </div>
            </motion.div>

            {/* Slide Navigation */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-amber-500' : 'w-2.5 bg-amber-200'}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button onClick={prevSlide} className="h-9 w-9 rounded-xl bg-white border border-amber-50 flex items-center justify-center text-amber-900/40 hover:text-amber-600 transition-all shadow-sm"><ChevronLeft size={16} /></button>
                <button onClick={nextSlide} className="h-9 w-9 rounded-xl bg-[#4A3728] flex items-center justify-center text-white hover:bg-amber-800 transition-all shadow-md"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>

          {/* Right Side: Showcase Strip */}
          <div className="lg:col-span-6 xl:col-span-7 hidden lg:flex flex-col justify-end h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <TrendingUp size={14} className="text-amber-500" />
                  <span className="text-[9px] font-bold text-[#4A3728] uppercase tracking-[0.2em]">Hot Selections</span>
                </div>
                <Link to="/shop" className="text-[8px] font-bold text-amber-600 uppercase tracking-widest hover:underline">Full Store</Link>
              </div>

              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={16}
                slidesPerView={3.2}
                freeMode={true}
                autoplay={{ delay: 4000 }}
                className="w-full"
              >
                {products.slice(0, 10).map((product) => (
                  <SwiperSlide key={product.id}>
                    <Link
                      to={`/product/${product.slug}`}
                      className="group flex flex-col gap-3 p-4 rounded-2xl bg-white/60 border border-transparent hover:border-amber-100 hover:bg-white hover:shadow-lg transition-all duration-500"
                    >
                      <div className="h-20 w-full rounded-xl bg-amber-50/30 flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform duration-500">
                        <img src={getImagePath(product.images)} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[#4A3728] truncate">{product.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-amber-500">${product.price}</span>
                          <Plus size={10} className="text-amber-200 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-sm border-t border-amber-100/10 py-3 hidden md:block">
        <div className="max-w-[1920px] mx-auto px-16 flex justify-between items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} /> <span className="text-[8px] font-bold uppercase tracking-widest text-[#4A3728]">Authorized HP Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} /> <span className="text-[8px] font-bold uppercase tracking-widest text-[#4A3728]">Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} /> <span className="text-[8px] font-bold uppercase tracking-widest text-[#4A3728]">Technical Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones size={14} /> <span className="text-[8px] font-bold uppercase tracking-widest text-[#4A3728]">Business Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
