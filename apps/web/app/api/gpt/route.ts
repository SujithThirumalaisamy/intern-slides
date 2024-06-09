import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { snippet } = body;
    const apiKey = localStorage.getItem("not_openai_api_key");
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${snippet}.... this is the mail i received. What is the category of this mail` }],
      max_tokens: 1,
      model: 'gpt-3.5-turbo',
    })
    return NextResponse.json(completion.choices[0]);
  } catch (error) {
    return NextResponse.json({ message: JSON.stringify(error) });
  }
}
