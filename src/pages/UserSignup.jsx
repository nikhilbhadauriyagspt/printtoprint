import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans px-6 py-20 pt-32">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100 relative z-10">
        
        {/* Left Side: Brand/Marketing */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-brand text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Store</span>
            </Link>
            <h2 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
              Start your <br /> <span className="text-slate-900">Premium</span> Journey.
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed max-w-sm">
              Create an account to unlock exclusive pricing, professional support, and priority procurement.
            </p>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <CheckCircle2 size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Instant Activation</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Join our network of professionals and get immediate access to our global tech inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-sm font-medium text-slate-500">Join thousands of professionals today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={16} />
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={16} />
                  <input 
                    required
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={16} />
                <input 
                  required
                  type="email" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={16} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full h-12 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none text-sm font-semibold transition-all placeholder:text-slate-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                disabled={loading}
                className="w-full h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-brand transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-brand font-bold hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
