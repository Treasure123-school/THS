import { apiRequest } from "@/lib/queryClient";
import type { Announcement, InsertAnnouncement } from "@shared/schema";

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    const response = await fetch("/api/announcements");
    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }
    return response.json();
  },

  async getById(id: string): Promise<Announcement> {
    const response = await fetch(`/api/announcements/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch announcement");
    }
    return response.json();
  },

  async create(data: InsertAnnouncement): Promise<Announcement> {
    const response = await apiRequest("POST", "/api/announcements", data);
    return response.json();
  },

  async update(id: string, data: Partial<InsertAnnouncement>): Promise<Announcement> {
    const response = await apiRequest("PUT", `/api/announcements/${id}`, data);
    return response.json();
  },

  async delete(id: string): Promise<void> {
    await apiRequest("DELETE", `/api/announcements/${id}`);
  },

  async getByAudience(audience: string): Promise<Announcement[]> {
    const announcements = await this.getAll();
    if (audience === "all") return announcements;
    return announcements.filter(announcement => 
      announcement.audience.includes(audience)
    );
  }
};
