import mongoose, { Document, Schema } from "mongoose";

export interface IBudget {
  budgetId: string;  
  category: string;
  amount: number;
  threshold: number;
}


export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  budgets: IBudget[];
}

const BudgetSchema = new Schema<IBudget>({
  budgetId: {
    type: String,
    unique: true,
  },
  category: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  threshold: { 
    type: Number, 
    required: true 
  },
}, 
{ _id: false })
; 

const UserSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),  
    unique: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  budgets: { 
    type: [BudgetSchema], 
    default: [] 
  }, 
});

export default mongoose.model<IUser>("User", UserSchema);

