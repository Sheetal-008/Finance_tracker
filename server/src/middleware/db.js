import mongoose from "mongoose";

export function dbRequired(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({ error: "Database not connected" });
}