import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { input } = body;

    console.log("Input received:", input); // ✅ Debug

    if (!input) {
      return NextResponse.json({ output: "No input provided" }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "llama3-70b-8192",
    });

    const result = chatCompletion.choices[0]?.message?.content || "No response";
    console.log("Groq response:", result); // ✅ Debug

    return NextResponse.json({ output: result });

  } catch (err: any) {
    console.error("❌ Error in API route:", err); // ✅ This will give the real error
    return NextResponse.json({ output: "Internal Server Error" }, { status: 500 });
  }
}
