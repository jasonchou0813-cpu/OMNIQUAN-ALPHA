'use client';

import React, { useState } from 'react';

export default function AlphaVisionDashboard() {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 模擬一組符合後端引擎需求的 20 天 K 線數據（包含成交量與收盤價）
  const generateMockKlines = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      date: `2026-05-${1 + i}`,
      open: 500 + Math.random() * 20,
      high: 530 + Math.random() * 20,
      low: 490 + Math.random() * 20,
      close: 510 + (i === 19 ? 30 : Math.random() * 20), // 讓最後一天收高
      volume: i === 19 ? 15000 : 3000 + Math.random() * 2000, // 讓最後一天大幅放量觸發『巨人傑』邏輯
    }));
  };

  const handleAnalyze = async () => {
    if (!symbol) return alert('請輸入股票代號');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/predict/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: symbol,
          klines: generateMockKlines(),
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30">
      {/* 奢華頂級頂欄 */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-slate-950 font-black text-lg tracking-wider">Ω</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                ALPHA VISION
              </h1>
              <p className="text-[10px] text-emerald-400/80 tracking-widest uppercase font-semibold">
                Quant Resonance Matrix
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-mono tracking-wider">
              ENGINE V2.1 // ACTIVE
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 輸入區塊卡片 */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-sm mb-12">
          <h2 className="text-lg font-medium text-slate-200 mb-2 text-center">
            啟動量化共振矩陣偵測
          </h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            本機引擎將深度運算高頻量能、均線糾結度，並由 AI 進行終極診斷
          </p>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="輸入股票代號 (如: 2330)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? '矩陣運算中...' : '開始診斷'}
            </button>
          </div>
        </div>

        {/* 診斷結果區塊 */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 三格核心量化指標 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 分數卡片 */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    矩陣共振指標
                  </p>
                  <h3 className="text-5xl font-black font-mono text-emerald-400 mt-4">
                    {result.score}
                    <span className="text-xs text-slate-600 font-normal"> / 100</span>
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-900/60">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.technical === 'BULLISH' ? 'bg-emerald-500/10 text-emerald-400' :
                    result.technical === 'BEARISH' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {result.technical} 型態
                  </span>
                </div>
              </div>

              {/* 放量倍數卡片 */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    主力放量倍數 (5MA比)
                  </p>
                  <h3 className="text-5xl font-black font-mono text-slate-100 mt-4">
                    {result.volumeSpikeRatio}x
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-900/60 text-xs text-slate-400">
                  {result.volumeSpikeRatio >= 2 ? '🔥 觸發大主力放量訊號' : '量能動態觀望中'}
                </div>
              </div>

              {/* 均線乖離卡片 */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    均線糾結乖離率
                  </p>
                  <h3 className="text-5xl font-black font-mono text-slate-100 mt-4">
                    {result.maConvergence}%
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-900/60 text-xs text-slate-400">
                  數值越低代表籌碼共振臨界點越近
                </div>
              </div>
            </div>

            {/* AI 深度策略診斷報告 */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-900 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-medium tracking-wider uppercase text-slate-400">
                  策略長深度思維報告 (AI Fusion)
                </h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed text-base font-serif">
                  {result.analysis}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}