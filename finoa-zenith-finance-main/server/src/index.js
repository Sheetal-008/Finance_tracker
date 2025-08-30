import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import summaryRoutes from "./routes/summary.js";
import askRoutes from "./routes/ask.js";
import { dbRequired } from "./middleware/db.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json({ limit: "2mb" }));

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
  console.warn("MONGODB_URI not set. DB-dependent endpoints will return 503.");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection error", err.message);
    });
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", name: "finos-server", db: mongoose.connection.readyState });
});

app.use("/api/auth", dbRequired, authRoutes);
app.use("/api/transactions", dbRequired, transactionRoutes);
app.use("/api/summary", dbRequired, summaryRoutes);
app.use("/api/ask", dbRequired, askRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));