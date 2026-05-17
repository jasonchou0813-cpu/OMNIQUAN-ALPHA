import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    // 1. 安全檢查：只有在 API 被呼叫時才初始化，避免 Build 階段崩潰
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Warning: OPENAI_API_KEY is missing. Returning mock data for stability.");
      // 如果沒有 Key，回傳模擬數據確保系統不崩潰 (對收購演示很重要)
      return NextResponse.json({
        success: true,
        isMock: true,
        analysis: "目前處於模擬模式。請配置 API Key 以獲取 AI 實時量化預測。",
        prediction: "N/A"
      });
    }

    const openai = new OpenAI({ apiKey });
    const { stockData, logicType } = await req.json();

    // 2. 這裡插入你的「巨人傑」或「ALPHA VISION」核心邏輯
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "你是一位資深量化分析師，專精於高頻交易與籌碼分析。" },
        { role: "user", content: `分析以下數據並給出預測：${JSON.stringify(stockData)}` }
      ],
    });

    return NextResponse.json({
      success: true,
      analysis: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}