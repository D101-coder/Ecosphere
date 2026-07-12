import { Request, Response } from "express";
import db from "../db";

export async function environmentalReport(req: Request, res: Response) {
  const { department_id, from, to } = req.query;
  const q = db("environmental_goals").select("*");
  if (department_id) q.where("department_id", Number(department_id));
  const rows = await q;
  // simple aggregation example
  const summary = rows.map(r => ({
    id: r.id,
    title: r.title,
    target_co2: r.target_co2,
    current_co2: r.current_co2,
    progress: r.target_co2 ? Math.min(100, Number((r.current_co2 / r.target_co2) * 100).toFixed(2)) : 0
  }));
  res.json({ summary });
}

export async function customReport(req: Request, res: Response) {
  const filters = req.body;
  // For security only allow certain filters
  const q = db("environmental_goals").select("*");
  if (filters.department_id) q.where("department_id", filters.department_id);
  const rows = await q;
  res.json({ rows });
}
