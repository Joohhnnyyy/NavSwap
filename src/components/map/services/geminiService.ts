
import { GoogleGenAI } from "@google/genai";

// Circuit breaker to avoid spamming API if quota is exhausted
let apiDisabledUntil = 0;

export async function getEventNarration(event: string, context: string): Promise<string> {
  const now = Date.now();
  if (now < apiDisabledUntil) {
    return "Analyzing telemetry data for optimal rerouting...";
  }

  try {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (!key) {
      if (event.includes('reached')) return "Destination reached. Initiating automated battery swap sequence.";
      if (event.includes('congested')) return "Traffic density increasing. Recalculating route for peak efficiency.";
      if (event.includes('fault')) return "Hub technical failure detected. Diverting to nearest backup terminal.";
      return "Optimizing navigation path based on real-time grid feedback.";
    }

    const ai = new GoogleGenAI({ apiKey: key as string });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to latest available model or fallback
      contents: `You are a Smart EV Navigation AI. Context: ${context}. Provide a short, professional voice-over style update (max 15 words) for this event: "${event}".`,
      config: {
        temperature: 0.6,
        topP: 0.8,
      }
    });
    return response.text?.trim() || "Optimizing route based on live data.";
  } catch (error: any) {
    console.warn("Gemini Service: Quota limit or API error. Falling back to local templates.");
    
    // If rate limited, disable API calls for 60 seconds
    if (error?.status === 429 || error?.message?.includes('429')) {
      apiDisabledUntil = now + 60000;
    }
    
    // Quality fallbacks based on keywords
    if (event.includes('reached')) return "Destination reached. Initiating automated battery swap sequence.";
    if (event.includes('congested')) return "Traffic density increasing. Recalculating route for peak efficiency.";
    if (event.includes('fault')) return "Hub technical failure detected. Diverting to nearest backup terminal.";
    return "Optimizing navigation path based on real-time grid feedback.";
  }
}
