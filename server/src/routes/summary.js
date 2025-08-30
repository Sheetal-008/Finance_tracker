import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import Transaction from "../models/Transaction.js";

const router = Router();

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

router.get("/", authRequired, async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = endOfMonth(lastMonthStart);

    const [byCategory, monthly] = await Promise.all([
      // Current month by category
      Transaction.aggregate([
        { $match: { userId: req.user.id, date: { $gte: currentMonthStart, $lte: now } } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", total: 1 } },
        { $sort: { total: -1 } }
      ]),
      // Last 6 months monthly totals
      Transaction.aggregate([
        { $match: { userId: req.user.id } },
        { $group: { _id: { y: { $year: "$date" }, m: { $month: "$date" } }, total: { $sum: "$amount" } } },
        { $project: { _id: 0, year: "$_id.y", month: "$_id.m", total: 1 } },
        { $sort: { year: 1, month: 1 } }
      ])
    ]);

    const lastMonthFood = await Transaction.aggregate([
      { $match: { userId: req.user.id, date: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    const summary = {
      byCategory,
      monthly,
      lastMonthTotals: Object.fromEntries(lastMonthFood.map((d) => [d._id, d.total])),
    };

    if (req.query.format === "csv") {
      const rows = ["Category,Total"].concat(byCategory.map((c) => `${c.category},${c.total}`));
      const csv = rows.join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=summary.csv");
      return res.send(csv);
    }

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;