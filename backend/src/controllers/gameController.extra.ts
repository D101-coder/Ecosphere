import { Request, Response } from "express";
import db from "../db";
import { createNotification } from "../services/notifications";

export async function listBadges(req: Request, res: Response) {
  const rows = await db("badges").select("*");
  res.json(rows);
}

export async function awardBadge(badgeId: number, userId: number) {
  // simple award logic
  const exists = await db("user_badges").where({ badge_id: badgeId, user_id: userId }).first();
  if (exists) return;
  await db("user_badges").insert({ badge_id: badgeId, user_id: userId, awarded_at: new Date() });
  await createNotification(userId, "Badge awarded", `You have earned a new badge`);
}
