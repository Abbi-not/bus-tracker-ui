import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Navigation, User, Phone } from "lucide-react";

const TrackBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [tracking, setTracking] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Track Your Bus</h1>

      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Enter Bus number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          className="flex-1"
        />
        <Button className="gap-2" onClick={() => setTracking(true)}>
          <Search className="h-4 w-4" /> Track
        </Button>
      </div>

      {tracking && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map area */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0 relative">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-semibold text-foreground">Zemen Bus</p>
                    <p className="text-xs text-muted-foreground">zm123490</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">On Time</Badge>
                </div>
                <div className="w-full h-64 bg-muted rounded-b-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-destructive mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map view</p>
                    <p className="text-xs text-muted-foreground">Integration with Leaflet available</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">AA</p>
                    <p className="text-xs text-muted-foreground">06:00AM</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-muted rounded-full relative">
                      <div className="h-1 bg-primary rounded-full w-1/4" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-1">25% Completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">Hawassa</p>
                    <p className="text-xs text-muted-foreground">12:00AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Journey Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                    <p className="font-medium text-foreground">5hrs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="font-medium text-foreground">Shashemene</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Route</p>
                    <p className="font-medium text-foreground">AA → Hawassa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Driver Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Driver Name</p>
                    <p className="font-medium text-foreground">Abera Z.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="font-medium text-foreground">+251989978987</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackBus;
