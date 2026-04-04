import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MapPin, Clock, Bell, Users } from "lucide-react";

const stats = [
  { label: "Scheduled", value: 3, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { label: "Active", value: 3, icon: MapPin, color: "bg-success/10 text-success" },
  { label: "Completed", value: 1, icon: Clock, color: "bg-accent text-accent-foreground" },
  { label: "Alerts", value: 2, icon: Bell, color: "bg-warning/10 text-warning" },
];

const mockTrip = {
  id: "DTO02", from: "AA", to: "Hawassa", bus: "Zemen Bus",
  plate: "Zm14520", date: "2025/05/14", time: "06:00Am-12:00AM", passengers: 40,
};

const DriverDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "all" | "notifications">("active");

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[350px] h-[350px] -top-20 -right-40 animate-pulse-soft" />

      <div className="mb-10 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Driver</span>
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
        {(["active", "all", "notifications"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
              tab === t ? "bg-primary text-primary-foreground shadow-elevated" : "glass-subtle text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "active" ? "Active" : t === "all" ? "All Trips" : "Alerts"}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="glass-card rounded-2xl p-6 animate-scale-in">
          <div className="mb-1">
            <h2 className="text-xl font-serif font-semibold text-foreground">Current Trip</h2>
            <p className="text-xs text-muted-foreground font-mono">Trip ID: {mockTrip.id}</p>
          </div>
          <div className="mt-4 mb-6">
            <p className="font-semibold text-foreground text-lg">{mockTrip.from} → {mockTrip.to}</p>
            <p className="text-sm text-muted-foreground">{mockTrip.bus} · {mockTrip.plate}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-6">
            {[
              { icon: CalendarCheck, val: mockTrip.date },
              { icon: Clock, val: mockTrip.time },
              { icon: Users, val: `${mockTrip.passengers} passengers` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground glass-subtle rounded-xl px-3 py-2">
                <item.icon className="h-4 w-4 text-primary" /> {item.val}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full px-6 shadow-elevated hover-lift">Complete Trip</Button>
            <Button variant="outline" className="rounded-full px-6 border-border/40 hover-lift">Update Location</Button>
          </div>
        </div>
      )}

      {tab === "all" && (
        <div className="glass-card rounded-2xl p-8 text-muted-foreground text-sm text-center animate-scale-in">
          All trips list will appear here.
        </div>
      )}

      {tab === "notifications" && (
        <div className="space-y-3 animate-scale-in">
          {[
            { msg: "New trip assigned: AA → Hawassa", time: "2 hours ago" },
            { msg: "Schedule updated for May 20", time: "1 day ago" },
          ].map((n, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 hover-lift">
              <p className="text-sm font-medium text-foreground">{n.msg}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
