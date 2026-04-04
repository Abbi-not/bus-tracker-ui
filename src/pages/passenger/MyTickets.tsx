import { Badge } from "@/components/ui/badge";
import { Ticket } from "lucide-react";

const tickets = [
  { id: "T001", from: "AA", to: "Hawassa", date: "2025/05/14", seat: 12, bus: "Zemen Bus", status: "confirmed" },
  { id: "T002", from: "AA", to: "Bahir Dar", date: "2025/05/20", seat: 7, bus: "Selam Bus", status: "confirmed" },
  { id: "T003", from: "Hawassa", to: "AA", date: "2025/04/10", seat: 3, bus: "Sky Bus", status: "used" },
];

const MyTickets = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 relative">
    <div className="orb orb-accent w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

    <div className="mb-8 animate-fade-up">
      <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">
        <Ticket className="h-3 w-3 mr-1.5" /> Tickets
      </span>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">My Tickets</h1>
    </div>
    <div className="space-y-4">
      {tickets.map((t, i) => (
        <div key={t.id} className={`glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover-lift animate-fade-up stagger-${i + 1}`}>
          <div>
            <p className="font-semibold text-foreground">{t.from} → {t.to}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{t.bus} · Seat {t.seat}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={t.status === "confirmed" ? "default" : "secondary"} className="capitalize rounded-full px-3 shadow-sm">
              {t.status}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">#{t.id}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyTickets;
