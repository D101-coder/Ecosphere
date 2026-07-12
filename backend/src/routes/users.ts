import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { getMe, updateMe } from "../controllers/usersController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();
router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, upload.single("profile_pic"), updateMe);
export default router;
