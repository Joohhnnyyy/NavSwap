
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenAI using the environment variable directly as per guidelines
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Circuit breaker to avoid spamming API if quota is exhausted
let apiDisabledUntil = 0;

export async function getEventNarration(event: string, context: string): Promise<string> {
  const now = Date.now();
  if (now < apiDisabledUntil) {
    return "Analyzing telemetry data for optimal rerouting...";
  }

  try {
    const prompt = `You are a Smart EV Navigation AI. Provide a short, professional voice-over style update (max 15 words) for this event: "${event}".`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
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
