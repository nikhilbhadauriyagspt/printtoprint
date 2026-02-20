import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);

          // Fetch related products
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;

          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) {
            fetchUrl += `&category=${categorySlug}`;
          } else if (brand) {
            fetchUrl += `&brand=${brand}`;
          }

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFEF7]">
        <Loader2 className="animate-spin h-10 w-10 text-amber-500 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-900/30">Analyzing Hardware...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#FFFEF7]">
        <h2 className="text-3xl font-bold text-[#4A3728] mb-4">Device Not Found</h2>
        <Link to="/shop" className="px-10 py-4 bg-[#4A3728] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">Return to Inventory</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600";

  return (
    <div className="bg-[#FFFEF7] min-h-screen font-snpro selection:bg-amber-500 selection:text-white pt-24 pb-20">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1600px] mx-auto px-6">

        {/* --- NANO BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 mb-12">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-amber-600 transition-colors">Inventory</Link>
          <ChevronRight size={10} />
          <span className="text-[#4A3728] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Stage: Visual Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="aspect-square bg-white rounded-[3rem] border border-amber-100 flex items-center justify-center p-12 overflow-hidden relative group shadow-sm"
            >
              <img
                src={mainImage} alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-8 right-8 h-11 w-11 rounded-full flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-red-500 text-white shadow-md' : 'bg-amber-50 text-amber-300 hover:text-red-500 hover:bg-white shadow-sm'}`}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={`h-24 w-24 rounded-[1.5rem] border-2 flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white ${activeImage === idx ? 'border-amber-500 shadow-md' : 'border-amber-50 hover:border-amber-200'}`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Stage: Tech Specs & Control */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-amber-100">
                  {product.brand_name || 'AUTHENTIC'}
                </span>
                <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-bold uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  System Ready
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3728] leading-[1] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-[#4A3728]">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-amber-900/20 line-through">${product.sale_price}</span>
                )}
              </div>

              {product.description && (
                <div className="relative pt-6">
                  <div className="absolute top-0 left-0 h-1 w-12 bg-amber-200 rounded-full" />
                  <p className="text-amber-900/60 text-base lg:text-lg font-medium leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* Controller Module */}
            <div className="space-y-10">
              <div className="flex flex-wrap gap-4">
                <div className="h-14 px-4 bg-white rounded-xl border border-amber-100 flex items-center gap-6 shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-lg font-bold text-[#4A3728] w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart} disabled={isAdded}
                  className={`flex-grow h-14 rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] ${isAdded ? 'bg-emerald-500 text-white' : 'bg-[#4A3728] text-white hover:bg-amber-800'}`}
                >
                  {isAdded ? <><CheckCircle size={18} /> Synchronized</> : <><ShoppingBag size={18} /> Acquire Item</>}
                </button>

                <button className="h-14 w-14 bg-amber-50 border border-amber-100 text-[#4A3728] rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-sm">
                  <Share2 size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Verified Trust Strip */}
              <div className="grid grid-cols-3 gap-4 pt-10 border-t border-amber-100">
                {[
                  { icon: Truck, label: "Express" },
                  { icon: ShieldCheck, label: "Warranty" },
                  { icon: RefreshCcw, label: "7-Day RMA" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2 group">
                    <div className="h-10 w-10 rounded-xl bg-white border border-amber-50 flex items-center justify-center text-amber-400 group-hover:text-amber-600 transition-colors">
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-amber-900/30 group-hover:text-amber-900/60 transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- DISCOVERY STAGE (Related) --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-amber-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3 opacity-40">
                  <div className="h-[1px] w-8 bg-amber-900" />
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">Personalized</span>
                </div>
                <h2 className="text-4xl font-bold text-[#4A3728] tracking-tight">System Discovery.</h2>
              </div>
              <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-600 flex items-center gap-2">
                Explore Full Range <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group" onClick={() => window.scrollTo(0, 0)}>
                  <div className="aspect-square bg-white rounded-[2rem] border border-amber-100/50 group-hover:border-amber-300 transition-all duration-500 flex items-center justify-center p-6 relative overflow-hidden shadow-sm group-hover:shadow-lg">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-[7px] font-bold text-amber-500 uppercase tracking-widest">{p.brand_name}</p>
                    <h4 className="text-[12px] font-bold text-[#4A3728] group-hover:text-amber-600 transition-colors capitalize line-clamp-1">{p.name}</h4>
                    <span className="text-sm font-bold text-[#4A3728]">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
