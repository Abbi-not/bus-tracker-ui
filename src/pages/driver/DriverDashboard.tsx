import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, MapPin, Clock, Bell, Users } from "lucide-react";

const stats = [
  { label: "Schedule Trips", value: 3, icon: CalendarCheck },
  { label: "Active Trips", value: 3, icon: MapPin },
  { label: "Completed Trips", value: 1, icon: Clock },
  { label: "Notification", value: 2, icon: Bell },
];

const mockTrip = {
  id: "DTO02",
  from: "AA",
  to: "Hawassa",
  bus: "Zemen Bus",
  plate: "Zm14520",
  date: "2025/05/14",
  time: "06:00Am-12:00AM",
  passengers: 40,
};

const DriverDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "all" | "notifications">("active");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Driver Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome Back, {user?.name}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {(["active", "all", "notifications"] as const).map((t) => (
          <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)} className="capitalize">
            {t === "active" ? "Active Trips" : t === "all" ? "All Trips" : "Notification"}
          </Button>
        ))}
      </div>

      {tab === "active" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Trip Details</CardTitle>
            <p className="text-sm text-muted-foreground">Trip ID: {mockTrip.id}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="font-semibold text-foreground">{mockTrip.from} - {mockTrip.to}</p>
              <p className="text-sm text-muted-foreground">{mockTrip.bus} {mockTrip.plate}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarCheck className="h-4 w-4" /> {mockTrip.date}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" /> {mockTrip.time}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> From: {mockTrip.from}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> To: {mockTrip.to}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" /> {mockTrip.passengers} Passengers
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Complete Trip</Button>
              <Button variant="outline">Complete Trip</Button>
              <Button variant="outline">GPS Location Update</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "all" && (
        <Card>
          <CardContent className="p-6 text-muted-foreground text-sm">All trips list will appear here.</CardContent>
        </Card>
      )}

      {tab === "notifications" && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent">
                <p className="text-sm font-medium text-foreground">New trip assigned: AA → Hawassa</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-3 rounded-lg bg-accent">
                <p className="text-sm font-medium text-foreground">Schedule updated for May 20</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DriverDashboard;
