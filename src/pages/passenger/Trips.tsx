import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { tripService, Trip } from "@/services/tripService";

const Trips = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripService.passengerList()
      .then(setTrips)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = trips.filter((t) => {
    const origin = t.route_detail?.origin?.toLowerCase() ?? "";
    const dest = t.route_detail?.destination?.toLowerCase() ?? "";
    const q = search.toLowerCase();
    return origin.includes(q) || dest.includes(q);
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[350px] h-[350px] -top-20 -left-40 animate-pulse-soft" />

      <div className="mb-8 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Browse</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Available Trips</h1>
      </div>

      <div className="relative mb-8 animate-fade-up stagger-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by city..." className="pl-10 rounded-full h-12 glass border-border/40" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="space-y-4">
        {loading && <p className="text-muted-foreground text-sm py-8 text-center">Loading trips...</p>}
        {!loading && filtered.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No trips found.</p>}
        {filtered.map((trip, i) => (
          <div key={trip.id} className={`glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift animate-fade-up stagger-${i + 1}`}>
            <div className="flex-1">
              <p className="font-serif text-xl font-semibold text-foreground">
                {trip.route_detail?.origin ?? `Route ${trip.route}`} → {trip.route_detail?.destination ?? ""}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {trip.bus_detail?.plate_number ?? `Bus ${trip.bus}`} · {trip.departure_time ? new Date(trip.departure_time).toLocaleString() : ""}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {trip.bus_detail?.capacity ? `${trip.bus_detail.capacity} seats` : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" size="sm" onClick={() => navigate(`/booking/${trip.id}`)}>
                Book <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
