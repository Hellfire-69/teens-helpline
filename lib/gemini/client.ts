import { GoogleGenerativeAI } from '@google/generative-ai';

console.log("[GEMINI CLIENT] Initializing at module level...");
const apiKey = process.env.GEMINI_API_KEY || '';
console.log(`[GEMINI CLIENT] API Key length: ${apiKey.length}`);

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiClient = {
  getModel() {
    console.log("[GEMINI CLIENT] getModel called");
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }
};
