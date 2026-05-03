"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, BarChart, TrendingUp, Zap, PieChart } from "lucide-react";

interface AnalysisPanelProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
}

export default function AnalysisPanel({ isOpen, onClose, symbol }: AnalysisPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[450px] bg-[#0a0a12] border-l border-white/10 z-[101] shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  法人籌碼與營收分析
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Institutional Flow section */}
                <section>
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary" /> 法人籌碼流向 (30D)
                  </h3>
                  <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
                    {[
                      { label: "外資 (Foreign)", value: "+4,520 張", color: "text-success", bg: "bg-success/10" },
                      { label: "投信 (Investment Trust)", value: "-1,200 張", color: "text-danger", bg: "bg-danger/10" },
                      { label: "主力 (Big Players)", value: "+8,900 張", color: "text-success", bg: "bg-success/10" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{item.label}</span>
                        <span className={`text-sm font-bold px-3 py-1 rounded ${item.bg} ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-white/5">
                      <div className="text-[10px] text-gray-600 mb-2">籌碼集中度 (Concentration)</div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%]"></div>
                      </div>
                      <div className="mt-2 text-right text-xs text-primary font-bold">65.2%</div>
                    </div>
                  </div>
                </section>

                {/* Revenue Impact section */}
                <section>
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-secondary" /> 月營收成長動能
                  </h3>
                  <div className="glass-panel p-5 rounded-xl border border-white/5">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">最新月營收 (MAR)</div>
                        <div className="text-xl font-bold text-white">4.2B TWD</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-gray-500 uppercase">YoY</div>
                        <div className="text-lg font-bold text-success">+15.4%</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">
                      "營收連 3 月正成長，顯示產業進入復甦週期，基本面支撐力道強勁。"
                    </p>
                  </div>
                </section>

                {/* Industry Chain section */}
                <section>
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-secondary" /> 產業鏈連動分析
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <div className="text-sm font-bold text-primary mb-1">AI 伺服器需求溢出</div>
                      <p className="text-[10px] text-gray-400">下游代工廠稼動率提升，帶動上游零組件拉貨動能預期增長 20%</p>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                      <div className="text-sm font-bold text-secondary mb-1">矽光子技術瓶頸突破</div>
                      <p className="text-[10px] text-gray-400">目前處於技術早期爆發階段，板塊連動性高達 0.85</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Powered by OmniQuant Intelligence Engine</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
