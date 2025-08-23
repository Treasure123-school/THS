import { apiRequest } from "@/lib/queryClient";
import type { Profile, InsertProfile } from "@shared/schema";

export interface CreateUserData {
  name: string;
  email: string;
  role: string;
}

export const adminService = {
  async getUsers(): Promise<Profile[]> {
    const response = await fetch("/api/admin/users", {
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  async createUser(data: CreateUserData): Promise<Profile> {
    const response = await apiRequest("POST", "/api/admin/users", data);
    return response.json();
  },

  async updateUser(id: string, data: Partial<InsertProfile>): Promise<Profile> {
    const response = await apiRequest("PUT", `/api/admin/users/${id}`, data);
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    await apiRequest("DELETE", `/api/admin/users/${id}`);
  },

  async getUserById(id: string): Promise<Profile> {
    const response = await fetch(`/api/admin/users/${id}`, {
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  },

  async getUserStats(): Promise<{
    totalUsers: number;
    totalStudents: number;
    totalTeachers: number;
    totalParents: number;
    totalAdmins: number;
  }> {
    const users = await this.getUsers();
    return {
      totalUsers: users.length,
      totalStudents: users.filter(u => u.role === "student").length,
      totalTeachers: users.filter(u => u.role === "teacher").length,
      totalParents: users.filter(u => u.role === "parent").length,
      totalAdmins: users.filter(u => u.role === "admin").length
    };
  }
};
