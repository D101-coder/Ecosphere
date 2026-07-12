import { Request, Response } from "express";
import db from "../db";

export async function listChallenges(req: Request, res: Response) {
  const rows = await db("challenges").select("*");
  res.json(rows);
}

export async function createChallenge(req: Request, res: Response) {
  const payload = req.body;
  const [id] = await db("challenges").insert({ ...payload, created_by: (req as any).user?.sub });
  res.status(201).json({ id });
}

export async function joinChallenge(req: Request, res: Response) {
  const challengeId = Number(req.params.id);
  const userId = (req as any).user?.sub;
  const proof = (req as any).file ? (req as any).file.path : null;
  const [id] = await db("challenge_participation").insert({ challenge_id: challengeId, user_id: userId, proof_path: proof });
  res.status(201).json({ id });
}

export async function leaderboard(req: Request, res: Response) {
  const scope = req.query.scope || "global";
  // simple aggregation
  const rows = await db("user_points").select("user_id", "points").orderBy("points", "desc").limit(50);
  res.json({ scope, rows });
}

export async function listRewards(req: Request, res: Response) {
  const rows = await db("rewards").select("*");
  res.json(rows);
}

export async function redeemReward(req: Request, res: Response) {
  const rewardId = Number(req.params.id);
  const userId = (req as any).user?.sub;
  try {
    await db.transaction(async trx => {
      const reward = await trx("rewards").where({ id: rewardId }).forUpdate().first();
      if (!reward || reward.stock <= 0) throw new Error("Out of stock");
      const userPoints = await trx("user_points").where({ user_id: userId }).forUpdate().first();
      if (!userPoints || userPoints.points < reward.points_required) throw new Error("Insufficient points");
      await trx("rewards").where({ id: rewardId }).update({ stock: reward.stock - 1 });
      await trx("user_points").where({ user_id: userId }).update({ points: userPoints.points - reward.points_required });
      await trx("reward_redemptions").insert({ user_id: userId, reward_id: rewardId });
    });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
