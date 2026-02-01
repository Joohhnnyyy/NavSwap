
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Recommendation } from '../data';

// Initialize GoogleGenAI using the environment variable directly as per guidelines
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Circuit breaker to avoid spamming API if quota is exhausted
let apiDisabledUntil = 0;

export async function getStrategicInsights(contextData: any): Promise<any[]> {
  const now = Date.now();
  if (now < apiDisabledUntil) {
    return [
      { 
        title: 'Dynamic Pricing Implementation', 
        desc: 'Based on Sector 12 demand spikes, implementing a 15% incentive for off-peak swaps could balance load by 22%.', 
        impact: 'High', 
        category: 'Revenue',
        iconName: 'TrendingUp',
        detailedPlan: [
          'Analyze peak hours (18:00-21:00) traffic data from last 30 days.',
          'Deploy 15% discount push notifications to users in Sector 12.',
          'Monitor queue reduction and revenue impact for 2 weeks.'
        ],
        dataSource: 'Aggregated demand trends from Sector 12 stations (Stn-01, Stn-04) showing consistent 40% spikes at 19:00.'
      },
      { 
        title: 'Proactive Battery Re-balancing', 
        desc: 'Predicted shortfall in Sector 04 within 6 hours. Moving 40 charged units from Sector 09 is recommended.', 
        impact: 'Critical', 
        category: 'Ops',
        iconName: 'Zap',
        detailedPlan: [
          'Dispatch 2 logistics trucks to Sector 09 Hub.',
          'Load 20 units per truck (Total 40).',
          'Route to Sector 04 via Expressway to avoid downtown traffic.'
        ],
        dataSource: 'Real-time inventory levels: Sector 04 (12 units) vs Sector 09 (85 units). Demand forecast model v4.'
      },
      { 
        title: 'Fleet Maintenance Batching', 
        desc: 'Three chargers in Sector 22 show similar wear patterns. Scheduling single-trip maintenance saves $420 in logistics.', 
        impact: 'Medium', 
        category: 'Maintenance',
        iconName: 'ShieldCheck',
        detailedPlan: [
          'Flag Chargers C2, C5, and C8 in Maintenance Dashboard.',
          'Assign Ticket #4029 to Tech Team Alpha.',
          'Combine parts procurement into single PO #9921.'
        ],
        dataSource: 'IoT Telemetry: Voltage ripple > 20mV detected across 3 distinct units in same subnet.'
      }
    ];
  }

  try {
    const prompt = `
      You are NavSwap AI, a strategic operations director for an EV battery swapping network.
      Analyze the provided network context and generate 3 strategic roadmap items (long-term improvements).
      
      Context: ${JSON.stringify(contextData)}

      Return a strictly valid JSON array of objects with this structure:
      [
        {
          "title": "Strategy Title",
          "desc": "Detailed description of the strategy and its expected outcome.",
          "impact": "High" | "Medium" | "Critical",
          "category": "Revenue" | "Ops" | "Maintenance" | "Growth",
          "iconName": "TrendingUp" | "Zap" | "ShieldCheck" | "Target",
          "detailedPlan": ["Step 1", "Step 2", "Step 3"],
          "dataSource": "Explanation of which data points (e.g. Sector 12 demand, Station 4 latency) triggered this insight."
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    const jsonStr = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    return JSON.parse(jsonStr);
  } catch (error: any) {
    console.warn("Gemini Service: Error generating strategic insights.", error);
    if (error?.status === 429 || error?.message?.includes('429')) {
      apiDisabledUntil = now + 60000;
    }
    // Return fallback data
    return [
      { 
        title: 'Grid Load Balancing Protocol', 
        desc: 'Shift 10% of charging load to off-peak hours to reduce energy costs by estimated 12% monthly.', 
        impact: 'High', 
        category: 'Ops',
        iconName: 'Zap',
        detailedPlan: [
          'Identify non-critical charging slots.',
          'Adjust charging BMS profiles for overnight trickle charging.',
          'Negotiate new TOU rates with utility provider.'
        ],
        dataSource: 'Energy consumption metering vs Utility TOU rate cards.'
      },
      { 
        title: 'Preventive Component Replacement', 
        desc: 'Replace connector modules in Station 5 based on predictive wear analysis to prevent future downtime.', 
        impact: 'Medium', 
        category: 'Maintenance',
        iconName: 'ShieldCheck',
        detailedPlan: [
          'Order 5x Type-2 Connector Modules.',
          'Schedule maintenance window for Station 5.',
          'Update asset registry post-replacement.'
        ],
        dataSource: 'Predictive maintenance algorithm flagged impedance rise > 5%.'
      },
      { 
        title: 'Expansion Opportunity: Sector 8', 
        desc: 'High user density detected in Sector 8. New station deployment could capture 150 daily active users.', 
        impact: 'High', 
        category: 'Growth',
        iconName: 'TrendingUp',
        detailedPlan: [
          'Conduct site survey in Sector 8 commercial zone.',
          'Draft deployment proposal for stakeholder review.',
          'Secure lease for 200 sq ft parking area.'
        ],
        dataSource: 'GPS heatmaps of user drive paths showing frequent stops in Sector 8.'
      }
    ];
  }
}

export async function getAnalysisAndRecommendations(data: any): Promise<{ 
  optimization: string; 
  maintenance: string; 
  recommendations: Recommendation[] 
}> {
  const now = Date.now();
  if (now < apiDisabledUntil) {
    return {
      optimization: "Rerouted 12 vehicles to Sector 7 to prevent congestion.",
      maintenance: "Station 4 charger B2 showing early signs of voltage fluctuation.",
      recommendations: []
    };
  }

  try {
    const prompt = `
      You are NavSwap AI, an intelligent battery swapping network operations copilot.
      Analyze the following network data and provide:
      1. Two short, actionable insights (max 15 words each): "optimization" (traffic/load) and "maintenance" (hardware).
      2. Three specific operational recommendations (Critical Alerts) for the command center.

      Network Data: ${JSON.stringify(data)}

      Return the response in strictly valid JSON format like this:
      {
        "optimization": "insight text here",
        "maintenance": "insight text here",
        "recommendations": [
          {
            "id": "rec-gen-1",
            "issue": "High Queue at Station X",
            "action": "Divert incoming traffic to Station Y",
            "impact": "Reduces wait time by 15%",
            "confidence": 0.95,
            "stationId": "station-id"
          }
        ]
      }
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Clean up markdown code blocks if present
    const jsonStr = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(jsonStr);
    
    // Ensure IDs are unique
    if (parsed.recommendations) {
      parsed.recommendations = parsed.recommendations.map((rec: any, i: number) => ({
        ...rec,
        id: `ai-rec-${Date.now()}-${i}`
      }));
    }
    
    return parsed;
  } catch (error: any) {
    console.warn("Gemini Service: Error generating analysis. Falling back to templates.", error);
    
    if (error?.status === 429 || error?.message?.includes('429')) {
      apiDisabledUntil = now + 60000;
    }
    
    return {
      optimization: "Optimizing grid load distribution based on real-time demand patterns.",
      maintenance: "Monitoring charger voltage stability across all active sectors.",
      recommendations: [
        {
          id: `err-rec-${Date.now()}`,
          issue: "System Latency Detected",
          action: "Check local gateway connection",
          impact: "Data accuracy restoration",
          confidence: 0.8,
          stationId: "network-node"
        }
      ]
    };
  }
}

