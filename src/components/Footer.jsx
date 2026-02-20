import { Link } from 'react-router-dom';
import { Globe, Mail, Loader2, ShieldCheck, ArrowRight, Zap, Headphones, Truck } from 'lucide-react';
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
    <footer className="bg-[#FFFEF7] font-snpro pt-24 pb-12 border-t border-amber-100">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* --- MODULAR TOP PANEL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Brand Card */}
          <div className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-amber-100/50 shadow-sm flex flex-col justify-between">
            <div className="space-y-8">
              <Link to="/" className="flex items-center gap-5 group">
                <div className="bg-amber-50 p-3 rounded-2xl transition-transform group-hover:scale-105">
                  <img src="/logo/printtoprint_logo.png" alt="PRINTTOPRINT" className="h-8 w-auto object-contain" />
                </div>
                <div className="flex flex-col border-l border-amber-100 pl-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-amber-500">Authorized</span>
                  <span className="text-[14px] font-bold text-[#4A3728]">PrimeFix Subsidiary</span>
                </div>
              </Link>
              <p className="text-amber-900/40 text-sm font-medium leading-relaxed max-w-xs">
                The global benchmark for authorized tech distribution and precision hardware solutions.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-10 w-10 bg-white rounded-xl border border-amber-100 flex items-center justify-center p-2 shadow-sm">
                <img src="/brands/hp.png" alt="HP" className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#4A3728] uppercase tracking-widest">HP Global Partner</p>
                <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Certified 2026</p>
              </div>
            </div>
          </div>

          {/* Navigation Bento */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nav Pill 1 */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-amber-100/50 flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-500 mb-6 ml-1">Products</span>
              <div className="flex flex-col gap-3">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="text-[12px] font-bold text-[#4A3728] hover:text-amber-600 transition-colors uppercase tracking-wider">{cat.name}</Link>
                ))}
              </div>
            </div>
            {/* Nav Pill 2 */}
            <div className="bg-[#FFFDF2]/50 rounded-[2.5rem] p-8 border border-amber-100/30 flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-500 mb-6 ml-1">Company</span>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Contact Us', path: '/contact' },
                  { label: 'Order Tracking', path: '/orders' },
                  { label: 'FAQ', path: '/faq' }
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-[12px] font-bold text-amber-900/60 hover:text-amber-900 transition-colors uppercase tracking-wider">{link.label}</Link>
                ))}
              </div>
            </div>
            {/* Newsletter Pill */}
            <div className="bg-[#4A3728] rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-400 mb-4 block ml-1">Newsletter</span>
                <h4 className="text-xl font-bold mb-6">Stay ahead of the <span className="text-amber-400 italic">curve.</span></h4>
              </div>
              <form onSubmit={handleSubscribe} className="relative group">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-amber-400 focus:bg-white/20 transition-all"
                />
                <button disabled={loading} className="absolute right-1 top-1 bottom-1 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all active:scale-95">
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- TRUST & COMPLIANCE STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: ShieldCheck, label: "Authorized", sub: "100% Genuine" },
            { icon: Truck, label: "Express", sub: "Global Fast" },
            { icon: Zap, label: "Direct", sub: "Expert Tech" },
            { icon: Headphones, label: "Priority", sub: "24/7 Support" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-amber-100/50 flex items-center gap-4 group hover:bg-amber-50/50 transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#4A3728] uppercase tracking-widest">{item.label}</p>
                <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- NANO BOTTOM FOOTER --- */}
        <div className="pt-8 border-t border-amber-100/50 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-amber-900/30">
            <span>© 2026 PrintToPrint Group</span>
            <div className="h-1 w-1 rounded-full bg-amber-200" />
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-amber-500" /> <span>Global Hub</span>
            </div>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { label: 'Privacy Policy', path: '/privacy-policy' },
              { label: 'Terms & Conditions', path: '/terms-and-conditions' },
              { label: 'Return Policy', path: '/return-policy' },
              { label: 'Shipping Policy', path: '/shipping-policy' },
              { label: 'Cookie Policy', path: '/cookie-policy' }
            ].map((p) => (
              <Link key={p.path} to={p.path} className="text-[9px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-600 transition-colors">{p.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-bold text-[#4A3728]">PAYPAL</span>

          </div>
        </div>

      </div>
    </footer>
  );
}
