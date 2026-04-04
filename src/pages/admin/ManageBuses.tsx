import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const initialBuses = [
  { id: "1", name: "Zemen Bus", plate: "ZM14520", capacity: 45, status: "Active" },
  { id: "2", name: "Selam Bus", plate: "SL23410", capacity: 50, status: "Active" },
  { id: "3", name: "Sky Bus", plate: "SK87650", capacity: 40, status: "Maintenance" },
];

const ManageBuses = () => {
  const [buses] = useState(initialBuses);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -left-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Manage Buses</h1>
        </div>
        <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Bus"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Bus</h2>
          <form className="grid grid-cols-1 sm:grid-cols-3 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Bus added!"); setShowForm(false); }}>
            <Input placeholder="Bus Name" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Plate Number" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <Input placeholder="Capacity" type="number" className="rounded-xl h-12 bg-background/50 border-border/40" required />
            <div className="sm:col-span-3">
              <Button type="submit" className="rounded-full px-8 shadow-elevated hover-lift">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up stagger-1">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Name</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Plate</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Capacity</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((b) => (
              <TableRow key={b.id} className="border-border/20 hover:bg-secondary/30 transition-colors">
                <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">{b.plate}</TableCell>
                <TableCell className="text-muted-foreground">{b.capacity}</TableCell>
                <TableCell>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${b.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {b.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageBuses;
