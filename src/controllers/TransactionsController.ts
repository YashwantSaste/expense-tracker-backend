import { Request, Response, NextFunction } from "express";
import Transaction, { ITransaction } from "../models/Transactions";
import User, { IUser } from "../models/User";
import { isValid, parseISO } from "date-fns"

export const addTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;
  console.log(userId);
  const { amount, type, description, category, date } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const transactionDate = date ? parseISO(date) : new Date();
  if (!isValid(transactionDate)) {
    res.status(400).json({ message: "Invalid date format" });
    return;
  }

  try {
    // If the transaction is an expense, check the budget for the category
    if (type === "expense") {
      const user: IUser | null = await User.findOne({userId:userId});
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Find the budget for the category
      const budget = user.budgets.find((b) => b.category === category);
      if(budget){
        if (amount > budget.amount) {
           res.status(400).json({
            message: `Transaction exceeds the budget for ${category}. Budget limit is ₹${budget.amount}.`,
          });
        }
      } 
      else{
        res.status(400).json({ message: `No budget set for ${category}` });
      }
    }

    const newTransaction: ITransaction = new Transaction({
      userId,
      amount,
      type,
      description,
      category,
      date: transactionDate, 
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction added successfully!",
      data: newTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  const { transactionId } = req.params;
  const { amount, type, description, category, date } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const transaction = await Transaction.findOne({ userId, _id: transactionId });
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.description = description || transaction.description;
    transaction.category = category || transaction.category;
    transaction.date = date ? new Date(date) : transaction.date;

    await transaction.save();

    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  const { transactionId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const transaction = await Transaction.findOneAndDelete({ userId, _id: transactionId });
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};