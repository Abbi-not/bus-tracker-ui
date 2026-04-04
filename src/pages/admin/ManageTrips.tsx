import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const initialTrips = [
  { id: "1", route: "AA → Hawassa", bus: "Zemen Bus", date: "2025-05-14", time: "06:00AM", status: "Active" },
  { id: "2", route: "AA → Bahir Dar", bus: "Selam Bus", date: "2025-05-15", time: "07:00AM", status: "Scheduled" },
  { id: "3", route: "AA → Dire Dawa", bus: "Sky Bus", date: "2025-05-16", time: "05:30AM", status: "Completed" },
];

const ManageTrips = () => {
  const [trips] = useState(initialTrips);
  const [showForm, setShowForm] = useState(false);

  const statusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "Scheduled": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground border-border/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -left-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Manage Trips</h1>
        </div>
        <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Trip"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Trip</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Trip added!"); setShowForm(false); }}>
            <Input placeholder="Route (e.g. AA → Hawassa)" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Bus Name" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input type="date" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Time" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <div className="sm:col-span-2">
              <Button type="submit" className="rounded-full px-8 shadow-elevated hover-lift">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up stagger-1">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Route</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Bus</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Date</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Time</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((t) => (
              <TableRow key={t.id} className="border-border/20 hover:bg-secondary/30 transition-colors">
                <TableCell className="font-medium text-foreground">{t.route}</TableCell>
                <TableCell className="text-muted-foreground">{t.bus}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">{t.date}</TableCell>
                <TableCell className="text-muted-foreground">{t.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`rounded-full px-3 ${statusStyle(t.status)}`}>
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageTrips;
