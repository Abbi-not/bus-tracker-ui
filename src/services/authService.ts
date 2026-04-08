import api from "@/lib/api";

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

export const authService = {
  login: async (email: string, password: string): Promise<{ tokens: LoginResponse; user: User }> => {
    const { data: tokens } = await api.post<LoginResponse>("/auth/login/", { email, password });
    localStorage.setItem("btts_access", tokens.access);
    localStorage.setItem("btts_refresh", tokens.refresh);
    const { data: user } = await api.get<User>("/auth/me/");
    return { tokens, user };
  },

  register: async (username: string, email: string, password: string, role: string): Promise<{ tokens: LoginResponse; user: User }> => {
    await api.post("/auth/register/", { username, email, password, role });
    // Auto-login after register
    return authService.login(email, password);
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me/");
    return data;
  },

  logout: () => {
    localStorage.removeItem("btts_access");
    localStorage.removeItem("btts_refresh");
    localStorage.removeItem("btts_user");
  },

  isAdmin: async (): Promise<boolean> => {
    try {
      await api.get("/auth/admin-check/");
      return true;
    } catch {
      return false;
    }
  },

  isDriver: async (): Promise<boolean> => {
    try {
      await api.get("/auth/driver-check/");
      return true;
    } catch {
      return false;
    }
  },
};
