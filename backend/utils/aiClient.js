// backend/utils/aiClient.js
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generates text using Gemini (v2.5 Flash or 2.0 Flash).
 * This version matches the newest SDK format and always returns usable text.
 */
export async function generateText(prompt, systemPrompt = "") {
  try {
    const combinedPrompt = systemPrompt
      ? `${systemPrompt}\n\n${prompt}`
      : prompt;

    // ✅ New request format — direct string, not array
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // free-tier compatible model
      contents: combinedPrompt,
    });

    // ✅ New response shape
    const text =
      response?.text ??
      response?.response?.text ??
      "⚠️ Gemini returned no text.";

    return text.trim();
  } catch (error) {
    console.error("[Gemini AI] Error:", error.message);
    return "⚠️ Gemini AI generation failed.";
  }
}
