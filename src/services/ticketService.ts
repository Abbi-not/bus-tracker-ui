import api from "@/lib/api";

export interface Ticket {
  id: number;
  trip: number;
  passenger: number;
  seat_number: number;
  status?: string;
  // Expanded
  trip_detail?: {
    id: number;
    departure_time: string;
    route_detail?: { origin: string; destination: string };
    bus_detail?: { plate_number: string };
  };
}

export const ticketService = {
  list: async (): Promise<Ticket[]> => {
    const { data } = await api.get<Ticket[]>("/passenger/tickets/");
    return data;
  },
  get: async (id: number): Promise<Ticket> => {
    const { data } = await api.get<Ticket>(`/passenger/tickets/${id}/`);
    return data;
  },
  create: async (ticket: { trip: number; seat_number: number }): Promise<Ticket> => {
    const { data } = await api.post<Ticket>("/passenger/tickets/", ticket);
    return data;
  },
  cancel: async (id: number): Promise<void> => {
    await api.delete(`/passenger/tickets/${id}/`);
  },
  pay: async (id: number): Promise<{ checkout_url: string }> => {
    const { data } = await api.post<{ checkout_url: string }>(`/passenger/tickets/${id}/pay/`);
    return data;
  },
  verifyPayment: async (id: number): Promise<{ status: string }> => {
    const { data } = await api.post<{ status: string }>(`/passenger/tickets/${id}/payment/verify/`);
    return data;
  },
};
