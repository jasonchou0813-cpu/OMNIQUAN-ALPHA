/**
 * ALPHA VISION CORE ENGINE - QUANTITATIVE RESONANCE MATRIX
 * * 商業邏輯：
 * 1. 核心放量偵測（Volume Spike）：計算當日成交量是否大於 5 日均量的 N 倍，捕捉主力進場點。
 * 2. 均線糾結共振（MA Convergence）：計算短、中、長期均線的乖離度，判斷是否處於爆發臨界點。
 * 3. 機構級評分（Institutional Score）：綜合量能與均線，產出 0-100 的絕對量化指標，作為 AI 診斷的基礎。
 */

interface KLineData {
  close: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  date: string;
}

interface ResonanceResult {
  score: number;
  volumeSpikeRatio: number;
  maConvergenceGradient: number;
  trendDirection: 'BULLISH' | 'BEARISH' | 'CONSOLIDATING';
  signals: string[];
}

export class ResonanceEngine {
  /**
   * 計算移動平均線 (MA)
   */
  private static calculateMA(data: KLineData[], period: number): number[] {
    let ma: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        ma.push(0); // 數據不足期間填 0
        continue;
      }
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close;
      }
      ma.push(Number((sum / period).toFixed(2)));
    }
    return ma;
  }

  /**
   * 核心共振演算法引擎
   */
  public static analyze(klines: KLineData[]): ResonanceResult {
    // 確保數據量足夠進行基本均線計算 (至少需要 20 根 K 線)
    if (!klines || klines.length < 20) {
      return {
        score: 50,
        volumeSpikeRatio: 1.0,
        maConvergenceGradient: 0,
        trendDirection: 'CONSOLIDATING',
        signals: ['數據量不足，啟動預設防護機制']
      };
    }

    const latest = klines[klines.length - 1];
    const signals: string[] = [];
    
    // 1. 計算均線 (5MA, 10MA, 20MA)
    const ma5 = this.calculateMA(klines, 5);
    const ma10 = this.calculateMA(klines, 10);
    const ma20 = this.calculateMA(klines, 20);

    const currentMa5 = ma5[ma5.length - 1];
    const currentMa10 = ma10[ma10.length - 1];
    const currentMa20 = ma20[ma20.length - 1];

    // 2. 計算 5 日平均成交量 (不含當日)
    let totalVol5 = 0;
    for (let i = 2; i <= 6; i++) {
      totalVol5 += klines[klines.length - i]?.volume || 0;
    }
    const avgVolume5 = totalVol5 / 5;

    // 3. 計算放量倍數 (Volume Spike Ratio)
    const volumeSpikeRatio = avgVolume5 > 0 ? Number((latest.volume / avgVolume5).toFixed(2)) : 1.0;

    // 4. 計算均線糾結度 (MA Convergence Gradient) - 數值越小代表越糾結，爆發力越強
    const maMax = Math.max(currentMa5, currentMa10, currentMa20);
    const maMin = Math.min(currentMa5, currentMa10, currentMa20);
    const maConvergenceGradient = Number(((maMax - maMin) / latest.close * 100).toFixed(2));

    // 5. 核心量化評分邏輯 (滿分 100)
    let score = 50; // 基準分

    // 量能加權 (最高加 30 分)
    if (volumeSpikeRatio >= 3.0) {
      score += 30;
      signals.push(`🔥 觸發『巨人傑』核心邏輯：成交量極端暴增 ${volumeSpikeRatio} 倍，主力強勢介入`);
    } else if (volumeSpikeRatio >= 1.5) {
      score += 15;
      signals.push(`📈 量能溫和放大 ${volumeSpikeRatio} 倍，具備攻擊力道`);
    } else if (volumeSpikeRatio < 0.6) {
      score -= 10;
      signals.push(`⚠️ 量能極度窒息，缺乏追價意願`);
    }

    // 均線共振加權 (最高加 20 分)
    if (maConvergenceGradient <= 1.5 && currentMa5 > currentMa20) {
      score += 20;
      signals.push(`🎯 均線極度糾結共振 (乖離僅 ${maConvergenceGradient}%)，屬於標準多方起漲型態`);
    } else if (currentMa5 > currentMa10 && currentMa10 > currentMa20) {
      score += 10;
      signals.push(`🐂 均線呈現標準多頭排列`);
    } else if (currentMa5 < currentMa20) {
      score -= 15;
      signals.push(`📉 空頭趨勢壓制，上方解套賣壓沉重`);
    }

    // 6. 判定趨勢方向
    let trendDirection: 'BULLISH' | 'BEARISH' | 'CONSOLIDATING' = 'CONSOLIDATING';
    if (score >= 70) trendDirection = 'BULLISH';
    if (score <= 40) trendDirection = 'BEARISH';

    // 確保分數範圍在 0 - 100 之間
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      volumeSpikeRatio,
      maConvergenceGradient,
      trendDirection,
      signals
    };
  }
}