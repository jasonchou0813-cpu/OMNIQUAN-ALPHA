"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface MarketSummaryProps {
  data: {
    today_status: string;
    color_code: string;
    alert_msg: string;
  };
}

export default function MarketSummary({ data }: MarketSummaryProps) {
  const isPositive = data.color_code === "success";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 rounded-xl border border-white/10 mb-6 flex items-center justify-between overflow-hidden relative"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isPositive ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
          {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="text-sm text-gray-500 font-medium">今日盤勢摘要</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
              {data.today_status}
            </span>
            <span className="text-xs text-gray-400">趨勢訊號</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 px-6 border-l border-r border-white/5 hidden md:block">
        <p className="text-sm text-gray-300 italic flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          "{data.alert_msg}"
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">System Status</div>
          <div className="flex items-center gap-1.5 justify-end">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-xs font-mono text-success">Live Analysis</span>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className={`absolute -right-10 top-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none ${isPositive ? 'bg-success' : 'bg-danger'}`}></div>
    </motion.div>
  );
}
