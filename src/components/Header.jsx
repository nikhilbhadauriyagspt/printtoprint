import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ChevronDown, X,
  Package,
  ArrowRight,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone,
  Menu,
  Zap,
  Globe,
  Headphones,
  ShoppingBasket,
  Laptop,
  Printer,
  MousePointer2,
  Monitor,
  Cpu,
  Smartphone,
  Sparkles,
  TrendingUp,
  Award,
  Truck,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);
          setSuggestions({
            products: pData.status === 'success' ? pData.data : [],
            categories: matchedCats
          });
        } catch (err) { console.error(err); } finally { setIsSearching(false); }
      } else { setSuggestions({ products: [], categories: [] }); }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeSearch();
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filtered = data.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser?.role === 'admin' ? null : parsedUser);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('laptop')) return <Laptop size={18} />;
    if (n.includes('printer')) return <Printer size={18} />;
    if (n.includes('accessor')) return <MousePointer2 size={18} />;
    if (n.includes('monitor')) return <Monitor size={18} />;
    if (n.includes('component')) return <Cpu size={18} />;
    if (n.includes('phone')) return <Smartphone size={18} />;
    return <Package size={18} />;
  };

  return (
    <>
      {/* --- MODULAR TRI-PANEL HEADER --- */}
      <header className={`fixed left-0 w-full z-[150] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? 'top-1' : 'top-3'}`}>
        <div className="max-w-[1920px] mx-auto px-4 lg:px-12 flex items-center justify-between pointer-events-none">

          {/* Panel 1: Navigation Hub */}
          <div className="flex-1 flex items-center pointer-events-auto">
            <div className={`flex items-center gap-1 p-1.5 rounded-full border border-amber-100/50 transition-all duration-500 shadow-sm ${scrolled ? 'bg-white shadow-lg' : 'bg-[#FFFDF2]/90 backdrop-blur-md'}`}>
              <div className="flex items-center">
                <Link to="/" className="px-4 py-2 text-[10px] font-bold text-amber-900 uppercase tracking-widest hover:text-amber-600 transition-all">Home</Link>
                <Link to="/shop" className="px-4 py-2 text-[10px] font-bold text-amber-900 uppercase tracking-widest hover:text-amber-600 transition-all">Store</Link>
                <Link to="/about" className="px-4 py-2 text-[10px] font-bold text-amber-900 uppercase tracking-widest hover:text-amber-600 transition-all">About</Link>
                <Link to="/contact" className="px-4 py-2 text-[10px] font-bold text-amber-900 uppercase tracking-widest hover:text-amber-600 transition-all">Contact</Link>
                <Link to="/faq" className="hidden xl:block px-4 py-2 text-[10px] font-bold text-amber-900 uppercase tracking-widest hover:text-amber-600 transition-all">FAQ</Link>

                <div className="h-4 w-px bg-amber-100 mx-2"></div>

                <div
                  onMouseEnter={() => setActiveDropdown('categories')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative"
                >
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                    className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2 ${activeDropdown === 'categories' ? 'text-amber-600 bg-amber-50' : 'text-amber-900/70 hover:text-amber-900'}`}
                  >
                    Explore <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'categories' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="absolute top-full -left-20 pt-4 w-[1100px] z-[160]"
                      >
                        <div className="bg-white rounded-[3rem] shadow-[0_60px_100px_-20px_rgba(180,83,9,0.15)] border border-amber-100 overflow-hidden flex min-h-[550px]">

                          {/* Zone 1: Vertical Category List (Left) */}
                          <div className="w-[25%] bg-amber-50/20 p-8 border-r border-amber-100/30">
                            <div className="flex items-center gap-2 mb-8 ml-2">
                              <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse"></div>
                              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-900/40">Inventory</span>
                            </div>
                            <div className="space-y-1.5">
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onMouseEnter={() => setHoveredParent(cat.id)}
                                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 ${String(hoveredParent) === String(cat.id) ? 'bg-white shadow-md text-amber-700 -translate-y-0.5' : 'text-amber-900/40 hover:text-amber-900 hover:bg-white/40'}`}
                                >
                                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${String(hoveredParent) === String(cat.id) ? 'bg-amber-100 text-amber-600' : 'bg-amber-50 text-amber-200'}`}>
                                    {getCategoryIcon(cat.name)}
                                  </div>
                                  <span className="text-[13px] font-bold capitalize">{cat.name}</span>
                                  <ChevronRight size={14} className={`ml-auto transition-all ${String(hoveredParent) === String(cat.id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Zone 2: Sub-Category Grid (Middle) */}
                          <div className="w-[50%] p-12 bg-white relative overflow-hidden">
                            <div className="relative z-10">
                              <div className="flex items-end justify-between mb-10 pb-6 border-b border-amber-50">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-amber-500">
                                    <Sparkles size={12} />
                                    <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Authorized Selection</span>
                                  </div>
                                  <h3 className="text-3xl font-bold text-[#4A3728] capitalize">{activeParent?.name || 'Department'}</h3>
                                </div>
                                {activeParent && (
                                  <Link to={`/shop?category=${activeParent.slug}`} onClick={() => setActiveDropdown(null)} className="text-[9px] font-bold uppercase tracking-widest text-amber-500 hover:text-amber-700 flex items-center gap-1.5">
                                    Browse All <ArrowRight size={12} />
                                  </Link>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                {subCategoriesToDisplay.length > 0 ? (
                                  subCategoriesToDisplay.map(sub => (
                                    <Link
                                      key={sub.id}
                                      to={`/shop?category=${sub.slug}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group/sub flex items-center gap-4"
                                    >
                                      <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center p-2 group-hover/sub:bg-amber-100 transition-all">
                                        <img
                                          src={sub.image ? `/${sub.image}` : `https://ui-avatars.com/api/?name=${sub.name}&background=fffbeb&color=d97706`}
                                          alt=""
                                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                                          onError={(e) => e.target.style.display = 'none'}
                                        />
                                      </div>
                                      <div className="space-y-0.5">
                                        <span className="text-[12px] font-bold text-[#4A3728] group-hover/sub:text-amber-600 transition-colors block">{sub.name}</span>
                                        <span className="text-[8px] font-bold text-amber-900/20 uppercase tracking-widest group-hover/sub:text-amber-400 transition-colors">Explore Category</span>
                                      </div>
                                    </Link>
                                  ))
                                ) : (
                                  <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center opacity-20">
                                    <Package size={32} className="text-amber-200 mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">New Arrivals coming soon</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Zone 3: Featured Promo (Right) */}
                          <div className="w-[25%] bg-[#4A3728] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10" />

                            <div className="relative z-10 space-y-6">
                              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 border border-white/5">
                                <Award size={20} />
                              </div>
                              <h4 className="text-xl font-bold leading-tight">Professional <br /><span className="text-amber-400 font-light italic">Hardware Hub.</span></h4>
                              <p className="text-[11px] font-medium text-amber-50/40 leading-relaxed uppercase tracking-wider">Certified distribution center for high-fidelity workstations and printing systems.</p>
                            </div>

                            <div className="relative z-10 space-y-4">
                              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                                <Truck size={16} className="text-amber-400" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Express Global Fleet</span>
                              </div>
                              <Link to="/shop" onClick={() => setActiveDropdown(null)} className="flex items-center justify-center gap-2 w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95">
                                Explore Pro Index <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Branding Hub (Prominent Logo + Single Tone Badge) */}
          <div className="flex-shrink-0 flex items-center justify-center pointer-events-auto mx-4 lg:mx-8">
            <Link to="/" className="group relative">
              <div className={`flex items-center transition-all duration-700 rounded-full border border-amber-100 shadow-sm bg-white/90 backdrop-blur-xl ${scrolled ? 'px-4 lg:px-6 py-1' : 'px-8 lg:px-8 py-1 lg:py-1'}`}>

                {/* Larger Logo Side */}
                <div className={`flex items-center justify-center transition-all duration-700 ${scrolled ? 'h-8 w-8 lg:h-12 lg:w-16' : 'h-10 w-10 lg:h-14 lg:w-24'}`}>
                  <img
                    src="/logo/printtoprint_logo.png"
                    alt="P"
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Permanent Vertical Separator */}
                <div className={`h-8 w-px bg-amber-100 mx-5 lg:mx-7 opacity-50 transition-all duration-700 ${scrolled ? 'h-6' : 'h-10'}`} />

                {/* Simplified Single-Tone Partner Side (Uniform Size) */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <img src="/brands/hp.png" alt="" className={`transition-all duration-700 ${scrolled ? 'h-8 w-8' : 'h-4 w-4 lg:h-10 lg:w-10'}`} />
                    <span className={`font-bold text-amber-600 uppercase tracking-widest leading-none transition-all duration-700 ${scrolled ? 'text-[8px] lg:text-[10px]' : 'text-[10px] lg:text-[13px]'}`}>Authorized</span>

                    <span className={`font-bold text-amber-600 uppercase tracking-widest leading-none transition-all duration-700 ${scrolled ? 'text-[8px] lg:text-[10px]' : 'text-[10px] lg:text-[13px]'}`}>Partner</span>

                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* Panel 3: Command Center - Expanded Search */}
          <div className="flex-1 flex justify-end items-center pointer-events-auto">
            <div className={`flex items-center gap-1.5 p-1.5 rounded-full border border-amber-100/50 transition-all duration-500 shadow-sm ${scrolled ? 'bg-white shadow-lg' : 'bg-[#FFFDF2]/90 backdrop-blur-md'}`}>

              <button
                onClick={openSearch}
                className="group flex items-center gap-3 pl-5 pr-4 h-10 w-[220px] lg:w-[320px] rounded-full bg-amber-50/50 hover:bg-amber-100/50 transition-all border border-amber-100/20 text-left"
              >
                <Search size={14} className="text-amber-600 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 group-hover:text-amber-900/60 transition-colors truncate">Search Inventory...</span>
                <div className="hidden xl:flex items-center gap-1 ml-auto opacity-20">
                  <span className="text-[9px] font-bold border border-amber-900 rounded px-1">⌘</span>
                  <span className="text-[9px] font-bold border border-amber-900 rounded px-1">K</span>
                </div>
              </button>

              <div className="h-6 w-px bg-amber-100 mx-1 hidden sm:block"></div>

              <div className="flex items-center gap-1">
                <Link to="/wishlist" className="h-10 w-10 rounded-full flex items-center justify-center text-amber-700/70 hover:bg-amber-50 hover:text-red-500 transition-all relative group">
                  <Heart size={18} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-red-500 text-white text-[7px] font-bold rounded-full flex items-center justify-center border border-white">{wishlistCount}</span>
                  )}
                </Link>

                <button
                  onClick={openCartDrawer}
                  className="h-10 w-10 rounded-full flex items-center justify-center text-amber-700/70 hover:bg-amber-50 hover:text-amber-900 transition-all relative group"
                >
                  <ShoppingBasket size={18} />
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#4A3728] text-white text-[7px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount}</span>
                </button>

                <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                    <button className="h-10 w-10 bg-[#4A3728] rounded-full flex items-center justify-center text-[10px] font-bold text-white hover:bg-amber-800 transition-all ml-1 shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                  ) : (
                    <Link to="/login" className="h-10 w-10 rounded-full flex items-center justify-center text-amber-700/70 hover:bg-amber-50 hover:text-amber-900 transition-all ml-1 border border-transparent hover:border-amber-100">
                      <User size={18} />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full right-0 mt-4 w-52 bg-white rounded-3xl shadow-2xl border border-amber-50 p-3 z-[110]"
                      >
                        <div className="px-4 py-3 mb-2 border-b border-amber-50">
                          <p className="text-[8px] font-bold text-amber-400 uppercase tracking-widest mb-0.5">Verified</p>
                          <p className="text-xs font-bold text-[#4A3728] truncate">{user.name}</p>
                        </div>
                        <div className="space-y-0.5">
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-amber-800 hover:bg-amber-50 rounded-xl transition-all uppercase tracking-wider"><User size={14} /> Profile</Link>
                          <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-amber-800 hover:bg-amber-50 rounded-xl transition-all uppercase tracking-wider"><Package size={14} /> My Orders</Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase tracking-wider mt-2 pt-3 border-t border-amber-50"><X size={14} /> End Session</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div >
      </header >

      {/* --- FULL SCREEN SEARCH OVERLAY --- */}
      <AnimatePresence AnimatePresence >
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#FFFEF7]/95 backdrop-blur-sm flex flex-col items-center pt-20 lg:pt-32 px-6"
          >
            <button
              onClick={closeSearch}
              className="absolute top-8 right-8 h-10 w-10 rounded-full bg-amber-50 text-amber-900 flex items-center justify-center hover:bg-amber-100 transition-all duration-300 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="w-full max-w-4xl space-y-12">
              <form onSubmit={handleSearch} className="relative group">
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -top-8 left-0"
                >
                  <span className="text-[10px] font-bold text-amber-500 capitalize tracking-[0.3em]">Search Catalog</span>
                </motion.div>
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-amber-200 pb-4 text-xl md:text-2xl font-semibold text-[#4A3728] placeholder:text-amber-200 focus:outline-none focus:border-amber-400 transition-all duration-500"
                />
                <button type="submit" className="absolute right-0 bottom-4 p-2 text-amber-500 hover:scale-110 active:scale-95 transition-all duration-300 group">
                  {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {(suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden z-[210] max-h-[450px] overflow-y-auto custom-scrollbar"
                    >
                      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Categories Suggestions */}
                        {suggestions.categories.length > 0 && (
                          <div className="md:col-span-4 space-y-4">
                            <span className="text-[9px] font-bold text-amber-400 capitalize tracking-widest block border-b border-amber-50 pb-3">Categories</span>
                            <div className="space-y-0.5">
                              {suggestions.categories.map(cat => (
                                <Link
                                  key={cat.id}
                                  to={`/shop?category=${cat.slug}`}
                                  onClick={() => { closeSearch(); setSearchQuery(''); }}
                                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 group transition-all"
                                >
                                  <span className="text-sm font-semibold text-amber-800 group-hover:text-amber-900">{cat.name}</span>
                                  <ChevronRight size={12} className="text-amber-200 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Product Suggestions */}
                        <div className={`${suggestions.categories.length > 0 ? 'md:col-span-8' : 'md:col-span-12'} space-y-4`}>
                          <span className="text-[9px] font-bold text-amber-400 capitalize tracking-widest block border-b border-amber-50 pb-3">Products</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {suggestions.products.map((p) => (
                              <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                onClick={() => {
                                  closeSearch();
                                  setSearchQuery('');
                                  saveSearch(searchQuery);
                                }}
                                className="flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-amber-50 hover:bg-amber-50/50 transition-all group"
                              >
                                <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center p-2 shrink-0 group-hover:bg-white transition-all shadow-sm">
                                  <img
                                    src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                    alt=""
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-[#4A3728] truncate group-hover:text-amber-700 transition-colors">{p.name}</p>
                                  <p className="text-[10px] font-semibold text-amber-400">${p.price}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSearch}
                        className="w-full py-4 bg-amber-100 text-amber-900 text-[10px] font-bold capitalize tracking-widest hover:bg-amber-200 transition-all"
                      >
                        View all search results
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Quick Links / Recent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-amber-100">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-amber-400 capitalize tracking-widest">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.length > 0 ? (
                      recentSearches.map(t => (
                        <button
                          key={t}
                          onClick={() => setSearchQuery(t)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-white hover:shadow-sm rounded-full text-[10px] font-semibold text-amber-700 transition-all border border-amber-100 flex items-center gap-2"
                        >
                          <Clock size={10} className="opacity-40" /> {t}
                        </button>
                      ))
                    ) : (
                      <p className="text-[10px] font-medium text-amber-300 italic">No recent searches</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-amber-400 capitalize tracking-widest">Trending Now</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 4).map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-700 transition-all border border-amber-100/50"><ChevronRight size={12} /></div>
                        <span className="text-[11px] font-semibold text-amber-800 group-hover:text-amber-900 transition-colors">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >

      {/* Dropdown Backdrop */}
      < AnimatePresence >
        {activeDropdown === 'categories' && (
          <div className="fixed inset-0 z-[140] bg-black/5 pointer-events-auto" onMouseEnter={() => setActiveDropdown(null)} />
        )}
      </AnimatePresence >
    </>
  );
}
