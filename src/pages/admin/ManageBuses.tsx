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
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-serif font-bold text-foreground">Manage Buses</h1>
        </div>
        <Button className="rounded-full gap-2 px-6" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Bus"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Bus</h2>
          <form className="grid grid-cols-1 sm:grid-cols-3 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Bus added!"); setShowForm(false); }}>
            <Input placeholder="Bus Name" className="rounded-xl" required />
            <Input placeholder="Plate Number" className="rounded-xl" required />
            <Input placeholder="Capacity" type="number" className="rounded-xl" required />
            <div className="sm:col-span-3">
              <Button type="submit" className="rounded-full px-8">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Name</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Plate</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Capacity</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((b) => (
              <TableRow key={b.id} className="border-border">
                <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                <TableCell className="text-muted-foreground">{b.plate}</TableCell>
                <TableCell className="text-muted-foreground">{b.capacity}</TableCell>
                <TableCell>
                  <span className={`text-xs px-3 py-1 rounded-full ${b.status === "Active" ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"}`}>
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
