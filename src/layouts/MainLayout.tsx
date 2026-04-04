import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const MainLayout = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
