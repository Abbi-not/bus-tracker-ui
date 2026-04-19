import { mockBuses, ids, wait, MockBus } from "@/lib/mockData";

export interface Bus {
  id: number;
  plate_number: string;
  capacity: number;
  name?: string;
  status?: string;
}

export const busService = {
  list: async (): Promise<Bus[]> => {
    await wait();
    return [...mockBuses];
  },
  adminList: async (): Promise<Bus[]> => {
    await wait();
    return [...mockBuses];
  },
  adminCreate: async (bus: Partial<Bus>): Promise<Bus> => {
    await wait();
    const newBus: MockBus = {
      id: ids.bus(),
      plate_number: bus.plate_number || "NEW-0000",
      capacity: bus.capacity || 0,
    };
    mockBuses.push(newBus);
    return newBus;
  },
  adminUpdate: async (id: number, bus: Partial<Bus>): Promise<Bus> => {
    await wait();
    const idx = mockBuses.findIndex((b) => b.id === id);
    if (idx >= 0) mockBuses[idx] = { ...mockBuses[idx], ...bus } as MockBus;
    return mockBuses[idx];
  },
  adminDelete: async (id: number): Promise<void> => {
    await wait();
    const idx = mockBuses.findIndex((b) => b.id === id);
    if (idx >= 0) mockBuses.splice(idx, 1);
  },
};
