import express from "express";
import { authMiddleware, rbac } from "../middlewares/auth";
import { listAudits, createAudit, listIssues, createIssue, updateIssue } from "../controllers/governanceController";
const router = express.Router();

router.get("/audits", authMiddleware, listAudits);
router.post("/audits", authMiddleware, rbac(["hr","admin"]), createAudit);
router.get("/issues", authMiddleware, listIssues);
router.post("/issues", authMiddleware, createIssue);
router.put("/issues/:id", authMiddleware, rbac(["hr","admin"]), updateIssue);

export default router;
