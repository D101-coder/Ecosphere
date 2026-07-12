import { Request, Response } from "express";
import db from "../db";

export async function listGoals(req: Request, res: Response) {
  const { department_id, status } = req.query;
  const q = db("environmental_goals").select("*");
  if (department_id) q.where("department_id", Number(department_id));
  if (status) q.where("status", String(status));
  const rows = await q;
  res.json(rows);
}

export async function createGoal(req: Request, res: Response) {
  const { title, department_id, target_co2, deadline } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const [id] = await db("environmental_goals").insert({
    title, department_id, target_co2, deadline, created_by: (req as any).user?.sub
  });
  res.status(201).json({ id });
}

export async function updateGoal(req: Request, res: Response) {
  const id = Number(req.params.id);
  const payload = req.body;
  await db("environmental_goals").where({ id }).update(payload);
  res.json({ ok: true });
}

export async function deleteGoal(req: Request, res: Response) {
  const id = Number(req.params.id);
  await db("environmental_goals").where({ id }).del();
  res.json({ ok: true });
}
