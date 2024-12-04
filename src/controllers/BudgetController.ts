import { Request, Response, NextFunction } from "express";
import User, { IUser, IBudget } from "../models/User";
import { v4 as uuidv4 } from "uuid";  

export const addBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { category, amount, threshold } = req.body;
    const userId = req.user?.id;
  
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
  
    try {
      const user= await User.findOne({userId:userId});
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
  
      const newBudget: IBudget = {
        budgetId: uuidv4(),
        category,
        amount,
        threshold,
      };
  
      console.log('Generated budgetId:', newBudget.budgetId);
  
      user.budgets.push(newBudget);
      await user.save();
  
      res.status(201).json({ message: "Budget added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getBudgets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const user: IUser | null = await User.findOne({userId:userId});
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user.budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { budgetId } = req.params;  
  console.log(budgetId);
  const { category, amount, threshold } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const user: IUser | null = await User.findOne({userId:userId});
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const budget = user.budgets.find(budget => budget.budgetId === budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found." });
      return;
    }

    budget.category = category;
    budget.amount = amount;
    budget.threshold = threshold;

    await user.save();

    res.status(200).json({ message: "Budget updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { budgetId } = req.params;
    const userId = req.user?.id;
  
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
  
    try {
      const user = await User.findOne({userId:userId});
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
  
      user.budgets = user.budgets.filter(budget => budget.budgetId !== budgetId);
      await user.save();
  
      res.status(200).json({ message: "Budget deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  