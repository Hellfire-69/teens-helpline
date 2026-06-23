import { NextResponse } from 'next/server';
import { geminiClient } from '@/lib/gemini/client';
import { novaSystemInstruction, buildNovaPrompt } from '@/lib/gemini/prompt-builder';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history, moodContext, journalContext } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = geminiClient.getModel();
    const chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [{ text: novaSystemInstruction }]
      },
      history: history || []
    });

    const prompt = buildNovaPrompt(message, moodContext, journalContext);
    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
