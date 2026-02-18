import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Mail, Loader2, CheckCircle2, MapPin, Phone, ShieldCheck, ArrowRight, Zap, Headphones, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values()).slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-32 pb-12 font-snpro relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">

        {/* --- Top Section: Big Tagline & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">The Next Chapter</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
              Redefining <br />
              <span className="text-brand italic">Technology.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              Empowering creators and enterprises with authorized high-performance computing solutions and precision engineering.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-10 md:p-14 lg:mt-20">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">The <span className="text-brand">Newsletter.</span></h3>
            <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Join 50,000+ tech enthusiasts. Get exclusive early access to drops and professional insights.</p>

            <form onSubmit={handleSubscribe} className="relative group">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-brand focus:bg-white/10 transition-all shadow-2xl"
              />
              <button
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 px-8 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={14} /> : <>Subscribe <ArrowRight size={14} /></>}
              </button>
            </form>
            <p className="mt-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">No Spam. Pure Technology. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* --- Main Links Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex flex-col gap-2">
              <img src="/logo/printiply_logo.png" alt="PRINTIPLY" className="w-42 h-16 object-contain bg-white p-2 rounded-xl" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Subsidiary of PrimeFix Solutions</span>
            </Link>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Inquiries</p>
                  <p className="text-sm font-bold text-white group-hover:text-brand transition-colors">info@printiply.shop</p>
                </div>
              </div>
                           <div className="flex items-center gap-4 group cursor-pointer">
                                 <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white transition-all">
                                    <Phone size={20} />
                                 </div>
                                 <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Support Line</p>
                                    <p className="text-sm font-bold text-white group-hover:text-brand transition-colors">+1 (402) 508-9751</p>
                                 </div>
                              </div>
                           </div>
                        </div>
          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">Inventory</h4>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-slate-400 hover:text-white transition-colors text-sm font-bold">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">About Story</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Get in Touch</Link></li>
                <li><Link to="/orders" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Order Tracking</Link></li>
                <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Knowledge Base</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">Assurance</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Data Privacy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Service Terms</Link></li>
                <li><Link to="/return-policy" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Refund Policy</Link></li>
                <li><Link to="/shipping-policy" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Logistics Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Trust Badges Strip --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-y border-white/5 mb-16">
          {[
            { icon: ShieldCheck, label: "Authorized Partner", sub: "100% Genuine Inventory" },
            { icon: Truck, label: "Insured Shipping", sub: "Global Express Delivery" },
            { icon: Zap, label: "Pro Support", sub: "Expert Tech Consultation" },
            { icon: Headphones, label: "Priority Queue", sub: "24/7 Dedicated Support" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5 group">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-xl">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest">{item.label}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom Footer --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-slate-500">
            <span>© 2026 Printiply LLC.</span>
            <span className="hidden md:block h-1 w-1 rounded-full bg-slate-800"></span>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-brand" /> <span>USA Distribution Hub</span>
            </div>
            <span className="hidden md:block h-1 w-1 rounded-full bg-slate-800"></span>
            <span className="text-slate-700">All prices in USD</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Security</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black text-white uppercase">Verified Checkout</span>
              </div>
            </div>

            <div className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
              <div className="h-6 w-px bg-white/20"></div>
              <span className="text-[11px] font-black italic text-white flex items-center gap-1">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}