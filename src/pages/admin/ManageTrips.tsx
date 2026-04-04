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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-serif font-bold text-foreground">Manage Trips</h1>
        </div>
        <Button className="rounded-full gap-2 px-6" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Trip"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Trip</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Trip added!"); setShowForm(false); }}>
            <Input placeholder="Route (e.g. AA → Hawassa)" className="rounded-xl" required />
            <Input placeholder="Bus Name" className="rounded-xl" required />
            <Input type="date" className="rounded-xl" required />
            <Input placeholder="Time" className="rounded-xl" required />
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
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Route</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Bus</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Date</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Time</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((t) => (
              <TableRow key={t.id} className="border-border">
                <TableCell className="font-medium text-foreground">{t.route}</TableCell>
                <TableCell className="text-muted-foreground">{t.bus}</TableCell>
                <TableCell className="text-muted-foreground">{t.date}</TableCell>
                <TableCell className="text-muted-foreground">{t.time}</TableCell>
                <TableCell>
                  <Badge variant={t.status === "Active" ? "default" : "secondary"} className="rounded-full px-3">
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
