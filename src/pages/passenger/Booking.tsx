import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    if (selected === null) {
      toast.error("Please select a seat");
      return;
    }
    toast.success(`Seat ${selected} booked successfully!`);
    navigate("/my-tickets");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Select Your Seat</h1>
      <p className="text-muted-foreground mb-6">Trip #{tripId} • Zemen Bus</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Seat Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-muted border border-border" /> Available</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-primary" /> Selected</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-muted-foreground/30" /> Taken</span>
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
                  className={`h-10 rounded text-xs font-medium transition-colors ${
                    isTaken
                      ? "bg-muted-foreground/30 text-muted-foreground cursor-not-allowed"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent border border-border text-foreground"
                  }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {selected ? `Selected: Seat ${selected}` : "No seat selected"}
        </p>
        <Button onClick={handleBook}>Confirm Booking</Button>
      </div>
    </div>
  );
};

export default Booking;
