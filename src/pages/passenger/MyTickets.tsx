import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { ticketService, Ticket as TicketType } from "@/services/ticketService";
import { toast } from "sonner";

const MyTickets = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);

  useEffect(() => {
    ticketService.list()
      .then(setTickets)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePay = async (id: number) => {
    setPayingId(id);
    try {
      const { checkout_url } = await ticketService.pay(id);
      sessionStorage.setItem("btts_pending_ticket", String(id));
      window.location.href = checkout_url;
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Could not start payment");
      setPayingId(null);
    }
  };

  const isUnpaid = (s?: string) => {
    const v = (s || "").toLowerCase();
    return v === "pending" || v === "unpaid" || v === "reserved";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

      <div className="mb-8 animate-fade-up">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">
          <Ticket className="h-3 w-3" /> Tickets
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">My Tickets</h1>
      </div>

      <div className="space-y-4">
        {loading && <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>}
        {!loading && tickets.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No tickets yet.</p>}
        {tickets.map((t, i) => (
          <div key={t.id} className={`glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover-lift animate-fade-up stagger-${i + 1}`}>
            <div>
              <p className="font-semibold text-foreground">
                {t.trip_detail?.route_detail?.origin ?? "—"} → {t.trip_detail?.route_detail?.destination ?? "—"}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t.trip_detail?.bus_detail?.plate_number ?? ""} · Seat {t.seat_number}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t.trip_detail?.departure_time ? new Date(t.trip_detail.departure_time).toLocaleDateString() : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={t.status === "confirmed" || t.status === "paid" || !t.status ? "default" : "secondary"} className="capitalize rounded-full px-3 shadow-sm">
                {t.status ?? "confirmed"}
              </Badge>
              {isUnpaid(t.status) && (
                <Button
                  size="sm"
                  className="rounded-full px-4 shadow-elevated"
                  onClick={() => handlePay(t.id)}
                  disabled={payingId === t.id}
                >
                  {payingId === t.id ? "Redirecting..." : "Pay now"}
                </Button>
              )}
              <span className="text-xs text-muted-foreground font-mono">#{t.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
