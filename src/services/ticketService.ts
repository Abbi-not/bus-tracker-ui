import { mockTickets, mockTrips, ids, wait, MockTicket } from "@/lib/mockData";

export interface Ticket {
  id: number;
  trip: number;
  passenger: number;
  seat_number: number;
  status?: string;
  trip_detail?: {
    id: number;
    departure_time: string;
    route_detail?: { origin: string; destination: string };
    bus_detail?: { plate_number: string };
  };
}

export const ticketService = {
  list: async (): Promise<Ticket[]> => {
    await wait();
    return [...mockTickets];
  },
  get: async (id: number): Promise<Ticket> => {
    await wait();
    const t = mockTickets.find((x) => x.id === id);
    if (!t) throw new Error("Not found");
    return t;
  },
  create: async (ticket: { trip: number; seat_number: number }): Promise<Ticket> => {
    await wait();
    const trip = mockTrips.find((t) => t.id === ticket.trip);
    if (!trip) throw new Error("Trip not found");
    const newTicket: MockTicket = {
      id: ids.ticket(),
      trip: trip.id,
      passenger: 1,
      seat_number: ticket.seat_number,
      status: "pending",
      trip_detail: {
        id: trip.id,
        departure_time: trip.departure_time,
        route_detail: trip.route_detail,
        bus_detail: { plate_number: trip.bus_detail.plate_number },
      },
    };
    mockTickets.unshift(newTicket);
    return newTicket;
  },
  cancel: async (id: number): Promise<void> => {
    await wait();
    const idx = mockTickets.findIndex((t) => t.id === id);
    if (idx >= 0) mockTickets.splice(idx, 1);
  },
  pay: async (id: number): Promise<{ checkout_url: string }> => {
    await wait();
    // Skip Chapa redirect — go straight to local payment-result page in "success" mode.
    return { checkout_url: `${window.location.origin}/payment-result?ticket_id=${id}&mock=success` };
  },
  verifyPayment: async (id: number): Promise<{ status: string }> => {
    await wait(600);
    const idx = mockTickets.findIndex((t) => t.id === id);
    if (idx >= 0) mockTickets[idx].status = "paid";
    return { status: "PAID" };
  },
};
