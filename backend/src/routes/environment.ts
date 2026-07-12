import express from "express";
import { authMiddleware, rbac } from "../middlewares/auth";
import { listGoals, createGoal, updateGoal, deleteGoal } from "../controllers/environmentController";
const router = express.Router();
router.get("/goals", authMiddleware, listGoals);
router.post("/goals", authMiddleware, rbac(["hr","admin"]), createGoal);
router.put("/goals/:id", authMiddleware, rbac(["hr","admin"]), updateGoal);
router.delete("/goals/:id", authMiddleware, rbac(["hr","admin"]), deleteGoal);
export default router;
