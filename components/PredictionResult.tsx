"use client";

import { useState, useEffect } from "react";
import { PredictionData } from "@/lib/api";
import { Target, ShieldAlert, TrendingUp, CheckCircle2, AlertCircle, MinusCircle, Star, BarChart2, ShieldCheck, Activity, Zap, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import RecommendationBoard from "./RecommendationBoard";
import SubscriptionGate from "./SubscriptionGate";

export default function PredictionResult({ data, onOpenDetails, isPro = false }: { data: PredictionData, onOpenDetails: () => void, isPro?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("omniquant_watchlist");
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setIsSaved(items.some((i: any) => i.symbol === data.symbol && i.assetType === data.assetType));
      } catch (e) {}
    }
  }, [data.symbol, data.assetType]);

  const toggleWatchlist = () => {
    let items = [];
    const saved = localStorage.getItem("omniquant_watchlist");
    if (saved) {
      try { items = JSON.parse(saved); } catch (e) {}
    }
    
    if (isSaved) {
      items = items.filter((i: any) => !(i.symbol === data.symbol && i.assetType === data.assetType));
    } else {
      if (!items.some((i: any) => i.symbol === data.symbol && i.assetType === data.assetType)) {
        items.push({ symbol: data.symbol, assetType: data.assetType });
      }
    }
    
    localStorage.setItem("omniquant_watchlist", JSON.stringify(items));
    setIsSaved(!isSaved);
    window.dispatchEvent(new Event("watchlist_updated"));
  };

  const prediction = data.prediction_result.target_prediction;
  const currentPrice = data.market_data.current_price;

  let recColor = "text-slate-400";
  let recBg = "bg-white/5 border-[#334155]";
  let RecIcon = MinusCircle;

  if (prediction.recommendation.includes("買入") || prediction.recommendation.includes("多單")) {
    recColor = "text-[#4ADE80]";
    recBg = "bg-[#4ADE80]/5 border-[#4ADE80]/20";
    RecIcon = CheckCircle2;
  } else if (prediction.recommendation.includes("止盈") || prediction.recommendation.includes("做空")) {
    recColor = "text-[#FB7185]";
    recBg = "bg-[#FB7185]/5 border-[#FB7185]/20";
    RecIcon = AlertCircle;
  }

  return (
    <div className="space-y-8">
      <RecommendationBoard recommendations={data.prediction_result.recommendations} />
      
      <div className="glass-panel rounded-xl p-6 md:p-8 bg-[#10172A] border border-[#334155]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-[#334155] pb-8">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-[#1E293B] text-[#94A3B8] text-[9px] font-bold px-2 py-0.5 rounded border border-[#334155] uppercase tracking-widest">
                 {data.assetType.toUpperCase()}
               </span>
               <h2 className="text-3xl font-bold flex items-center gap-4 tracking-tight text-[#F8FAFC] uppercase">
                 {data.symbol} 
                 <button onClick={toggleWatchlist} className={`transition-all ${isSaved ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>
                   <Star className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} />
                 </button>
               </h2>
            </div>
            <span className="text-sm text-[#94A3B8] font-medium uppercase tracking-wider">Market Price: <span className="mono-value text-[#F8FAFC] font-bold">${currentPrice.toFixed(2)}</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onOpenDetails} className="flex items-center gap-2 px-6 py-3 bg-[#1E293B] hover:bg-[#334155] rounded-lg border border-[#334155] transition-all text-[10px] font-bold text-[#F8FAFC] uppercase tracking-widest">
              <BarChart2 className="w-4 h-4 text-primary" /> Advanced Insight
            </button>

            <div className={`flex items-center gap-3 px-6 py-3 rounded-lg border ${recBg}`}>
              <RecIcon className={`w-5 h-5 ${recColor}`} />
              <span className={`text-sm font-bold ${recColor} tracking-widest uppercase`}>
                {prediction.recommendation}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel bg-[#1E293B]/50 rounded-xl p-6 border border-[#334155] text-left">
            <SubscriptionGate isPro={isPro} featureName="Target Price">
              <div className="flex items-center gap-3 text-[#94A3B8] mb-4 uppercase tracking-widest text-[10px] font-bold">
                <Target className="w-4 h-4 text-primary" />
                Target Projection
              </div>
              <div className="text-4xl font-bold text-[#F8FAFC] mono-value mb-2 data-glow">
                ${prediction.predicted_price.toFixed(2)}
              </div>
              <div className={`text-sm font-bold ${prediction.predicted_change_percent >= 0 ? 'text-[#4ADE80]' : 'text-[#FB7185]'} flex items-center gap-1`}>
                {prediction.predicted_change_percent >= 0 ? '+' : ''}{prediction.predicted_change_percent.toFixed(2)}%
                <span className="text-[10px] text-[#94A3B8] font-medium ml-2 uppercase tracking-tighter">vs Current</span>
              </div>
            </SubscriptionGate>
          </div>

          <div className="glass-panel bg-[#1E293B]/50 rounded-xl p-6 border border-[#334155] text-left">
            <div className="flex items-center gap-3 text-[#94A3B8] mb-4 uppercase tracking-widest text-[10px] font-bold">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Safety Corridor
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest">Resist</span>
                <span className="text-base font-bold text-[#F8FAFC] mono-value">${prediction.range_high.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest">Support</span>
                <span className="text-base font-bold text-[#F8FAFC] mono-value">${prediction.range_low.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#334155]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#FB7185] uppercase font-bold tracking-widest">Invalidation</span>
                  <span className="text-base font-bold text-[#FB7185] mono-value">${prediction.invalidation_point?.toFixed(2) || (prediction.range_low * 0.98).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel bg-[#1E293B]/50 rounded-xl p-6 border border-[#334155] text-left">
            <SubscriptionGate isPro={isPro} featureName="Confidence">
              <div className="flex items-center gap-3 text-[#94A3B8] mb-4 uppercase tracking-widest text-[10px] font-bold">
                <TrendingUp className="w-4 h-4 text-primary" />
                Strategy Confidence
              </div>
              <div className="text-4xl font-bold text-[#F8FAFC] mono-value mb-4">
                {prediction.success_rate.toFixed(1)}%
              </div>
              <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.success_rate}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-primary"
                ></motion.div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#334155]">
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Grade</span>
                    <span className="text-sm font-bold text-primary tracking-widest">AAA QUALITY</span>
                 </div>
              </div>
            </SubscriptionGate>
          </div>
        </div>

        {/* Backtest & Institutional Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 rounded-lg bg-[#1E293B]/30 border border-[#334155]">
              <div className="text-[8px] font-bold text-[#94A3B8] uppercase mb-1 tracking-widest">Sharpe Ratio</div>
              <div className="text-lg font-bold text-[#F8FAFC] mono-value data-glow">{prediction.sharpe_ratio}</div>
           </div>
           <div className="p-4 rounded-lg bg-[#1E293B]/30 border border-[#334155]">
              <div className="text-[8px] font-bold text-[#94A3B8] uppercase mb-1 tracking-widest">Max Drawdown</div>
              <div className="text-lg font-bold text-[#F8FAFC] mono-value">{prediction.max_drawdown}%</div>
           </div>
           <div className="p-4 rounded-lg bg-[#4ADE80]/5 border border-[#4ADE80]/20">
              <div className="text-[8px] font-bold text-[#4ADE80]/60 uppercase mb-1 tracking-widest">Take Profit</div>
              <div className="text-lg font-bold text-[#4ADE80] mono-value">${prediction.take_profit}</div>
           </div>
           <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-[8px] font-bold text-primary/60 uppercase mb-1 tracking-widest">Hedge Pair</div>
              <div className="text-xs font-bold text-primary uppercase">{prediction.hedge_pairing}</div>
           </div>
        </div>

        {/* Live Attribution Wall */}
        <div className="mt-10 pt-8 border-t border-[#334155]">
           <div className="text-[10px] font-bold text-[#F8FAFC] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Institutional Strategy Weighting
           </div>
           <SubscriptionGate isPro={isPro} featureName="Master Weights">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-4 rounded-xl bg-black/20 border border-[#334155]">
                    <div className="text-[8px] font-bold text-[#94A3B8] uppercase mb-2">Goldman Macro</div>
                    <div className="text-2xl font-bold text-[#F8FAFC]">45%</div>
                 </div>
                 <div className="p-4 rounded-xl bg-black/20 border border-[#334155]">
                    <div className="text-[8px] font-bold text-[#94A3B8] uppercase mb-2">Morgan Earnings</div>
                    <div className="text-2xl font-bold text-[#F8FAFC]">35%</div>
                 </div>
                 <div className="p-4 rounded-xl bg-black/20 border border-[#334155]">
                    <div className="text-[8px] font-bold text-[#94A3B8] uppercase mb-2">ARK Innovation</div>
                    <div className="text-2xl font-bold text-[#F8FAFC]">20%</div>
                 </div>
              </div>
           </SubscriptionGate>
        </div>

        {/* Analyst Digest: Explainable AI */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#334155]">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
                 <span className="text-[10px] font-bold text-[#F8FAFC] uppercase tracking-widest">智策依據 (Reasoning)</span>
              </div>
              <ul className="space-y-3">
                 {prediction.analyst_digest.reasoning.map((r: string, i: number) => (
                    <li key={i} className="text-xs text-[#94A3B8] flex gap-2 leading-relaxed text-left">
                       <span className="text-[#4ADE80] font-bold">•</span> {r}
                    </li>
                 ))}
              </ul>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <AlertTriangle className="w-4 h-4 text-[#FB7185]" />
                 <span className="text-[10px] font-bold text-[#F8FAFC] uppercase tracking-widest">風險警訊 (Risks)</span>
              </div>
              <ul className="space-y-3">
                 {prediction.analyst_digest.contra_signals.map((c: string, i: number) => (
                    <li key={i} className="text-xs text-[#94A3B8] flex gap-2 leading-relaxed text-left">
                       <span className="text-[#FB7185] font-bold">•</span> {c}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
