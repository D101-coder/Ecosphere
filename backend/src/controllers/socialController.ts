import { Request, Response } from "express";
import db from "../db";
import path from "path";

export async function listActivities(req: Request, res: Response) {
  const rows = await db("csr_activities").select("*");
  res.json(rows);
}

export async function createActivity(req: Request, res: Response) {
  const { title, department_id, description, start_date, end_date } = req.body;
  const [id] = await db("csr_activities").insert({ title, department_id, description, start_date, end_date, created_by: (req as any).user?.sub });
  res.status(201).json({ id });
}

export async function joinActivity(req: Request, res: Response) {
  const activityId = Number(req.params.id);
  const userId = (req as any).user?.sub;
  const proof = (req as any).file ? (req as any).file.path : null;
  const [id] = await db("employee_participation").insert({
    user_id: userId, activity_id: activityId, proof_path: proof, completion_date: new Date()
  });
  res.status(201).json({ id });
}

export async function listParticipation(req: Request, res: Response) {
  const rows = await db("employee_participation").select("*");
  res.json(rows);
}

export async function approveParticipation(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { approve, points } = req.body;
  await db("employee_participation").where({ id }).update({
    approval_status: approve ? "approved" : "rejected",
    points: approve ? points || 0 : 0
  });
  if (approve) {
    const row = await db("employee_participation").where({ id }).first();
    await db("user_points").where({ user_id: row.user_id }).increment("points", row.points || points || 0);
  }
  res.json({ ok: true });
}
