import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const stats = [
  { label: "Upcoming", value: 2, icon: CalendarCheck },
  { label: "Completed", value: 1, icon: CheckCircle },
  { label: "Cancelled", value: 3, icon: XCircle },
  { label: "Total", value: 5, icon: Calendar },
];

const mockTrips = [
  { id: "1", from: "AA", to: "Hawassa", date: "2025/05/14", time: "06:00AM - 12:00PM", bus: "Zemen Bus", status: "upcoming" },
  { id: "2", from: "AA", to: "Bahir Dar", date: "2025/05/20", time: "07:00AM - 02:00PM", bus: "Selam Bus", status: "upcoming" },
  { id: "3", from: "Hawassa", to: "AA", date: "2025/04/10", time: "08:00AM - 02:00PM", bus: "Sky Bus", status: "completed" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const filtered = mockTrips.filter((t) => tab === "upcoming" ? t.status === "upcoming" : t.status !== "upcoming");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Dashboard</p>
        <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-background border border-border flex items-center justify-center">
              <s.icon className="h-4 w-4 text-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
              tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No trips found.</p>}
        {filtered.map((trip) => (
          <div key={trip.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{trip.from} → {trip.to}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{trip.bus}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground capitalize">{trip.status}</span>
            </div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>{trip.date}</span>
              <span>{trip.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
