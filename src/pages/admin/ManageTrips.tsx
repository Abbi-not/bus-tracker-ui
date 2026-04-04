import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Manage Trips</h1>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> Add Trip
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle>Add New Trip</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Trip added!"); setShowForm(false); }}>
              <Input placeholder="Route (e.g. AA → Hawassa)" required />
              <Input placeholder="Bus Name" required />
              <Input type="date" required />
              <Input placeholder="Time" required />
              <div className="sm:col-span-2"><Button type="submit">Save Trip</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.route}</TableCell>
                  <TableCell>{t.bus}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.time}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === "Active" ? "default" : "secondary"}>{t.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTrips;
