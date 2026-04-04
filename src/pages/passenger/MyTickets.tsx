import { Badge } from "@/components/ui/badge";

const tickets = [
  { id: "T001", from: "AA", to: "Hawassa", date: "2025/05/14", seat: 12, bus: "Zemen Bus", status: "confirmed" },
  { id: "T002", from: "AA", to: "Bahir Dar", date: "2025/05/20", seat: 7, bus: "Selam Bus", status: "confirmed" },
  { id: "T003", from: "Hawassa", to: "AA", date: "2025/04/10", seat: 3, bus: "Sky Bus", status: "used" },
];

const MyTickets = () => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <div className="mb-8">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Tickets</p>
      <h1 className="text-3xl font-serif font-bold text-foreground">My Tickets</h1>
    </div>
    <div className="space-y-4">
      {tickets.map((t) => (
        <div key={t.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-foreground">{t.from} → {t.to}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{t.bus} · Seat {t.seat}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={t.status === "confirmed" ? "default" : "secondary"} className="capitalize rounded-full px-3">
              {t.status}
            </Badge>
            <span className="text-xs text-muted-foreground">#{t.id}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyTickets;
