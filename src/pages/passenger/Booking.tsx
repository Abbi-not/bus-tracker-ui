import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { tripService, Trip } from "@/services/tripService";
import { ticketService } from "@/services/ticketService";

const ROWS = 10;
const COLS = 4;

const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!tripId) return;
    tripService.passengerGet(Number(tripId))
      .then(setTrip)
      .catch(() => toast.error("Trip not found"))
      .finally(() => setLoading(false));
    // TODO: fetch booked seats from backend when endpoint available
  }, [tripId]);

  const handleBook = async () => {
    if (selected === null) { toast.error("Please select a seat"); return; }
    setBooking(true);
    try {
      const ticket = await ticketService.create({ trip: Number(tripId), seat_number: selected });
      toast.success(`Seat ${selected} reserved. Redirecting to payment...`);
      try {
        const { checkout_url } = await ticketService.pay(ticket.id);
        sessionStorage.setItem("btts_pending_ticket", String(ticket.id));
        window.location.href = checkout_url;
      } catch (payErr: any) {
        toast.error(payErr.response?.data?.detail || "Could not start payment");
        navigate("/my-tickets");
      }
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.seat_number?.[0] || "Booking failed";
      toast.error(msg);
      setBooking(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-20 animate-pulse-soft" />

      <div className="mb-8 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Booking</span>
        <h1 className="text-3xl font-serif font-bold text-foreground">Select your seat</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {trip?.route_detail ? `${trip.route_detail.origin} → ${trip.route_detail.destination}` : `Trip #${tripId}`}
          {trip?.bus_detail ? ` · ${trip.bus_detail.plate_number}` : ""}
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-up stagger-1">
        <div className="flex gap-6 mb-6 text-xs">
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-background border border-border/40" /> Available</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-primary shadow-sm" /> Selected</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-muted" /> Taken</span>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const seat = i + 1;
            const isTaken = bookedSeats.includes(seat);
            const isSelected = selected === seat;
            return (
              <button
                key={seat}
                disabled={isTaken}
                onClick={() => setSelected(seat)}
                className={`h-11 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isTaken
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isSelected
                    ? "bg-primary text-primary-foreground shadow-elevated scale-105"
                    : "bg-background/50 hover:bg-secondary/60 border border-border/30 text-foreground hover:scale-105"
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center animate-fade-up stagger-2">
        <p className="text-sm text-muted-foreground">
          {selected ? `Seat ${selected} selected` : "No seat selected"}
        </p>
        <Button className="rounded-full px-8 shadow-elevated hover-lift" onClick={handleBook} disabled={booking}>
          {booking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
