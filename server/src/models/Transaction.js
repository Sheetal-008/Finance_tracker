import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, date: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;