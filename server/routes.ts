import type { Express } from "express";
import { createServer, type Server } from "http";
import cors from "cors";
import { storage } from "./storage";
import { authController } from "./controllers/authController";
import { announcementController } from "./controllers/announcementController";
import { galleryController } from "./controllers/galleryController";
import { adminController } from "./controllers/adminController";
import { contactController } from "./controllers/contactController";
import { authMiddleware } from "./middleware/auth";
import { roleGuard } from "./middleware/roleGuard";

export async function registerRoutes(app: Express): Promise<Server> {
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Authentication routes (public)
  app.post("/api/auth/login", authController.login);
  app.post("/api/auth/signup", authController.signup);
  app.post("/api/auth/forgot-password", authController.forgotPassword);
  app.post("/api/auth/logout", authController.logout);
  app.get("/api/auth/me", authMiddleware, authController.me);

  // Public routes
  app.get("/api/announcements", announcementController.getAll);
  app.get("/api/announcements/:id", announcementController.getById);
  app.get("/api/gallery", galleryController.getAll);
  app.get("/api/gallery/:id", galleryController.getById);
  app.post("/api/contact", contactController.submitMessage);

  // Protected announcement routes
  app.post("/api/announcements", 
    authMiddleware, 
    roleGuard(["admin", "teacher"]), 
    announcementController.create
  );
  app.put("/api/announcements/:id", 
    authMiddleware, 
    roleGuard(["admin", "teacher"]), 
    announcementController.update
  );
  app.delete("/api/announcements/:id", 
    authMiddleware, 
    roleGuard(["admin"]), 
    announcementController.delete
  );

  // Protected gallery routes
  app.post("/api/gallery", 
    authMiddleware, 
    roleGuard(["admin", "teacher"]), 
    galleryController.create
  );
  app.delete("/api/gallery/:id", 
    authMiddleware, 
    roleGuard(["admin", "teacher"]), 
    galleryController.delete
  );

  // Admin-only routes
  app.get("/api/admin/users", 
    authMiddleware, 
    roleGuard(["admin"]), 
    adminController.getUsers
  );
  app.post("/api/admin/users", 
    authMiddleware, 
    roleGuard(["admin"]), 
    adminController.createUser
  );
  app.put("/api/admin/users/:id", 
    authMiddleware, 
    roleGuard(["admin"]), 
    adminController.updateUser
  );
  app.delete("/api/admin/users/:id", 
    authMiddleware, 
    roleGuard(["admin"]), 
    adminController.deleteUser
  );

  // Exam scaffolding routes (TODO: implement full functionality)
  app.get("/api/exams", authMiddleware, (req, res) => {
    res.json({ message: "Exam system coming soon", exams: [] });
  });

  app.get("/api/question-bank", 
    authMiddleware, 
    roleGuard(["admin", "teacher"]), 
    (req, res) => {
      res.json({ message: "Question bank coming soon", questions: [] });
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}
