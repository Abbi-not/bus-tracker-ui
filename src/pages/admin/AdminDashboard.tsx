import { Bus, Route, MapPin, Users } from "lucide-react";

const stats = [
  { label: "Total Buses", value: 24, icon: Bus },
  { label: "Active Routes", value: 12, icon: Route },
  { label: "Active Trips", value: 8, icon: MapPin },
  { label: "Total Users", value: 1250, icon: Users },
];

const AdminDashboard = () => (
  <div className="max-w-5xl mx-auto px-6 py-12">
    <div className="mb-8">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Admin</p>
      <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
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

    <div className="bg-card border border-border rounded-2xl p-8 text-center">
      <p className="text-muted-foreground">Manage buses, routes, and trips from the navigation above.</p>
    </div>
  </div>
);

export default AdminDashboard;
