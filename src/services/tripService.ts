import { mockTrips, mockBuses, mockRoutes, ids, wait, MockTrip } from "@/lib/mockData";

export interface Trip {
  id: number;
  bus: number;
  route: number;
  driver: number;
  departure_time: string;
  status?: string;
  bus_detail?: { id: number; plate_number: string; capacity: number };
  route_detail?: { id: number; origin: string; destination: string };
}

export const tripService = {
  passengerList: async (): Promise<Trip[]> => {
    await wait();
    return mockTrips.filter((t) => t.status !== "completed");
  },
  passengerGet: async (id: number): Promise<Trip> => {
    await wait();
    const t = mockTrips.find((x) => x.id === id);
    if (!t) throw new Error("Not found");
    return t;
  },

  driverList: async (): Promise<Trip[]> => {
    await wait();
    return [...mockTrips];
  },
  driverGet: async (id: number): Promise<Trip> => {
    await wait();
    const t = mockTrips.find((x) => x.id === id);
    if (!t) throw new Error("Not found");
    return t;
  },
  driverUpdate: async (id: number, trip: Partial<Trip>): Promise<Trip> => {
    await wait();
    const idx = mockTrips.findIndex((t) => t.id === id);
    if (idx >= 0) mockTrips[idx] = { ...mockTrips[idx], ...trip } as MockTrip;
    return mockTrips[idx];
  },

  adminList: async (): Promise<Trip[]> => {
    await wait();
    return [...mockTrips];
  },
  adminCreate: async (trip: Partial<Trip>): Promise<Trip> => {
    await wait();
    const bus = mockBuses.find((b) => b.id === trip.bus) || mockBuses[0];
    const route = mockRoutes.find((r) => r.id === trip.route) || mockRoutes[0];
    const newTrip: MockTrip = {
      id: ids.trip(),
      bus: bus.id,
      route: route.id,
      driver: trip.driver || 100,
      departure_time: trip.departure_time || new Date().toISOString(),
      status: "scheduled",
      bus_detail: bus,
      route_detail: route,
    };
    mockTrips.push(newTrip);
    return newTrip;
  },
  adminUpdate: async (id: number, trip: Partial<Trip>): Promise<Trip> => {
    await wait();
    const idx = mockTrips.findIndex((t) => t.id === id);
    if (idx >= 0) mockTrips[idx] = { ...mockTrips[idx], ...trip } as MockTrip;
    return mockTrips[idx];
  },
  adminDelete: async (id: number): Promise<void> => {
    await wait();
    const idx = mockTrips.findIndex((t) => t.id === id);
    if (idx >= 0) mockTrips.splice(idx, 1);
  },
};