export async function getDashboardInsights(data: any): Promise<{ optimization: string; maintenance: string }> {
  const now = Date.now();
  if (now < apiDisabledUntil) {
    return {
      optimization: "Rerouted 12 vehicles to Sector 7 to prevent congestion.",
      maintenance: "Station 4 charger B2 showing early signs of voltage fluctuation."
    };
  }

  try {
    const prompt = `
      You are NavSwap AI, an intelligent battery swapping network operations copilot.
      Analyze the following network data and provide two short, actionable insights (max 15 words each):
      1. A "System Optimization" insight about traffic rerouting or load balancing.
      2. A "Predictive Maintenance" insight about station hardware health.

      Network Data: ${JSON.stringify(data)}

      Return the response in strictly valid JSON format like this:
      {
        "optimization": "insight text here",
        "maintenance": "insight text here"
      }
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Clean up markdown code blocks if present
    const jsonStr = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    return JSON.parse(jsonStr);
  } catch (error: any) {
    console.warn("Gemini Service: Error generating dashboard insights. Falling back to templates.", error);
    
    if (error?.status === 429 || error?.message?.includes('429')) {
      apiDisabledUntil = now + 60000;
    }
    
    return {
      optimization: "Optimizing grid load distribution based on real-time demand patterns.",
      maintenance: "Monitoring charger voltage stability across all active sectors."
    };
  }
}

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
