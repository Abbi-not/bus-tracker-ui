import { mockRoutes, ids, wait, MockRoute } from "@/lib/mockData";

export interface BusRoute {
  id: number;
  origin: string;
  destination: string;
}

export const routeService = {
  adminList: async (): Promise<BusRoute[]> => {
    await wait();
    return [...mockRoutes];
  },
  adminCreate: async (route: Partial<BusRoute>): Promise<BusRoute> => {
    await wait();
    const newRoute: MockRoute = {
      id: ids.route(),
      origin: route.origin || "",
      destination: route.destination || "",
    };
    mockRoutes.push(newRoute);
    return newRoute;
  },
  adminUpdate: async (id: number, route: Partial<BusRoute>): Promise<BusRoute> => {
    await wait();
    const idx = mockRoutes.findIndex((r) => r.id === id);
    if (idx >= 0) mockRoutes[idx] = { ...mockRoutes[idx], ...route } as MockRoute;
    return mockRoutes[idx];
  },
  adminDelete: async (id: number): Promise<void> => {
    await wait();
    const idx = mockRoutes.findIndex((r) => r.id === id);
    if (idx >= 0) mockRoutes.splice(idx, 1);
  },
};
