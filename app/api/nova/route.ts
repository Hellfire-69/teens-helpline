import { NextResponse } from 'next/server';
import { geminiClient } from '@/lib/gemini/client';
import { novaSystemInstruction, buildNovaPrompt } from '@/lib/gemini/prompt-builder';

export async function POST(request: Request) {
  try {
    console.log("[NOVA API] Route started");
    const body = await request.json();
    const { message, history, moodContext, journalContext } = body;
    console.log("[NOVA API] Parsed body:", { messageLength: message?.length, historyLength: history?.length });

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log("[NOVA API] Getting model...");
    const model = geminiClient.getModel();
    
    console.log("[NOVA API] Starting chat...");
    const chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [{ text: novaSystemInstruction }]
      },
      history: history || []
    });

    console.log("[NOVA API] Building prompt...");
    const prompt = buildNovaPrompt(message, moodContext, journalContext);
    
    console.log("[NOVA API] Sending message to Gemini...");
    const result = await chat.sendMessage(prompt);
    
    console.log("[NOVA API] Extracting text...");
    const text = result.response.text();

    console.log("[NOVA API] Success!");
    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("[NOVA API] EXCEPTION CAUGHT:", error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
