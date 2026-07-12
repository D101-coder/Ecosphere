import { Request, Response, NextFunction } from "express";

export function validateImage(req: Request, res: Response, next: NextFunction) {
  const file = (req as any).file;
  if (!file) return next();
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    return res.status(400).json({ error: "Invalid file type" });
  }
  if (file.size > 5 * 1024 * 1024) {
    return res.status(400).json({ error: "File too large" });
  }
  next();
}
