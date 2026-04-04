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
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-serif font-bold text-foreground">Manage Routes</h1>
        </div>
        <Button className="rounded-full gap-2 px-6" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Route"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Route</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Route added!"); setShowForm(false); }}>
            <Input placeholder="From" className="rounded-xl" required />
            <Input placeholder="To" className="rounded-xl" required />
            <Input placeholder="Distance" className="rounded-xl" required />
            <Input placeholder="Duration" className="rounded-xl" required />
            <div className="sm:col-span-2">
              <Button type="submit" className="rounded-full px-8">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">From</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">To</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Distance</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((r) => (
              <TableRow key={r.id} className="border-border">
                <TableCell className="font-medium text-foreground">{r.from}</TableCell>
                <TableCell className="text-muted-foreground">{r.to}</TableCell>
                <TableCell className="text-muted-foreground">{r.distance}</TableCell>
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
