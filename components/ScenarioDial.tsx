import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Shield, Activity } from 'lucide-react';

export type Scenario = 'normal' | 'hawkish' | 'conflict';

interface ScenarioDialProps {
  current: Scenario;
  onChange: (s: Scenario) => void;
}

const ScenarioDial: React.FC<ScenarioDialProps> = ({ current, onChange }) => {
  const scenarios = [
    { id: 'normal', label: '常規 (Normal)', icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'hawkish', label: '鷹派 (Hawkish)', icon: Shield, color: 'text-warning', bg: 'bg-warning/10' },
    { id: 'conflict', label: '衝突 (Conflict)', icon: Swords, color: 'text-danger', bg: 'bg-danger/10' },
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6">
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] mb-6 opacity-60">
        Scenario Simulation
      </div>
      {scenarios.map((s) => (
        <motion.button
          key={s.id}
          whileHover={{ x: 8 }}
          onClick={() => onChange(s.id as Scenario)}
          className={`p-5 rounded-3xl border transition-all flex items-center justify-center group relative ${
            current === s.id 
            ? `bg-primary/10 border-primary/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]` 
            : 'border-white/5 bg-white/[0.03] hover:bg-white/10'
          }`}
        >
          <s.icon className={`w-6 h-6 ${current === s.id ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-6 px-4 py-2 bg-[#10172A] border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-2xl">
            <span className="text-[11px] font-black text-foreground uppercase tracking-widest">{s.label}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ScenarioDial;
