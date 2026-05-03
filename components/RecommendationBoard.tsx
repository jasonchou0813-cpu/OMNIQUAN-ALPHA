"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, AlertCircle } from "lucide-react";

interface RecommendationItem {
  label: string;
  predicted_price: number;
  predicted_change_percent: number;
  grade: string;
  confidence_score: number;
  avg_achievement_rate: number;
  max_drawdown: number;
  decision_summary: {
    drivers: string[];
    risks: string[];
  };
}

interface RecommendationBoardProps {
  recommendations: { [key: string]: RecommendationItem };
}

const ProgressRing = ({ percentage, color = "primary" }: { percentage: number, color?: string }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          className={`text-${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <span className="absolute text-[10px] font-bold">{Math.round(percentage)}%</span>
    </div>
  );
};

export default function RecommendationBoard({ recommendations }: RecommendationBoardProps) {
  const items = Object.entries(recommendations);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {items.map(([key, item], idx) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-panel p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{item.label}</span>
            <span className={`text-lg font-black ${item.grade.includes('AAA') ? 'gold-gradient-text' : (item.grade.startsWith('A') ? 'text-primary' : 'text-warning')}`}>
              {item.grade}
            </span>
          </div>

          <div className="mb-4">
            <div className="text-xl font-bold text-white mb-1">${item.predicted_price}</div>
            <div className={`text-sm font-semibold ${item.predicted_change_percent >= 0 ? 'text-success' : 'text-danger'}`}>
              {item.predicted_change_percent >= 0 ? '+' : ''}{item.predicted_change_percent}%
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4 pt-4 border-t border-white/5">
            <div className="flex-1">
              <div className="text-[10px] text-gray-500 mb-1">預期達成率</div>
              <ProgressRing percentage={item.avg_achievement_rate} color="success" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-[10px] text-gray-500 mb-1">信心指數</div>
              <div className="text-lg font-mono font-bold text-primary">{item.confidence_score}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-gray-600 uppercase">決策摘要</div>
            <div className="flex flex-wrap gap-1">
              {item.decision_summary.drivers.map((d, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary rounded border border-primary/20">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Hover Overlay with Risks */}
          <div className="absolute inset-0 bg-[#0a0a12]/95 p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center gap-2 text-warning mb-2 text-xs font-bold">
              <AlertCircle className="w-3 h-3" /> 風險提示
            </div>
            {item.decision_summary.risks.map((r, i) => (
              <p key={i} className="text-[10px] text-gray-300 leading-relaxed">• {r}</p>
            ))}
            <div className="mt-4 text-[10px] text-gray-500">
              最大回撤: <span className="text-danger">-{item.max_drawdown}%</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
