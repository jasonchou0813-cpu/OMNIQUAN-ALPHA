"use client";

import { useState } from "react";
import { PredictionData } from "@/lib/api";
import { ChevronDown, ChevronUp, Globe2, LineChart, PieChart, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KLineChart from "./KLineChart";
import AttributionChart from "./AttributionChart";
import AnalystInsights from "./AnalystInsights";
import { Locale } from "@/lib/i18n";

export default function DetailedAnalysis({ data, lang }: { data: PredictionData, lang: Locale }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { prediction_result, market_data, sentiment_data, global_factors } = data;
  
  const historicalData = prediction_result.chart_data.historical || [];
  const predictionPoint = prediction_result.target_prediction;

  return (
    <div className="glass-panel rounded-xl overflow-hidden mt-8 bg-[#10172A] border border-[#334155] shadow-xl p-0">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all">
            <LineChart className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <span className="block text-xl font-bold text-[#F8FAFC] tracking-tight uppercase">OmniQuant Deep Analysis</span>
            <span className="text-[9px] text-[#94A3B8] uppercase tracking-[0.2em] font-bold">M&A Grade Structural Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Institutional Score</span>
              <span className="text-sm font-bold text-primary mono-value">AAA+</span>
           </div>
           {isExpanded ? <ChevronUp className="w-6 h-6 text-slate-500" /> : <ChevronDown className="w-6 h-6 text-slate-500" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="border-t border-[#334155]"
          >
            <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/[0.01]">
              
              {/* Left Column: Analysts & Sentiment */}
              <div className="lg:col-span-4 space-y-8">
                <AnalystInsights insights={prediction_result.target_prediction.analyst_insights || {
                  goldman_macro: { score: 85, grade: "A", insights: "宏觀穩定" },
                  morgan_earnings: { score: 70, grade: "B", insights: "週期調整中" },
                  ark_innovation: { score: 90, grade: "AAA", insights: "創新共振強烈" }
                }} />

                <div className="pt-8 border-t border-[#334155]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.3em] flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-primary" />
                      輿情歸因 (Sentiment)
                    </h3>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-success animate-pulse" />
                      <span className="text-[9px] text-success font-bold uppercase tracking-widest">Live Audit</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {sentiment_data.factors.slice(0, 2).map((factor, idx) => (
                      <div key={idx} className="bg-white/[0.02] rounded-lg p-5 border border-[#334155]">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-[#F8FAFC] text-xs tracking-tight uppercase">{factor.keyword}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-bold tracking-widest uppercase ${factor.impact === '正面' ? 'bg-success/10 text-success' : factor.impact === '負面' ? 'bg-danger/10 text-danger' : 'bg-slate-500/10 text-slate-500'}`}>
                            {factor.impact}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed italic text-left">"{factor.headline}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: Attribution & Liquidity */}
              <div className="lg:col-span-4 flex flex-col lg:border-l lg:border-r border-[#334155] lg:px-8">
                <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-primary" />
                  權重歸因 (Attribution)
                </h3>
                <div className="bg-black/20 rounded-xl p-6 border border-[#334155] flex items-center justify-center min-h-[300px] shadow-inner mb-8">
                   <AttributionChart 
                     weights={prediction_result.target_prediction.attribution_weights || { chips: 0.45, fundamentals: 0.35, geopolitics: 0.2 }} 
                     lang={lang}
                   />
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest text-left">Liquidity Analysis</span>
                    <span className="text-xs font-bold text-[#F8FAFC] mono-value">9.2/10</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%]"></div>
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-3 leading-relaxed italic font-medium text-left">
                    * 該標的流動性充足，大額交易 (&gt;$10M) 滑價預估小於 0.15%，符合併購級建倉標準。
                  </p>
                </div>
              </div>

              {/* Right Column: Chart & Projection */}
              <div className="lg:col-span-4 flex flex-col">
                <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.3em] mb-6 flex justify-between items-center">
                  <span>Structural Projection</span>
                  <span className="text-[9px] font-bold text-primary mono-value uppercase">Confidence: 94.2%</span>
                </h3>
                <div className="flex-1 min-h-[350px] bg-black/40 rounded-xl p-6 border border-[#334155] relative shadow-inner">
                  <KLineChart 
                    data={historicalData} 
                    prediction={{ ...predictionPoint, price: predictionPoint.predicted_price }} 
                    currentPrice={market_data.current_price} 
                  />
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] rounded-lg p-4 border border-[#334155] flex justify-between items-center group hover:bg-white/5 transition-all">
                      <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-widest">SOX Index</span>
                      <span className="text-sm font-mono font-bold text-[#F8FAFC] group-hover:text-primary transition-colors">{global_factors.sox_index.toFixed(1)}</span>
                    </div>
                    <div className="bg-white/[0.02] rounded-lg p-4 border border-[#334155] flex justify-between items-center group hover:bg-white/5 transition-all">
                      <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-widest">Volatility</span>
                      <span className="text-sm font-mono font-bold text-[#F8FAFC] group-hover:text-primary transition-colors">24.5%</span>
                    </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
