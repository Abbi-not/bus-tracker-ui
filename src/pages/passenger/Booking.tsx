import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ROWS = 10;
const COLS = 4;
const unavailable = [2, 5, 8, 13, 17, 22, 30, 35];

const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const handleBook = () => {
    if (selected === null) { toast.error("Please select a seat"); return; }
    toast.success(`Seat ${selected} booked successfully!`);
    navigate("/my-tickets");
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Booking</p>
        <h1 className="text-3xl font-serif font-bold text-foreground">Select your seat</h1>
        <p className="text-sm text-muted-foreground mt-1">Trip #{tripId} · Zemen Bus</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex gap-6 mb-6 text-xs">
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-background border border-border" /> Available</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-primary" /> Selected</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-muted" /> Taken</span>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const seat = i + 1;
            const isTaken = unavailable.includes(seat);
            const isSelected = selected === seat;
            return (
              <button
                key={seat}
                disabled={isTaken}
                onClick={() => setSelected(seat)}
                className={`h-11 rounded-xl text-xs font-medium transition-all ${
                  isTaken
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background hover:bg-secondary border border-border text-foreground"
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {selected ? `Seat ${selected} selected` : "No seat selected"}
        </p>
        <Button className="rounded-full px-8" onClick={handleBook}>Confirm Booking</Button>
      </div>
    </div>
  );
};

export default Booking;
