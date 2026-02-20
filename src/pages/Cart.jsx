import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-[#FFFEF7]">
        <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center mb-8">
          <ShoppingBag size={32} className="text-amber-200" />
        </div>
        <h2 className="text-3xl font-bold text-[#4A3728] capitalize mb-4">Your bag is empty</h2>
        <p className="text-amber-400 font-bold capitalize tracking-widest text-[10px] mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#4A3728] text-white text-[10px] font-bold capitalize tracking-[0.2em] rounded-xl hover:bg-amber-800 transition-all shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] pt-32 pb-20 font-urbanist">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div className="flex items-end justify-between mb-12 border-b border-amber-100 pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] capitalize text-amber-500 mb-2 block ml-1">Your Selection</span>
            <h1 className="text-5xl font-bold text-[#4A3728] capitalize leading-none">
              Shopping <span className="text-amber-200 italic">Bag.</span>
            </h1>
          </div>
          <p className="text-xs font-bold capitalize tracking-widest text-amber-400 pb-1">{cartCount} Items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-amber-50 p-6 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-md transition-all"
                >
                  <div className="h-32 w-32 rounded-2xl bg-amber-50/30 p-4 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col mb-4">
                      <span className="text-[9px] font-bold text-amber-500 capitalize tracking-widest mb-1">{item.brand_name}</span>
                      <h3 className="text-lg font-bold text-[#4A3728] capitalize leading-tight line-clamp-1">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="h-10 px-3 bg-amber-50/50 rounded-xl border border-amber-100/50 flex items-center gap-4">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-amber-600 hover:text-amber-800 transition-colors"><Minus size={14} /></button>
                        <span className="text-xs font-bold w-4 text-center text-[#4A3728]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-amber-600 hover:text-amber-800 transition-colors"><Plus size={14} /></button>
                      </div>
                      <span className="text-lg font-bold text-[#4A3728]">${item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-10 w-10 rounded-xl bg-amber-50/50 text-amber-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold capitalize tracking-widest text-amber-400 hover:text-amber-600 transition-colors pt-6">
              <ChevronLeft size={14} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#4A3728] rounded-[2.5rem] p-10 text-amber-50 sticky top-40 shadow-xl">
              <h3 className="text-[10px] font-bold capitalize tracking-[0.4em] text-amber-400 mb-8">Summary</h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[11px] font-bold text-amber-200/50 capitalize tracking-widest">Subtotal</span>
                  <span className="text-lg font-bold">${total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[11px] font-bold text-amber-200/50 capitalize tracking-widest">Delivery</span>
                  <span className="text-xs font-bold capitalize tracking-widest text-amber-400">Calculated next</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold capitalize tracking-[0.2em]">Grand Total</span>
                  <span className="text-3xl font-bold text-white">${total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full h-14 bg-amber-500 hover:bg-white hover:text-[#4A3728] text-white rounded-xl flex items-center justify-center gap-3 text-xs font-bold capitalize tracking-[0.1em] transition-all shadow-lg active:scale-[0.98]"
              >
                Go to Checkout
                <ArrowRight size={16} />
              </Link>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[9px] font-bold text-amber-200/30 capitalize tracking-widest text-center leading-relaxed">
                  SECURE CHECKOUT GUARANTEED. <br />
                  AUTHORIZED BRAND WARRANTY INCLUDED.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
