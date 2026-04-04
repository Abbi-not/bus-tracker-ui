import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

const mockTrips = [
  { id: "1", from: "Addis Ababa", to: "Hawassa", date: "2025-05-14", time: "06:00AM", price: 450, bus: "Zemen Bus", seats: 15 },
  { id: "2", from: "Addis Ababa", to: "Bahir Dar", date: "2025-05-15", time: "07:00AM", price: 800, bus: "Selam Bus", seats: 8 },
  { id: "3", from: "Addis Ababa", to: "Dire Dawa", date: "2025-05-16", time: "05:30AM", price: 650, bus: "Sky Bus", seats: 22 },
];

const Trips = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockTrips.filter(
    (t) => t.from.toLowerCase().includes(search.toLowerCase()) || t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Browse</p>
        <h1 className="text-3xl font-serif font-bold text-foreground">Available Trips</h1>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by city..." className="pl-10 rounded-full h-12" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="space-y-4">
        {filtered.map((trip) => (
          <div key={trip.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-serif text-xl font-semibold text-foreground">{trip.from} → {trip.to}</p>
              <p className="text-sm text-muted-foreground mt-1">{trip.bus} · {trip.date} · {trip.time}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{trip.seats} seats available</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-foreground">{trip.price} <span className="text-xs font-normal text-muted-foreground">ETB</span></span>
              <Button className="rounded-full gap-2 px-6" size="sm" onClick={() => navigate(`/booking/${trip.id}`)}>
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
