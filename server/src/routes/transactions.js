import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import Transaction from "../models/Transaction.js";

const router = Router();

// List transactions with optional filters
router.get("/", authRequired, async (req, res) => {
  try {
    const { category, from, to, limit = 200 } = req.query;
    const query = { userId: req.user.id };
    if (category) query.category = category;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    const items = await Transaction.find(query).sort({ date: -1 }).limit(Number(limit));
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create transaction
router.post("/", authRequired, async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;
    if (!name || !amount || !category) return res.status(400).json({ error: "Missing fields" });
    const tx = await Transaction.create({
      userId: req.user.id,
      name,
      amount: Number(amount),
      category,
      date: date ? new Date(date) : new Date()
    });
    res.status(201).json({ item: tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete transaction
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;