import { Card, CardContent } from "@/components/ui/card";
import { Bus, Route, MapPin, Users } from "lucide-react";

const stats = [
  { label: "Total Buses", value: 24, icon: Bus },
  { label: "Active Routes", value: 12, icon: Route },
  { label: "Active Trips", value: 8, icon: MapPin },
  { label: "Total Users", value: 1250, icon: Users },
];

const AdminDashboard = () => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground mt-2">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Manage buses, routes, and trips from the navigation above.</p>
      </CardContent>
    </Card>
  </div>
);

export default AdminDashboard;
