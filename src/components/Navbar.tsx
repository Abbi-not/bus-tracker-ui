import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getLinks = () => {
    if (!user) return [{ to: "/", label: "Home" }, { to: "/trips", label: "Trips" }];
    switch (user.role) {
      case "passenger":
        return [
          { to: "/", label: "Home" },
          { to: "/dashboard", label: "Dashboard" },
          { to: "/trips", label: "Trips" },
          { to: "/my-tickets", label: "Tickets" },
          { to: "/feedback", label: "Feedback" },
        ];
      case "driver":
        return [
          { to: "/driver/dashboard", label: "Dashboard" },
          { to: "/driver/track", label: "Track" },
          { to: "/driver/notifications", label: "Alerts" },
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
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-lg font-serif font-bold text-foreground tracking-tight">
            BusTrack
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {getLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs px-4"
                  onClick={() => { logout(); navigate("/"); }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="rounded-full text-xs px-5"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 pb-4 space-y-1 animate-fade-in">
          {getLinks().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2.5 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}>
                Logout
              </Button>
            ) : (
              <Button size="sm" className="w-full rounded-full" onClick={() => { navigate("/login"); setMobileOpen(false); }}>
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
