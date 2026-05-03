import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, ShieldCheck } from 'lucide-react';

interface SubscriptionGateProps {
  isPro: boolean;
  children: React.ReactNode;
  featureName?: string;
}

export default function SubscriptionGate({ isPro, children, featureName = "Premium Analysis" }: SubscriptionGateProps) {
  if (isPro) return <>{children}</>;

  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <div className="filter blur-md pointer-events-none select-none opacity-40">
        {children}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 border border-white/5 rounded-2xl group-hover:bg-black/50 transition-all">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-gold/10 border border-dark-gold/30 p-4 rounded-xl flex flex-col items-center gap-3 max-w-[200px] text-center"
        >
          <div className="p-2 bg-dark-gold rounded-full">
            <Lock className="w-4 h-4 text-black" />
          </div>
          <div className="text-[10px] font-black text-dark-gold uppercase tracking-widest">{featureName} Locked</div>
          <p className="text-[8px] text-secondary leading-tight">獲取高盛、大摩級別的決策維度與對沖建議。</p>
          <button className="w-full bg-dark-gold text-black text-[9px] font-black py-2 rounded-md hover:bg-white transition-colors uppercase tracking-tighter">
            Unlock Elite
          </button>
        </motion.div>
      </div>
    </div>
  );
}
