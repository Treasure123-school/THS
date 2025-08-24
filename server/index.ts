import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";

import { registerRoutes } from "./routes";        // same folder as index.ts
import { setupVite, serveStatic, log } from "./vite"; // same folder as index.ts
import { sessionConfig } from "./middleware/auth";    // contains sessionConfig export

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ CORS: allow frontend on Vercel to call API
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://treasure-home-school.vercel.app",
    credentials: true,
  })
);

// ✅ Sessions
app.use(session(sessionConfig));

// --- Request Logging ---
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// --- Async bootstrap ---
(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    log(`Error: ${message}`);
  });

  // Setup Vite in dev, static build in production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Port config for Render/Heroku
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`🚀 API running on port ${port}`);
    }
  );
})();
