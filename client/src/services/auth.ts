import { apiRequest } from "@/lib/queryClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    return response.json();
  },

  async signup(data: SignupData): Promise<User> {
    const response = await apiRequest("POST", "/api/auth/signup", data);
    return response.json();
  },

  async logout(): Promise<void> {
    await apiRequest("POST", "/api/auth/logout");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include"
      });
      if (!response.ok) {
        return null;
      }
      return response.json();
    } catch {
      return null;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await apiRequest("POST", "/api/auth/forgot-password", { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiRequest("POST", "/api/auth/reset-password", { token, password });
  }
};
