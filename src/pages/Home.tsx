import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search, Bus, Shield, Clock, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Bus,
    title: "Live Tracking",
    desc: "Track your bus in real-time with GPS-powered location updates.",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    desc: "Book tickets safely with our secure payment and confirmation system.",
  },
  {
    icon: Clock,
    title: "On-Time Updates",
    desc: "Get instant notifications about delays, arrivals, and schedule changes.",
  },
  {
    icon: MapPin,
    title: "Route Planning",
    desc: "Find the best routes across Ethiopia with detailed trip information.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-sm text-muted-foreground mb-4 tracking-widest uppercase">Modern Bus Travel</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight tracking-tight">
          Book tickets, track<br />
          buses, and travel{" "}
          <span className="italic">smart.</span>
        </h1>
        <p className="mt-6 text-muted-foreground max-w-md mx-auto leading-relaxed">
          Experience seamless bus travel across Ethiopia with real-time tracking,
          instant booking, and live updates.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            className="rounded-full px-8 gap-2"
            onClick={() => navigate("/trips")}
          >
            Browse Trips <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Departure city" className="pl-9 rounded-xl" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Arrival city" className="pl-9 rounded-xl" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" className="pl-9 rounded-xl" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          </div>
          <Button className="w-full gap-2 rounded-xl" onClick={() => navigate("/trips")}>
            <Search className="h-4 w-4" /> Search Buses
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-card py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Everything you need for<br />seamless <span className="italic">bus travel.</span>
          </h2>
          <span className="inline-block mt-4 mb-12 text-xs uppercase tracking-widest text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">
            Services
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl border border-border bg-background flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 font-sans">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-card border border-border flex items-center justify-center">
            <Bus className="h-7 w-7 text-foreground" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Ready to travel?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of travelers across Ethiopia using BusTrack for a modern, reliable bus experience.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="rounded-full px-8" onClick={() => navigate("/register")}>
              Sign Up Free
            </Button>
            <Button variant="outline" className="rounded-full px-8" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
