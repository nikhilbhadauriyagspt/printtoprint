import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, User, Mail, Phone, Loader2, Navigation } from 'lucide-react';
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
  const shipping = 0; // Fixed at 0
  const tax = 0; // Fixed at 0
  const finalTotal = total + shipping + tax;

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
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails // Full PayPal capture object
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
      // PayPal is handled by PayPalButtons component
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <h2 className="text-2xl font-black text-slate-900 uppercase mb-4">No items to checkout</h2>
        <Link to="/shop" className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Return to Shop</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
        >
          <ShieldCheck size={48} />
        </motion.div>
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-12">Your premium tech is being prepared for shipment.</p>
        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-12 max-w-md w-full">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Order Reference</p>
          <p className="text-xl font-black text-slate-900 uppercase">#PFX-{orderId || Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        <Link to="/" className="px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Checkout Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-4">
              <ChevronLeft size={14} /> Back to Bag
            </Link>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Secure <span className="text-slate-400 italic">Checkout.</span>
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-100 text-gray-300'}`}>1</div>
            <div className={`h-0.5 w-12 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-100'}`} />
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-100 text-gray-300'}`}>2</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Form */}
          <div className="lg:col-span-8 space-y-12">
            
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Mail size={18} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Contact Information</h3>
                  </div>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="EMAIL ADDRESS" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-blue-600">
                      <MapPin size={18} />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Shipping Address</h3>
                    </div>
                    <button 
                      type="button"
                      onClick={detectLocation}
                      disabled={detectingLocation}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[9px] font-black uppercase border border-blue-100 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                    >
                      {detectingLocation ? <Loader2 className="animate-spin" size={12} /> : <Navigation size={12} />}
                      {detectingLocation ? 'Detecting...' : 'Detect My Location'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                  </div>
                  <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="STREET ADDRESS" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="CITY" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                  </div>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="PHONE NUMBER" className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all" />
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <CreditCard size={18} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Payment Method</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* COD Option */}
                    <div 
                      onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                      className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'}`}>
                          {formData.paymentMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <Truck size={24} className={formData.paymentMethod === 'cod' ? 'text-blue-600' : 'text-slate-300'} />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">Cash on Delivery</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Pay when you receive</p>
                    </div>

                    {/* PayPal Option */}
                    <div 
                      onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                      className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-blue-600' : 'border-gray-300'}`}>
                          {formData.paymentMethod === 'paypal' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <div className="text-blue-600 italic font-black text-lg">PayPal</div>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">PayPal Express</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Secure online payment</p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="space-y-6">
                      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white text-center">
                        <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Pay safely with PayPal Express Checkout.</p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                          <ShieldCheck size={14} className="text-emerald-400" /> Secure Encryption Active
                        </div>
                      </div>
                      <div className="relative z-0">
                        <PayPalButtons 
                          style={{ layout: "vertical", shape: "pill", label: "pay" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: finalTotal.toString(),
                                  },
                                  description: `Printiply Order - ${cartCount} items`,
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            try {
                              const details = await actions.order.capture();
                              console.log("PayPal Details Captured:", details);
                              await handleOrderSuccess(details);
                            } catch (err) {
                              console.error("Capture Error:", err);
                              alert("Failed to capture PayPal payment.");
                            }
                          }}
                          onError={(err) => {
                            alert("PayPal Payment Error. Please try again.");
                            console.error("PayPal Error:", err);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="pt-10 flex gap-4">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="px-8 h-16 bg-gray-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100">Back</button>
              )}
              {formData.paymentMethod === 'cod' || step === 1 ? (
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-16 bg-blue-600 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (step === 1 ? 'Continue to Payment' : 'Complete Purchase')}
                  {!loading && <ArrowRight size={16} />}
                </button>
              ) : null}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 sticky top-40">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">In Your Bag</h3>
              
              <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 bg-white rounded-xl p-2 flex items-center justify-center border border-gray-100 shrink-0">
                      <img 
                        src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} 
                        className="max-w-full max-h-full object-contain"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{item.quantity} x ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-8">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${total}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-500 uppercase">Free</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Estimated Tax</span>
                  <span className="text-slate-900">$0</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Total</span>
                  <span className="text-3xl font-black text-blue-600">${finalTotal}</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Lock size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">256-Bit SSL Secured</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
