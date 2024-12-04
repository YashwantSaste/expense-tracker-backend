// models/Transaction.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: string; 
  amount: number;
  type: "income" | "expense"; 
  description: string;
  category: string;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  userId: { 
    type: String, 
    required: true 
    },
  amount: { 
    type: Number, 
    required: true 
    },
  type: { 
    type: String, 
    enum: ["income", "expense"], 
    required: true 
    },
  description: { 
    type: String, 
    required: true 
    },
  category: { 
    type: String, 
    required: true 
    },
  date: { 
    type: Date, 
    required: true 
    },
});

const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;
