import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { listBadges } from "../controllers/gameController.extra";
const router = express.Router();
router.get("/badges", authMiddleware, listBadges);
export default router;
