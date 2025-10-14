import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// DPR Analysis Data Types
export interface HighlightBox {
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface ExtractedEntitySource {
  pageImage: string;
  highlightBox: HighlightBox;
}

export interface ExtractedEntity {
  dataPoint: string;
  value: string;
  source: ExtractedEntitySource;
}

export interface CompletenessItem {
  item: string;
  status: "Found" | "Not Found";
}

export interface RiskPrediction {
  probability: number;
  level: "Low" | "Medium" | "High";
}

export interface RiskAssessment {
  costOverrun: RiskPrediction;
  scheduleDelay: RiskPrediction;
}

export interface InconsistencyCheck {
  check: string;
  statedValue: string;
  calculatedValue: string;
  status: "Match" | "Mismatch";
}

export interface ProjectSummary {
  projectTitle: string;
  totalCost: string;
  region?: string;
  category?: string;
  duration?: string;
  implementingAgency?: string;
  projectLength?: string;
  carriageway?: string;
}

export interface BenchmarkData {
  metric: string;
  projectValue: number;
  averageValue: number;
  unit: string;
  status: "Below Average" | "Average" | "Above Average";
}

export interface RiskFactor {
  factor: string;
  description: string;
  impact: "High" | "Medium" | "Low";
}

export interface ProjectLocation {
  lat: number;
  lng: number;
  locationName: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  comments?: string;
}

export interface DPRAnalysisData {
  fileName: string;
  dprHealthScore: number;
  summary: ProjectSummary;
  completeness: CompletenessItem[];
  riskPrediction: RiskAssessment;
  inconsistencies: InconsistencyCheck[];
  extractedEntities: ExtractedEntity[];
  benchmarks?: BenchmarkData[];
  riskFactors?: RiskFactor[];
  location?: ProjectLocation;
  auditLog?: AuditLogEntry[];
}

// Login validation schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Action schema for approval workflow
export const actionSchema = z.object({
  action: z.enum(["approve", "flag", "reject"]),
  comments: z.string().optional(),
});

export type ActionSubmission = z.infer<typeof actionSchema>;
