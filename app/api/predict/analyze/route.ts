import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ResonanceEngine } from '@/lib/resonance-engine'; // 🎯 引入你剛推上雲端的核心引擎

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const { symbol, klines } = await req.json();

    // 1. 先用我們本機的獨立核心引擎進行「機構級純數學量化計算」
    // 這樣做就算沒有 OpenAI Key，核心運算依然能跑，築起技術護城河
    const quantResult = ResonanceEngine.analyze(klines);

    // 2. 安全機制：若尚未配置 OpenAI Key，直接回傳量化引擎的精準數據，確保系統絕不崩潰
    if (!apiKey) {
      console.warn("ALPHA VISION: OPENAI_API_KEY Missing, running on pure Quant Engine.");
      return NextResponse.json({
        score: quantResult.score,
        analysis: `[純量化引擎模式] 股票代號 ${symbol || '未知'} 分析完成。${quantResult.signals.join(' | ')}`,
        technical: quantResult.trendDirection,
        sentiment: "NEUTRAL",
        volumeSpikeRatio: quantResult.volumeSpikeRatio,
        maConvergence: quantResult.maConvergenceGradient,
        isMock: false // 這裡已經不是模擬數據了，是真正的純數學量化計算結果！
      });
    }

    const openai = new OpenAI({ apiKey });

    // 3. 頂級 FinTech 架構：把本機算好的精準量化指標，餵給 AI 做高階商業診斷
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一位專精於台股量化分析與『巨人傑』籌碼邏輯的首席投顧策略長。請結合後端量化引擎計算出的精準數據（包含共振分數、放量倍數、均線糾結度），產出一段極具權威感、字字珠璣的台股深度診斷報告。"
        },
        {
          role: "user",
          content: `股票代號：${symbol}
量化共振分數：${quantResult.score} / 100
主力放量倍數：${quantResult.volumeSpikeRatio} 倍
均線糾結乖離度：${quantResult.maConvergenceGradient}%
趨勢方向：${quantResult.trendDirection}
核心信號：${JSON.stringify(quantResult.signals)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

    // 4. 融合「純數學指標」與「AI 點睛診斷」回傳前端，這就是收購方最想要的架構
    return NextResponse.json({
      score: quantResult.score,
      analysis: aiResponse.analysis || "分析完成，走勢符合量能共振模型。",
      technical: quantResult.trendDirection,
      sentiment: aiResponse.sentiment || "NEUTRAL",
      volumeSpikeRatio: quantResult.volumeSpikeRatio,
      maConvergence: quantResult.maConvergenceGradient
    });

  } catch (error: any) {
    console.error('ALPHA VISION Engine Critical Error:', error);
    return NextResponse.json({ error: '量化分析引擎暫時無法響應' }, { status: 500 });
  }
}