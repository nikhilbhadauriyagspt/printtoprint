import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
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
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-sm border border-amber-100 overflow-hidden relative z-10">

        {/* Left Side: Boutique Tech Message */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-amber-50/30 relative overflow-hidden border-r border-amber-100/50">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-amber-900/40 hover:text-amber-600 transition-colors mb-16 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Storefront</span>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-amber-500">
                <Sparkles size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Auth System</span>
              </div>
              <h2 className="text-5xl font-bold text-[#4A3728] leading-[1.1] tracking-tight">
                Premium <br /> Access <span className="text-amber-500 italic font-light">Portal.</span>
              </h2>
              <p className="text-amber-900/40 text-lg font-medium leading-relaxed max-w-xs">
                Log in to manage your precision hardware orders and personalized settings.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white rounded-[2rem] border border-amber-100 shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#4A3728] uppercase tracking-widest">End-to-End Secure</p>
                <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest">Encrypted Session Hub</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-[#4A3728] tracking-tight mb-2">Access Account.</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-900/30">Enter credentials to authenticate session</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Identity Access</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                  <input
                    required
                    type="email"
                    placeholder="NAME@ORGANIZATION.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Secret Protocol</label>
                  <Link to="#" className="text-[9px] font-bold text-amber-600 uppercase tracking-widest hover:underline">Reset Pass</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200 group-focus-within:text-amber-500 transition-colors" size={16} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20"
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
            </div>

            <button
              disabled={loading}
              className="w-full h-14 bg-[#4A3728] text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Initiate Access <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-amber-50 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/30">
              New to PrintToPrint?{' '}
              <Link to="/signup" className="text-amber-600 font-bold hover:underline ml-1">Create Access</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
