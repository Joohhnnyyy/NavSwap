import axios from 'axios';
import { 
  STATIONS, 
  TICKETS, 
  DELIVERIES, 
  RECOMMENDATIONS, 
  NETWORK_KPIS, 
  METRICS_HISTORY, 
  AI_ACTIONS 
} from './data';

// Base URLs
const API_GATEWAY_URL = "/api/proxy/gateway";
const RECOMMENDATION_SERVICE_URL = "/api/proxy/recommendation";

// Create axios instance
const api = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Data Ingestion Routes
export const ingestStation = async (data: any) => {
  return api.post('/ingest/station', data);
};

export const ingestUserContext = async (data: any) => {
  return api.post('/ingest/user-context', data);
};

// Recommendation Routes
const recommendationApi = axios.create({
  baseURL: RECOMMENDATION_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (lat = 35.6762, lng = 139.6503) => {
  // return recommendationApi.get('/recommend', { ... });
  console.warn("Mocking getRecommendations");
  return Promise.resolve({ data: RECOMMENDATIONS });
};

export const submitRecommendationRequest = async (data: any) => {
  // return recommendationApi.post('/recommend', data);
  console.warn("Mocking submitRecommendationRequest");
  return Promise.resolve({
    data: {
      success: true,
      data: {
        requestId: `REQ_${Date.now()}`,
        userId: data.userId || "USR_001",
        recommendations: RECOMMENDATIONS,
        explanation: "Analysis based on provided telemetry",
        generatedAt: new Date().toISOString()
      },
      meta: {
        cacheHit: false
      }
    }
  });
};

export const getRecommendationById = async (requestId: string) => {
  // return recommendationApi.get(`/recommend/${requestId}`);
  console.warn("Mocking getRecommendationById");
  return Promise.resolve({
    data: {
      success: true,
      data: {
        requestId: requestId,
        userId: "USR_001",
        recommendations: RECOMMENDATIONS,
        explanation: "Based on battery level and traffic conditions",
        generatedAt: new Date().toISOString()
      },
      meta: {
        cacheHit: true
      }
    }
  });
};

export const selectRecommendation = async (requestId: string, stationId: string) => {
  return recommendationApi.post(`/recommend/${requestId}/select`, { stationId });
};

export const feedbackRecommendation = async (requestId: string, feedback: any) => {
  return recommendationApi.post(`/recommend/${requestId}/feedback`, feedback);
};

// Health Routes
export const getHealth = async () => {
  return api.get('/health');
};

// Station Analytics
export const getStationScore = async (id: string) => {
  // return api.get(`/station/${id}/score`);
  console.warn("Mocking getStationScore");
  const station = STATIONS.find(s => s.id === id);
  return Promise.resolve({ data: { overallScore: station?.uptime ? Math.floor(station.uptime) : 92, rank: 'A' } });
};

export const getStationHealth = async (id: string) => {
  // return api.get(`/station/${id}/health`);
  console.warn("Mocking getStationHealth");
  const station = STATIONS.find(s => s.id === id);
  return Promise.resolve({ 
    data: { 
      status: station?.status || 'healthy', 
      uptime: station?.uptime || 99.8, 
      queueLength: station?.queueLength || 3 
    } 
  });
};

// Queue Management
export const joinQueue = async (stationId: string, userId: string) => {
  // return api.post('/queue/join', { stationId, userId });
  console.warn("Mocking joinQueue");
  return Promise.resolve({ data: { ticketId: 'mock-queue-1', position: 4 } });
};

export const verifyQueue = async (qrCode: string) => {
  // return api.post('/queue/verify', { qrCode });
  console.warn("Mocking verifyQueue");
  return Promise.resolve({ data: { verified: true } });
};

export const swapBattery = async (stationId: string, userId: string) => {
  // return api.post('/queue/swap', { stationId, userId });
  console.warn("Mocking swapBattery");
  return Promise.resolve({ data: { success: true } });
};

// Delivery Management
export const confirmDelivery = async (deliveryId: string) => {
  // return api.post('/delivery/confirm', { deliveryId });
  console.warn("Mocking confirmDelivery");
  return Promise.resolve({ data: { success: true } });
};

export const getAdminDeliveries = async () => {
  // return api.get('/admin/deliveries');
  console.warn("Mocking getAdminDeliveries");
  return Promise.resolve({ data: DELIVERIES });
};

export const getDriverDeliveries = async (driverId: string) => {
  // return api.get(`/driver/${driverId}/deliveries`);
  console.warn("Mocking getDriverDeliveries");
  const driverDeliveries = DELIVERIES.filter(d => d.driverId === driverId);
  return Promise.resolve({ data: driverDeliveries });
};

export const alertDelivery = async (data: any) => {
  // return api.post('/delivery/alert', data);
  console.warn("Mocking alertDelivery");
  return Promise.resolve({ data: { success: true } });
};

export const acceptDelivery = async (deliveryId: string, driverId: string) => {
  // return api.post('/delivery/accept', { deliveryId, driverId });
  console.warn("Mocking acceptDelivery");
  return Promise.resolve({ data: { success: true } });
};

// Fault & Ticket Management
export const createManualTicket = async (data: any) => {
  // return api.post('/ticket/manual', data);
  console.warn("Mocking createManualTicket");
  return Promise.resolve({ data: { id: 'mock-ticket-1', ...data } });
};

export const reportFault = async (data: any) => {
  // return api.post('/fault/report', data);
  console.warn("Mocking reportFault");
  return Promise.resolve({ data: { success: true } });
};

export const getAdminTickets = async () => {
  // return api.get('/admin/tickets');
  console.warn("Mocking getAdminTickets");
  return Promise.resolve({ data: TICKETS });
};

// Admin Dashboard
export const getAdminSummary = async () => {
  // return api.get('/admin/summary');
  return Promise.resolve({ data: NETWORK_KPIS });
};

export const getAdminMetrics = async () => {
  // return api.get('/admin/metrics');
  return Promise.resolve({ data: METRICS_HISTORY });
};

export const getAdminStations = async () => {
  // return api.get('/admin/stations');
  return Promise.resolve({ data: STATIONS });
};

export const getAdminEvents = async () => {
  // return api.get('/admin/events');
  return Promise.resolve({ data: AI_ACTIONS });
};

export default api;
