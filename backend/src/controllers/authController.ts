import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 12);

export async function signup(req: Request, res: Response) {
  try {
    const { full_name, employee_id, email, password, department_id } = req.body;
    if (!full_name || !employee_id || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existing = await db("users").where({ email }).first();
    if (existing) return res.status(409).json({ error: "Email already in use" });
    const existingEmp = await db("users").where({ employee_id }).first();
    if (existingEmp) return res.status(409).json({ error: "Employee id already in use" });
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [id] = await db("users").insert({
      full_name, employee_id, email, password_hash: hash, department_id
    });
    await db("user_points").insert({ user_id: id, points: 0 });
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing credentials" });
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const access = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "change_this_secret", { expiresIn: "15m" });
    const refresh = jwt.sign({ sub: user.id }, process.env.REFRESH_SECRET || "change_this_refresh", { expiresIn: "7d" });
    res.json({ access, refresh });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Missing token" });
    const payload: any = jwt.verify(token, process.env.REFRESH_SECRET || "change_this_refresh");
    const access = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET || "change_this_secret", { expiresIn: "15m" });
    res.json({ access });
  } catch (err: any) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
}
