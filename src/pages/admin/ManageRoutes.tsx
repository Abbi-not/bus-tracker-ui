import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const initialRoutes = [
  { id: "1", from: "Addis Ababa", to: "Hawassa", distance: "275 km", duration: "5h" },
  { id: "2", from: "Addis Ababa", to: "Bahir Dar", distance: "510 km", duration: "9h" },
  { id: "3", from: "Addis Ababa", to: "Dire Dawa", distance: "515 km", duration: "8h" },
];

const ManageRoutes = () => {
  const [routes] = useState(initialRoutes);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Manage Routes</h1>
        </div>
        <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Route"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Route</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Route added!"); setShowForm(false); }}>
            <Input placeholder="From" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="To" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Distance" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Duration" className="rounded-xl h-12 bg-background/50 border-border/40" required />
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
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">From</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">To</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Distance</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((r) => (
              <TableRow key={r.id} className="border-border/20 hover:bg-secondary/30 transition-colors">
                <TableCell className="font-medium text-foreground">{r.from}</TableCell>
                <TableCell className="text-muted-foreground">{r.to}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">{r.distance}</TableCell>
                <TableCell className="text-muted-foreground">{r.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageRoutes;
