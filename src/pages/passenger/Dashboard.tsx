import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, CheckCircle, XCircle, Calendar } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Upcoming", value: 2, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { label: "Completed", value: 1, icon: CheckCircle, color: "bg-success/10 text-success" },
  { label: "Cancelled", value: 3, icon: XCircle, color: "bg-destructive/10 text-destructive" },
  { label: "Total", value: 5, icon: Calendar, color: "bg-accent text-accent-foreground" },
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
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

      <div className="mb-10 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Dashboard</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={s.label} className={`glass-card rounded-2xl p-5 text-center hover-lift animate-fade-up stagger-${i + 1}`}>
            <div className={`w-11 h-11 mx-auto mb-3 rounded-xl ${s.color} flex items-center justify-center`}>
              <s.icon className="h-5 w-5" />
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
            className={`text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
              tab === t ? "bg-primary text-primary-foreground shadow-elevated" : "glass-subtle text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No trips found.</p>}
        {filtered.map((trip) => (
          <div key={trip.id} className="glass-card rounded-2xl p-5 hover-lift">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{trip.from} → {trip.to}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{trip.bus}</p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">{trip.status}</span>
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
