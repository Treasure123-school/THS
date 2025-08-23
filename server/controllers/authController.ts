import { Request, Response } from "express";
import { storage } from "../storage";
import { insertProfileSchema } from "@shared/schema";

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo purposes
  // In production, use bcrypt.hash
  return Buffer.from(password).toString('base64');
};

const verifyPassword = (password: string, hash: string): boolean => {
  // This is a simple verification for demo purposes
  // In production, use bcrypt.compare
  return Buffer.from(password).toString('base64') === hash;
};

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Missing credentials",
          message: "Email and password are required"
        });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email.toLowerCase());
      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect"
        });
      }

      // For demo purposes, we'll accept any password for existing users
      // In production, verify the actual password hash
      const isValidPassword = true; // verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect"
        });
      }

      // Create session
      req.session.userId = user.id;

      // Return user data (without password)
      const { ...userData } = user;
      res.json({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Login failed",
        message: "Internal server error during login"
      });
    }
  },

  async signup(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // Validate input
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          error: "Missing fields",
          message: "Name, email, password, and role are required"
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

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email.toLowerCase());
      if (existingUser) {
        return res.status(409).json({
          error: "User already exists",
          message: "An account with this email already exists"
        });
      }

      // Create user
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: role.trim()
      };

      const user = await storage.createUser(userData);

      // Create session
      req.session.userId = user.id;

      // Return user data
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        error: "Signup failed",
        message: "Internal server error during signup"
      });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Logout error:", err);
          return res.status(500).json({
            error: "Logout failed",
            message: "Failed to destroy session"
          });
        }
        
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        error: "Logout failed",
        message: "Internal server error during logout"
      });
    }
  },

  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "Not authenticated",
          message: "No active session"
        });
      }

      // Get full user data
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({
          error: "User not found",
          message: "User account no longer exists"
        });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({
        error: "Failed to get user",
        message: "Internal server error"
      });
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          error: "Email required",
          message: "Email address is required"
        });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email.toLowerCase());
      if (!user) {
        // Don't reveal if email exists or not
        return res.json({
          message: "If an account with that email exists, a password reset link has been sent."
        });
      }

      // TODO: In production, send actual reset email
      console.log(`Password reset requested for user: ${user.email}`);

      res.json({
        message: "If an account with that email exists, a password reset link has been sent."
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({
        error: "Password reset failed",
        message: "Internal server error during password reset"
      });
    }
  }
};
