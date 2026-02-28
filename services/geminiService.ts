import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSupportResponse = async (
  prompt: string, 
  context: string = ''
): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure the environment.";

  try {
    const systemInstruction = `
      You are an expert Network Engineer and Support Agent for "HitVPN".
      
      Your goal is to help users with:
      1. VPN connection issues (WireGuard, Xray, VLESS).
      2. Explaining technical architecture.
      3. Generating code examples for backend (FastAPI/Node) or server config if asked.
      
      Current App Context: ${context}
      
      Keep answers concise, technical but accessible, and friendly.
      If asked for code, provide clean, commented markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, our AI support is currently offline. Please try again later.";
  }
};

export const generateTechArchitecture = async (topic: string): Promise<string> => {
   if (!apiKey) return "API Key is missing.";
   
   const prompt = `
     Generate a technical explanation and code example for: ${topic}.
     Assume a stack of: Python (FastAPI), Postgres, Docker, and WireGuard.
     Return strictly valid Markdown.
   `;

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "No content generated.";
   } catch (error) {
     return "Error generating technical docs.";
   }
}
