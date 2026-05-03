"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award } from "lucide-react";

interface RecommendationCard {
  symbol: string;
  strategy: string;
  expectedGain: string;
  grade: string;
  achievement: number;
  reason: string;
}

const recommendations: RecommendationCard[] = [
  { symbol: "2330.TW", strategy: "短期", expectedGain: "+12.5%", grade: "AAA", achievement: 88, reason: "AI 伺服器需求爆發，籌碼高度集中" },
  { symbol: "AAPL", strategy: "中長期", expectedGain: "+8.2%", grade: "AA", achievement: 75, reason: "全球終端需求回溫，毛利結構優化" },
  { symbol: "GC=F", strategy: "長期價值", expectedGain: "+15.0%", grade: "AAA", achievement: 92, reason: "避險情緒升溫，各國央行持續增持" },
  { symbol: "NVDA", strategy: "當沖", expectedGain: "+3.4%", grade: "A", achievement: 65, reason: "突破近期壓力位，高頻交易訊號強烈" },
  { symbol: "BTC-USD", strategy: "隔日沖", expectedGain: "+5.1%", grade: "B", achievement: 58, reason: "減半效應發酵，現貨 ETF 持續流入" }
];

export default function RecommendationWall({ 
  lang = 'zh',
  onRecommendClick 
}: { 
  lang?: string,
  onRecommendClick?: (symbol: string, assetType: string) => void
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {recommendations.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => {
               const assetType = item.symbol.includes('=F') ? 'gold' : (item.symbol.includes('BTC') ? 'stock' : 'stock');
               onRecommendClick?.(item.symbol, assetType);
            }}
            className="glass-panel p-6 rounded-xl border border-[#334155] bg-[#10172A] hover:bg-[#1E293B] transition-all group cursor-pointer text-left"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[8px] font-bold px-2 py-0.5 bg-[#1E293B] rounded text-[#94A3B8] uppercase tracking-widest border border-[#334155]">
                {item.strategy}
              </span>
              <span className="text-base font-bold text-primary mono-value">
                {item.grade}
              </span>
            </div>

            <div className="mb-6">
              <div className="text-lg font-bold text-[#F8FAFC] group-hover:text-primary transition-colors tracking-tight uppercase">{item.symbol}</div>
              <div className="text-sm font-bold text-[#4ADE80] flex items-center gap-1.5 mt-1 mono-value">
                <TrendingUp className="w-3 h-3" /> {item.expectedGain}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[9px] text-[#94A3B8] font-bold mb-1.5 uppercase tracking-wider">
                  <span>Achievement</span>
                  <span className="mono-value text-[#F8FAFC]">{item.achievement}%</span>
                </div>
                <div className="w-full bg-[#1E293B] h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.achievement}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#334155]">
                <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2 font-medium italic">
                  "{item.reason}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
