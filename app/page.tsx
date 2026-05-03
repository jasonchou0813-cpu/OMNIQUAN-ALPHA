"use client";

import React, { useState, useEffect } from 'react';

// 打字機效果
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText("");
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);
  return <p className="leading-relaxed text-blue-100/90">{displayedText}<span>|</span></p>;
};

// 科技感半圓儀表板 (純 CSS 版，不依賴外部庫)
const GaugeChart = ({ score }: { score: number }) => {
  const rotation = (score / 100) * 180 - 90;
  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-2xl border border-blue-500/20">
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute top-0 w-48 h-48 border-[12px] border-slate-800 rounded-full"></div>
        <div 
          className="absolute top-0 w-48 h-48 border-[12px] border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full transition-all duration-1000"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-black text-white italic">
          {score || 0}
        </div>
      </div>
      <span className="mt-2 text-[10px] font-bold tracking-widest text-blue-400 uppercase tracking-tighter">Resonance Score</span>
    </div>
  );
};

export default function AlphaVision() {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!symbol) return;
    setLoading(true);
    try {
      const res = await fetch('/api/predict/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
      });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Analysis failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050a15] text-slate-200">
      <main className="max-w-lg mx-auto px-6 pt-12 pb-24">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase">Alpha Vision</h1>
        </div>

        <div className="relative mb-8">
          <input 
            type="text" 
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="輸入股票代號"
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 text-lg"
          />
          <button 
            onClick={handleAnalyze}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold py-2 px-6 rounded-xl"
          >
            {loading ? "..." : "診斷"}
          </button>
        </div>

        {data && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <GaugeChart score={data.score} />
            <div className="bg-slate-900 border border-blue-500/10 rounded-3xl p-6 shadow-2xl">
              <div className="text-blue-400 text-[10px] font-bold uppercase mb-4 tracking-widest">AI Diagnostic Report</div>
              <TypewriterText text={data.analysis} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
               <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 tracking-widest">Technical</div>
                  <div className="text-white font-black italic">{data.technical}</div>
               </div>
               <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 tracking-widest">Sentiment</div>
                  <div className="text-white font-black italic">{data.sentiment}</div>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}