import { apiRequest } from "@/lib/queryClient";
import type { GalleryItem, InsertGalleryItem } from "@shared/schema";

export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    const response = await fetch("/api/gallery");
    if (!response.ok) {
      throw new Error("Failed to fetch gallery items");
    }
    return response.json();
  },

  async getById(id: string): Promise<GalleryItem> {
    const response = await fetch(`/api/gallery/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch gallery item");
    }
    return response.json();
  },

  async create(data: InsertGalleryItem): Promise<GalleryItem> {
    const response = await apiRequest("POST", "/api/gallery", data);
    return response.json();
  },

  async delete(id: string): Promise<void> {
    await apiRequest("DELETE", `/api/gallery/${id}`);
  },

  async upload(file: File, title: string, description?: string): Promise<GalleryItem> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    if (description) {
      formData.append("description", description);
    }

    const response = await fetch("/api/gallery", {
      method: "POST",
      credentials: "include",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response.json();
  }
};
