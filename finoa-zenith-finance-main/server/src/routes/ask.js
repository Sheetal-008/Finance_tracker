import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import Transaction from "../models/Transaction.js";
import OpenAI from "openai";

const router = Router();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

function inferCategoryFromQuery(query) {
  const q = query.toLowerCase();
  if (/grocery|food|dining|restaurant|eat|meal/.test(q)) return "Food & Dining";
  if (/transport|uber|bus|train|taxi|cab|fuel|gas/.test(q)) return "Transportation";
  if (/shop|purchase|amazon|mall|clothes|apparel/.test(q)) return "Shopping";
  if (/entertain|movie|music|netflix|spotify|fun/.test(q)) return "Entertainment";
  if (/bill|utility|electric|water|internet|phone/.test(q)) return "Bills & Utilities";
  if (/health|doctor|pharmacy|medicine|hospital/.test(q)) return "Healthcare";
  if (/school|tuition|course|education|class/.test(q)) return "Education";
  if (/travel|flight|hotel|airbnb|tour/.test(q)) return "Travel";
  return null;
}

function getLastMonthRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return { from, to };
}

router.post("/", authRequired, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    // Try quick DB answer for common queries
    let computed = null;
    const cat = inferCategoryFromQuery(query);
    const isLastMonth = /last\s+month/i.test(query);

    if (cat && isLastMonth) {
      const { from, to } = getLastMonthRange();
      const agg = await Transaction.aggregate([
        { $match: { userId: req.user.id, category: cat, date: { $gte: from, $lte: to } } },
        { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
      ]);
      const total = agg[0]?.total || 0;
      const count = agg[0]?.count || 0;
      computed = { total, count, category: cat, period: "last month" };
    }

    // Build compact context for AI
    const recent = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(200)
      .lean();

    const compact = recent.map((t) => ({
      amount: t.amount,
      category: t.category,
      date: new Date(t.date).toISOString().slice(0, 10)
    }));

    const messages = [
      {
        role: "system",
        content:
          "You are Finos, an AI finance assistant. Use the provided transactions to answer the user's question with clear numbers and 1-2 helpful suggestions. If the user asks for totals, compute precisely. If information is insufficient, say what is missing and suggest how to track it.",
      },
      {
        role: "user",
        content: JSON.stringify({ question: query, transactions: compact, computed }),
      },
    ];

    let aiText = "";
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages,
        temperature: 0.2,
      });
      aiText = completion.choices[0]?.message?.content || "";
    } else {
      aiText = computed
        ? `You spent ₹${computed.total.toFixed(2)} on ${computed.category} ${computed.period}. Consider setting a monthly cap and tracking with categories.`
        : "AI is not configured. Please set OPENAI_API_KEY.";
    }

    return res.json({ answer: aiText, computed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;