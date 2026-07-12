import { Request, Response } from "express";
import db from "../db";

export async function getMe(req: Request, res: Response) {
  const userId = (req as any).user?.sub;
  const user = await db("users").where({ id: userId }).first();
  if (!user) return res.status(404).json({ error: "User not found" });
  const points = await db("user_points").where({ user_id: userId }).first();
  res.json({ user, points });
}

export async function updateMe(req: Request, res: Response) {
  const userId = (req as any).user?.sub;
  const payload: any = { ...req.body };
  if ((req as any).file) payload.profile_pic = (req as any).file.path;
  await db("users").where({ id: userId }).update(payload);
  res.json({ ok: true });
}
