import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2024 All rights reserved.</p>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/trips" className="hover:text-foreground transition-colors">Trips</Link>
        <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
