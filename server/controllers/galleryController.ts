import { Request, Response } from "express";
import { storage } from "../storage";

export const galleryController = {
  async getAll(req: Request, res: Response) {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error) {
      console.error("Get gallery items error:", error);
      res.status(500).json({
        error: "Failed to fetch gallery items",
        message: "Internal server error"
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const galleryItem = await storage.getGalleryItemById(id);
      
      if (!galleryItem) {
        return res.status(404).json({
          error: "Gallery item not found",
          message: "The requested gallery item does not exist"
        });
      }

      res.json(galleryItem);
    } catch (error) {
      console.error("Get gallery item error:", error);
      res.status(500).json({
        error: "Failed to fetch gallery item",
        message: "Internal server error"
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, description, fileUrl } = req.body;

      // Validate input
      if (!title || !fileUrl) {
        return res.status(400).json({
          error: "Missing fields",
          message: "Title and file URL are required"
        });
      }

      // Validate URL format (basic validation)
      try {
        new URL(fileUrl);
      } catch {
        return res.status(400).json({
          error: "Invalid URL",
          message: "File URL must be a valid URL"
        });
      }

      const galleryData = {
        title: title.trim(),
        description: description?.trim() || null,
        fileUrl: fileUrl.trim(),
        uploadedBy: req.user!.id
      };

      const galleryItem = await storage.createGalleryItem(galleryData);
      res.status(201).json(galleryItem);
    } catch (error) {
      console.error("Create gallery item error:", error);
      res.status(500).json({
        error: "Failed to create gallery item",
        message: "Internal server error"
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if gallery item exists
      const existingItem = await storage.getGalleryItemById(id);
      if (!existingItem) {
        return res.status(404).json({
          error: "Gallery item not found",
          message: "The requested gallery item does not exist"
        });
      }

      // Check if user can delete this item (admin or uploader)
      if (req.user!.role !== "admin" && existingItem.uploadedBy !== req.user!.id) {
        return res.status(403).json({
          error: "Access denied",
          message: "You can only delete items you uploaded, or you must be an admin"
        });
      }

      const deleted = await storage.deleteGalleryItem(id);
      if (!deleted) {
        return res.status(404).json({
          error: "Delete failed",
          message: "Gallery item not found or delete failed"
        });
      }

      res.json({ message: "Gallery item deleted successfully" });
    } catch (error) {
      console.error("Delete gallery item error:", error);
      res.status(500).json({
        error: "Failed to delete gallery item",
        message: "Internal server error"
      });
    }
  },

  // File upload handler (for future implementation with multer)
  async upload(req: Request, res: Response) {
    try {
      // TODO: Implement file upload with multer and Supabase Storage
      // For now, return a placeholder response
      
      res.status(501).json({
        error: "Not implemented",
        message: "File upload functionality will be implemented with Supabase Storage integration"
      });
    } catch (error) {
      console.error("Upload gallery item error:", error);
      res.status(500).json({
        error: "Failed to upload file",
        message: "Internal server error"
      });
    }
  }
};
