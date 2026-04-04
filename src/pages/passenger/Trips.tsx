import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-4">Available Trips</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by city..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="space-y-4">
        {filtered.map((trip) => (
          <Card key={trip.id}>
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground text-lg">{trip.from} → {trip.to}</p>
                <p className="text-sm text-muted-foreground">{trip.bus} • {trip.date} • {trip.time}</p>
                <p className="text-sm text-muted-foreground">{trip.seats} seats available</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">{trip.price} ETB</span>
                <Button size="sm" onClick={() => navigate(`/booking/${trip.id}`)}>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trips;
