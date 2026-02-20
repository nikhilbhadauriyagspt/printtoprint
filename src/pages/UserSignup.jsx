import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7] font-snpro px-6 py-20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-sm border border-amber-100 overflow-hidden relative z-10">

        {/* Left Side: Boutique Tech Message */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#4A3728] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent)] pointer-events-none"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-amber-50/40 hover:text-amber-400 transition-colors mb-16 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Storefront</span>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-amber-400">
                <Sparkles size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-200/40">Onboarding</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] tracking-tight text-white">
                Start your <br /> <span className="text-amber-400 italic font-light">Premium</span> Hub.
              </h2>
              <p className="text-amber-50/60 text-lg font-medium leading-relaxed max-w-sm">
                Create an account to unlock exclusive procurement pricing and priority hardware support.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <CheckCircle2 size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Instant Activation</p>
                <p className="text-[9px] font-bold text-amber-200/40 uppercase tracking-widest">System Ready 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-[#4A3728] tracking-tight mb-2">Create Access.</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-900/30">Register identity for professional dashboard</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Full Identity</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                  <input
                    required
                    type="text"
                    placeholder="ALEXANDER P."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Mobile Contact</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                  <input
                    required
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Email Access</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input
                  required
                  type="email"
                  placeholder="NAME@ORGANIZATION.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Secret Protocol</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 pl-11 pr-11 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-200 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                className="w-full h-14 bg-[#4A3728] text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Create Access <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-amber-50 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/30">
              Already verified?{' '}
              <Link to="/login" className="text-amber-600 font-bold hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
