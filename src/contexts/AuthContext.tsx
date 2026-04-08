import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/authService";

export type UserRole = "passenger" | "driver" | "admin";

interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("btts_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  // On mount, verify token is still valid
  useEffect(() => {
    const token = localStorage.getItem("btts_access");
    if (token) {
      authService.getMe()
        .then((u) => {
          setUser(u);
          localStorage.setItem("btts_user", JSON.stringify(u));
        })
        .catch(() => {
          authService.logout();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user: u } = await authService.login(email, password);
    localStorage.setItem("btts_user", JSON.stringify(u));
    setUser(u);
  };

  const register = async (username: string, email: string, password: string, role: UserRole) => {
    const { user: u } = await authService.register(username, email, password, role);
    localStorage.setItem("btts_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
