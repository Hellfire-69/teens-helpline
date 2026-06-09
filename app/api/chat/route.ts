import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BOO_SYSTEM_PROMPT } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_key_here") {
      console.error("[Boo] GEMINI_API_KEY is missing or not set");
      return NextResponse.json(
        { error: "API key not configured. Add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // Parse body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Init Gemini inside handler to avoid module-level env issues
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: BOO_SYSTEM_PROMPT,
    });

    // Build history (all messages except the last one)
    const historyRaw = messages
      .slice(0, -1)
      .filter((m: { role: string; content: string }) => m.content?.trim())
      .map((m: { role: string; content: string }) => ({
        role: m.role === "boo" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Gemini requires the history to strictly start with a 'user' message.
    // Boo's opening message is sent as a 'model' role, which crashes the API if it's first.
    const firstUserIndex = historyRaw.findIndex((m: { role: string }) => m.role === "user");
    const history = firstUserIndex !== -1 ? historyRaw.slice(firstUserIndex) : [];

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (err: unknown) {
    // Log the full error server-side for debugging
    console.error("[Boo API error]", err);

    const message =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json(
      { error: `Boo hit an error: ${message}` },
      { status: 500 }
    );
  }
}
