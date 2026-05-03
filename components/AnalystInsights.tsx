import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface Insight {
  score: number;
  grade: string;
  insights: string;
}

interface AnalystInsightsProps {
  insights: {
    goldman_macro: Insight;
    morgan_earnings: Insight;
    ark_innovation: Insight;
  };
}

const AnalystInsights: React.FC<AnalystInsightsProps> = ({ insights }) => {
  const analysts = [
    {
      name: "高盛宏觀 (GS Macro)",
      icon: Landmark,
      data: insights.goldman_macro,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      description: "債券殖利率與美元相關性分析"
    },
    {
      name: "大摩週期 (MS Earnings)",
      icon: TrendingUp,
      data: insights.morgan_earnings,
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
      description: "預期 EPS 與實際營收偏離度"
    },
    {
      name: "方舟成長 (ARK Innovation)",
      icon: Zap,
      data: insights.ark_innovation,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      description: "產業集群共振與 OBV 能量"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        頂尖分析師維度對照 (Analyst Intelligence)
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {analysts.map((analyst, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${analyst.bg} ${analyst.color}`}>
                <analyst.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white group-hover:text-primary transition-colors">{analyst.name}</div>
                <div className="text-[10px] text-secondary font-medium mt-1">{analyst.description}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-xl font-black mono-value ${analyst.data.grade.includes('AAA') ? 'gold-gradient-text' : analyst.color}`}>
                {analyst.data.grade}
              </div>
              <div className="text-[10px] text-secondary font-bold mt-1 italic">"{analyst.data.insights}"</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalystInsights;
