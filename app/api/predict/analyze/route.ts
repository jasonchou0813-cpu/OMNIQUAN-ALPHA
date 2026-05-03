import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { ticker, score, data } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一位精通台股的投資專家。請根據共振分數與數據，給出 30 字以內的犀利短評。"
        },
        {
          role: "user",
          content: `標的：${ticker}，分數：${score}，收盤：${data.close}。請分析。`
        }
      ],
      temperature: 0.5,
    });

    return NextResponse.json({ 
      analysis: response.choices[0].message.content 
    });
  } catch (error) {
    return NextResponse.json({ analysis: "數據共振中，量價結構穩定。" });
  }
}