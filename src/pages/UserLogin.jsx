import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans px-6 py-20 pt-32">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100 relative z-10">
        
        {/* Left Side: Brand/Marketing */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(98,91,241,0.15),transparent)] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Store</span>
            </Link>
            <h2 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
              Empowering your <br /> <span className="text-brand">Digital</span> Ambition.
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
              Access the world's most reliable technology infrastructure and professional services.
            </p>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-brand">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Secure Infrastructure</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your data is protected by industry-leading encryption and security protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-20 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sm font-medium text-slate-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                  <input 
                    required
                    type="email" 
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <Link to="#" className="text-[11px] font-bold text-brand hover:underline">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-brand transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In Account <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              New to Printiply?{' '}
              <Link to="/signup" className="text-brand font-bold hover:underline ml-1">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
