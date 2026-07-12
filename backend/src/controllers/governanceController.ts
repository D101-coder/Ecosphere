import { Request, Response } from "express";
import db from "../db";

export async function listAudits(req: Request, res: Response) {
  const rows = await db("audits").select("*");
  res.json(rows);
}

export async function createAudit(req: Request, res: Response) {
  const { title, department_id, auditor, date, findings } = req.body;
  const [id] = await db("audits").insert({ title, department_id, auditor, date, findings });
  res.status(201).json({ id });
}

export async function listIssues(req: Request, res: Response) {
  const rows = await db("compliance_issues").select("*");
  res.json(rows);
}

export async function createIssue(req: Request, res: Response) {
  const { audit_id, severity, description, owner_id, due_date } = req.body;
  if (!owner_id || !due_date) return res.status(400).json({ error: "Owner and due date required" });
  const [id] = await db("compliance_issues").insert({ audit_id, severity, description, owner_id, due_date });
  res.status(201).json({ id });
}

export async function updateIssue(req: Request, res: Response) {
  const id = Number(req.params.id);
  const payload = req.body;
  await db("compliance_issues").where({ id }).update(payload);
  res.json({ ok: true });
}
