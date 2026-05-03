import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';

export default function PerformanceTracker() {
  const records = [
    { symbol: '2330.TW', achievement: '98.5%', grade: 'AAA' },
    { symbol: 'AAPL', achievement: '94.2%', grade: 'AAA' },
    { symbol: 'NVDA', achievement: '102.1%', grade: 'AAA+' },
    { symbol: 'GC=F', achievement: '91.8%', grade: 'AA' },
  ];

  return (
    <div className="w-full bg-black/20 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1E293B] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1E293B] to-transparent z-10" />
      
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-16 items-center"
      >
        {[...records, ...records, ...records].map((record, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Recent Victory: <span className="text-foreground">{record.symbol}</span>
            </span>
            <span className="text-[11px] font-mono font-black text-success">
              {record.achievement}
            </span>
            <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black text-primary tracking-widest">
              {record.grade}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
