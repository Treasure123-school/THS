import { Request, Response } from "express";
import { storage } from "../storage";

export const adminController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await storage.getAllUsers();
      
      // Remove sensitive information before sending
      const sanitizedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));

      res.json(sanitizedUsers);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        error: "Failed to fetch users",
        message: "Internal server error"
      });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, role } = req.body;

      // Validate input
      if (!name || !email || !role) {
        return res.status(400).json({
          error: "Missing fields",
          message: "Name, email, and role are required"
        });
      }

      // Validate role
      const validRoles = ["admin", "teacher", "student", "parent"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          error: "Invalid role",
          message: `Role must be one of: ${validRoles.join(", ")}`
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Invalid email",
          message: "Please provide a valid email address"
        });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email.toLowerCase());
      if (existingUser) {
        return res.status(409).json({
          error: "User already exists",
          message: "A user with this email already exists"
        });
      }

      // Create user
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: role.trim()
      };

      const user = await storage.createUser(userData);

      // Return user data without sensitive information
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({
        error: "Failed to create user",
        message: "Internal server error"
      });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;

      // Check if user exists
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({
          error: "User not found",
          message: "The requested user does not exist"
        });
      }

      // Validate role if provided
      if (role) {
        const validRoles = ["admin", "teacher", "student", "parent"];
        if (!validRoles.includes(role)) {
          return res.status(400).json({
            error: "Invalid role",
            message: `Role must be one of: ${validRoles.join(", ")}`
          });
        }
      }

      // Validate email format if provided
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            error: "Invalid email",
            message: "Please provide a valid email address"
          });
        }

        // Check if email is taken by another user
        const userWithEmail = await storage.getUserByEmail(email.toLowerCase());
        if (userWithEmail && userWithEmail.id !== id) {
          return res.status(409).json({
            error: "Email already taken",
            message: "Another user already has this email address"
          });
        }
      }

      // Prepare update data
      const updateData: any = {};
      if (name !== undefined) updateData.name = name.trim();
      if (email !== undefined) updateData.email = email.toLowerCase().trim();
      if (role !== undefined) updateData.role = role.trim();

      const updatedUser = await storage.updateUser(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({
          error: "Update failed",
          message: "User not found or update failed"
        });
      }

      // Return updated user data without sensitive information
      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({
        error: "Failed to update user",
        message: "Internal server error"
      });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if user exists
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({
          error: "User not found",
          message: "The requested user does not exist"
        });
      }

      // Prevent admin from deleting themselves
      if (id === req.user!.id) {
        return res.status(400).json({
          error: "Cannot delete self",
          message: "You cannot delete your own account"
        });
      }

      const deleted = await storage.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({
          error: "Delete failed",
          message: "User not found or delete failed"
        });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        error: "Failed to delete user",
        message: "Internal server error"
      });
    }
  },

  async getUserStats(req: Request, res: Response) {
    try {
      const users = await storage.getAllUsers();
      
      const stats = {
        totalUsers: users.length,
        totalAdmins: users.filter(u => u.role === "admin").length,
        totalTeachers: users.filter(u => u.role === "teacher").length,
        totalStudents: users.filter(u => u.role === "student").length,
        totalParents: users.filter(u => u.role === "parent").length,
        recentUsers: users
          .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
          .slice(0, 5)
          .map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
          }))
      };

      res.json(stats);
    } catch (error) {
      console.error("Get user stats error:", error);
      res.status(500).json({
        error: "Failed to fetch user statistics",
        message: "Internal server error"
      });
    }
  }
};
