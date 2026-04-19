// Centralized in-memory mock data store. No backend required.
// All services read/write from here so the UI feels alive.

export interface MockUser {
  id: number;
  username: string;
  email: string;
  role: "admin" | "driver" | "passenger";
}

export interface MockBus {
  id: number;
  plate_number: string;
  capacity: number;
}

export interface MockRoute {
  id: number;
  origin: string;
  destination: string;
}

export interface MockTrip {
  id: number;
  bus: number;
  route: number;
  driver: number;
  departure_time: string;
  status: string;
  bus_detail: { id: number; plate_number: string; capacity: number };
  route_detail: { id: number; origin: string; destination: string };
}

export interface MockTicket {
  id: number;
  trip: number;
  passenger: number;
  seat_number: number;
  status: string;
  trip_detail: {
    id: number;
    departure_time: string;
    route_detail: { origin: string; destination: string };
    bus_detail: { plate_number: string };
  };
}

const now = Date.now();
const day = 86400000;
const iso = (offsetMs: number) => new Date(now + offsetMs).toISOString();

export const mockBuses: MockBus[] = [
  { id: 1, plate_number: "AA-1234", capacity: 40 },
  { id: 2, plate_number: "AA-5678", capacity: 36 },
  { id: 3, plate_number: "AA-9012", capacity: 44 },
  { id: 4, plate_number: "DR-3344", capacity: 32 },
  { id: 5, plate_number: "BH-2211", capacity: 40 },
];

export const mockRoutes: MockRoute[] = [
  { id: 1, origin: "Addis Ababa", destination: "Hawassa" },
  { id: 2, origin: "Addis Ababa", destination: "Bahir Dar" },
  { id: 3, origin: "Addis Ababa", destination: "Adama" },
  { id: 4, origin: "Hawassa", destination: "Dire Dawa" },
  { id: 5, origin: "Bahir Dar", destination: "Gondar" },
  { id: 6, origin: "Addis Ababa", destination: "Mekelle" },
];

const buildTrip = (
  id: number,
  busId: number,
  routeId: number,
  driverId: number,
  offset: number,
  status: string
): MockTrip => {
  const bus = mockBuses.find((b) => b.id === busId)!;
  const route = mockRoutes.find((r) => r.id === routeId)!;
  return {
    id,
    bus: busId,
    route: routeId,
    driver: driverId,
    departure_time: iso(offset),
    status,
    bus_detail: bus,
    route_detail: route,
  };
};

export const mockTrips: MockTrip[] = [
  buildTrip(1, 1, 1, 100, day * 1, "scheduled"),
  buildTrip(2, 2, 2, 101, day * 2, "scheduled"),
  buildTrip(3, 3, 3, 100, day * 0.5, "active"),
  buildTrip(4, 4, 4, 102, day * 3, "scheduled"),
  buildTrip(5, 5, 5, 101, -day * 2, "completed"),
  buildTrip(6, 1, 6, 100, day * 4, "scheduled"),
  buildTrip(7, 2, 1, 102, day * 5, "scheduled"),
  buildTrip(8, 3, 2, 101, -day * 5, "completed"),
];

export const mockTickets: MockTicket[] = [
  {
    id: 1001,
    trip: 1,
    passenger: 1,
    seat_number: 12,
    status: "paid",
    trip_detail: {
      id: 1,
      departure_time: mockTrips[0].departure_time,
      route_detail: mockTrips[0].route_detail,
      bus_detail: { plate_number: mockTrips[0].bus_detail.plate_number },
    },
  },
  {
    id: 1002,
    trip: 2,
    passenger: 1,
    seat_number: 5,
    status: "pending",
    trip_detail: {
      id: 2,
      departure_time: mockTrips[1].departure_time,
      route_detail: mockTrips[1].route_detail,
      bus_detail: { plate_number: mockTrips[1].bus_detail.plate_number },
    },
  },
  {
    id: 1003,
    trip: 5,
    passenger: 1,
    seat_number: 22,
    status: "paid",
    trip_detail: {
      id: 5,
      departure_time: mockTrips[4].departure_time,
      route_detail: mockTrips[4].route_detail,
      bus_detail: { plate_number: mockTrips[4].bus_detail.plate_number },
    },
  },
];

// Auto-incrementing ids
let nextBusId = 100;
let nextRouteId = 100;
let nextTripId = 100;
let nextTicketId = 2000;

export const ids = {
  bus: () => ++nextBusId,
  route: () => ++nextRouteId,
  trip: () => ++nextTripId,
  ticket: () => ++nextTicketId,
};

// Simulate network latency for that "real" feel
export const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

// Resolve role from email prefix for the dummy auth
export const roleFromEmail = (email: string): MockUser["role"] => {
  const e = email.toLowerCase();
  if (e.startsWith("admin")) return "admin";
  if (e.startsWith("driver")) return "driver";
  return "passenger";
};
