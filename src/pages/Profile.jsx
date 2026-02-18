import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { 
  User, 
  Lock, 
  ShoppingBag, 
  Package, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsSearching] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully!");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Password changed successfully!");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Security update failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 font-urbanist">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-40">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-black mb-4 shadow-2xl shadow-blue-600/20 uppercase">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{user.name}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{user.email}</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile Information', icon: User },
                  { id: 'orders', label: 'Order History', icon: Package },
                  { id: 'security', label: 'Security & Password', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-500 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <LogOut size={18} />
                  Logout Session
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Personal Info.</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update your contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                        <input 
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone Number</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Shipping Address</label>
                      <textarea 
                        rows="3"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all resize-none"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-14 px-10 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">My Orders.</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{orders.length} total purchases</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">New Order</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100">
                      <Package size={48} className="text-gray-200 mx-auto mb-6" />
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No orders found in your history.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden group hover:border-blue-200 transition-all">
                        <div className="p-8 flex items-center justify-between border-b border-gray-50">
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Order #PFX-{order.id}</p>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${
                              order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900">${order.total_amount}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="p-8 bg-gray-50/30">
                           <Link to="/orders" className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-4 transition-all">
                             Track Shipment <ChevronRight size={14} />
                           </Link>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Security.</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your account access</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">New Password</label>
                      <div className="relative">
                        <input 
                          type={showPass ? "text" : "password"}
                          required
                          value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-14 pl-6 pr-14 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Confirm Password</label>
                      <input 
                        type={showPass ? "text" : "password"}
                        required
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                        className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-14 px-10 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Change Security Access"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
