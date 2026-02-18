import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, Box, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Placed', icon: Clock, desc: 'We have received your order' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your items are being prepared' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Package has left our facility' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Courier is on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 font-urbanist px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-8">
            <Package size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Track Your Order.</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-12">Login to see your full history or enter your guest email below.</p>
          
          <form onSubmit={handleGuestSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
            <input 
              type="email" 
              required
              placeholder="ENTER GUEST EMAIL" 
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="flex-1 h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
            />
            <button className="h-16 px-10 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">
              Find Order
            </button>
          </form>

          <div className="pt-8 border-t border-gray-100">
            <Link to="/login" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] hover:underline">Or Login to your account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 font-urbanist">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Order History</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Your <span className="text-slate-400 italic">Purchases.</span>
            </h1>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 pb-1">{orders.length} Total Orders</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retrieving History</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100">
            <Package size={48} className="text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase">No orders found</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 mb-8">You haven't placed any orders yet.</p>
            <Link to="/shop" className="px-10 py-4 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id} 
                className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden group hover:shadow-xl hover:shadow-gray-200/20 transition-all"
              >
                <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                      <h3 className="text-sm font-black text-slate-900 uppercase">#PFX-{order.id}</h3>
                    </div>
                  </div>

                  <div className="flex gap-12">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar size={10} /> Date
                      </p>
                      <p className="text-[11px] font-bold text-slate-900 uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <CreditCard size={10} /> Payment
                      </p>
                      <p className="text-[11px] font-bold text-slate-900 uppercase">{order.payment_method}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-xl font-black text-blue-600">${order.total_amount}</p>
                  </div>
                </div>

                <div className="p-8 bg-gray-50/30">
                  <div className="space-y-4">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black">
                            {item.quantity}x
                          </div>
                          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight line-clamp-1 max-w-[300px]">{item.product_name}</p>
                        </div>
                        <p className="text-[11px] font-black text-slate-900">${item.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Truck size={12} /> Shipping to: <span className="text-slate-900 ml-1">{order.address}, {order.city}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:gap-4 transition-all"
                    >
                      Track Shipment <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tracking Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[3rem] z-[1001] shadow-2xl p-10 font-urbanist"
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Track Order.</h2>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">#PFX-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="relative space-y-10">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-8 group">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${
                          isCompleted ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-2 border-gray-100 text-gray-300'
                        }`}>
                          <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                        </div>
                        
                        <div className="flex-1 py-1">
                          <h4 className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-[10px] font-bold mt-1 ${isCompleted ? 'text-slate-500' : 'text-slate-300'}`}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <motion.div 
                              layoutId="active-indicator"
                              className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-100"
                            >
                              Current Status
                            </motion.div>
                          )}
                        </div>

                        {isCompleted && !isActive && (
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 ml-14 opacity-0 group-hover:opacity-100 transition-opacity">
                             <CheckCircle2 size={12} className="text-emerald-500" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Carrier</p>
                      <p className="text-xs font-black text-slate-900 uppercase">Printiply Logistics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected Delivery</p>
                      <p className="text-xs font-black text-slate-900 uppercase">2-3 Business Days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
