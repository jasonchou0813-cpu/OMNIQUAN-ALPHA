"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { calculateResonance } from '@/lib/resonance-engine';

export default function Home() {
  const [ticker, setTicker] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ticker) return;
    setLoading(true);
    try {
      const result = await calculateResonance(ticker);
      setReport(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-10 px-4">
      {/* 🚀 杰哥，這就是解決 App 模式遮擋的「護城河」 */}
      <div className="h-14 md:h-20 w-full"></div>

      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* 標題區域 - 加上額外的 mt-4 確保絕對不會被遮到 */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic text-white mb-2">
            ALPHA VISION
          </h1>
          <div className="h-1 w-20 bg-green-500 mx-auto"></div>
        </div>

        {/* 搜尋框 */}
        <div className="w-full relative mb-8">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="輸入股票代碼..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-green-500 transition-all text-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-3 top-3 p-2 bg-green-500 rounded-xl hover:bg-green-400 transition-colors"
          >
            <Search size={24} className="text-black" />
          </button>
        </div>

        {/* 結果區域 */}
        {loading && (
          <div className="text-green-500 animate-pulse font-mono mt-10">
            CONNECTING TO RESONANCE ENGINE...
          </div>
        )}

        {report && !loading && (
          <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center">
              <div className="text-zinc-500 text-sm font-mono mb-2">RESONANCE SCORE</div>
              <div className="text-7xl md:text-8xl font-black text-green-500 tracking-tighter">
                {report.finalScore}
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="text-xs text-zinc-500 font-mono mb-3 text-left">AI DIAGNOSTIC</div>
                <p className="text-left text-base md:text-lg leading-relaxed text-zinc-200 italic">
                  「{report.dimensions.chip.reason}」
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-center">
                <div className="text-zinc-500 text-xs mb-1">CHIP</div>
                <div className="text-xl font-bold text-green-400">STRONG</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-center">
                <div className="text-zinc-500 text-xs mb-1">TECH</div>
                <div className="text-xl font-bold text-zinc-400">STABLE</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}