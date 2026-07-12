import express from "express";
import { authMiddleware, rbac } from "../middlewares/auth";
import { listActivities, createActivity, joinActivity, listParticipation, approveParticipation } from "../controllers/socialController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/activities", authMiddleware, listActivities);
router.post("/activities", authMiddleware, rbac(["hr","admin"]), createActivity);
router.post("/activities/:id/join", authMiddleware, upload.single("proof"), joinActivity);
router.get("/participation", authMiddleware, listParticipation);
router.put("/participation/:id/approve", authMiddleware, rbac(["hr","admin"]), approveParticipation);

export default router;
