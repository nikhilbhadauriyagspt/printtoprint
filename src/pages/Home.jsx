import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedTabs from "@/components/FeaturedTabs";
import ProductAccordion from "@/components/ProductAccordion";
import { Shield, Wrench, ArrowUpRight, Headphones, Globe, ChevronRight, Zap, Target, PieChart, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    printers: [],
    accessories: [],
    all: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data.filter(p => !p.name.toLowerCase().includes('laptop') && !p.name.toLowerCase().includes('macbook') && !p.name.toLowerCase().includes('notebook'));
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          setData({
            all,
            printers,
            accessories,
            categories: catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')),
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Authorized HP Partner | Premium Printers, Genuine Ink & Toner" 
        description="Shop authorized HP printers, genuine ink, toner, and premium tech accessories at PrintToPrint. Your trusted partner for high-performance printing solutions in Hickory Hills, IL and nationwide."
        keywords="HP Authorized Partner, Buy HP Printers Online, Genuine HP Ink and Toner, HP LaserJet, HP OfficeJet, Printer Accessories, Business Printing Solutions, Hickory Hills Tech Store"
      />
      
      {/* 1. HERO */}
      <Hero products={data.all} />

      {/* 2. FEATURES */}
      <Features />

      {/* 3. NEW ARRIVALS */}
      <SpotlightSection products={data.all} />

      {/* 4. DEPARTMENT GALLERY */}
      <ShopByCategory categories={data.categories} />

      {/* 5. FEATURED PRODUCTS (TABS) */}
      <FeaturedTabs 
        printers={data.printers} 
        accessories={data.accessories} 
      />

      {/* 6. INTERACTIVE ACCORDION */}
      <ProductAccordion products={data.all} />

      {/* 8. QUICK STATS STRIP */}
    </div>
  );
}
