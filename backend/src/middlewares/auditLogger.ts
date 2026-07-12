import { Request, Response, NextFunction } from "express";
import db from "../db";

export default async function auditLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on("finish", async () => {
    try {
      const duration = Date.now() - start;
      await db("audit_logs").insert({
        method: req.method,
        path: req.originalUrl,
        user_id: (req as any).user?.sub || null,
        status: res.statusCode,
        duration_ms: duration,
        created_at: new Date()
      });
    } catch (err) {
      // non blocking
      console.error("Audit log failed", err);
    }
  });
  next();
}
