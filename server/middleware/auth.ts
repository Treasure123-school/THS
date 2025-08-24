import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For demo purposes, we'll use a simple session-based auth
    // In production, this would verify JWT tokens from Supabase
    
    const sessionUserId = req.session?.userId;
    
    if (!sessionUserId) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Please log in to access this resource"
      });
    }

    // Get user from storage
    const user = await storage.getUser(sessionUserId);
    
    if (!user) {
      return res.status(401).json({ 
        error: "Invalid session",
        message: "User session is invalid or expired"
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ 
      error: "Authentication error",
      message: "Internal server error during authentication"
    });
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionUserId = req.session?.userId;
    
    if (sessionUserId) {
      const user = await storage.getUser(sessionUserId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }
    
    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next(); // Continue without auth on error
  }
};

// TODO: Implement JWT verification for Supabase integration
export const verifySupabaseJWT = async (token: string) => {
  // This would verify the JWT token with Supabase
  // For now, return null since we're using session-based auth
  return null;
};

// Session configuration for express-session
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "treasure-home-school-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // true in prod (Render/Vercel)
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // important for cross-domain cookies
  },
};

