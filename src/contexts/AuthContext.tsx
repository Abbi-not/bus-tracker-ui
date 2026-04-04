import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "passenger" | "driver" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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

  const login = async (email: string, _password: string) => {
    // Mock login
    const role: UserRole = email.includes("admin") ? "admin" : email.includes("driver") ? "driver" : "passenger";
    const mockUser: User = {
      id: "1",
      name: role === "admin" ? "Admin User" : role === "driver" ? "Getachew Tesema" : "Abebe Getachew",
      email,
      role,
    };
    localStorage.setItem("btts_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (name: string, email: string, _password: string, role: UserRole) => {
    const mockUser: User = { id: "2", name, email, role };
    localStorage.setItem("btts_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("btts_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
