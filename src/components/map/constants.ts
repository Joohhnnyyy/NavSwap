

import { SwapStation, LatLng } from './types';

export interface Shop {
  id: string;
  name: string;
  location: LatLng;
  stationId: string;
}

export const INITIAL_CENTER: LatLng = [28.6139, 77.2090]; // New Delhi center

export const SWAP_STATIONS: SwapStation[] = [
  {
    id: 'sta-1',
    name: 'Connaught Place Hub',
    location: [28.6315, 77.2167],
    status: 'available',
    occupancy: 20,
  },
  {
    id: 'sta-2',
    name: 'Nehru Place Station',
    location: [28.5494, 77.2501],
    status: 'available',
    occupancy: 45,
  },
  {
    id: 'sta-3',
    name: 'Dwarka Power Grid',
    location: [28.5921, 77.0460],
    status: 'available',
    occupancy: 10,
  },
  {
    id: 'sta-4',
    name: 'Noida Eco-Link',
    location: [28.5355, 77.3910],
    status: 'available',
    occupancy: 30,
  },
  {
    id: 'sta-5',
    name: 'Karol Bagh Node',
    location: [28.6517, 77.1900],
    status: 'available',
    occupancy: 25,
  },
  {
    id: 'sta-6',
    name: 'Rajouri Garden Hub',
    location: [28.6420, 77.1230],
    status: 'available',
    occupancy: 35,
  },
  {
    id: 'sta-7',
    name: 'Saket Exchange',
    location: [28.5245, 77.2060],
    status: 'available',
    occupancy: 18,
  },
  {
    id: 'sta-8',
    name: 'Rohini Beacon',
    location: [28.7386, 77.1200],
    status: 'available',
    occupancy: 22,
  },
  {
    id: 'sta-9',
    name: 'Lajpat Nagar Gate',
    location: [28.5687, 77.2431],
    status: 'available',
    occupancy: 28,
  },
  {
    id: 'sta-10',
    name: 'Laxmi Nagar Link',
    location: [28.6329, 77.2773],
    status: 'available',
    occupancy: 32,
  },
];

// Shops near each station (3-4 per station, with slight offsets)
export const SHOPS: Shop[] = [
  { id: 'shop-1a', name: 'Cafe Coffee Day', location: [28.6320, 77.2172], stationId: 'sta-1' },
  { id: 'shop-1b', name: 'Book World', location: [28.6310, 77.2160], stationId: 'sta-1' },
  { id: 'shop-1c', name: 'Quick Bites', location: [28.6318, 77.2155], stationId: 'sta-1' },
  { id: 'shop-2a', name: 'Tech Bazaar', location: [28.5499, 77.2506], stationId: 'sta-2' },
  { id: 'shop-2b', name: 'Juice Junction', location: [28.5489, 77.2496], stationId: 'sta-2' },
  { id: 'shop-2c', name: 'Veggie Delight', location: [28.5492, 77.2510], stationId: 'sta-2' },
  { id: 'shop-3a', name: 'Dwarka Mart', location: [28.5926, 77.0465], stationId: 'sta-3' },
  { id: 'shop-3b', name: 'Snack Point', location: [28.5916, 77.0455], stationId: 'sta-3' },
  { id: 'shop-3c', name: 'Fresh Fruits', location: [28.5923, 77.0450], stationId: 'sta-3' },
  { id: 'shop-4a', name: 'Eco Cafe', location: [28.5350, 77.3915], stationId: 'sta-4' },
  { id: 'shop-4b', name: 'Noida Books', location: [28.5360, 77.3905], stationId: 'sta-4' },
  { id: 'shop-4c', name: 'Green Grocer', location: [28.5358, 77.3920], stationId: 'sta-4' },
  { id: 'shop-5a', name: 'Karol Snacks', location: [28.6522, 77.1905], stationId: 'sta-5' },
  { id: 'shop-5b', name: 'Vintage Prints', location: [28.6510, 77.1890], stationId: 'sta-5' },
  { id: 'shop-6a', name: 'Garden Bistro', location: [28.6425, 77.1235], stationId: 'sta-6' },
  { id: 'shop-6b', name: 'Fashion Street', location: [28.6414, 77.1226], stationId: 'sta-6' },
  { id: 'shop-7a', name: 'Saket Grill', location: [28.5249, 77.2065], stationId: 'sta-7' },
  { id: 'shop-7b', name: 'Mall Kiosk', location: [28.5239, 77.2056], stationId: 'sta-7' },
  { id: 'shop-8a', name: 'Rohini Cafe', location: [28.7390, 77.1205], stationId: 'sta-8' },
  { id: 'shop-8b', name: 'Sector Mart', location: [28.7380, 77.1195], stationId: 'sta-8' },
  { id: 'shop-9a', name: 'Lajpat Treats', location: [28.5692, 77.2436], stationId: 'sta-9' },
  { id: 'shop-9b', name: 'Central Books', location: [28.5682, 77.2426], stationId: 'sta-9' },
  { id: 'shop-10a', name: 'Laxmi Bites', location: [28.6334, 77.2778], stationId: 'sta-10' },
  { id: 'shop-10b', name: 'River View Cafe', location: [28.6324, 77.2768], stationId: 'sta-10' },
];

export const START_POINT: LatLng = [28.6000, 77.2300]; // Starting position for car
