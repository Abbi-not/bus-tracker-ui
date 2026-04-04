import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tickets = [
  { id: "T001", from: "AA", to: "Hawassa", date: "2025/05/14", seat: 12, bus: "Zemen Bus", status: "confirmed" },
  { id: "T002", from: "AA", to: "Bahir Dar", date: "2025/05/20", seat: 7, bus: "Selam Bus", status: "confirmed" },
  { id: "T003", from: "Hawassa", to: "AA", date: "2025/04/10", seat: 3, bus: "Sky Bus", status: "used" },
];

const MyTickets = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-foreground mb-6">My Tickets</h1>
    <div className="space-y-4">
      {tickets.map((t) => (
        <Card key={t.id}>
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">{t.from} → {t.to}</p>
              <p className="text-sm text-muted-foreground">{t.bus} • Seat {t.seat}</p>
              <p className="text-xs text-muted-foreground">📅 {t.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={t.status === "confirmed" ? "default" : "secondary"} className="capitalize">
                {t.status}
              </Badge>
              <span className="text-xs text-muted-foreground">#{t.id}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MyTickets;
