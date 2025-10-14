import { type User, type InsertUser, type DPRAnalysisData, type AuditLogEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getDPRAnalysis(): Promise<DPRAnalysisData | undefined>;
  addAuditEntry(entry: Omit<AuditLogEntry, "id">): Promise<AuditLogEntry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dprAnalysis: DPRAnalysisData | undefined;
  private auditLog: AuditLogEntry[];

  constructor() {
    this.users = new Map();
    this.auditLog = [];
    
    // Initialize with demo user
    this.users.set("demo-user", {
      id: "demo-user",
      username: "admin",
      password: "password123",
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDPRAnalysis(): Promise<DPRAnalysisData | undefined> {
    return this.dprAnalysis;
  }

  async addAuditEntry(entry: Omit<AuditLogEntry, "id">): Promise<AuditLogEntry> {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: randomUUID(),
    };
    this.auditLog.push(newEntry);
    return newEntry;
  }
}

export const storage = new MemStorage();
