import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const stats = [
  { label: "Upcoming Trips", value: 2, icon: CalendarCheck },
  { label: "Completed", value: 1, icon: CheckCircle },
  { label: "Cancelled", value: 3, icon: XCircle },
  { label: "Total Booking", value: 5, icon: Calendar },
];

const mockTrips = [
  { id: "1", from: "AA", to: "Hawassa", date: "2025/05/14", time: "06:00AM - 12:00PM", bus: "Zemen Bus", status: "upcoming" },
  { id: "2", from: "AA", to: "Bahir Dar", date: "2025/05/20", time: "07:00AM - 02:00PM", bus: "Selam Bus", status: "upcoming" },
  { id: "3", from: "Hawassa", to: "AA", date: "2025/04/10", time: "08:00AM - 02:00PM", bus: "Sky Bus", status: "completed" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = mockTrips.filter((t) =>
    tab === "upcoming" ? t.status === "upcoming" : t.status !== "upcoming"
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome back, {user?.name}!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Button size="sm" variant={tab === "upcoming" ? "default" : "outline"} onClick={() => setTab("upcoming")}>
          Upcoming Trips
        </Button>
        <Button size="sm" variant={tab === "past" ? "default" : "outline"} onClick={() => setTab("past")}>
          Past Bookings
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-muted-foreground text-sm">No trips found.</p>}
        {filtered.map((trip) => (
          <Card key={trip.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{trip.from} → {trip.to}</p>
                  <p className="text-sm text-muted-foreground">{trip.bus}</p>
                </div>
                <span className="text-xs font-medium text-primary capitalize">{trip.status}</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>📅 {trip.date}</span>
                <span>🕐 {trip.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
