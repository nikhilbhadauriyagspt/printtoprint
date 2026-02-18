import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Headphones,
  CheckCircle2,
  PackageCheck,
  CreditCard,
  Award
} from "lucide-react";

const features = [
  {
    icon: Award,
    label: "Authorized Partner",
    sub: "Certified 100% Genuine",
    desc: "Direct from manufacturer",
    color: "group-hover:text-brand",
    bg: "group-hover:bg-brand",
    border: "group-hover:border-brand/20"
  },
  {
    icon: Truck,
    label: "Express Logistics",
    sub: "Global Priority Shipping",
    desc: "Insured & Tracked",
    color: "group-hover:text-emerald-600",
    bg: "group-hover:bg-emerald-600",
    border: "group-hover:border-emerald-200"
  },
  {
    icon: ShieldCheck,
    label: "Buyer Protection",
    sub: "Comprehensive Warranty",
    desc: "Full coverage included",
    color: "group-hover:text-purple-600",
    bg: "group-hover:bg-purple-600",
    border: "group-hover:border-purple-200"
  },
  {
    icon: Headphones,
    label: "Expert Support",
    sub: "24/7 Tech Consultation",
    desc: "Real human agents",
    color: "group-hover:text-amber-600",
    bg: "group-hover:bg-amber-600",
    border: "group-hover:border-amber-200"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white relative overflow-hidden font-snpro">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-12">
        
        {/* Section Header - Stylish & Compact */}
        <div className="mb-12 flex gap-6 items-center">
          {/* Vertical Decorative Bar */}
          <div className="hidden md:block h-16 w-1.5 bg-brand rounded-full"></div>
          
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-brand"></div>
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand uppercase tracking-tight leading-none">
              The <span className="text-slate-400 italic">Advantage.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 ${item.border} hover:bg-white hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-default overflow-hidden`}
            >
              {/* Hover Gradient Splash */}
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-bl from-current to-transparent rounded-bl-[100%] pointer-events-none ${item.color}`} />

              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Icon Container */}
                <div className={`mb-6 h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 ${item.bg} group-hover:text-white group-hover:border-transparent text-slate-400`}>
                  <item.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                  {item.label}
                </h3>
                
                <div className={`h-0.5 w-8 bg-slate-200 mb-3 rounded-full group-hover:w-16 transition-all duration-500 ${item.bg} group-hover:opacity-50 opacity-0`}></div>

                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  {item.sub}
                </p>
                <p className="text-[10px] font-bold text-slate-400 opacity-60">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}