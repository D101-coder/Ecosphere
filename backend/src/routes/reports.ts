import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { environmentalReport, customReport } from "../controllers/reportsController";
const router = express.Router();
router.get("/environmental", authMiddleware, environmentalReport);
router.post("/custom", authMiddleware, customReport);
export default router;
