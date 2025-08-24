import { Request, Response } from "express";
import { storage } from "../storage";
import { insertAnnouncementSchema } from "../../shared/schema";

export const announcementController = {
  async getAll(req: Request, res: Response) {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({
        error: "Failed to fetch announcements",
        message: "Internal server error"
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const announcement = await storage.getAnnouncementById(id);
      
      if (!announcement) {
        return res.status(404).json({
          error: "Announcement not found",
          message: "The requested announcement does not exist"
        });
      }

      res.json(announcement);
    } catch (error) {
      console.error("Get announcement error:", error);
      res.status(500).json({
        error: "Failed to fetch announcement",
        message: "Internal server error"
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, content, audience } = req.body;

      // Validate input
      if (!title || !content || !audience) {
        return res.status(400).json({
          error: "Missing fields",
          message: "Title, content, and audience are required"
        });
      }

      // Validate audience
      const validAudiences = ["all", "students", "parents", "staff"];
      const audienceArray = Array.isArray(audience) ? audience : [audience];
      const invalidAudiences = audienceArray.filter((a: string) => !validAudiences.includes(a));
      
      if (invalidAudiences.length > 0) {
        return res.status(400).json({
          error: "Invalid audience",
          message: `Invalid audience values: ${invalidAudiences.join(", ")}. Valid values: ${validAudiences.join(", ")}`
        });
      }

      const announcementData = {
        title: title.trim(),
        content: content.trim(),
        audience: audienceArray,
        createdBy: req.user!.id
      };

      const announcement = await storage.createAnnouncement(announcementData);
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({
        error: "Failed to create announcement",
        message: "Internal server error"
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, audience } = req.body;

      // Check if announcement exists
      const existingAnnouncement = await storage.getAnnouncementById(id);
      if (!existingAnnouncement) {
        return res.status(404).json({
          error: "Announcement not found",
          message: "The requested announcement does not exist"
        });
      }

      // Check if user can edit this announcement
      if (req.user!.role !== "admin" && existingAnnouncement.createdBy !== req.user!.id) {
        return res.status(403).json({
          error: "Access denied",
          message: "You can only edit your own announcements"
        });
      }

      // Validate audience if provided
      let audienceArray;
      if (audience) {
        const validAudiences = ["all", "students", "parents", "staff"];
        audienceArray = Array.isArray(audience) ? audience : [audience];
        const invalidAudiences = audienceArray.filter((a: string) => !validAudiences.includes(a));
        
        if (invalidAudiences.length > 0) {
          return res.status(400).json({
            error: "Invalid audience",
            message: `Invalid audience values: ${invalidAudiences.join(", ")}. Valid values: ${validAudiences.join(", ")}`
          });
        }
      }

      const updateData: any = {};
      if (title !== undefined) updateData.title = title.trim();
      if (content !== undefined) updateData.content = content.trim();
      if (audience !== undefined) updateData.audience = audienceArray;

      const announcement = await storage.updateAnnouncement(id, updateData);
      if (!announcement) {
        return res.status(404).json({
          error: "Update failed",
          message: "Announcement not found or update failed"
        });
      }

      res.json(announcement);
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({
        error: "Failed to update announcement",
        message: "Internal server error"
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if announcement exists
      const existingAnnouncement = await storage.getAnnouncementById(id);
      if (!existingAnnouncement) {
        return res.status(404).json({
          error: "Announcement not found",
          message: "The requested announcement does not exist"
        });
      }

      // Only admins can delete announcements
      if (req.user!.role !== "admin") {
        return res.status(403).json({
          error: "Access denied",
          message: "Only administrators can delete announcements"
        });
      }

      const deleted = await storage.deleteAnnouncement(id);
      if (!deleted) {
        return res.status(404).json({
          error: "Delete failed",
          message: "Announcement not found or delete failed"
        });
      }

      res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({
        error: "Failed to delete announcement",
        message: "Internal server error"
      });
    }
  }
};
