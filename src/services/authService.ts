import { wait, roleFromEmail } from "@/lib/mockData";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "driver" | "passenger";
}

const FAKE_TOKEN = "mock.jwt.token";

export const authService = {
  login: async (email: string, password: string): Promise<{ tokens: LoginResponse; user: User }> => {
    await wait(400);
    const role = roleFromEmail(email);
    const user: User = {
      id: 1,
      username: email.split("@")[0] || "user",
      email,
      role,
    };
    const tokens: LoginResponse = { access: FAKE_TOKEN, refresh: FAKE_TOKEN };
    localStorage.setItem("btts_access", tokens.access);
    localStorage.setItem("btts_refresh", tokens.refresh);
    localStorage.setItem("btts_user", JSON.stringify(user));
    return { tokens, user };
  },

  register: async (username: string, email: string, password: string, role: string) => {
    await wait(400);
    const user: User = {
      id: 1,
      username,
      email,
      role: (role as User["role"]) || roleFromEmail(email),
    };
    const tokens: LoginResponse = { access: FAKE_TOKEN, refresh: FAKE_TOKEN };
    localStorage.setItem("btts_access", tokens.access);
    localStorage.setItem("btts_refresh", tokens.refresh);
    localStorage.setItem("btts_user", JSON.stringify(user));
    return { tokens, user };
  },

  getMe: async (): Promise<User> => {
    await wait(150);
    const stored = localStorage.getItem("btts_user");
    if (stored) return JSON.parse(stored);
    throw new Error("No user");
  },

  logout: () => {
    localStorage.removeItem("btts_access");
    localStorage.removeItem("btts_refresh");
    localStorage.removeItem("btts_user");
  },

  isAdmin: async () => {
    const stored = localStorage.getItem("btts_user");
    return stored ? JSON.parse(stored).role === "admin" : false;
  },

  isDriver: async () => {
    const stored = localStorage.getItem("btts_user");
    return stored ? JSON.parse(stored).role === "driver" : false;
  },
};
