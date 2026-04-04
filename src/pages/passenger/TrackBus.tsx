import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Navigation, User, Phone } from "lucide-react";

const TrackBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [tracking, setTracking] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Live</p>
        <h1 className="text-3xl font-serif font-bold text-foreground">Track Your Bus</h1>
      </div>

      <div className="flex gap-3 mb-8">
        <Input
          placeholder="Enter bus number"
          className="flex-1 rounded-full h-12 pl-5"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
        />
        <Button className="rounded-full px-8 h-12 gap-2" onClick={() => setTracking(true)}>
          <Search className="h-4 w-4" /> Track
        </Button>
      </div>

      {tracking && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center p-5">
                <div>
                  <p className="font-semibold text-foreground">Zemen Bus</p>
                  <p className="text-xs text-muted-foreground">zm123490</p>
                </div>
                <Badge className="bg-success text-success-foreground rounded-full px-3">On Time</Badge>
              </div>
              <div className="w-full h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map view</p>
                  <p className="text-xs text-muted-foreground">Leaflet integration available</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-5 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground text-sm">AA</p>
                  <p className="text-xs text-muted-foreground">06:00AM</p>
                </div>
                <div className="flex-1 mx-6">
                  <div className="h-1 bg-muted rounded-full relative">
                    <div className="h-1 bg-foreground rounded-full w-1/4" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1.5">25% complete</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">Hawassa</p>
                  <p className="text-xs text-muted-foreground">12:00PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Journey</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                    <p className="text-sm font-medium text-foreground">5hrs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="text-sm font-medium text-foreground">Shashemene</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Route</p>
                    <p className="text-sm font-medium text-foreground">AA → Hawassa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Driver</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium text-foreground">Abera Z.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="text-sm font-medium text-foreground">+251989978987</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackBus;
