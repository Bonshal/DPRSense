import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, actionSchema } from "@shared/schema";
import { mockDPRAnalysis } from "../client/src/data/dprAnalysis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(credentials.username);
      
      if (!user || user.password !== credentials.password) {
        return res.status(401).json({ 
          message: "Invalid credentials" 
        });
      }

      return res.json({ 
        success: true, 
        user: { id: user.id, username: user.username } 
      });
    } catch (error) {
      return res.status(400).json({ 
        message: "Invalid request data" 
      });
    }
  });

  // Get DPR Analysis data
  app.get("/api/dpr/analysis", async (req, res) => {
    try {
      // Return the mock analysis data
      return res.json(mockDPRAnalysis);
    } catch (error) {
      return res.status(500).json({ 
        message: "Failed to retrieve analysis data" 
      });
    }
  });

  // Submit action (approve/flag/reject)
  app.post("/api/dpr/action", async (req, res) => {
    try {
      const actionData = actionSchema.parse(req.body);
      
      const auditEntry = await storage.addAuditEntry({
        timestamp: new Date().toISOString(),
        action: actionData.action === "approve" 
          ? "Approved for Committee Review" 
          : actionData.action === "flag"
          ? "Flagged for Clarification"
          : "Rejected",
        user: "admin",
        comments: actionData.comments,
      });

      return res.json({ 
        success: true, 
        entry: auditEntry 
      });
    } catch (error) {
      return res.status(400).json({ 
        message: "Invalid action data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
