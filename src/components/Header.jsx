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
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load recent searches on mount
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

  // Live Search Logic
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
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
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
          // Filter out laptop categories
          const filtered = data.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          setCategories(filtered);
          if (filtered.length > 0) {
            setHoveredParent(filtered[0].id);
          }
        }
      });

    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setBrands(data.data);
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser.role === 'admin') {
        setUser(null);
      } else {
        setUser(parsedUser);
      }
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
      {/* --- ANNOUNCEMENT BAR --- */}
      <div className="bg-[#0f172a] text-white py-1.5 px-6 overflow-hidden hidden lg:block border-b border-white/5">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center text-[9px] font-black tracking-[0.2em] uppercase">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-default">
              <Zap size={10} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">Free Express Shipping on orders over $1,500</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6 group cursor-default">
              <Globe size={10} className="text-brand group-hover:rotate-12 transition-transform" />
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">International Warranty Included</span>
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6 group cursor-default">
              <div className="h-5 w-5 bg-white rounded-full p-0.5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <img src="/brands/hp.jpg" alt="HP" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <span className="opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-[0.2em] font-black text-[9px]">Official HP Authorized Partner</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="opacity-50 hover:opacity-100 hover:text-brand transition-all">Support</Link>
            <Link to="/orders" className="opacity-50 hover:opacity-100 hover:text-brand transition-all">Track Order</Link>
          </div>
        </div>
      </div>

      <header className={`fixed top-0 lg:top-8 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? 'lg:top-0 py-2' : 'lg:top-8 py-3'}`}>
        <div className="max-w-[1920px] mx-auto px-4 lg:px-10 relative">

          {/* Main Glass Header */}
          <div className={`relative flex items-center justify-between px-6 py-2.5 lg:py-3.5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[1.2rem] lg:rounded-[2rem] ${scrolled ? 'bg-white/80 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white/40' : 'bg-white/40 backdrop-blur-xl border border-white/20'}`}>

            {/* Left: Menu & Search (Desktop) */}
            <div className="hidden lg:flex flex-1 items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="h-12 w-12 bg-slate-950 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
              >
                <Menu size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
              <button
                onClick={openSearch}
                className="flex items-center justify-between gap-4 px-8 py-3.5 bg-white/50 border border-white/60 rounded-full hover:bg-white hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all group min-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <Search size={16} className="text-slate-400 group-hover:text-brand transition-all" />
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-widest">Search Inventory</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-100 rounded text-slate-400">⌘</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-100 rounded text-slate-400">K</span>
                </div>
              </button>
            </div>

            {/* Mobile: Menu Trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden h-10 w-10 flex items-center justify-center text-slate-900 bg-white/60 backdrop-blur-md rounded-full border border-white/50"
            >
              <Menu size={20} />
            </button>

            {/* Center: Logo & Auth Badges */}
            <div className="flex-shrink-0 flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              <Link to="/" className="flex items-center gap-4">
                <img
                  src="/logo/printiply_logo.png"
                  alt="PRINTIPLY"
                  className={`transition-all duration-700 object-contain ${scrolled ? 'h-7 lg:h-12' : 'h-8 lg:h-12'}`}
                />
                <div className="hidden sm:flex flex-col border-l border-slate-200 pl-4 py-1">
                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">A Subsidiary of</span>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mt-1 italic">PrimeFix Solutions</span>
                </div>
              </Link>

              <div className="hidden xl:flex items-center gap-4 pl-8 border-l border-slate-100">
                <div className="h-10 w-10 bg-white rounded-full p-1.5 border border-slate-100 shadow-md flex items-center justify-center">
                  <img src="/brands/hp.jpg" alt="HP" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[8px] font-black text-brand uppercase tracking-[0.3em] leading-none">HP Authorized</span>
                  <span className="text-[12px] font-black text-slate-950 uppercase tracking-tight leading-none">Global Partner</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex justify-end items-center gap-2 lg:gap-4">
              <div
                className="hidden lg:block"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`h-11 px-6 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-500 flex items-center gap-2 ${activeDropdown === 'categories' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'hover:bg-white text-slate-900'}`}>
                  Departments <ChevronDown size={12} className={`transition-transform duration-500 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2 lg:gap-4 bg-slate-100/50 p-1.5 lg:p-2 rounded-full border border-slate-200/50">
                <Link to="/wishlist" className="h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center text-slate-500 hover:bg-white hover:text-red-500 transition-all duration-500 relative group">
                  <Heart className="h-4.5 w-4.5 group-hover:fill-red-500 transition-all" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">{wishlistCount}</span>
                  )}
                </Link>

                <button
                  onClick={openCartDrawer}
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center text-slate-500 hover:bg-white hover:text-brand transition-all duration-500 relative group"
                >
                  <ShoppingBasket className="h-4.5 w-4.5" />
                  <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-slate-950 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
                </button>

                <div className="h-6 w-[1px] bg-slate-300 mx-1 hidden lg:block"></div>

                <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                    <button className="h-10 w-10 lg:h-12 lg:w-12 bg-slate-950 rounded-full flex items-center justify-center text-[10px] font-black text-white hover:bg-brand transition-all">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </button>
                  ) : (
                    <Link to="/login" className="h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-950 transition-all duration-500">
                      <User className="h-4.5 w-4.5" />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                        className="absolute top-full right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-100 p-4 z-[110]"
                      >
                        <div className="px-5 py-4 mb-3 border-b border-slate-50">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Authenticated</p>
                          <p className="text-sm font-black text-slate-900 uppercase truncate tracking-tight">{user.name}</p>
                        </div>
                        <div className="space-y-1">
                          <Link to="/profile" className="flex items-center gap-4 px-5 py-4 text-[11px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand rounded-[1.2rem] transition-all uppercase tracking-widest"><User className="h-4 w-4 opacity-50" /> Profile</Link>
                          <Link to="/orders" className="flex items-center gap-4 px-5 py-4 text-[11px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand rounded-[1.2rem] transition-all uppercase tracking-widest"><Package className="h-4 w-4 opacity-50" /> History</Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black text-red-500 hover:bg-red-50 rounded-[1.2rem] transition-all uppercase tracking-widest mt-2 border-t border-slate-50 pt-6"><X className="h-4 w-4" /> End Session</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* --- FULL WIDTH MEGA MENU --- */}
          <AnimatePresence>
            {activeDropdown === 'categories' && (
              <motion.div
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
                initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 20, filter: 'blur(15px)' }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[120] flex"
              >
                {/* Left: Enhanced Parent List (Narrower) */}
                <div className="w-[22%] bg-slate-50/50 p-10 border-r border-slate-100/50">
                  <div className="flex items-center gap-3 mb-10 ml-2">
                    <TrendingUp size={14} className="text-brand" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Browse Tech</h4>
                  </div>
                  <div className="space-y-2">
                    {categories.map(parent => (
                      <div
                        key={parent.id}
                        onMouseEnter={() => setHoveredParent(parent.id)}
                        className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 ${String(hoveredParent) === String(parent.id) ? 'bg-white shadow-xl shadow-blue-900/5 text-brand scale-[1.03] translate-x-2' : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'}`}
                      >
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 ${String(hoveredParent) === String(parent.id) ? 'bg-brand/10 text-brand' : 'bg-slate-100 text-slate-400'}`}>
                          {getCategoryIcon(parent.name)}
                        </div>
                        <span className="text-[13px] font-black uppercase tracking-tight">{parent.name}</span>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-all ${String(hoveredParent) === String(parent.id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Award size={16} className="text-yellow-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-950">Top Choice</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed mb-4">Discover the best-selling workstations of 2026.</p>
                    <Link to="/shop" className="text-[9px] font-black uppercase tracking-widest text-brand hover:underline">View Awards</Link>
                  </div>
                </div>

                {/* Right: Expansive Subcategories Grid (3-4 columns) */}
                <div className="w-[78%] p-14 bg-white flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="relative z-10 flex-grow">
                    <div className="flex items-end justify-between mb-12 border-b border-slate-50 pb-10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-brand" />
                          <span className="text-[10px] font-black text-brand uppercase tracking-[0.5em]">Global Inventory</span>
                        </div>
                        <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter leading-none">{activeParent?.name || 'Department'}</h3>
                      </div>
                      {activeParent && (
                        <Link
                          to={`/shop?category=${activeParent.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-all"
                        >
                          View Full Collection <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {subCategoriesToDisplay.length > 0 ? (
                        subCategoriesToDisplay.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/shop?category=${sub.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="group relative flex items-center gap-6 p-6 rounded-[2rem] border border-slate-50 hover:border-brand/10 hover:bg-brand/5 transition-all duration-500"
                          >
                            <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center p-4 shrink-0 group-hover:bg-white transition-all duration-500 shadow-sm">
                              {sub.image ? (
                                <img
                                  src={`/${sub.image}`}
                                  alt={sub.name}
                                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                              ) : null}
                              <div className={`items-center justify-center text-slate-300 ${sub.image ? 'hidden' : 'flex'}`}>
                                {getCategoryIcon(sub.name)}
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-[16px] font-black text-slate-950 group-hover:text-brand transition-colors uppercase tracking-tight leading-none block">{sub.name}</span>
                              <div className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-brand"></div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Explore Series</p>
                              </div>
                            </div>
                            <div className="ml-auto h-10 w-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 shadow-sm text-brand">
                              <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-3 py-24 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                          <Package className="text-slate-200 mb-6 animate-bounce" size={48} />
                          <p className="text-[14px] font-black text-slate-400 uppercase tracking-[0.4em]">Curating New Selection...</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Visual Footer */}
                  <div className="mt-14 pt-10 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-6">
                        <div className="flex -space-x-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                              <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="" />
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-[12px] font-black uppercase tracking-tight text-slate-950">Join 5,000+ Professionals</p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand">Trusted by top organizations</p>
                        </div>
                      </div>

                      <div className="h-10 w-px bg-slate-100"></div>

                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-950">
                          <Headphones size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-tight text-slate-950">24/7 Expert Support</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Ready to assist you</p>
                        </div>
                      </div>
                    </div>

                    <Link to="/contact" onClick={() => setActiveDropdown(null)} className="group h-14 px-10 bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-brand hover:scale-105 transition-all duration-500 flex items-center gap-4 shadow-2xl">
                      Get a Custom Quote <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* --- FULL SCREEN SEARCH OVERLAY --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[200] bg-white/80 flex flex-col items-center pt-20 lg:pt-32 px-6"
          >
            <button
              onClick={closeSearch}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-all duration-300 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="w-full max-w-4xl space-y-12">
              <form onSubmit={handleSearch} className="relative group">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -top-10 left-0"
                >
                  <span className="text-[10px] font-bold text-brand uppercase tracking-[0.4em]">Search Inventory</span>
                </motion.div>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-200 pb-4 text-xl md:text-2xl lg:text-3xl font-medium text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-brand transition-all duration-500 tracking-tight"
                />
                <button type="submit" className="absolute right-0 bottom-4 p-3 text-brand hover:scale-110 active:scale-95 transition-all duration-300 group">
                  {isSearching ? <Loader2 className="animate-spin h-6 w-6" /> : <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {(suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                      className="absolute top-full left-0 right-0 mt-6 bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[210] max-h-[500px] overflow-y-auto custom-scrollbar"
                    >
                      <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-10">

                        {/* Categories Suggestions */}
                        {suggestions.categories.length > 0 && (
                          <div className="md:col-span-4 space-y-6">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-50 pb-4">Categories</span>
                            <div className="space-y-1">
                              {suggestions.categories.map(cat => (
                                <Link
                                  key={cat.id}
                                  to={`/shop?category=${cat.slug}`}
                                  onClick={() => { closeSearch(); setSearchQuery(''); }}
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group transition-all"
                                >
                                  <span className="text-sm font-semibold text-slate-700 group-hover:text-brand">{cat.name}</span>
                                  <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Product Suggestions */}
                        <div className={`${suggestions.categories.length > 0 ? 'md:col-span-8' : 'md:col-span-12'} space-y-6`}>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-50 pb-4">Products</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {suggestions.products.map((p) => (
                              <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                onClick={() => {
                                  closeSearch();
                                  setSearchQuery('');
                                  saveSearch(searchQuery);
                                }}
                                className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all group"
                              >
                                <div className="h-16 w-16 rounded-xl bg-slate-50 flex items-center justify-center p-3 shrink-0 group-hover:bg-white transition-all shadow-sm">
                                  <img
                                    src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    alt=""
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-slate-900 truncate group-hover:text-brand transition-colors">{p.name}</p>
                                  <p className="text-xs font-medium text-slate-400">${p.price}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSearch}
                        className="w-full py-5 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand transition-all"
                      >
                        View all results
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Quick Links / Recent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.length > 0 ? (
                      recentSearches.map(t => (
                        <button
                          key={t}
                          onClick={() => setSearchQuery(t)}
                          className="px-4 py-2 bg-slate-50 hover:bg-white hover:shadow-md rounded-full text-[11px] font-semibold text-slate-600 transition-all border border-slate-100 flex items-center gap-2"
                        >
                          <Clock size={12} className="opacity-40" /> {t}
                        </button>
                      ))
                    ) : (
                      <p className="text-[11px] font-medium text-slate-400 italic">No recent searches</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">Quick Links</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.slice(0, 4).map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all border border-slate-100"><ChevronRight size={14} /></div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-brand transition-colors">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[210] bg-slate-950/20 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-full max-w-[380px] bg-white z-[220] flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex flex-col">
                  <img src="/logo/printiply_logo.png" alt="PRINTIPLY" className="h-8 w-auto object-contain" />
                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">Subsidiary of PrimeFix Solutions</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-950 hover:bg-slate-100 transition-all group">
                  <X size={20} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1 flex flex-col p-8 space-y-12">
                {/* Main Nav */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Navigation</span>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Store', path: '/shop' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'FAQ', path: '/faq' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="group flex items-center justify-between text-2xl font-bold text-slate-900 hover:text-brand transition-all tracking-tight"
                      >
                        {item.name}
                        <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories Quick Links */}
                <div className="space-y-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Departments</span>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.slice(0, 6).map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100"
                      >
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-brand transition-colors">{cat.name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-brand" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Support Info */}
                <div className="bg-slate-950 rounded-[2rem] p-6 text-white space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-brand/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <span className="relative z-10 text-[9px] font-bold text-brand uppercase tracking-widest">Support</span>
                  <div className="relative z-10 space-y-4">
                    <a href="mailto:support@printiply.shop" className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-brand transition-all"><Mail size={18} /></div>
                      <span className="text-sm font-medium">support@printiply.shop</span>
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-brand transition-all"><Phone size={18} /></div>
                      <span className="text-sm font-medium">+1 (800) PRIME-FIX</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 border-t border-slate-50 mt-auto">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg"
                  >
                    <User size={18} /> Sign In
                  </Link>
                ) : (
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-brand text-white rounded-lg flex items-center justify-center font-bold text-lg">
                        {(user.name || 'U').charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="text-[10px] font-bold text-brand uppercase tracking-widest hover:underline">View Profile</Link>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="h-8 w-8 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center transition-all"><X size={18} /></button>
                  </div>
                )}
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-6 text-center">© 2026 PRINTIPLY GLOBAL</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Spacer to prevent content jump */}
      <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? 'h-[70px] lg:h-[80px]' : 'h-[90px] lg:h-[130px]'}`}></div>
    </>
  );
}