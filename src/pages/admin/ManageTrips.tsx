import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { tripService, Trip } from "@/services/tripService";

const ManageTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busId, setBusId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const fetchTrips = () => {
    tripService.adminList()
      .then(setTrips)
      .catch(() => toast.error("Failed to load trips"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTrips(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tripService.adminCreate({
        bus: Number(busId),
        route: Number(routeId),
        driver: Number(driverId),
        departure_time: departureTime,
      });
      toast.success("Trip added!");
      setShowForm(false);
      setBusId(""); setRouteId(""); setDriverId(""); setDepartureTime("");
      fetchTrips();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to add trip");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await tripService.adminDelete(id);
      toast.success("Trip removed");
      setTrips(prev => prev.filter(t => t.id !== id));
    } catch {
      toast.error("Failed to delete trip");
    }
  };

  const statusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "scheduled": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground border-border/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -left-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Manage Trips</h1>
        </div>
        <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Trip"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Trip</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleCreate}>
            <Input placeholder="Bus ID" type="number" className="rounded-xl h-12 bg-background/50 border-border/40" value={busId} onChange={e => setBusId(e.target.value)} required />
            <Input placeholder="Route ID" type="number" className="rounded-xl h-12 bg-background/50 border-border/40" value={routeId} onChange={e => setRouteId(e.target.value)} required />
            <Input placeholder="Driver ID" type="number" className="rounded-xl h-12 bg-background/50 border-border/40" value={driverId} onChange={e => setDriverId(e.target.value)} required />
            <Input type="datetime-local" className="rounded-xl h-12 bg-background/50 border-border/40" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required />
            <div className="sm:col-span-2">
              <Button type="submit" className="rounded-full px-8 shadow-elevated hover-lift">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up stagger-1">
        {loading ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">ID</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Route</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Bus</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Departure</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((t) => (
                <TableRow key={t.id} className="border-border/20 hover:bg-secondary/30 transition-colors">
                  <TableCell className="text-muted-foreground">{t.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    {t.route_detail ? `${t.route_detail.origin} → ${t.route_detail.destination}` : `Route ${t.route}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {t.bus_detail?.plate_number ?? `Bus ${t.bus}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {t.departure_time ? new Date(t.departure_time).toLocaleString() : ""}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`rounded-full px-3 ${statusStyle(t.status ?? "")}`}>
                      {t.status ?? "scheduled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(t.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageTrips;
