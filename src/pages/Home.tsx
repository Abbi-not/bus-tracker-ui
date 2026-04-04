import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
          Travel Smart<br />With <span className="text-primary">BusTrack</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Book your bus tickets in seconds and track your journey in real-time.
          Experience modern, hassle-free travel with live updates and seamless booking.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate("/register")}>Get Started</Button>
          <Button variant="outline" onClick={() => navigate("/trips")}>Track Bus</Button>
        </div>
      </div>

      {/* Search box */}
      <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Departure city"
                className="pl-9"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Arrival City"
                className="pl-9"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-9"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button className="w-full gap-2" onClick={() => navigate("/trips")}>
          <Search className="h-4 w-4" /> Search Buses
        </Button>
      </div>
    </div>
  );
};

export default Home;
