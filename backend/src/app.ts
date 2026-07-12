import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import envRoutes from "./routes/environment";
import socialRoutes from "./routes/social";
import governanceRoutes from "./routes/governance";
import gameRoutes from "./routes/game";
import reportsRoutes from "./routes/reports";
import path from "path";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/environment", envRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/governance", governanceRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/reports", reportsRoutes);

app.get("/", (req, res) => res.json({ ok: true, service: "ecosphere-backend" }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
