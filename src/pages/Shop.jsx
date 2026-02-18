import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  ShoppingBag, 
  Heart,
  X,
  Loader2,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronRight,
  Minus,
  Plus,
  Star
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

  // Filters - prioritize search params
  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if(d.status === 'success') {
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
          // Filter out laptop products
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
    <div className="bg-white min-h-screen font-sans selection:bg-brand selection:text-white">
      <SEO 
        title="Shop Premium Tech | Printiply" 
        description="Browse our authorized catalog of high-performance laptops, professional printers, and genuine accessories."
      />
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto pt-32 pb-12 px-6 md:px-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-slate-900">Catalog</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                  {category || brand || 'All Products'}
                </h1>
                <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base leading-relaxed">
                  Discover {total} premium devices engineered for performance and reliability.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative group w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full md:w-80 pl-12 pr-4 h-12 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all shadow-sm placeholder:text-slate-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR FILTERS (DESKTOP) --- */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10 sticky top-32 h-fit">
            
            {/* Active Filters */}
            {(category || brand) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Active Filters</span>
                  <button onClick={() => navigate('/shop')} className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-wider">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category && (
                    <button onClick={() => updateFilter('category', '')} className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 text-brand rounded-lg text-[10px] font-bold uppercase border border-brand/10 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all group">
                      {category} <X size={10} className="group-hover:scale-110" />
                    </button>
                  )}
                  {brand && (
                    <button onClick={() => updateFilter('brand', '')} className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 text-brand rounded-lg text-[10px] font-bold uppercase border border-brand/10 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all group">
                      {brand} <X size={10} className="group-hover:scale-110" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Departments</span>
              <div className="space-y-1">
                <button 
                  onClick={() => updateFilter('category', '')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${!category ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Departments
                </button>
                {categories.map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <div className={`flex items-center justify-between group rounded-lg transition-all ${category === cat.slug ? 'bg-brand/5' : 'hover:bg-slate-50'}`}>
                      <button 
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`flex-1 text-left px-3 py-2 text-xs font-bold transition-colors ${category === cat.slug ? 'text-brand' : 'text-slate-600 group-hover:text-slate-900'}`}
                      >
                        {cat.name}
                      </button>
                      {cat.children && cat.children.length > 0 && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleCategory(cat.id); }}
                          className="p-2 text-slate-400 hover:text-brand"
                        >
                          {expandedCategories[cat.id] ? <Minus size={12} /> : <Plus size={12} />}
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
                          <div className="pl-6 border-l border-slate-100 ml-3 space-y-1 py-1">
                            {cat.children.map(sub => (
                              <button 
                                key={sub.id}
                                onClick={() => updateFilter('category', sub.slug)}
                                className={`block w-full text-left py-1.5 text-[11px] font-medium transition-colors ${category === sub.slug ? 'text-brand font-bold' : 'text-slate-500 hover:text-slate-900'}`}
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
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Brands</span>
              <div className="space-y-2">
                {brands.slice(0, 10).map(b => (
                  <label key={b.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${brand === b.name ? 'bg-brand border-brand' : 'border-slate-300 bg-white group-hover:border-brand'}`}>
                      {brand === b.name && <Check size={10} className="text-white" />}
                    </div>
                    <button 
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={`text-xs font-medium transition-colors uppercase tracking-tight ${brand === b.name ? 'text-brand font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}
                    >
                      {b.name}
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range (Visual Only for now) */}
            <div className="space-y-5">
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Price Range</span>
               <div className="flex items-center gap-4 text-xs font-bold text-slate-900">
                  <span className="bg-slate-50 px-3 py-2 rounded border border-slate-100">$0</span>
                  <span className="h-px bg-slate-200 flex-1"></span>
                  <span className="bg-slate-50 px-3 py-2 rounded border border-slate-100">$5000+</span>
               </div>
            </div>

          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sticky top-[80px] z-30 bg-white/90 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:static lg:bg-transparent lg:py-0">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all w-fit shadow-lg shadow-slate-900/10"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>

              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <span className="text-slate-900">{total}</span> Results Found
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort By</span>
                  <div className="relative">
                    <select 
                      value={sort}
                      onChange={(e) => updateFilter('sort', e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 pl-4 pr-8 py-2 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-brand cursor-pointer uppercase tracking-tight"
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="name_asc">Name: A to Z</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="hidden sm:flex bg-slate-50 rounded-lg p-1 border border-slate-100">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-brand shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white text-brand shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-brand mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Catalog...</p>
              </div>
            ) : products.length === 0 ? (
               <div className="py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <div className="inline-flex h-16 w-16 bg-white rounded-full items-center justify-center shadow-sm mb-6">
                    <Search size={24} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">No Matches Found</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">We couldn't find any products matching your current filters. Try adjusting your search or clearing filters.</p>
                  <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg">Clear All Filters</button>
               </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {products.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative bg-white rounded-2xl border border-slate-100 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5 transition-all duration-500 overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'flex-col'}`}
                  >
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                       {p.brand_name && (
                         <span className="bg-slate-900/90 backdrop-blur-sm text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded">
                           {p.brand_name}
                         </span>
                       )}
                       {i < 3 && (
                         <span className="bg-brand/90 backdrop-blur-sm text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded flex items-center gap-1">
                           <Star size={8} fill="currentColor" /> Hot
                         </span>
                       )}
                    </div>

                    {/* Wishlist */}
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                      className={`absolute top-4 right-4 z-10 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isInWishlist(p.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-300 hover:text-red-500 hover:bg-red-50'}`}
                    >
                      <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Image Area */}
                    <Link to={`/product/${p.slug}`} className={`relative block overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 shrink-0 bg-slate-50 rounded-xl' : 'aspect-[4/5] bg-slate-50'}`}>
                      <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                        <img 
                          src={getImagePath(p.images)} 
                          alt={p.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      
                      {/* Quick Add Overlay (Grid Mode) */}
                      {viewMode === 'grid' && (
                        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            disabled={addedItems[p.id]}
                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-lg ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-brand'}`}
                          >
                            {addedItems[p.id] ? (
                              <><Check size={14} /> Added</>
                            ) : (
                              <><ShoppingBag size={14} /> Quick Add</>
                            )}
                          </button>
                        </div>
                      )}
                    </Link>

                    {/* Content Area */}
                    <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 py-2 pr-4' : 'p-5'}`}>
                      <div className="mb-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category_name || 'Electronics'}</span>
                      </div>
                      <Link to={`/product/${p.slug}`} className="block mb-2">
                        <h3 className={`font-bold text-slate-900 group-hover:text-brand transition-colors uppercase tracking-tight line-clamp-2 ${viewMode === 'list' ? 'text-xl' : 'text-sm leading-relaxed'}`}>
                          {p.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-lg font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</p>
                        
                        {viewMode === 'list' && (
                           <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            disabled={addedItems[p.id]}
                            className={`px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-brand'}`}
                          >
                            {addedItems[p.id] ? 'Added' : 'Add to Cart'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Pagination (Simplified for UI) */}
            {total > 0 && products.length > 0 && (
               <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col items-center gap-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {products.length} of {total} products</p>
                  <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-900 w-1/3 rounded-full" />
                  </div>
                  {/* Ideally, add full pagination here later */}
               </div>
            )}

          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/50 z-[100] backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-slate-50 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 {/* Mobile version of sidebar filters */}
                 <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Departments</span>
                    <div className="space-y-2">
                       {categories.map(cat => (
                          <div key={cat.id}>
                             <button 
                               onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                               className={`block w-full text-left py-2 text-sm font-bold ${category === cat.slug ? 'text-brand' : 'text-slate-700'}`}
                             >
                               {cat.name}
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Brands</span>
                    <div className="flex flex-wrap gap-2">
                       {brands.map(b => (
                          <button 
                            key={b.id}
                            onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase border ${brand === b.name ? 'bg-brand text-white border-brand' : 'bg-slate-50 border-transparent text-slate-600'}`}
                          >
                            {b.name}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button 
                  onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}