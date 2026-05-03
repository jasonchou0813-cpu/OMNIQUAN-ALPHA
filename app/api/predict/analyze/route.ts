import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { symbol } = await req.json();

    // 1. 呼叫 OpenAI 進行專業診斷
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一位專業的台股分析師。請針對輸入的股票代號提供：1. 共振分數(0-100) 2. 簡短診斷 3. 技術面評級(如:STRONG) 4. 籌碼面評級。請嚴格以 JSON 格式回傳。"
        },
        {
          role: "user",
          content: `請分析股票代號：${symbol}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

    // 2. 回傳給前端
    return NextResponse.json({
      score: aiResponse.score || 80,
      analysis: aiResponse.analysis || "目前走勢符合共振模型，建議持續觀察量能變化。",
      technical: aiResponse.technical || "STABLE",
      sentiment: aiResponse.sentiment || "NEUTRAL"
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '分析失敗' }, { status: 500 });
  }
}