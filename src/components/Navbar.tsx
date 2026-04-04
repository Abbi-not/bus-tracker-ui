import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getLinks = () => {
    if (!user) return [{ to: "/", label: "Home" }];
    switch (user.role) {
      case "passenger":
        return [
          { to: "/", label: "Home" },
          { to: "/trips", label: "TrackBus" },
          { to: "/my-tickets", label: "My Tickets" },
          { to: "/feedback", label: "Feedback" },
        ];
      case "driver":
        return [
          { to: "/driver/dashboard", label: "Dashboard" },
          { to: "/driver/track", label: "Track" },
          { to: "/driver/notifications", label: "Notification" },
        ];
      case "admin":
        return [
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/buses", label: "Buses" },
          { to: "/admin/routes", label: "Routes" },
          { to: "/admin/trips", label: "Trips" },
        ];
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary" />
            <span className="text-lg font-bold text-foreground">BusTrack</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {getLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
                <span className="text-sm font-medium text-foreground">{user?.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate("/login")}>Login</Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 space-y-2">
          {getLinks().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}>
              Logout
            </Button>
          ) : (
            <Button size="sm" className="w-full" onClick={() => { navigate("/login"); setMobileOpen(false); }}>
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
