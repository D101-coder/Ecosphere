import express from "express";
import { authMiddleware, rbac } from "../middlewares/auth";
import multer from "multer";
import { listChallenges, createChallenge, joinChallenge, leaderboard, redeemReward, listRewards } from "../controllers/gameController";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/challenges", authMiddleware, listChallenges);
router.post("/challenges", authMiddleware, rbac(["hr","admin"]), createChallenge);
router.post("/challenges/:id/join", authMiddleware, upload.single("proof"), joinChallenge);
router.get("/leaderboard", authMiddleware, leaderboard);
router.get("/rewards", authMiddleware, listRewards);
router.post("/rewards/:id/redeem", authMiddleware, redeemReward);

export default router;
