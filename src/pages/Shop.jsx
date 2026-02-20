import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  ShoppingBag,
  Heart,
  X,
  Loader2,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Filters
  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          setCategories(filtered);
        }
      });
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p =>
            !p.name.toLowerCase().includes('laptop') &&
            !p.name.toLowerCase().includes('macbook') &&
            !p.name.toLowerCase().includes('notebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (pathCategory && !newParams.get('category')) newParams.set('category', pathCategory);
    if (pathBrand && !newParams.get('brand')) newParams.set('brand', pathBrand);

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0]}`;
      }
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-[#FFFEF7] min-h-screen font-sans selection:bg-amber-500 selection:text-white pt-24 pb-20">
      <SEO
        title="Inventory Command Center | PrintToPrint"
        description="Browse our authorized catalog of high-performance hardware."
      />

      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-[1800px] mx-auto px-6 mb-10">
        <div className="flex flex-col gap-8">
          
          {/* Breadcrumb & Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Inventory</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#4A3728] capitalize tracking-tight">
                {category || brand || 'Global Catalog'}
              </h1>
              <span className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                <Check size={12} /> Authorized Partner Stock
              </span>
            </div>
          </div>

          {/* Control Bar */}
          <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-xl rounded-2xl border border-amber-100/50 p-2 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Mobile Filter & Count */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#4A3728] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-md w-full md:w-auto justify-center"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="hidden lg:flex items-center gap-2 px-4">
                <Filter size={14} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40">System Filters</span>
              </div>
              <div className="h-8 w-px bg-amber-100 hidden lg:block"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900/60 whitespace-nowrap">
                <span className="text-[#4A3728]">{total}</span> Units Active
              </span>
            </div>

            {/* Right: Search, Sort, View */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative group flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search SKU or Name..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 h-10 bg-amber-50/50 border border-amber-100 rounded-xl text-xs font-bold text-[#4A3728] focus:outline-none focus:bg-white focus:border-amber-300 transition-all placeholder:text-amber-900/30"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={14} />
              </div>

              <div className="relative hidden sm:block">
                <select
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="appearance-none bg-amber-50/50 border border-amber-100 pl-4 pr-8 h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-amber-900/70 focus:outline-none focus:bg-white focus:border-amber-300 cursor-pointer"
                >
                  <option value="newest">Newest Drop</option>
                  <option value="price_low">Price: Low - High</option>
                  <option value="price_high">Price: High - Low</option>
                  <option value="name_asc">Name: A - Z</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
              </div>

              <div className="hidden sm:flex bg-amber-50 rounded-xl p-1 border border-amber-100">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-amber-600 shadow-sm' : 'text-amber-900/30 hover:text-amber-900/60'}`}>
                  <LayoutGrid size={14} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-amber-600 shadow-sm' : 'text-amber-900/30 hover:text-amber-900/60'}`}>
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- SIDEBAR PANEL (Floating) --- */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-48 h-fit">
            
            {/* Categories */}
            <div className="bg-white rounded-3xl p-6 border border-amber-100/50 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/40 block mb-4 ml-1">Departments</span>
              <div className="space-y-1">
                <button
                  onClick={() => updateFilter('category', '')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all flex items-center justify-between ${!category ? 'bg-[#4A3728] text-white shadow-md' : 'text-amber-900/60 hover:bg-amber-50'}`}
                >
                  All Inventory
                </button>
                {categories.map(cat => (
                  <div key={cat.id}>
                    <div className={`flex items-center justify-between group rounded-xl transition-all ${category === cat.slug ? 'bg-amber-50' : 'hover:bg-amber-50/50'}`}>
                      <button
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`flex-1 text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${category === cat.slug ? 'text-amber-700' : 'text-amber-900/60 group-hover:text-amber-900'}`}
                      >
                        {cat.name}
                      </button>
                      {cat.children && cat.children.length > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCategory(cat.id); }}
                          className="p-2.5 text-amber-400 hover:text-amber-600"
                        >
                          {expandedCategories[cat.id] ? <Minus size={10} /> : <Plus size={10} />}
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedCategories[cat.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l border-amber-100 ml-4 space-y-1 py-1 my-1">
                            {cat.children.map(sub => (
                              <button
                                key={sub.id}
                                onClick={() => updateFilter('category', sub.slug)}
                                className={`block w-full text-left px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors rounded-lg ${category === sub.slug ? 'text-amber-600 bg-amber-50' : 'text-amber-900/40 hover:text-amber-900'}`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white rounded-3xl p-6 border border-amber-100/50 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/40 block mb-4 ml-1">Manufacturers</span>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {brands
                  .filter(b => products.some(p => p.brand_name === b.name) || brand === b.name)
                  .map(b => (
                  <label key={b.id} className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-amber-50/50 transition-colors">
                    <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${brand === b.name ? 'bg-amber-600 border-amber-600' : 'border-amber-200 bg-white group-hover:border-amber-400'}`}>
                      {brand === b.name && <Check size={10} className="text-white" />}
                    </div>
                    <button
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${brand === b.name ? 'text-amber-800' : 'text-amber-900/60 group-hover:text-amber-900'}`}
                    >
                      {b.name}
                    </button>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* --- PRODUCT GRID (Center Stage) --- */}
          <div className="flex-1">
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-amber-50">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500 mb-4" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-900/40">Syncing Inventory...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-amber-200">
                <div className="inline-flex h-20 w-20 bg-amber-50 rounded-full items-center justify-center shadow-sm mb-6 text-amber-300">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#4A3728] mb-2">No Matches Found</h3>
                <p className="text-amber-900/50 text-sm max-w-md mx-auto mb-8 font-medium">We couldn't find any hardware matching your specs. Try resetting your filters.</p>
                <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-[#4A3728] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg">Reset Filters</button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative bg-white rounded-[2rem] border border-amber-100/50 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500 overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-8' : 'flex-col p-5'}`}
                  >
                    {/* Nano Badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="px-2.5 py-1 bg-amber-50/90 backdrop-blur-md border border-amber-100 rounded-full text-[7px] font-bold uppercase tracking-widest text-amber-600">
                        {p.brand_name || 'OEM'}
                      </span>
                    </div>

                    {/* Wishlist Action */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                      className={`absolute top-5 right-5 z-10 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isInWishlist(p.id) ? 'bg-red-500 text-white shadow-md' : 'bg-white border border-amber-50 text-amber-200 hover:text-red-500 hover:border-red-100'}`}
                    >
                      <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Visual */}
                    <Link to={`/product/${p.slug}`} className={`relative block overflow-hidden rounded-2xl bg-amber-50/20 ${viewMode === 'list' ? 'w-40 h-40 shrink-0' : 'aspect-square'}`}>
                      <div className="absolute inset-0 flex items-center justify-center p-6 group-hover:scale-110 transition-transform duration-700">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </Link>

                    {/* Data */}
                    <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 py-2 pr-4' : 'pt-4'}`}>
                      <div className="mb-1">
                        <span className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest">{p.category_name || 'Hardware'}</span>
                      </div>
                      <Link to={`/product/${p.slug}`} className="block mb-3">
                        <h3 className={`font-bold text-[#4A3728] group-hover:text-amber-600 transition-colors capitalize ${viewMode === 'list' ? 'text-lg' : 'text-[13px] leading-snug line-clamp-2'}`}>
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-base font-bold text-[#4A3728]">${parseFloat(p.price).toLocaleString()}</p>

                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          disabled={addedItems[p.id]}
                          className={`h-9 px-4 rounded-xl flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest transition-all shadow-md ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-[#4A3728] text-white hover:bg-amber-600'}`}
                        >
                          {addedItems[p.id] ? <Check size={14} /> : (viewMode === 'list' ? 'Add to Cart' : <Plus size={14} />)}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER (Consistent Theme) --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#4A3728]/20 z-[100] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FFFEF7] z-[101] shadow-2xl flex flex-col lg:hidden border-l border-amber-100"
            >
              <div className="p-6 border-b border-amber-100 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-[#4A3728]">Refine Results</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-amber-50 rounded-full text-amber-900">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Mobile Filters Content */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/40 block">Departments</span>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={`block w-full text-left py-2 text-xs font-bold uppercase tracking-wide rounded-lg px-2 ${category === cat.slug ? 'bg-amber-100 text-amber-800' : 'text-amber-900/70'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-amber-100 bg-amber-50/50">
                <button
                  onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                  className="w-full py-4 bg-[#4A3728] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
