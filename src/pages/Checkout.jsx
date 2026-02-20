import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Loader2, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod' // default
  });

  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data.address) {
            const addr = data.address;
            const streetAddress = [
              addr.house_number,
              addr.road,
              addr.suburb,
              addr.neighbourhood
            ].filter(Boolean).join(', ');

            setFormData(prev => ({
              ...prev,
              address: streetAddress || data.display_name,
              city: addr.city || addr.town || addr.village || addr.state || '',
              zipCode: addr.postcode || ''
            }));
          }
        } catch (err) {
          console.error("Location detection error:", err);
          alert("Could not detect address. Please enter it manually.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        setDetectingLocation(false);
        alert("Location access denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (via PrintToPrint.shop)`, // List mein dikhne ke liye
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'printtoprint.shop',
        notes: `Order from PrintToPrint.shop | ${formData.notes || ''}`
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-snpro bg-[#FFFEF7]">
        <h2 className="text-2xl font-bold text-[#4A3728] mb-4">No Hardware in Session.</h2>
        <Link to="/shop" className="px-10 py-4 bg-[#4A3728] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all">Back to Inventory</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-snpro bg-[#FFFEF7] text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20"
        >
          <ShieldCheck size={48} strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-5xl font-bold text-[#4A3728] tracking-tight mb-4">Procurement Confirmed!</h1>
        <p className="text-amber-900/40 font-bold uppercase tracking-widest text-[10px] mb-12">System update: Your hardware is scheduled for deployment.</p>
        <div className="bg-white p-10 rounded-[3rem] border border-amber-100 mb-12 max-w-md w-full shadow-sm">
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.3em] mb-2">Record Reference</p>
          <p className="text-xl font-bold text-[#4A3728]">#PTP-{orderId || 'PENDING'}</p>
        </div>
        <Link to="/" className="px-12 py-5 bg-[#4A3728] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-amber-800 transition-all shadow-lg">
          Terminate Checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] pt-24 pb-20 font-snpro selection:bg-amber-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* --- CHECKOUT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-600 transition-colors mb-4 group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Session
            </Link>
            <h1 className="text-5xl font-bold text-[#4A3728] tracking-tight">
              Secure <span className="text-amber-500 italic font-light">Checkout.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 1 ? 'bg-[#4A3728] border-transparent text-white' : 'border-amber-100 text-amber-200'}`}>1</div>
            <div className={`h-[1px] w-8 ${step >= 2 ? 'bg-[#4A3728]' : 'bg-amber-100'}`} />
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 2 ? 'bg-[#4A3728] border-transparent text-white' : 'border-amber-100 text-amber-200'}`}>2</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Module */}
          <div className="lg:col-span-8 space-y-10">

            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10 bg-white p-10 rounded-[3rem] border border-amber-100 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-amber-600">
                    <Mail size={18} strokeWidth={1.5} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Identity Access</h3>
                  </div>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="NAME@ORGANIZATION.COM" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-amber-600">
                      <MapPin size={18} strokeWidth={1.5} />
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Logistics Link</h3>
                    </div>
                    <button
                      type="button" onClick={detectLocation} disabled={detectingLocation}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[9px] font-bold uppercase border border-amber-100 hover:bg-white transition-all disabled:opacity-50"
                    >
                      {detectingLocation ? <Loader2 className="animate-spin" size={12} /> : <Navigation size={12} />}
                      {detectingLocation ? 'Scanning...' : 'Detect Coordinates'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                  </div>
                  <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="STREET PROTOCOL" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="ZONE / CITY" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                  </div>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="MOBILE FREQUENCY" className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20" />
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10 bg-white p-10 rounded-[3rem] border border-amber-100 shadow-sm">
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-amber-600">
                    <CreditCard size={18} strokeWidth={1.5} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Payment Protocol</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-amber-50 bg-[#FFFEF7] hover:border-amber-200'}`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-6 w-6 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-amber-500' : 'border-amber-200'}`}>
                          {formData.paymentMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                        </div>
                        <Truck size={24} className={formData.paymentMethod === 'cod' ? 'text-amber-600' : 'text-amber-200'} />
                      </div>
                      <h4 className="text-sm font-bold text-[#4A3728]">Post-Delivery Settlement</h4>
                      <p className="text-[9px] font-bold text-amber-900/40 uppercase mt-1">Payment upon system arrival</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-amber-50 bg-[#FFFEF7] hover:border-amber-200'}`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-6 w-6 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-amber-500' : 'border-amber-200'}`}>
                          {formData.paymentMethod === 'paypal' && <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                        </div>
                        <div className="text-amber-600 italic font-bold text-lg">PayPal</div>
                      </div>
                      <h4 className="text-sm font-bold text-[#4A3728]">Digital Rapid Pay</h4>
                      <p className="text-[9px] font-bold text-amber-900/40 uppercase mt-1">Secure encrypted gateway</p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="space-y-6 pt-4 border-t border-amber-50">
                      <div className="p-8 bg-[#4A3728] rounded-[2.5rem] text-white text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-amber-200/40">Secured with PayPal Express.</p>
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full text-[9px] font-bold uppercase border border-white/10">
                          <ShieldCheck size={14} className="text-amber-400" /> Layer 2 Encryption Active
                        </div>
                      </div>
                      <div className="relative z-0 px-10">
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "pill", label: "pay" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [{
                                amount: { value: finalTotal.toString() },
                                description: `PrintToPrint Hardware - ${cartCount} units`,
                              }],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            await handleOrderSuccess(details);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex gap-4">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="px-10 h-16 bg-white text-[#4A3728] rounded-xl text-[10px] font-bold uppercase tracking-widest border border-amber-100 hover:bg-amber-50 transition-all">Rollback</button>
              )}
              {formData.paymentMethod === 'cod' || step === 1 ? (
                <button
                  type="submit" disabled={loading}
                  className="flex-1 h-16 bg-[#4A3728] text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/10 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Processing System...' : (step === 1 ? 'Configure Payment' : 'Commit Purchase')}
                  {!loading && <ArrowRight size={16} />}
                </button>
              ) : null}
            </div>
          </div>

          {/* Summary Module */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] p-10 border border-amber-100 sticky top-32 shadow-sm">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-900/30 block mb-10 ml-1">Inventory Link</span>

              <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-14 w-14 bg-amber-50/50 rounded-xl flex items-center justify-center border border-amber-50 shrink-0 group-hover:bg-white transition-all">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[11px] font-bold text-[#4A3728] truncate group-hover:text-amber-600 transition-colors leading-tight">{item.name}</h4>
                      <p className="text-[9px] font-bold text-amber-900/30 mt-1">{item.quantity} Unit(s) • ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-amber-50 pt-8">
                <div className="flex justify-between text-[10px] font-bold text-amber-900/30 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#4A3728]">${total}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-amber-900/30 uppercase tracking-widest">
                  <span>Logistics</span>
                  <span className="text-emerald-600">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-amber-100">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A3728]">Valuation</span>
                  <span className="text-3xl font-bold text-amber-600">${finalTotal}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 opacity-20 group">
                <Lock size={12} className="group-hover:text-amber-600 transition-colors" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Hardware Secured • 256 SSL</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
