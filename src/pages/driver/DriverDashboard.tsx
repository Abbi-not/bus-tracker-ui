import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, MapPin, Clock, Bell, Users } from "lucide-react";

const stats = [
  { label: "Scheduled", value: 3, icon: CalendarCheck },
  { label: "Active", value: 3, icon: MapPin },
  { label: "Completed", value: 1, icon: Clock },
  { label: "Alerts", value: 2, icon: Bell },
];

const mockTrip = {
  id: "DTO02", from: "AA", to: "Hawassa", bus: "Zemen Bus",
  plate: "Zm14520", date: "2025/05/14", time: "06:00Am-12:00AM", passengers: 40,
};

const DriverDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "all" | "notifications">("active");

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Driver</p>
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
        {(["active", "all", "notifications"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
              tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {t === "active" ? "Active" : t === "all" ? "All Trips" : "Alerts"}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="mb-1">
            <h2 className="text-xl font-serif font-semibold text-foreground">Current Trip</h2>
            <p className="text-xs text-muted-foreground">Trip ID: {mockTrip.id}</p>
          </div>
          <div className="mt-4 mb-6">
            <p className="font-semibold text-foreground">{mockTrip.from} → {mockTrip.to}</p>
            <p className="text-sm text-muted-foreground">{mockTrip.bus} · {mockTrip.plate}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-6">
            <div className="flex items-center gap-2 text-muted-foreground"><CalendarCheck className="h-4 w-4" /> {mockTrip.date}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> {mockTrip.time}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" /> {mockTrip.passengers} passengers</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full px-6">Complete Trip</Button>
            <Button variant="outline" className="rounded-full px-6">Update Location</Button>
          </div>
        </div>
      )}

      {tab === "all" && (
        <div className="bg-card border border-border rounded-2xl p-6 text-muted-foreground text-sm text-center py-12">
          All trips list will appear here.
        </div>
      )}

      {tab === "notifications" && (
        <div className="space-y-3">
          {[
            { msg: "New trip assigned: AA → Hawassa", time: "2 hours ago" },
            { msg: "Schedule updated for May 20", time: "1 day ago" },
          ].map((n, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
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
