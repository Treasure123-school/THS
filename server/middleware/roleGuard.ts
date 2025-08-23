import { Request, Response, NextFunction } from "express";

export const roleGuard = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          error: "Authentication required",
          message: "Please log in to access this resource"
        });
      }

      // Check if user has required role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: "Insufficient permissions",
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}. Your role: ${req.user.role}`
        });
      }

      next();
    } catch (error) {
      console.error("Role guard error:", error);
      res.status(500).json({
        error: "Authorization error",
        message: "Internal server error during authorization"
      });
    }
  };
};

// Specific role guards for common use cases
export const adminOnly = roleGuard(["admin"]);
export const teacherOrAdmin = roleGuard(["admin", "teacher"]);
export const staffOnly = roleGuard(["admin", "teacher"]); // Staff includes admin and teachers
export const authenticatedOnly = roleGuard(["admin", "teacher", "student", "parent"]);

// Helper function to check if user has specific role
export const hasRole = (user: Express.Request["user"], role: string): boolean => {
  return user?.role === role;
};

// Helper function to check if user has any of the specified roles
export const hasAnyRole = (user: Express.Request["user"], roles: string[]): boolean => {
  return user ? roles.includes(user.role) : false;
};

// Helper function to check if user can access resource
export const canAccessResource = (user: Express.Request["user"], resourceOwnerId?: string): boolean => {
  if (!user) return false;
  
  // Admin can access everything
  if (user.role === "admin") return true;
  
  // If no specific owner, check if user is authenticated
  if (!resourceOwnerId) return true;
  
  // User can access their own resources
  return user.id === resourceOwnerId;
};
