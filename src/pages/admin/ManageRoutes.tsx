import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Manage Routes</h1>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> Add Route
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle>Add New Route</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Route added!"); setShowForm(false); }}>
              <Input placeholder="From" required />
              <Input placeholder="To" required />
              <Input placeholder="Distance" required />
              <Input placeholder="Duration" required />
              <div className="sm:col-span-2"><Button type="submit">Save Route</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.from}</TableCell>
                  <TableCell>{r.to}</TableCell>
                  <TableCell>{r.distance}</TableCell>
                  <TableCell>{r.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageRoutes;
